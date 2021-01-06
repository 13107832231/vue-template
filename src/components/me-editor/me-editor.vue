<template>
	<div class="me-editor" ref="MeEditor">
		<div class="me-editor-content">
			<ckeditor
				class="ckeditor"
				:editor="editor"
				@ready="onReady"
				v-bind="$attrs"
				v-on="$listeners"
				:config="editorConfig"
			>
			</ckeditor>
		</div>
	</div>
</template>
<script>
	import ExportPdf from '@ckeditor/ckeditor5-export-pdf/src/exportpdf.js'
	import DecoupledEditor from '@ckeditor/ckeditor5-build-decoupled-document'
	export default {
		name: 'MeEditor',
		data() {
			return {
				editor: DecoupledEditor,
				editorData: '<h1 style="text-align: center;">Hello MeAdmin</h1>',
				editorConfig: {
					plugins: [ExportPdf],
					uiColor: '#F7B42C',
					highlight: {
						options: [
							{
								model: 'greenMarker',
								class: 'marker-green',
								title: 'Green marker',
								color: 'var(--ck-highlight-marker-green)',
								type: 'marker'
							},
							{
								model: 'redPen',
								class: 'pen-red',
								title: 'Red pen',
								color: 'var(--ck-highlight-pen-red)',
								type: 'pen'
							}
						]
					},
					blockToolbar: {
						shouldNotGroupWhenFull: true,
						items: [
							'ExportPdf',
							'|',
							'mode',
							'document',
							'doctools',
							'|',
							'clipboard',
							'undo',
							'find',
							'selection',
							'spellchecker',
							'editing',
							'basicstyles',
							'cleanup',
							'list',
							'indent',
							'blocks',
							'align',
							'bidi',
							'paragraph',
							'links',
							'insert',
							'styles',
							'colors',
							'highlight',
							'tools',
							'others',
							'about'
						]
					}
				}
			}
		},
		methods: {
			/**
			 * create editor
			 */

			/**
			 * init
			 */
			onReady(editor) {
				this.$refs.MeEditor.prepend(editor.ui.view.toolbar.element)
				// editor.ui
				// 	.getEditableElement()
				// 	.parentElement.insertBefore(
				// 		editor.ui.view.toolbar.element,
				// 		editor.ui.getEditableElement()
				// 	)
			}
		}
	}
</script>
<style lang="less" scoped>
	.me-editor {
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
		background-color: #eee;
		border: 1px solid rgba(0, 0, 0, 0.1);
		.me-editor-content {
			flex: 1;
			overflow: auto;
		}
		/deep/ .ck.ck-toolbar {
			width: 100%;
			border: none;
		}
		.ckeditor {
			background-color: #eee;
		}
		/deep/ .ck-content.ck-editor__editable {
			width: calc(21cm + 2px);
			min-height: calc(29.7cm + 2px);
			margin: 0 auto;
			overflow: auto;
			padding: 2cm 1.2cm;
			border: 1px #d3d3d3 solid;
			background-color: #fff;
			box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
		}
	}
</style>
