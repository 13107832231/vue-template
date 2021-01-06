<template>
	<el-menu
		:collapse="isCollapse"
		:collapse-transition="false"
		router
		unique-opened
		background-color="#1c7f7a"
		:default-active="menuActive"
		model="vertical"
		active-text-color="#fff"
		text-color="#fff"
		class="hkb-menu"
	>
		<template v-for="(item, index) in menus">
			<el-submenu :index="item.name" v-if="item.children" :key="item.name">
				<template slot="title">
					<!-- <i class="el-icon-location"></i> -->
					<span>{{ item.title }} </span>
				</template>
				<el-menu-item-group>
					<el-menu-item
						v-for="sub in item.children"
						:index="sub.name"
						:route="sub.path"
						:key="sub.name"
					>
						<!-- <i class="el-icon-document"></i> -->
						<span slot="title">{{ sub.title }} </span>
					</el-menu-item>
				</el-menu-item-group>
			</el-submenu>
			<el-menu-item v-else :key="index" :index="item.name" :route="item.path">
				<i class="el-icon-document"></i>
				<span slot="title">{{ item.title }}</span>
			</el-menu-item>
		</template>
	</el-menu>
</template>
<script>
	import Menus from '@/utils/menus.js'
	export default {
		data() {
			return {
				menuActive: this.$route.name,
				menus: Menus
			}
		},
		computed: {
			isCollapse() {
				return Boolean(+this.$store.state.page.asideMini)
			}
		},
		watch: {
			$route: {
				handler(val, oval) {
					console.log(val)
					this.menuActive = val.name
				}
			}
		}
	}
</script>
<style lang="less">
	.hkb-menu {
		&.el-menu {
			border-right: none;
			background-color: #1c7f7a;
			.el-menu,
			.el-submenu {
				background-color: #1c7f7a;
			}
			.el-submenu__title i {
				color: #fff;
			}
			.el-menu-item {
				i {
					color: #fff;
				}
				&.is-active {
					background: #116560 !important;
				}
			}
		}
	}
</style>
