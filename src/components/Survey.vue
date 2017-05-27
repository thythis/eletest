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
						<label class="answer-item" for="cb1">
							<input type="radio" name="cx" value="yes" id="cb1">
							<span>A</span>是
						</label>
						<label class="answer-item" for="cb2">
							<input type="radio" name="cx" value="no" id="cb2">
							<span>B</span>否
						</label>
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
				.answer-panel {
					.answer-item {
						display: block;
						position: relative;
						padding: 0 30px 0 25px;
						height: 48px;
						line-height: 48px;
						font-size: 14px;
						input {
							position: absolute;
							clip: rect(0, 0, 0, 0);
							&:checked ~ span {
								background: $MAIN_COLOR;
								color: #fff;
							}
						}
						&:hover {
							cursor: pointer;
							::after {
								content: '';
								width: 100%;
								height: 48px;
								position: absolute;
								left: 0;
								top: 0;
								background: rgba(200,200,200,0.3);
							}
							span {
								background: $MAIN_COLOR;
								color: #fff;
								cursor: pointer;
							}
						}
						span {
							display: inline-block;
							width: 20px;
							height: 20px;
							border-radius: 50%;
							background: #fff;
							color: $MAIN_COLOR;
							border: 1px solid $MAIN_COLOR;
							text-align: center;
							line-height: 20px;
							font-size: 12px;
							margin-right: 10px;
							&:hover {
								background: $MAIN_COLOR;
								color: #fff;
								cursor: pointer;
							}
						}
					}
				}
			}
		}
	}

</style>