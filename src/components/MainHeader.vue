<template>
	<div>
		<div class="top-bar-wrapper">
			<div class="top-bar">
				<div class="count">
					累计浏览人次 <strong ref="nana" class="vcount">294,534,844</strong>&nbsp;&nbsp;
					已服务健康评估人数 <strong class="hcount">473,608</strong>
				</div>
				<ul class="rList">
					<li class="reg"><router-link to="login"><i class="iconfont icon-person"></i>登录</router-link> / <router-link to="reg">注册</router-link></li>
					<li><a class="drop">下载APP</a></li>
					<li class="drop-down">
						<a class="drop">关注微信</a>
						<div class="drop-box">
							<img src="../assets/img/wx.jpg" height="100" width="100" alt="">
						</div>
					</li>
				</ul>
				
			</div>
		</div>
		<div class="search-bar-wrapper">
			<div class="search-bar">
				<div class="logo"><img src="../assets/img/logo.png" height="67" width="170" alt=""></div>
				<div class="main-serv">
					<a href="">健康评估表</a>
					<a href="">育儿宝典</a>
				</div>
				<div class="content">
					<span>热搜词：</span>
					<ul class="tag-list">
						<li><a href="">家庭教育</a></li>
						<li><a href="">护理保健</a></li>
						<li><a href="">艺术培养</a></li>
						<li><a href="">心理行为语言</a></li>
						<li><a href="">学校教育</a></li>
					</ul>
					<div class="search-panel">
						<i class="el-icon-edit"></i>
						<input type="text" placeholder="请输入要查询关键字">
					</div>
					<button class="search-btn"><i class="el-icon-search"></i></button>
				</div>
			</div>
		</div>
		<div class="nav-bar-wrapper">
			<div class="nav-bar">
				<a href="" class="hover">首页</a>
				<a href="">健康评估表</a>
				<a href="">育儿宝典</a>
				<a href="">合作医院</a>
				<a href="">新闻中心</a>
				<a href="">客户端下载</a>
				<a href="">联系</a>
			</div>
		</div>
	</div>
</template>

<script>
	import {myfun} from "../assets/js/test.js"
	export default {
		mounted() {
			var options = {
			  useEasing : true, 
			  useGrouping : true, 
			  separator : ',', 
			  decimal : '.', 
			};
			// var demo = new CountUp(this.$refs.nana, 0, 3631, 0, 2.5, options);
			// demo.start();
		}
	}
</script>

<style scoped>
@import '../assets/css/common.css';
@import '../assets/css/iconfont.css';

	.top-bar-wrapper {
		height: 50px;
		line-height: 50px;
		border-bottom: 1px solid #7db4c8;
	}

	.top-bar-wrapper .top-bar {
		height: 50px;
		line-height: 50px;
		padding: 0 2%;
	}

	.top-bar-wrapper .top-bar .count {
		display: inline-block;
		float: left;
		font-size: 12px;
		color: #666;
	}

	.top-bar-wrapper .top-bar .rList {
		float: right;		
	}

	.top-bar-wrapper .top-bar .rList li {
		height: 50px;
		line-height: 50px;
		float: left;
		font-size: 12px;
		color: #666;
	}

	.top-bar-wrapper .top-bar .rList li:nth-child(1) {
		margin-right: 30px;
	}

	.top-bar-wrapper .top-bar .rList li:nth-child(2) {
		margin-right: 15px;
	}

	.top-bar-wrapper .top-bar .rList li:nth-child(3) {
		margin-right: 105px;
	}

	.top-bar-wrapper .top-bar .rList li a i {
		margin-right: 3px;
		font-size: 18px;
	}

	.top-bar-wrapper .top-bar .rList li a {
		font-size: 12px;
		color: #666;
	}

	.top-bar-wrapper .top-bar .rList li.drop-down {
		position: relative;
	}

	.top-bar-wrapper .top-bar .rList li.drop-down .drop-box {
		position: absolute;
		top: 40px;
		left: -35px;
		padding: 10px 20px 0 20px;
		border: 1px solid #eee;
		background: #fff;
		z-index: 998;
		display: none; 
	}

	.top-bar-wrapper .top-bar .rList li.drop-down a.drop {
		padding: 10px;
		z-index: 999;
	}

	.top-bar-wrapper .top-bar .rList li.drop-down a.drop:after {
		content: '';
		margin-left: 6px;
		width: 14px;
		height: 9px;
		display: inline-block;
		background: url(../assets/img/drop.gif) no-repeat;
	}

	.top-bar-wrapper .top-bar .rList li.drop-down a.drop:hover {
		border: 1px solid #eee;
		border-bottom: 1px solid #fff;
	}

	.top-bar-wrapper .top-bar .rList li.drop-down:hover .drop-box{
		display: block;
	}

	.top-bar-wrapper .top-bar .rList li a:hover {
		color: #eb6894;
	}

	.top-bar-wrapper .top-bar .count .vcount {
		color: #ea5281;
	}

	.top-bar-wrapper .top-bar .count .hcount {
		color: #2e8eb6;
	}

	.search-bar-wrapper {
		height: 90px;
		line-height: 90px;
	}

	.search-bar-wrapper .search-bar {
		padding: 0 2%;
	}

	.search-bar-wrapper .search-bar .logo {
		float: left;		
		height: 90px;
		line-height: 90px;
	}

	.search-bar-wrapper .search-bar .logo:after {
		content: '';
		display: inline-block;
		width: 10px;
		height: 40px;
		vertical-align: middle;
		border-right: 1px solid #eee;
	}

	.search-bar-wrapper .search-bar .logo img {
		vertical-align: middle;
	}

	.search-bar-wrapper .search-bar .content {
		float: right;		
		height: 40px;
		line-height: 40px;
		padding: 25px 0;
	}

	.search-bar-wrapper .search-bar .content span {
		float: left;
		font-size: 12px;
		color: #999;
	}

	.search-bar-wrapper .search-bar .content ul {
		font-size: 12px;
		float: left;
	}

	.search-bar-wrapper .search-bar .content ul li{
		float: left;
		margin-right: 10px;
	}

	.search-bar-wrapper .search-bar .content ul li a {
		color: #666;
	}

	.search-bar-wrapper .search-bar .content ul li a:hover {
		color: #e75788;
	}

	.search-bar-wrapper .search-bar .content .search-panel {
		float: left;
		margin-left: 15px;
		width: 286px;
		height: 40px;
		background: #e75788;
		border-radius: 40px; 
	}

	.search-bar-wrapper .search-bar .content .search-panel i {
		color: #fff;
		padding: 0 10px 0 16px;
	}

	.search-bar-wrapper .search-bar .content .search-panel input {
		height: 100%;
		border: none;
		background: none;
		-webkit-appearance: none ;
		outline: none;
		color: #fff;
	}

	.search-bar-wrapper .search-bar .content .search-btn {
		float: left;
		-webkit-appearance: none ;
		background: none;
		border: none;
		outline: none;
		margin-left: 14px;
		height: 40px;
		line-height: 40px;
		padding-top: 5px;		
	}

	.search-bar-wrapper .search-bar .content .search-btn i {
		font-size: 30px;
		color: #e75788;
	}

	.search-bar-wrapper .search-bar .main-serv {
		float: left;		
		height: 40px;
		line-height: 40px;
		padding: 25px 0;
	}

	.search-bar-wrapper .search-bar .main-serv a {
		display: inline-block;
		width: 40px;
		height: 40px;
		line-height: 40px;
		border-radius: 50%;
		background: #e75788;
		margin-left: 20px;
		color: #fff;
		font-size: 12px;	
	}

	.nav-bar-wrapper {
		margin-top: 50px;
		padding: 20px 0;
	}

	.nav-bar-wrapper .nav-bar {
		text-align: center;		
	}

	.nav-bar-wrapper .nav-bar a {
		display: inline-block;
		margin: 0 10px;
		height: 32px;
		line-height: 32px;
		font-size: 18px;
		font-weight: bold;
		color: #000;
	}

	.nav-bar-wrapper .nav-bar a:hover {
		color: #e75788;
	}

	.nav-bar-wrapper .nav-bar a.hover {
		color: #e75788;
		border-bottom: 2px solid #e75788;	
	}

	.clearfix{overflow:hidden;_zoom:1;}
</style>