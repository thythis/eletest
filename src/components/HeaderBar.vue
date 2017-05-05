<template>
	<div class="header-wrapper">
		<el-row type="flex" justify="center">
		  <el-col :span="14">
		  	<div class="grid-content bg-blue">
		  		<el-row type="flex" justify="space-between">
		  			<el-col :span="10" class="logo">
		  				<span>用户注册</span>
		  			</el-col>
		  			<el-col :span="6"  class="LEntry">
		  				<span>我已注册,现在就去</span>
		  				<el-button type="success" class="login-btn">登录</el-button>
		  			</el-col>
		  		</el-row>
		  	</div>
		  </el-col>
		</el-row>
	</div>
</template>
<script>
	export default {

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

	.logo span {
		color: #999;
		font-size: 18px;
		padding-left: 5px;
		line-height: 80px;
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