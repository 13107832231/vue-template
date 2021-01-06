<template>
	<div class="tags-views">
		<div class="tags">
			<el-tag
				v-for="(tag, index) in tags"
				:key="tag.name"
				closable
				:type="tag.type"
				@close="closePage(index)"
			>
				{{ tag.name }}
			</el-tag>
		</div>
		<div class="tags-actions"></div>
	</div>
</template>
<script>
	export default {
		data() {
			return {
				tags: [
					{ name: '标签一', type: '' },
					{ name: '标签二', type: 'success' },
					{ name: '标签三', type: 'info' },
					{ name: '标签四', type: 'warning' },
					{ name: '标签五', type: 'danger' }
				]
			}
		},
		methods: {
			/**
			 * close
			 */
			closePage(index) {
				this.tags.splice(index, 1)
			}
		}
	}
</script>
