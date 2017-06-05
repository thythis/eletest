<template>
	<div>
		<main-header></main-header>
		<div class="app-wrapper">
			<el-row>
				<el-col :span="11">
					<div class="app-desc">
						<img src="../assets/img/logo_big.png" alt="">
						<h3>这一刻开始，卫宝贝和您一起守护儿童心理健康！</h3>
						<p>卫宝贝是一款关注于0-6岁儿童心理健康成长的APP，同时向广大家长<br>
						们提供专业的育儿知识，宝贝健康档案，身高体重头围，体检，疫苗<br>
						，心理筛查，健康评估等功能。<br>
						我们的宗旨是：专注儿童健康成长，为孩子健康成长撑起一片蓝天。</p>
						<div class="app-code"></div>
						<a href=""><i class="iconfont icon-apple"></i>iphone 下载</a>
						<a href=""><i class="iconfont icon-android"></i>Android 下载</a>
					</div>
				</el-col>
				<el-col :span="13">
				  <el-carousel class="app_img" indicator-position="none" arrow="never" type="card" height="500px" :autoplay="false">
				    <el-carousel-item >
					  	<img src="../assets/img/app_desc.png" alt="">
				    </el-carousel-item>
						<el-carousel-item>
					  	<img src="../assets/img/app_desc2.png" alt="">
				    </el-carousel-item>
					<el-carousel-item>
					  	<img src="../assets/img/app_desc3.png" alt="">
				    </el-carousel-item>
				  </el-carousel>
				</el-col>
			</el-row>
		</div>
		<main-footer></main-footer>
	</div>
</template>
<script>
	import MainHeader from '../components/MainHeader.vue';
	import MainFooter from '../components/MainFooter.vue';

	export default {
		components: {
			MainHeader,
			MainFooter
		},
	}
</script>

<style lang="scss" type="text/css" scoped>
	@import '../assets/css/iconfont.css';

	.app-wrapper {
		padding-top: 40px;
		width: 70%;
		margin: 0 auto;
		.app-desc {
			display: inline-block;
			h3 {
				font-size: 18px;
				line-height: 24px;
				color: #8b8b8b;
				font-weight: normal;
				margin-bottom: 34px;
			}
			p {
				font-size: 14px;
				line-height: 18px;
				color: #8b8b8b;
				margin-bottom: 64px;
			}
			.app-code {
				width: 223px;
				height: 223px;
				margin: 0 auto 18px auto;
				background: url(../assets/img/appcode_big.png) no-repeat;
				background-size: cover;
			}
			a {
				display: inline-block;
				margin-right: 20px;
				padding: 0 15px;
				background: #fc4a60;
				border-bottom: 3px solid #de4a3e;
				height: 45px;
				line-height: 45px;
				font-size: 20px;
				color: #fff;
				.iconfont {
					font-size: 34px;
					margin-right: 15px;
				}
				&:hover {
					background: #4fc1e9;
					border-bottom-color: #a6e8ff;
				}
			}
		}

		.app_img {
			.el-carousel__item {
				// &:nth-child(1), &:nth-child(2) {
				// 	width: 641px;
				// }
				// &:nth-child(3) {
				// 	width: 825px;
				// }
				img {
					width: 100%;
					height: 100%;
				}
			}
		}
	}


</style>
