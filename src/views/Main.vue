<template>
	<div>
		<main-header></main-header>
		<div class="main-wrapper">
			<div class="main">
				<el-row>
				  <el-col :span="12">
				  	<div class="menu-item">
						<img src="../assets/img/menu1.png" alt="">
						<div class="content">
							<h3>健康估表</h3>
							<p>专业的健康评估表，预防及尽早发现成长发育中的问题</p>
							<p class="bger">让孩子有一个快乐健康的成长过程！</p>
						</div>
						<a href="" class="more">更多的健康评估表 >></a>
				  	</div>
				  </el-col>
				  <el-col :span="12">
				  	<div class="menu-item">
						<img src="../assets/img/menu2.png" alt="">	
						<div class="content">
							<p>
								&#9733;&nbsp;孩子吃饭慢吞吞 如何提速？<br>
								&#9733;&nbsp;家长困惑：什么玩具能PK掉iPad？<br>
								&#9733;&nbsp;怎样对待孩子拆卸玩具的行为<br>
								&#9733;&nbsp;不同年龄BB都在玩什么玩具<br>
								&#9733;&nbsp;美国孩子的另类玩具<br>
								&#9733;&nbsp;让孩子“管住嘴”其实没那么难<br>
								&#9733;&nbsp;开学啦孩子没胃口？试试吃这些<br>
								&#9733;&nbsp;想孩子好好吃饭家长需这么做<br>
								&#9733;&nbsp;化了又冻的雪糕有毒？不靠谱！<br>
								&#9733;&nbsp;帮孩子走出长个的包含误区
							</p>
						</div>
						<a href="" class="more">更多的健康评估表 >></a>
				  	</div>
				  </el-col>
				  <el-col :span="12">
				  	<div class="menu-item">
				  		<img src="../assets/img/menu3.png" alt="">	
				  		<div class="content">
				  			<h3>合作双赢 携手共创</h3>
				  			<h2>关注儿童心理健康</h2>
				  		</div>
				  		<a href="" class="more">期待和您一起守护儿童健康 >></a>
				  	</div>
				  </el-col>
				  <el-col :span="12">
				  	<div class="menu-item">
				  		<img src="../assets/img/menu4.png" alt="">
				  		<div class="content">
				  			<h3>精彩瞬间</h3>
				  			<h4>每一次合作、演讲、都带来更多的感动！</h4>
				  		</div>
				  		<a href="" class="more">千万别错过精彩瞬间 >></a>
				  	</div>
				  </el-col>
				  <el-col :span="12">
				  	<div class="menu-item">
				  		<img src="../assets/img/menu5.png" alt="">
				  		<div class="content">
				  			<h3>卫宝贝结合云技术、移动互联网技术，<br>
							创新研发出国内最专业的儿童心理监测平台</h3>
							<h4>卫宝贝以全国标准化量表为核心，对0-3岁儿童在<br>
							社区健康检查时进行儿童心理筛查，3-6岁幼儿园<br>
							儿童心理筛查以及辖区内儿童健康相关的问卷调查<br>
							提供了全流程的解决方案</h4>
				  		</div>
				  	</div>
				  </el-col>
				  <el-col :span="12">
				  	<div class="menu-item">
				  		<img src="../assets/img/menu6.png" alt="">
				  		<div class="content">
				  			<p>
				  				提供医院、幼儿园、家长三为一体的解决方案，<br>
				  				完整覆盖学龄前儿童心理筛查工作全部流程，<br>
				  				并为后续的管理和服务提供坚实的基础。
				  			</p>
				  		</div>
				  		<a href="" class="more">快联系卫宝贝 >></a>
				  	</div>
				  </el-col>
				</el-row>
			</div>
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
		data() {
			return {

			}
		},
		methods: {
			
		}
	}
</script>

<style scoped>
	@font-face {font-family: 'YouYuanaba4e711f19170';src: url('//cdn.webfont.youziku.com/webfonts/nomal/102768/46614/591bf0eff629d816fc0dff10.gif?r=43396976184');src: url('//cdn.webfont.youziku.com/webfonts/nomal/102768/46614/591bf0eff629d816fc0dff10.gif?r=43396976184?#iefix') format('embedded-opentype'),     url('//cdn.webfont.youziku.com/webfonts/nomal/102768/46614/591bf0eff629d816fc0dff10.bmp?r=43396976184') format('woff'),     url('//cdn.webfont.youziku.com/webfonts/nomal/102768/46614/591bf0eff629d816fc0dff10.jpg?r=43396976184') format('truetype'),     url('#YouYuan') format('svg');   }.cssaba4e711f19170{font-family: 'YouYuanaba4e711f19170';}

	@font-face
	{
		font-family: myFont;
		src: url('../assets/font/hl.ttf');
	}

	.main {
		width: 80%;
		margin: 0 auto;
	}

	.main .menu-item {
		height: 528px;
		position: relative;
	}

	.main .menu-item img {
		width: 100%;
		height: 100%;
		position: absolute;
	}

	.main .el-row .el-col .content {
		position: absolute;
	}

	.main .el-row .el-col:nth-child(1) .content {
		font-family: 'YouYuanaba4e711f19170';
		left: 28px;
		top: 36px;
	}

	.main .el-row .el-col:nth-child(2) .content {
		left: 330px;
		top: 36px;
	}

	.main .el-row .el-col:nth-child(3) .content {
		font-family: myfont;
		left: 334px;
		top: 323px;
	}

	.main .el-row .el-col:nth-child(4) .content {
		left: 46px;
		top: 102px;
	}

	.main .el-row .el-col:nth-child(5) .content {
		left: 56px;
		top: 53px;
	}

	.main .el-row .el-col:nth-child(6) .content {
		left: 200px;
		top: 185px;
	}

	.main .el-row .el-col:nth-child(6) .content p {
		font-size: 24px;
		line-height: 44px;
		color: #e84d5d;
		text-decoration: underline;
	}

	.main .el-row .el-col:nth-child(5) .content h3 {
		font-size: 20px;
		line-height: 30px;
		margin-bottom: 24px;
	}

	.main .el-row .el-col:nth-child(5) .content h4 {
		font-size: 24px;
		line-height: 48px;
		font-weight: normal;
		color: #fff;
	}

	.main .el-row .el-col:nth-child(4) .content h3 {
		font-size: 24px;
		margin-bottom: 90px;
	}

	.main .el-row .el-col:nth-child(4) .content h4 {
		font-size: 34px;
		color: #fff;
		font-weight: normal;
		text-decoration: underline;
	}

	.main .el-row .el-col:nth-child(3) .content h3 {
		font-size: 26px;
		font-weight: bold;
		line-height: 44px;
		color: #1a8e3d;
	}

	.main .el-row .el-col:nth-child(3) .content h2 {
		font-size: 44px;
		line-height: 60px;
		color: #1a8e3d;
	}

	.main .el-row .el-col:nth-child(2) .content p {
		font-size: 24px;
		line-height: 36px;
		color: #1a8e3d;
	}

	.main .el-row .el-col a.more {
		font-size: 20px;
		text-decoration: underline;
		color: #fff;
		position: absolute;
		left: 22px;
		bottom: 25px;
	}

	.main .el-row .el-col:nth-child(1) a.more {
		bottom: 136px;
	}

	.main .el-row .el-col:nth-child(6) a.more {
		color: #e84d5d;
	}

	.main .el-row .el-col .content h3 {
		font-size: 22px;
		line-height: 24px;
		font-weight: normal;
		color: #fff;
	}

	.main .el-row .el-col .content p {
		font-size: 26px;
		line-height: 80px;
		color: #fff;
	}

	.main .el-row .el-col .content p.bger {
		font-size: 34px;
		line-height: 114px;
		margin-bottom: 120px;
	}

</style>