<template>
	<div class="header-wrapper">
		<el-row type="flex" justify="center">
		  <el-col :xs="22" :sm="18" :md="18" :lg="14">
		  	<div class="grid-content">
		  		<el-row type="flex" justify="space-between">
		  			<el-col :xs="10" :sm="14" :md="15" :lg="16" class="logo">
		  				<router-link to="home"><img :src="imgSrc" alt=""></router-link>

		  				<img class="desc" v-bind:src="imgData.desc" alt="">
		  			</el-col>
		  			<el-col :xs="14" :sm="10" :md="9" :lg="8" class="LEntry">
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
		margin-left: 10px;
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
