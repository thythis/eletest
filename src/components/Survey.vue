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
						<span><strong>1</strong>/23</span>
						<el-progress :percentage="4" :show-text="false"></el-progress>
					</div>
					<div class="question-panel">
						<p>1、你将孩子抱在膝盖上跳跃、摇摆等，他高兴喜欢吗？</p>
					</div>
					<div class="answer-panel">
						
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

<style lang="scss" type="text/css" scoped>
	$MAIN_COLOR: #4fc0e8;
	.survey-wrapper {
		width: 80%;
		.info {
			padding: 0 30px 30px 30px;
			background: #faf6f7;
			border-radius: 5px;
			color: #8c8889;
			h3 {
				height: 58px;
				line-height: 58px;
				font-size: 20px;
				text-align: center;
				font-weight: normal;
			}
			p {
				line-height: 26px;
				font-size: 16px;
			}
		}
		.survey-box {
			margin: 0 auto;
			width: 50%;
			height: 670px;
			box-shadow: 3px 3px 3px #ededed;
			.box-header {
				height: 60px;
				line-height: 60px;
				background: $MAIN_COLOR;
				.title {
					color: #fff;
					font-size: 22px;
					text-align: center;
					font-weight: normal;
				}
			}
			.survey-content {
				height: 610px;
				padding-top: 10px;
				box-sizing: border-box;
				border: 1px solid #eee;
				.ps {
					padding: 0 30px 0 25px;
					line-height: 24px;
					font-size: 14px;
					color: $MAIN_COLOR;
					text-align: center;
				}
				.progress-bar {
					height: 32px;
					line-height: 32px;
					padding: 0 30px 0 25px;
					span {
						margin-right: 16px;
						font-size: 12px;
						strong {
							font-size: 20px;
							color: $MAIN_COLOR;
						}
					}
					.el-progress {
						display: inline-block;
						width: 85%;
						vertical-align: middle;
					}	
				}
				.question-panel {
					padding: 0 30px 55px 25px;
					p {
						line-height: 32px;
						font-size: 16px;
					}
				}
			}
		}
	}

</style>