const configs = require('./src/config/index.js')
const path = require('path')
const CKEditorWebpackPlugin = require('@ckeditor/ckeditor5-dev-webpack-plugin')
const { styles } = require('@ckeditor/ckeditor5-dev-utils')
module.exports = {
	// 项目部署的基础路径 默认/
	// 放在子目录时使用./或者加你的域名
	publicPath: './', // 基本路径
	outputDir: 'dist', // 输出文件目录
	assetsDir: 'static',
	lintOnSave: process.env.NODE_ENV === 'development',
	productionSourceMap: false,
	devServer: {
		port: 2000,
		proxy: {
			[process.env.VUE_APP_BASE_API]: {
				target: `http://api-dev.haokangmengmeng.com`,
				changeOrigin: true,
				pathRewrite: {
					['^' + process.env.VUE_APP_BASE_API]: ''
				}
			}
		}
	},
	configureWebpack: {
		name: configs.title,
		plugins: [
			new CKEditorWebpackPlugin({
				language: 'en',
				translationsOutputFile: /app/
			})
		]
	},
	transpileDependencies: [/ckeditor5-[^/\\]+[/\\]src[/\\].+\.js$/],
	chainWebpack: (config) => {
		const svgRule = config.module.rule('svg')
		svgRule.exclude.add(path.join(__dirname, 'node_modules', '@ckeditor'))
		config.module
			.rule('cke-svg')
			.test(/ckeditor5-[^/\\]+[/\\]theme[/\\]icons[/\\][^/\\]+\.svg$/)
			.use('raw-loader')
			.loader('raw-loader')
		config.module
			.rule('cke-css')
			.test(/ckeditor5-[^/\\]+[/\\].+\.css$/)
			.use('postcss-loader')
			.loader('postcss-loader')
			.tap(() => {
				return styles.getPostCssConfig({
					themeImporter: {
						themePath: require.resolve('@ckeditor/ckeditor5-theme-lark')
					},
					minify: true
				})
			})
	}
}
