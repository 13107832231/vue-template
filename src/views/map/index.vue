<template>
	<div class="map-page">
		<div class="map-search">
			{{ lng }}
			{{ lat }}
			<el-input size="small" v-model="address"></el-input>
			<el-button
				size="small"
				icon="el-icon-search"
				circle
				@click="mapSearch"
			></el-button>
		</div>
		<el-amap
			class="amap-box"
			:zoom="16"
			:events="events"
			:center="center"
			:vid="'amap-vue'"
		>
			<el-amap-marker
				v-for="(marker, index) in markers"
				:key="marker.index"
				:position="marker.position"
				:icon="marker.icon"
				:title="marker.title"
				:events="marker.events"
				:visible="marker.visible"
				:draggable="marker.draggable"
				:vid="index"
			></el-amap-marker>
		</el-amap>
	</div>
</template>
<script>
	import Vue from 'vue'
	import VueAMap from 'vue-amap'

	Vue.use(VueAMap)
	VueAMap.initAMapApiLoader({
		key: '8325164e247e15eea68b59e89200988b',
		plugin: [
			'AMap.Geolocation',
			'AMap.Geocoder',
			'AMap.Autocomplete',
			'AMap.PlaceSearch',
			'AMap.Scale',
			'AMap.OverView',
			'AMap.ToolBar',
			'AMap.MapType',
			'AMap.PolyEditor',
			'AMap.CircleEditor'
		],
		// 默认高德 sdk 版本为 1.4.4
		v: '1.4.4'
	})

	export default {
		data() {
			return {
				lng: 0,
				lat: 0,
				center: [0, 0],
				markers: [],
				address: '福建省三明市第一医院',
				//  自动定位到当前位置
				plugin: [
					{
						timeout: 100, //超过10秒后停止定位，默认：无穷大
						panToLocation: true, //定位成功后将定位到的位置作为地图中心点，默认：true
						zoomToAccuracy: true, //定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：f
						pName: 'Geolocation',
						events: {
							click(e) {
								// alert(1)
							},
							init: (e) => this.initGeoPlugin(e)
						}
					}
				],
				//地图事件
				events: {
					init: (e) => this.initMap(e),
					click: (e) => this.mapClcik(e)
				}
			}
		},
		methods: {
			/**
			 * 初始化地图
			 */
			initMap(e) {
				console.log(e)
				const placeSearch = new AMap.PlaceSearch({
					pageSize: 5, //每页显示多少行
					pageIndex: 1 //显示的下标从那个开始
				})
				//TODO: 使用placeSearch对象调用关键字搜索的功能
				placeSearch.search(this.address, (status, result) => {
					console.log(status, result)
					if (!result.poiList.pois.length) return
					let point = result.poiList.pois[0]
					//  let
					this.lng = point.location.lng
					this.lat = point.location.lat
					this.center = [this.lng, this.lat]
					this.markers = [
						{
							position: [this.lng, this.lat],
							icon: '',
							title: '',
							events: {
								click(o) {}
							}
						}
					]
				})
			},
			/**
			 * 搜索定位
			 */
			mapSearch() {
				const placeSearcher = new AMap.PlaceSearch({
					pageSize: 5, //每页显示多少行
					pageIndex: 1 //显示的下标从那个开始
				})
				//TODO: 使用placeSearch对象调用关键字搜索的功能
				placeSearcher.search(this.address, (status, result) => {
					console.log(status, result)
					let point = result.poiList.pois[0]
					this.lng = point.location.lng
					this.lat = point.location.lat
					this.center = [this.lng, this.lat]
					this.markers = [
						{
							position: [this.lng, this.lat],
							icon: '',
							title: '',
							events: {
								click(o) {}
							}
						}
					]
				})
			},
			/**
			 * 初始化位置
			 */
			initGeoPlugin(e) {
				e.getCurrentPosition((status, result) => {
					console.log(status, result)
					console.log(result.formattedAddress)
					if (result && result.position) {
						this.address = result.formattedAddress
						this.lng = result.position.lng
						this.lat = result.position.lat
						this.center = [this.lng, this.lat]
						this.loaded = true
						this.$nextTick()
					}
				})
			},

			/**
			 * 地图点击事件
			 */
			mapClcik(e) {
				let { lng, lat } = e.lnglat
				this.lng = lng
				this.lat = lat

				this.markers = [
					{
						position: [this.lng, this.lat],
						icon: '',
						title: '',
						events: {
							click(o) {}
						}
					}
				]
				// 这里通过高德 SDK 完成。
				var geocoder = new AMap.Geocoder({
					radius: 1000,
					extensions: 'all'
				})
				geocoder.getAddress([lng, lat], (status, result) => {
					console.log(status, result)
					if (status === 'complete' && result.info === 'OK') {
						if (result && result.regeocode) {
							this.address = result.regeocode.formattedAddress //获取到位置
						}
					}
				})
			}
		}
	}
</script>
<style lang="less" scoped>
	.map-page {
		flex: 1;
		position: relative;
		.map-search {
			display: flex;
			align-items: center;
			width: 100%;
		}
	}
	.amap-box {
		width: 100%;
		height: 100%;
	}
</style>
