<template>
	<div>
		<div class="survey-wrapper">
			<div class="info">
				<h3>评测说明</h3>
				<p>幼儿期是儿童的智力幼儿期是儿童的智力幼儿期是儿童的智力幼儿期是儿童的智力幼儿期是儿童的智力幼儿期是儿童的智力幼儿期是儿童的智力幼儿期是儿童的智力幼儿期是儿童的智力幼儿期是儿童的智力幼儿期是儿童的智力幼儿期是儿童的智力幼儿期是儿童的智力幼儿期是儿童的智力幼儿期是儿童的智力幼儿期是儿童的智力</p>
			</div>
			<div class="survey-box">
				<div class="box-header">
					<h2 class="title">儿童发育筛查问卷表 （小星星）</h2>
				</div>
				<div class="survey-content">
					<p class="ps">(本测试23道题，系统自动跳转，专业心理指导。)</p>
					<div class="progress-bar">
						<el-progress :percentage="50" :show-text="false"></el-progress>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {

	}
</script>

<style scoped>
	.survey-wrapper {
		width: 80%;
	}

	.info {
		padding: 0 30px 30px 30px;
		background: #faf6f7;
		border-radius: 5px;
		color: #8c8889;
	}

	.info h3 {
		height: 58px;
		line-height: 58px;
		font-size: 20px;
		text-align: center;
		font-weight: normal;
	}

	.info p {
		line-height: 26px;
		font-size: 16px;
	}

	.survey-box {
		margin: 0 auto;
		width: 50%;
		height: 670px;
		box-shadow: 3px 3px 3px #ededed;
	}

	.survey-box .box-header {
		height: 60px;
		line-height: 60px;
		background: #4fc0e8;
	}

	.survey-box .box-header .title {
		color: #fff;
		font-size: 22px;
		text-align: center;
		font-weight: normal;
	}

	.survey-box .survey-content {
		height: 610px;
		padding: 10px 30px 0 25px;
		box-sizing: border-box;
		border: 1px solid #eee;
	}

	.survey-box .survey-content .ps {
		line-height: 24px;
		font-size: 14px;
		color: #4fc0e8;
		text-align: center;
	}

	.survey-box .survey-content .progress-bar {
		height: 32px;
		line-height: 32px;
	}

</style>