<template>
	<div class="json-editor">
		<div class="editor-tools">
			<h4>评估标准JSON编辑</h4>
			<div class="editor-actions">
				<el-tooltip content="格式化" effect="dark" placement="bottom">
					<el-button
						@click="format"
						class="actions"
						type="text"
						icon="el-icon-data-analysis"
					></el-button>
				</el-tooltip>
				<el-tooltip content="复制" effect="dark" placement="bottom">
					<el-button
						@click="copy(value, $event)"
						class="actions"
						type="text"
						icon="el-icon-copy-document"
					></el-button>
				</el-tooltip>
				<el-tooltip content="重置" effect="dark" placement="bottom">
					<el-button
						@click="reset"
						class="actions"
						type="text"
						icon="el-icon-refresh-right"
					></el-button>
				</el-tooltip>
				<el-tooltip content="保存" effect="dark" placement="bottom">
					<el-button
						@click="save"
						class="actions"
						icon="el-icon-wallet"
						type="text"
					></el-button>
				</el-tooltip>
			</div>
		</div>
		<div class="editor-main">
			<textarea class="json-textarea" ref="textarea"> </textarea>
			<code class="json-pre">
				<div class="errors" v-if="errors.length">
					<pre v-for="(error, index) in errors" :key="index">{{
						error.__annotation.message
					}}</pre>
				</div>
				<pre v-else> {{ value }} </pre>
			</code>
		</div>
		<div class="editor-footer"></div>
	</div>
</template>

<script>
	import handleCopy from '@/utils/clipboard.js'
	import CodeMirror from 'codemirror'
	import 'codemirror/addon/lint/lint.css'
	import 'codemirror/lib/codemirror.css'
	import 'codemirror/addon/fold/foldgutter.css'
	import 'codemirror/addon/dialog/dialog.css'

	import 'codemirror/theme/material-darker.css'
	require('script-loader!jsonlint')
	import 'codemirror/mode/javascript/javascript'
	import 'codemirror/addon/lint/lint'
	import 'codemirror/addon/lint/json-lint'
	//FOLD
	import 'codemirror/addon/fold/foldcode.js'
	import 'codemirror/addon/fold/foldgutter.js'
	import 'codemirror/addon/fold/brace-fold.js'
	import 'codemirror/addon/fold/xml-fold.js'
	import 'codemirror/addon/fold/xml-fold.js'
	import 'codemirror/addon/fold/markdown-fold.js'
	import 'codemirror/addon/fold/comment-fold.js'
	//SEARCH
	import 'codemirror/addon/search/searchcursor.js'
	import 'codemirror/addon/search/search.js'
	import 'codemirror/addon/search/jump-to-line.js'
	import 'codemirror/keymap/sublime.js'
	//scrollbar
	import 'codemirror/addon/scroll/simplescrollbars.css'
	import 'codemirror/addon/scroll/simplescrollbars.js'
	//fullscreen
	import 'codemirror/addon/display/fullscreen.js'
	import 'codemirror/addon/display/fullscreen.css'

	export default {
		name: 'JsonEditor',
		/* eslint-disable vue/require-prop-types */
		props: ['value'],
		data() {
			return {
				jsonEditor: false,
				errors: []
			}
		},
		watch: {
			value(value) {
				const editorValue = this.jsonEditor.getValue()
				if (value !== editorValue) {
					this.jsonEditor.setValue(JSON.stringify(this.value, null, 2))
				}
			}
		},
		mounted() {
			this.initEditor()
		},
		methods: {
			/**
			 * 初始化编辑器
			 */
			initEditor() {
				this.jsonEditor = CodeMirror.fromTextArea(this.$refs.textarea, {
					lineNumbers: true,
					mode: 'application/json',
					lineWrapping: true,
					autoRefresh: true,
					foldGutter: true,
					gutters: [
						'CodeMirror-linenumbers',
						'CodeMirror-lint-markers',
						'CodeMirror-foldgutter'
					],
					theme: 'material-darker',
					autoCloseBrackets: true,
					matchBrackets: true,
					showCursorWhenSelecting: true,
					keyMap: 'sublime',
					lint: true,
					foldOptions: {
						widget: (from, to) => {
							var count = undefined

							// Get open / close token
							var startToken = '{',
								endToken = '}'
							var prevLine = this.jsonEditor.getLine(from.line)
							if (prevLine.lastIndexOf('[') > prevLine.lastIndexOf('{')) {
								;(startToken = '['), (endToken = ']')
							}

							// Get json content
							var internal = this.jsonEditor.getRange(from, to)
							var toParse = startToken + internal + endToken

							// Get key count
							try {
								var parsed = JSON.parse(toParse)
								count = Object.keys(parsed).length
							} catch (e) {}

							// return count ? `\u21A4${count}\u21A6` : '\u2194'
							return count ? `...` : '\u2194'
						}
					}
				})
				this.jsonEditor.setValue(JSON.stringify(this.value, null, 2))
				this.jsonEditor.on('change', (cm) => {
					this.$emit('changed', cm.getValue())
					this.$emit('input', cm.getValue())
					setTimeout(() => {
						let marks = cm.doc.getAllMarks()
						this.errors = marks.filter((v) => v.type === 'range')
					}, 1000)
				})
			},
			/**
			 * jsonLinter
			 */
			highlightError(errors) {
				myCodeMirror.clearGutter('gutter-error')
				for (var i = 0; i < errors.length; i++) {
					var error = errors[i]
					var errorLine = error['line'] - 1

					var marker = document.createElement('div')
					marker.setAttribute('class', 'CodeMirror-lint-marker-error')
					marker.setAttribute('data-toggle', 'tooltip')
					marker.setAttribute('data-placement', 'right')
					marker.setAttribute(
						'title',
						'(Error ' + error['code'] + ') ' + error['message']
					)

					myCodeMirror.setGutterMarker(errorLine, 'gutter-error', marker)
				}
				$('[data-toggle="tooltip"]').tooltip()
			},
			/**
			 * 获取内容
			 */
			getValue() {
				return this.jsonEditor.getValue()
			},
			/**
			 * 格式化
			 */
			format() {
				this.jsonEditor.setValue(
					JSON.stringify(JSON.parse(this.value), null, 2)
				)
				this.$emit('format')
			},
			/**
			 * 复制
			 */
			copy(code, event) {
				handleCopy(code, event)
				this.$emit('copy')
			},
			/**
			 *
			 */
			reset() {
				this.$confirm('重置后将丢失当前编辑内容，确定要重置?', '重置', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				})
					.then(() => {
						this.$emit('reset')
					})
					.catch(() => {})
			},
			/**
			 * 复制
			 */
			save() {
				console.log(this.errors.length)
				if (!this.errors.length) {
					this.$emit('save')
				}
			}
		}
	}
</script>

<style scoped lang="less">
	.json-editor {
		height: 100%;
		width: 100%;
		border-radius: 8px;
		overflow: hidden;
		display: flex;
		position: relative;
		flex-direction: column;
		justify-content: space-between;
		.editor-tools {
			height: 45px;
			width: 100%;
			padding: 0 24px;
			background-color: #424242;
			border: 1px solid #424242;
			display: flex;
			align-items: center;
			justify-content: space-between;
			h4 {
				font-size: 12px;
				letter-spacing: 2px;
				opacity: 0.5;
				color: #fff;
				font-weight: normal;
				text-shadow: 0 1px 1px #000;
			}
			.editor-actions {
				display: flex;
				align-items: center;
				justify-content: flex-end;
			}
		}
		.editor-footer {
			background-color: #424242;
			border-top: 1px solid #424242;
			height: 15px;
		}
		.editor-main {
			width: 100%;
			height: calc(100% - 60px);
			flex: 1;
			display: flex;
			align-items: flex-start;
			/deep/ .CodeMirror-foldmarker {
				color: #00bcd4;
				text-shadow: none;
			}
			/deep/ .CodeMirror {
				position: relative;
				height: auto;
				flex: 1;
				min-height: 300px;
				height: 100%;
				pre {
					font-size: 16px;
					line-height: 24px;
				}
			}
			/deep/ .CodeMirror-gutter-elt,
			/deep/ .CodeMirror-linenumber {
				line-height: 24px;
			}
			/deep/ .cm-s-rubyblue span.cm-string {
				color: #f08047;
			}
			/deep/ .addbtn {
				margin-bottom: 15px;
				margin-left: 30px;
			}
			.json-pre {
				width: 40%;
				height: 100%;
				overflow: auto;
				background-color: #fff;
				.errors {
					padding: 12px;
					pre {
						border-radius: 12px;
						padding: 12px;
						color: #f00;
						background-color: #fde2e2;
					}
				}
				pre {
					font-size: 16px;
					line-height: 24px;
					color: #475c6c;
				}
			}
		}
	}
	.CodeMirror-dialog-top {
		top: 0;
	}
</style>
