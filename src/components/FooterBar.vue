<template>
	<div class="footer-wrapper">
		<el-row type="flex" justify="center">
		  <el-col :span="14">
		  	<div class="grid-content">
		  		<ul>
		  			<li>
		  				<a href="#">关于我们</a>
		  				<a href="#" class="nb">产品中心</a>
		  			</li>
		  			<li>
		  				卫宝贝 © 2015 粤ICP备15063302号-1
		  			</li>
		  			<!-- <li class="three">Copyright ©2005-2017 91160.com,ALL Rights Reserved</li> -->
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
