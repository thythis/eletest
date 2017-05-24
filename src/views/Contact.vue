<template>
	<div>
		<main-header></main-header>
		<div class="addr-info">
			<el-row>
				<el-col :span="13" class="lPart">
					<div class="map" id="bdmap">
					</div>
					<div class="map-bac"></div>
				</el-col>
				<el-col :span="11">
					<div class="addr-desc">
						<p class="ch">深圳市联医科技有限公司</p>
						<p class="en">Shenzhen Lianyi Tech.Co., Ltd</p>
						<p class="ch">深圳市南山区粤海街道科技园南路十二路曙光大厦1005</p>
						<p class="en">1005 Shuguang Building, South 12 Road, Yuehai Street<br>
						Science And Technology Park, Nanshan District, Shenzhen</p>
						<p class="en">www.wbaobei.com.cn</p>
						<p class="ch">+86 0755 86011984<br>
						lykj@wbaobei.com.cn</p>
					</div>
				</el-col>
			</el-row>
		</div>
		<main-footer></main-footer>
	</div>
</template>

<script>
	import MainHeader from '../components/MainHeader.vue';
	import MainFooter from '../components/MainFooter.vue';
	import BMap from 'BMap';

	export default {
		components: {
			MainHeader,
			MainFooter
		},
		mounted() {
			this.ready();			
		},
		methods: {
			ready: function() {
				var map = new BMap.Map('bdmap');
				var point = new BMap.Point(113.963864,22.543456);
				var marker = new BMap.Marker(point);
				map.centerAndZoom(point, 19);
				map.addOverlay(marker);
				map.enableScrollWheelZoom(true);
			}
		}
	}
</script>

<style lang="scss" type="text/css" scoped>
	.BMap_cpyCtrl {
	    display:none!important;
	}
	.anchorBL{
	    display:none!important;
	} 
	.addr-info {
		width: 80%;
		padding-top: 40px;
		margin: 0 auto;
		.lPart {
			.map {
				position: relative;
				height: 582px;
				display: none;
				.anchorBL {
					display: none!important;
				}
			}
			.map-bac {
				display: block;
				background: url(../assets/img/map_bac.png) no-repeat;
				background-size: cover;
				height: 582px;
			}
			&:hover {
				.map {
					display: block;
				}
				.map-bac {
					display: none;
				}
			}
		}
		.addr-desc {
			padding-top: 60px;
			p {
				font-size: 18px;
				line-height: 30px;
				text-align: center;
				color: #666;
				&.en {
					color: #49bdec;
				}
				&:nth-child(2) {
					margin-bottom: 138px;
				}
				&:nth-child(4) {
					margin-bottom: 100px;
				}
			}
		}
	}
</style>