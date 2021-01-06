<template>
	<el-container class="hkb-containter">
		<el-header class="hkb-header">
			<div class="header-left"></div>
			<div class="header-center">长期护理机构中心</div>
			<div class="header-right">
				<el-popover placement="bottom" trigger="hover">
					<el-button size="small" type="text" @click="logout">
						退出登录
					</el-button>
					<div class="user" slot="reference" v-if="user">
						<el-avatar class="user-avatar" :src="user.avatar"></el-avatar>
						<span class="user-name">{{ user.nickName }}</span>
					</div>
				</el-popover>
			</div>
		</el-header>
		<el-main class="me-main">
			<transition name="hkb-transform" mode="out-in">
				<router-view />
			</transition>
		</el-main>
	</el-container>
</template>
<script>
	export default {
		data() {
			return {
				visibleNotice: false,
				user: {}
			}
		},
		created() {
			this.user = this.$storage.get('user')
		},
		methods: {
			/**
			 * 退出登录
			 */
			logout() {
				this.$router.push('/login')
			}
		}
	}
</script>
