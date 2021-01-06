<template>
	<el-container class="hkb-containter">
		<side-nav>
			<Menu></Menu>
		</side-nav>
		<el-container>
			<el-header class="hkb-header">
				<div class="header-left">
					<el-button
						type="text"
						@click="setAsideMini"
						circle
						icon="el-icon-s-fold"
					></el-button>
					<me-breadcrumb></me-breadcrumb>
				</div>
				<div class="header-right">
					<!-- <el-popover
						v-model="visibleNotice"
						placement="bottom"
						class="notice-pop"
						width="300"
						trigger="hover"
					>
						<transition name="hkb-transform" mode="out-in">
							<div class="notice-list" v-show="visibleNotice">
								<div class="notice" v-for="item in noticeList" :key="item.id">
									<div class="notice-icon">
										<i :class="item.icon"></i>
									</div>
									<div class="notice-content">
										<h3>{{ item.title }}</h3>
										<p>{{ item.info }}</p>
									</div>
								</div>
							</div>
						</transition>
						<el-button slot="reference" icon="el-icon-bell" circle></el-button>
					</el-popover> -->
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
	</el-container>
</template>
<script>
	import SideNav from './components/SideNav'
	import Menu from './components/Menu'
	import MeBreadcrumb from '@/components/me-breadcrumb'
	export default {
		components: {
			MeBreadcrumb,
			SideNav,
			Menu
		},
		data() {
			return {
				visibleNotice: false,
				user: {},
				noticeList: [
					{
						id: '1',
						title: '系统通知',
						icon: 'el-icon-setting',
						info: '您有新的待审核消息'
					},
					{
						id: '2',
						title: '系统通知',
						icon: 'el-icon-setting',
						info: '您有新的待审核消息'
					},
					{
						id: '4',
						title: '系统通知',
						icon: 'el-icon-setting',
						info: '您有新的待审核消息'
					},
					{
						id: '3',
						title: '系统通知',
						icon: 'el-icon-setting',
						info: '您有新的待审核消息'
					}
				]
			}
		},
		created() {
			this.user = this.$storage.get('user')
		},
		methods: {
			/**
			 * 收取侧边栏
			 */
			setAsideMini() {
				console.log(this.$router)
				this.$store.dispatch('toggleAside')
			},
			/**
			 * 退出登录
			 */
			logout() {
				this.$router.push('/login')
			}
		}
	}
</script>
<style lang="less">
	@import url('~@/style/layout.less');
	.me-breadcrumb {
		padding: 8px 24px 0 24px;
	}
	.notice-list {
		.notice {
			display: flex;
			align-items: flex-start;
			padding: 12px 0;
			border-radius: 8px;
			transition: all 0.5s;
			cursor: pointer;
			.notice-icon {
				width: 36px;
				height: 36px;
				display: flex;
				align-items: center;
				justify-content: center;
				margin-right: 12px;
				border-radius: 8px;
				background-color: #f9f9f9;
				color: #666;
				font-size: 18px;
			}
			.notice-content {
				flex: 1;
				h3 {
					font-size: 13px;
					font-weight: 500;
					margin-bottom: 4px;
				}
				p {
					font-size: 12px;
					color: #999;
				}
			}
			&:hover {
				background-color: #f9f9f9;
				transition: all 0.5s;
			}
		}
	}
	.notice-pop {
		margin-right: 12px;
	}
</style>
