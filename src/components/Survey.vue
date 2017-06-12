<template>
	<div>
		<div class="survey-wrapper">
			<div class="info">
				<h3>评测说明</h3>
				<p>幼儿期是儿童的智力幼儿期是儿童的智力幼儿期是儿童的智力幼儿期是儿童的智力幼儿期是儿童的智力幼儿期是儿童的智力幼儿期是儿童的智力幼儿期是儿童的智力幼儿期是儿童的智力幼儿期是儿童的智力幼儿期是儿童的智力幼儿期是儿童的智力幼儿期是儿童的智力幼儿期是儿童的智力幼儿期是儿童的智力幼儿期是儿童的智力</p>
			</div>
			<div class="survey-box">
				<div class="box-header">
					<h2 class="title">{{questionList.pgbnr}}</h2>
				</div>
				<div class="survey-content" v-if="!rflag">
					<p class="ps">(本测试{{questionList.qlist.length}}道题，系统自动跳转，专业心理指导。)</p>
					<div class="progress-bar">
						<span><strong>{{questionIndex + 1}}</strong>/{{questionList.qlist.length}}</span>
						<el-progress :percentage="percent" :show-text="false"></el-progress>
					</div>
					<div class="question-panel">
						<p>{{questionIndex + 1}}、{{questionList.qlist[questionIndex].qnr}}</p>
					</div>
					<div class="answer-panel">
						<label class="answer-item" v-for="item in questionList.qlist[questionIndex].alist"  @click.prevent="myTest(item.axx)" :for="item.aid">
							<input type="radio" name="xx" :id="item.aid">
							<span>{{item.axx}}</span>{{item.axxnr}}
						</label>
					</div>
				</div>
				<div class="resoult-panel" v-if="rflag">
					<div class="list-item" v-for="(item, index) in questionList.qlist">
						<span class="qbh">{{item.qbh}}</span>
						<span class="qnr">{{item.qnr}}</span>
						<span class="answer">{{item.alist[1].axxnr}}</span>
					</div>
					<button class="sub-btn">
						提交评测
					</button>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		mounted() {
			var that = this;
			this.$http.get('static/test.json', {emulatejson: true}).then(function(response){
			    // 响应成功回调
					that.questionList = response.body[0];
					that.percentrate = 1 / response.body[0].qlist.length * 100;
			}, function(response){
			    // 响应错误回调
					console.log('fail');
			});
		},
		data() {
			return {
				rflag: false,
				questionList: '',
				questionIndex: 0,
				percentrate: 0,
				choice: "",
				percent: 0,
				answerList: []
			}
		},
		methods: {
			myTest: function(x) {
				setTimeout(() => {
					if(this.questionIndex == (this.questionList.qlist.length - 1)) {
						console.log(this.questionIndex);
						this.percent += this.percentrate;
						this.answerList.push({
							mxxh: this.questionIndex + 1,
							xh: x
						});
						this.rflag = true;
						return;
					}
					this.percent += this.percentrate;
					this.answerList.push({
						mxxh: this.questionIndex + 1,
						xh: x
					})
					this.questionIndex++;
					console.log(this.answerList);
        }, 300);
			}
		}
	}
</script>

<style lang="scss" type="text/css" scoped>
	$MAIN_COLOR: #4fc1e9;
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
			.resoult-panel {
				position: relative;
				box-sizing: border-box;
				border: 1px solid #eee;
				padding: 0 20px;
				height: 610px;
				.list-item {
					padding: 10px 0;
					border-bottom: 1px solid #ededed;
					.qbh {
						display: inline-block;
						float: left;
						width: 28px;
						height: 28px;
						border-radius: 50%;
						background: $MAIN_COLOR;
						color: #fff;
						text-align: center;
						line-height: 28px;
						font-size: 14px;
						margin-right: 5px;
					}
					.qnr {
						display: inline-block;
						float: left;
						width: 80%;
						height: 28px;
						line-height: 28px;
						overflow: hidden;
						text-overflow:ellipsis;
						white-space: nowrap;
					}
					.answer {
						display: inline-block;
						height: 28px;
						line-height: 28px;
						margin-left: 20px;
					}
				}
				.sub-btn {
					position: absolute;
					left: 0;
					bottom: 0;
					width: 100%;
					height: 56px;
					line-height: 56px;
					background: $MAIN_COLOR;
					color: #fff;
					font-size: 24px;
					text-align: center;
					border: none;
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
