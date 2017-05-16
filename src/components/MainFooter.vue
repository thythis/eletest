<template>
	<div>
		<div class="footer-bar-wrapper">
			<div class="footer-bar">
				<a href="" class="wbicon">关注微信公众号</a>
				<a href="" class="wxicon">关注微信公众号</a>
				<a href="">卫宝贝@2015粤ICP备 18088000号</a>
				<a href="">关于我们</a>
				<a href="">加入我们</a>
			</div>
		</div>
	</div>
</template>

<script>
	export default {

	}
</script>

<style scoped>
	.footer-bar-wrapper {
		padding: 38px 0;
		height: 45px;
		line-height: 45px;
	}

	.footer-bar {
		width: 948px;
		margin: 0 auto;
		height: 45px;
		line-height: 45px;
	}

	.footer-bar a {
		display: inline-block;
		font-size: 18px;
		color: #000;
		height: 45px;
		line-height: 45px;
		margin-left: 24px;
	}

	.footer-bar a:hover {
		color: #e75788;
	}

	.footer-bar a.wbicon {
		background: url(../assets/img/wb.png) no-repeat;
		text-indent: 65px;
	}

	.footer-bar a.wxicon {
		background: url(../assets/img/wxicon.png) no-repeat;
		text-indent: 60px;
	}
</style>