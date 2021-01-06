<template>
	<el-breadcrumb class="app-breadcrumb" separator="/">
		<transition-group name="breadcrumb">
			<el-breadcrumb-item v-for="(item, index) in levelList" :key="item.path">
				<span
					v-if="!item.redirect || index == levelList.length - 1"
					class="no-redirect"
					>{{ item.meta.title }}</span
				>
				<a v-else @click.prevent="handleItemClick(item)">{{
					item.meta.title
				}}</a>
			</el-breadcrumb-item>
		</transition-group>
	</el-breadcrumb>
</template>

<script>
	import pathToRegexp from 'path-to-regexp'
	export default {
		data() {
			return {
				levelList: null
			}
		},
		watch: {
			$route(route) {
				if (route.path.startsWith('/redirect/')) {
					return
				}
				this.getBreadcrumb()
			}
		},
		created() {
			this.getBreadcrumb()
		},
		methods: {
			/**
			 * 获取页面导航信息
			 */
			getBreadcrumb() {
				let matched = this.$route.matched.filter(
					(item) => item.meta && item.meta.title
				)
				const first = matched[0]
				this.levelList = matched.filter((item) => item.meta && item.meta.title)
			},
			/**
			 * 路由地址解析
			 */
			pathCompile(path) {
				const { params } = this.$route
				var toPath = pathToRegexp.compile(path)
				return toPath(params)
			},
			/**
			 * 路由跳转
			 */
			handleItemClick(item) {
				const { redirect, path } = item
				if (redirect) {
					this.$router.push(redirect)
					return
				}
				this.$router.push(this.pathCompile(path))
			}
		}
	}
</script>

<style lang="scss" scoped>
	.app-breadcrumb.el-breadcrumb {
		display: inline-block;
		font-size: 14px;
		line-height: 50px;
		margin-left: 8px;
		.no-redirect {
			color: #97a8be;
			cursor: text;
		}
	}
	/* breadcrumb transition */
	.breadcrumb-enter-active,
	.breadcrumb-leave-active {
		transition: all 0.5s;
	}

	.breadcrumb-enter,
	.breadcrumb-leave-active {
		opacity: 0;
		transform: translateX(10px);
	}

	.breadcrumb-move {
		transition: all 0.5s;
	}

	.breadcrumb-leave-active {
		position: absolute;
	}
</style>
