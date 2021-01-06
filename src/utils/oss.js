import OSS from 'ali-oss'
const InitOSS = (res) =>
	new OSS({
		endpoint: res.endPoint,
		accessKeyId: res.accessKeyId,
		accessKeySecret: res.accessKeySecret,
		bucket: res.bucketName,
		stsToken: res.securityToken
	})
export default InitOSS