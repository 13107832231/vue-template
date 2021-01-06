<template>
	<div class="me-range">
		<el-input-number
			class="min-input me-range-input"
			v-model="minVal"
			:size="size"
			:precision="0"
			:controls="false"
			:max="999"
			@change="changeMin"
			placeholder=""
		></el-input-number>
		<span class="me-range-separator">-</span>
		<el-input-number
			class="max-input me-range-input"
			:controls="false"
			:precision="0"
			:size="size"
			:min="+minVal"
			:max="999"
			@change="changeMax"
			v-model="maxVal"
			placeholder=""
		></el-input-number>
	</div>
</template>
<script>
	export default {
		name: 'MeRange',
		data() {
			return {
				maxVal: 0,
				minVal: 0
			}
		},
		props: {
			size: {
				type: String,
				default: 'small'
			},
			max: {
				type: [Number, String]
			},
			min: {
				type: [Number, String]
			}
		},
		watch: {
			max: {
				handler(val) {
					this.maxVal = +val
				},
				immediate: true
			},
			min: {
				handler(val) {
					this.minVal = +val
				},
				immediate: true
			}
		},
		methods: {
			/**
			 * change
			 */
			changeMin(val, oval) {
				this.$emit('update:min', val)
			},
			changeMax(val, oval) {
				this.$emit('update:max', val)
			}
		}
	}
</script>
<style lang="less">
	.me-range {
		display: flex;
		align-items: center;
		.me-range-separator {
			padding: 0 8px;
		}
		.el-input-number.is-without-controls .el-input__inner {
			padding: 0;
		}
	}
</style>
