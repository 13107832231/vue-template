import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store/index'
import Login from '@/views/login/login.vue'
import Password from '@/views/login/password.vue'
import Register from '@/views/login/register.vue'
import Layout from '@/views/layout/Layout.vue'

// dashborad
const Dashboard = () => import('@/views/dashboard/index.vue')
//List 
const List = () => import('@/views/list/index.vue')
const ListIndex = () => import('@/views/list/list.vue')
const ListDetail = () => import('@/views/list/detail.vue')
//form
const Form = () => import('@/views/form/index.vue')
//editor
const Editor = () => import('@/views/editor/index.vue')
const EditorJson = () => import('@/views/editor/json.vue')
const EditorRich = () => import('@/views/editor/rich.vue')

//pdf
const Pdf = () => import('@/views/pdf/index.vue')
//screen
const Screen = () => import('@/views/screen/index.vue')
//map
const MapPage = () => import('@/views/map/index.vue')
const Oss = () => import('@/views/oss/index.vue')

// apply
const Apply = ()=>import('@/views/apply/index.vue')
const ApplyInfo = ()=>import('@/views/apply/info.vue')
const ApplyForm = ()=>import('@/views/apply/apply-form.vue')
Vue.use(VueRouter)

const routes = [
	{
		path: '/',
		component: Layout,
		redirect: '/login',
		name: 'Layout',
		children: [
			{
				path: '/dashboard',
				name:'Dashboard',
				component: Dashboard,
				meta: {
					title:'控制面板'
				}
			},
			{
				path: '/map',
				name: 'Map',
				component: MapPage,
				meta: {
					title:'Map'
				},
			},
			{
				path: '/list',
				name: 'List',
				component: List,
				redirect: '/list/index',
				meta: {
					title:'列表'
				},
				children: [
					{
						path: '/list/index',
						name: 'List',
						component: ListIndex,
						meta: {
							title:'列表首页'
						},
					},
					{
						path: '/list/detail',
						component: ListDetail,
						meta: {
							title:'详情'
						}
					}
				]
			}, {
				path: '/form',
				name: 'Form',
				component: Form,
				meta: {
					title:'表单'
				},
			},
			{
				path: '/editor',
				name: 'Editor',
				component: Editor,
				redirect: '/editor/json',
				meta: {
					title:'编辑器'
				},
				children: [
					{
						path: '/editor/json',
						name: 'Editor',
						component: EditorJson,
						meta: {
							title:'JSON编辑器'
						},
						
					}, {
						path: '/editor/rich',
						name: 'EditorRich',
						component: EditorRich,
						meta: {
							title:'富文本编辑器'
						},					
						
					}
				]
			}, {
				path: '/pdf',
				name: 'Pdf',
				component: Pdf,
				meta: {
					title:'PDF'
				},
			}, {
				path: '/pdf/dowm',
				name: 'PdfDown',
				component: Pdf,
				meta: {
					title:'PDF'
				},
			}, {
				path: '/oss',
				name: 'Oss',
				component: Oss,
				meta: {
					title:'Oss'
				},
			}
		]
	},
	{
		path: '/screen',
		name: 'Screen',
		component: Screen,
		meta: {
			
		}
	},
	{
		path: '/login',
		name: 'Login',
		component: Login
	},
	{
		path: '/register',
		name: 'Register',
		component: Register
	},
	{
		path: '/password',
		name: 'Password',
		component: Password
	},
	{
		path: '/apply',
		name: 'Apply',
		component: Apply,
		redirect: '/apply/info',
		children: [
			{
				path: '/apply/info',
				name: 'ApplyInfo',
				component: ApplyInfo,
				meta: {
					title:'机构申请说明'
				}
			},
			{
				path: '/apply/form',
				name: 'ApplyForm',
				component: ApplyForm,
				meta: {
					title:'机构申请'
				}
			},
		]
	}
]

const router = new VueRouter({
	// mode: 'history',
	base: process.env.BASE_URL,
	routes
})

//路由登录拦截
router.beforeEach((to, from, next) => {
	if (to.matched.some((r) => r.meta.Auth)) {
		if (store.state.login.token) {
			next()
		} else {
			next({
				path: '/login',
				query: {
					redirect: to.fullPath
				}
			})
		}
	} else {
		next()
	}
})

export default router
