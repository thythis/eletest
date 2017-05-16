<template>
	<div>
		<main-header></main-header>
		<div class="main-wrapper">
			<div class="main">
				<el-carousel :interval="5000" height="630px" arrow="always">
				    <el-carousel-item v-for="item in list">
					    <img :src="item" alt="">
			    	</el-carousel-item>
				</el-carousel>
				<el-row>
				  <el-col :span="12">
				  	<div class="menu-item">
				  		
				  	</div>
				  </el-col>
				  <el-col :span="12">
				  	<div class="menu-item">
				  		
				  	</div>
				  </el-col>
				</el-row>
				<el-row>
				  <el-col :span="12">
				  	<div class="menu-item">
				  		
				  	</div>
				  </el-col>
				  <el-col :span="12">
				  	<div class="menu-item">
				  		
				  	</div>
				  </el-col>
				</el-row>
				<el-row>
				  <el-col :span="12">
				  	<div class="menu-item">
				  		
				  	</div>
				  </el-col>
				  <el-col :span="12">
				  	<div class="menu-item">
				  		
				  	</div>
				  </el-col>
				</el-row>
			</div>
		</div>

		<main-footer></main-footer>
	</div>
</template>

<script>
	import MainHeader from './MainHeader.vue';
	import MainFooter from './MainFooter.vue';
	import banner1 from '../assets/img/banner1.png';
	import banner2 from '../assets/img/banner2.png';
	import banner3 from '../assets/img/banner3.png';
	export default {
		components: {
			MainHeader,
			MainFooter
		},
		data() {
			return {
				list: [
					banner1,banner2,banner3
				]
			}
		}
	}
</script>

<style scoped>
	.main {
		width: 80%;
		margin: 0 auto;
	}

	.main .el-carousel {
		margin-bottom: 30px;
	}

	.main .menu-item {
		height: 525px;
		background: url(../assets/img/menu1.jpg) no-repeat;
		background-size: cover;
	}
</style>