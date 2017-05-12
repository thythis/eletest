<template>
	<div class="wrape-top-bar">
		<div class="top-bar clearfix">
			<div class="count">
				累计浏览人次 <strong ref="nana" class="vcount">294,534,844</strong>&nbsp;&nbsp;
				已服务健康评估人数 <strong class="hcount">473,608</strong>
			</div>
			<ul class="rList clearfix">
				<li class="reg"><router-link to="login"><i class="iconfont icon-person"></i>登录</router-link> / <router-link to="reg">注册</router-link></li>
				<li><a>下载APP</a></li>
				<li><a>关注微信</a></li>
			</ul>
			
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

<style scope>
@import '../assets/css/common.css';
@import '../assets/css/iconfont.css';

	.wrape-top-bar {
		height: 50px;
		line-height: 50px;
		border-bottom: 1px solid #7db4c8;
	}

	.wrape-top-bar .top-bar {
		height: 50px;
		line-height: 50px;
		padding: 0 2%;
	}

	.wrape-top-bar .top-bar .count {
		display: inline-block;
		float: left;
		font-size: 12px;
		color: #666;
	}

	.wrape-top-bar .top-bar .rList {
		float: right;		
	}

	.wrape-top-bar .top-bar .rList li {
		height: 50px;
		line-height: 50px;
		float: left;
		font-size: 12px;
		color: #666;
	}

	.wrape-top-bar .top-bar .rList li:nth-child(1) {
		margin-right: 30px;
	}

	.wrape-top-bar .top-bar .rList li:nth-child(2) {
		margin-right: 25px;
	}

	.wrape-top-bar .top-bar .rList li:nth-child(3) {
		margin-right: 125px;
	}

	.wrape-top-bar .top-bar .rList li a i {
		margin-right: 3px;
		font-size: 18px;
	}

	.wrape-top-bar .top-bar .rList li a {
		font-size: 12px;
		color: #666;
	}

	.wrape-top-bar .top-bar .rList li a:hover {
		color: #eb6894;
	}

	.wrape-top-bar .top-bar .count .vcount {
		color: #ea5281;
	}

	.wrape-top-bar .top-bar .count .hcount {
		color: #2e8eb6;
	}

	.clearfix{overflow:hidden;_zoom:1;}
</style>