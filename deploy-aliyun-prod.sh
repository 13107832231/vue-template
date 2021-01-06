#!/usr/bin/env bash
#ossutil帮助文档：https://help.aliyun.com/document_detail/50452.html?spm=5176.8466032.0.0.5ffd1450OQqjaA
#部署地址：https://kyhk-site.oss-cn-shanghai.aliyuncs.com/prod/hkbltc/index.html
#自定义域名地址：https://hkbltc.haokangmengmeng.com/prod/hkbltc/index.html
#1.配置oss accesskey：生成配置文件${urser_home}/.ossutilconfig，内容如下：
#[Credentials]
#language=CH
#accessKeyID=xxx
#accessKeySecret=xxx
#endpoint=oss-cn-hangzhou.aliyuncs.com
rm -rf dist && \
  npm run build && \
  echo '备份目录：/prod/temp/hkbltc-gov-'`date +%Y%m%d%H%M` && \
  ossutil64 cp -r oss://kyhk-site/prod/hkbltc oss://kyhk-site/prod/temp/hkbltc-gov-`date +%Y%m%d%H%M`/ && \
  ossutil64 rm -f -r oss://kyhk-site/prod/hkbltc && \
  ossutil64 cp -r dist/ oss://kyhk-site/prod/hkbltc
  echo 'TODO: refresh DNS ：/prod/hkbltc-gov/*' && \
  echo 'finished'
