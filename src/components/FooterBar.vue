<template>
	<div class="footer-wrapper">
		<el-row type="flex" justify="center">
		  <el-col :span="14">
		  	<div class="grid-content">
		  		<ul>
		  			<li>
		  				<a href="#">关于我们</a>
		  				<a href="#">帮助中心</a>
		  				<a href="#">意见反馈</a>
		  				<a href="#">黄牛举报</a>
		  				<a href="#">医院加盟</a>
		  				<a href="#" class="nb">帐号申诉</a>
		  			</li>
		  			<li>
		  				互联网药品信息服务资格证书编号(粤ICP备09019668号)-经营性-2014-0010 粤公网安备 44030502000004号
		  			</li>
		  			<li class="three">Copyright ©2005-2017 91160.com,ALL Rights Reserved</li>
		  		</ul>
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
	ul,li {
		list-style: none;
		margin: 0;
		padding: 0;
	}
	.footer-wrapper {
		background: #fff;
	}

    .grid-content {
        min-height: 36px;
        padding-top: 32px;
        padding-bottom: 40px;
    }

    .grid-content ul li {
    	text-align: center;
    	margin-bottom: 10px;
    	color: #81818e;
    }

    .grid-content ul li.three {
    	color: #aaa;
    }

    .grid-content ul li a {
    	text-decoration: none;
    	padding: 0 10px;
    	color: #81818e;
    	border-right: 1px solid #81818e;
    }

    .grid-content ul li a:hover {
    	text-decoration: underline;
    }

    .grid-content ul li a.nb {
    	border: none;
    }

    .bg-blue {
    	background: #20A0FF;
    }

</style>