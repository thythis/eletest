<template>
	<div class="header-wrapper">
		<el-row type="flex" justify="center">
		  <el-col :span="14">
		  	<div class="grid-content">
		  		<el-row type="flex" justify="space-between">
		  			<el-col :span="18" class="logo">
		  				<img :src="imgSrc" alt="">
		  				<img class="desc" v-bind:src="imgData.desc" alt="">
		  			</el-col>
		  			<el-col :span="6"  class="LEntry">
		  				<span v-text="txt"></span>
		  				<router-link :to="{path: path}"><el-button type="success" class="login-btn" v-text="btntxt"></el-button></router-link>
		  			</el-col>
		  		</el-row>
		  	</div>
		  </el-col>
		</el-row>
	</div>
</template>
<script>
import logo from '../assets/img/logo.png'
	export default {
		props: {
			imgData: '',
			txt: '',
			btntxt: '',
			path: ''
		},
		data() {
			return {
				imgSrc: logo
			}
		}
	}
</script>
<style scoped>
	.header-wrapper {
		background: #fff;
	}

	.logo,.LEntry {
		height: 80px;
		line-height: 80px;
	}

	.logo {
		font-size: 0;
	}

	.logo img {
		vertical-align: middle;

	}

	.logo img.desc {
		margin-left: 27px;
	}

	.LEntry span {
		color: #666;
		font-size: 14px;
	}

	.LEntry .login-btn {
		width: 90px;
		margin-left: 12px;
	}

    .grid-content {
        min-height: 36px;
    }

    .bg-blue {
    	background: #20A0FF;
    }

</style>