#!/usr/bin/env bash
#ossutil帮助文档：https://help.aliyun.com/document_detail/50452.html?spm=5176.8466032.0.0.5ffd1450OQqjaA
#部署地址：https://kycic-site-test.oss-cn-shanghai.aliyuncs.com/dev/hkbltc/index.html
#自定义域名地址：https://hkbltc-test.haokangmengmeng.com/test/hkbltc/index.html
#1.配置oss accesskey：生成配置文件${urser_home}/.ossutilconfig，内容如下：
#[Credentials]
#language=CH
#accessKeyID=xxx
#accessKeySecret=xxx
#endpoint=oss-cn-hangzhou.aliyuncs.com
rm -rf dist && \
  npm run build:test && \
  echo '备份目录：/test/temp/hkbltc-gov-'`date +%Y%m%d%H%M` && \
  ossutil64 cp -r oss://kycic-site-test/test/hkbltc oss://kycic-site-test/test/temp/hkbltc-gov-`date +%Y%m%d%H%M`/ && \
  ossutil64 rm -f -r oss://kycic-site-test/test/hkbltc-gov && \
  ossutil64 cp -r dist/ oss://kycic-site-test/test/hkbltc-gov
  echo 'TODO: refresh DNS ：/test/hkbltc-gov/*' && \
  echo 'finished'
