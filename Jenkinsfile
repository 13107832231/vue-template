#!/usr/bin/env groovy
import java.text.SimpleDateFormat

pipeline {
    agent {
        kubernetes {
            yamlFile 'KubernetesPod.yaml'
        }
    }
    environment {
        DEPLOY_FOLDER_NAME='hkbltc-gov'
        ACCESS_ADDR="http://shangbao-dev.haokangmengmeng.com/dev/hkbltc-gov/index.html#"
    }
    stages {
        stage('npm install') {

                    steps {
                        container('node') {
                            sh '''
                                yarn install
                            '''
                        }
                    }
        }
        stage('deploy-dev') {
            when {
                anyOf {
                    environment name: 'GIT_BRANCH', value: 'origin/dev'
                }
            }
            steps {
                container('node') {
                    sh '''
                      rm -rf dist && \
                       npm run build:dev
                    '''
                }
                container('aliyun-tools') {
                    sh '''
                      echo '备份目录：/dev/temp/${DEPLOY_FOLDER_NAME}-'`date +%Y%m%d%H%M` && \
                      ossutil64 cp -r oss://kycic-site-test/dev/${DEPLOY_FOLDER_NAME} oss://kycic-site-test/dev/temp/${DEPLOY_FOLDER_NAME}-`date +%Y%m%d%H%M`/ --config-file=/root/.ossutilconfig&& \
                      ossutil64 rm -f -r oss://kycic-site-test/dev/${DEPLOY_FOLDER_NAME} --config-file=/root/.ossutilconfig&& \
                      ossutil64 cp -r dist/ oss://kycic-site-test/dev/${DEPLOY_FOLDER_NAME} --config-file=/root/.ossutilconfig
                    '''
                }
                script {
                  ACCESS_ADDR = "http://shangbao-dev.haokangmengmeng.com/dev/hkbltc-gov/index.html"
                }
            }
        }
        stage('deploy-test') {
            when {
                anyOf {
                    environment name: 'GIT_BRANCH', value: 'origin/master'
                }
            }
            steps {
                container('node') {
                    sh '''
                      rm -rf dist && \
                      npm run build:test
                    '''
                }
                container('aliyun-tools') {
                    sh '''
                      echo '备份目录：/test/temp/${DEPLOY_FOLDER_NAME}-'`date +%Y%m%d%H%M` && \
                      ossutil64 cp -r oss://kycic-site-test/test/${DEPLOY_FOLDER_NAME} oss://kycic-site-test/test/temp/${DEPLOY_FOLDER_NAME}-`date +%Y%m%d%H%M`/ --config-file=/root/.ossutilconfig&& \
                      ossutil64 rm -f -r oss://kycic-site-test/test/${DEPLOY_FOLDER_NAME} --config-file=/root/.ossutilconfig&& \
                      ossutil64 cp -r dist/ oss://kycic-site-test/test/${DEPLOY_FOLDER_NAME} --config-file=/root/.ossutilconfig
                    '''
                }
                script {
                  ACCESS_ADDR = "https://shangbao-test.haokangmengmeng.com/test/hkbltc-gov/index.html"
                }
            }
        }
        stage('deploy-prod') {
            when {
                allOf {
                    environment name: 'GIT_BRANCH', value: 'origin/master'
                    environment ignoreCase: true, name: 'gitlabActionType', value: 'TAG_PUSH'
                    expression { return "$gitlabTargetBranch" ==~ /refs\/tags\/release-.*/ }
                }
            }
            steps {
                container('node') {
                    sh '''
                      rm -rf dist && \
                      npm run build
                    '''
                }
                container('aliyun-tools') {
                    sh '''
                      echo '备份目录：/prod/temp/${DEPLOY_FOLDER_NAME}-'`date +%Y%m%d%H%M` --config-file=/root/.ossutilconfig&& \
                      ossutil64 cp -r oss://kyhk-site/prod/${DEPLOY_FOLDER_NAME} oss://kyhk-site/prod/temp/${DEPLOY_FOLDER_NAME}-`date +%Y%m%d%H%M`/ --config-file=/root/.ossutilconfig&& \
                      ossutil64 rm -f -r oss://kyhk-site/prod/${DEPLOY_FOLDER_NAME} --config-file=/root/.ossutilconfig&& \
                      ossutil64 cp -r dist/ oss://kyhk-site/prod/${DEPLOY_FOLDER_NAME} --config-file=/root/.ossutilconfig
                    '''
                }
                script {
                  ACCESS_ADDR = "https://ltc-gov.hopecombo.com/prod/hkbltc-gov/index.html#/login"
                }
            }
        }
    }
    post {
      success {
        echo 'do somethings after success'
        dingtalk (
          robot: '3fff9e6a-b4df-4125-9577-c303324adf10',
          type: 'ACTION_CARD',
          text: [
            "# $JOB_NAME 构建成功",
            "# 页面链接：$ACCESS_ADDR",
            getChangeString()
          ],
          btns: [
            [
              title: '查看详情',
              actionUrl: blueOceanUrl()
            ],
            [
              title: '访问地址',
              actionUrl: "$ACCESS_ADDR"
            ]
          ],
          btnLayout: 'V',
          at: atUsers()
        )
      }
      failure {
        echo 'do somethings after failure'
        dingtalk (
          robot: '3fff9e6a-b4df-4125-9577-c303324adf10',
          type: 'ACTION_CARD',
          text: [
            "# $JOB_NAME 构建失败",
            getChangeString()
          ],
          btns: [
            [
              title: '查看详情',
              actionUrl: blueOceanUrl()
            ],
            [
              title: '访问地址',
              actionUrl: "$ACCESS_ADDR"
            ]
          ],
          btnLayout: 'V',
          at: atUsers()
        )
      }
      always {
        echo 'do somethings always'
      }
    }
}
@NonCPS
def getChangeString() {
  def MAX_MSG_LEN = 100
  def changeString = ""
  echo "Gathering SCM changes"
  def duration = currentBuild.duration
  def changeLogSets = currentBuild.changeSets
  changeString+=" --- \n - 持续时间： ${duration/1000} s\n"
  SimpleDateFormat f = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss")
  for (int i = 0; i < changeLogSets.size(); i++) {
    def entries = changeLogSets[i].items
    for (int j = 0; j < entries.length; j++) {
      def entry = entries[j]
      def truncated_msg = entry.msg.take(MAX_MSG_LEN)
      changeString += " - 提交内容：${truncated_msg}  \n - 提交人：${entry.author.displayName}\n"
      def date=new Date(entry.timestamp)
      def timeFormat=f.format(date)
      changeString+=" - 时间：${timeFormat}\n"
      for (int z = 0; z < entry.affectedFiles.size(); z++) {
        def affectedFile=entry.affectedFiles[z]
        changeString+=" - 文件：${affectedFile.path} \n - 操作：${affectedFile.editType.name}\n"
      }
      changeString+="---\n"
    }
  }
  if (!changeString) {
    changeString = " - No new changes"
  }

  return changeString
}

def blueOceanUrl(){
  def jobName=URLEncoder.encode("$JOB_NAME", "UTF-8")
  def url="http://jenkins-web-dev.haokangmengmeng.com/blue/organizations/jenkins/${jobName}/detail/$JOB_BASE_NAME/$BUILD_NUMBER/pipeline"
  return url
}

def atUsers(){
  def mobiles=[]
  def changeLogSets = currentBuild.changeSets
  for (int i = 0; i < changeLogSets.size(); i++) {
    def entries = changeLogSets[i].items
    for (int j = 0; j < entries.length; j++) {
      def entry = entries[j]
      def user=User.getOrCreateByIdOrFullName("${entry.author.displayName}")
      mobiles.add(user.getProperty( io.jenkins.plugins.DingTalkUserProperty.class).mobile)
    }
  }
  return mobiles
}
