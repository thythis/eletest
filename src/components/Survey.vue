<template>
	<div>
		<div class="survey-wrapper">
			<div class="info" v-if="showopt">
				<h3>评测说明</h3>
				<p>儿童在幼儿期或多或少会出现一些行为问题，有些问题是一过性的，随着时间的推移或及时处理后，很快就会消失。
					一些行为问题可能较严重，若不及时处理将持续到儿童期甚至成人期，将对儿童的终身健康造成危害。如果这些问题在幼儿期能够及时发现和恰当处理，可以使其消失或程度减轻。
					以下是100个反映孩子日常行为的问题，<strong>请您认真阅读每一个问题根据孩子最近3个月以内的实际情况，选择最全靠的答案。每一个问题都要做出回答。</strong></p>
			</div>
			<div class="opt-panel" v-if="showopt">
				<el-button type="primary" @click="retest">{{this.bbinfo.zt==2?'开始测评':'重新测评'}}</el-button>
				<el-button type="success" @click="showRst" v-if="ztflag">查看报告</el-button>
				<el-button type="warning" @click="showRecord" v-if="jlflag">查看记录</el-button>
			</div>
			<div class="survey-box" v-if="showbox">
				<div class="box-header">
					<h2 class="title">thysama</h2>
				</div>
				<div class="survey-content" v-if="!rflag">
					<p class="ps">(本测试{{questionList.length}}道题，系统自动跳转，专业心理指导。)</p>
					<div class="progress-bar">
						<span><strong>{{questionIndex + 1}}</strong>/{{questionList.length}}</span>
						<el-progress :percentage="percent" :show-text="false"></el-progress>
					</div>
					<div class="question-panel">
						<p>{{questionList[questionIndex].nbbh||questionList[questionIndex].mxxh}}、{{questionList[questionIndex].nr.replace("XXX","___")}}<el-input-number v-if="questionList[questionIndex].lx==3" size="small" v-model="num"></el-input-number></p>
						<el-button v-if="(questionList[questionIndex].lx==3)||(questionList[questionIndex].lx==2)" type="primary" @click="next">下一题</el-button>
					</div>
					<div class="answer-panel">
						<label :class="[styles]" v-for="(item,index) in questionList[questionIndex].xxlist"  @click.prevent="myTest(item.xh, questionList[questionIndex].lx,index)" :for="item.fs">
							<input :type="questionList[questionIndex].lx==1?'radio':'checkbox'" :value="item.xh" name="xx" :id="item.fs">
							<span :class="mindex == index?'select-span':''">{{item.xh}}</span>{{item.nr}}
						</label>
					</div>
				</div>
				<div class="resoult-panel" v-if="rflag">
					<div class="list-item" v-for="(item, index) in questionList">
						<span class="qbh">{{item.mxxh}}</span>
						<span class="qnr">{{item.nr}}</span>
						<span class="answer">{{item.bbpgbid!=null?item.xxnr:answerList[index].xh}}</span>
					</div>
					<button class="sub-btn" v-if="questionList[0].bbpgbid!=null?!subflag:subflag" @click="subsurvey" v-loading.fullscreen.lock="fullscreenLoading">
						提交评测
					</button>
				</div>
			</div>
		</div>
		<el-dialog
		  title="提示"
		  :visible.sync="showreport">
		  <div v-html="reportData">
		  	{{reportData}}
		  </div>
		  <span slot="footer" class="dialog-footer">
		    <el-button @click="showreport = false">取 消</el-button>
		    <el-button type="primary" @click="showreport = false">确 定</el-button>
		  </span>
		</el-dialog>
	</div>
</template>

<script>
	import {hqpgbmx, getReport,bbpgbxq,savePgb} from '@/config/env'
	import myfun from '../assets/js/test.js'
	export default {
		props: {
			bbinfo: {
				pgbbh: '',
				bbpgbid: 0,
				kh: '',
				zt: 0
			}
		},
		mounted() {
			if(this.bbinfo.zt == 3) {
				this.ztflag = true;
			}
			if(this.bbinfo.zt == 2) {
				this.jlflag = false;
			}
			// this.getTest();
		},
		data() {
			return {
				hqpgbmx,
				getReport,
				bbpgbxq,
				savePgb,
				ztflag: false,
				subflag: true,
				jlflag: true,
				fullscreenLoading: false,
				reportData: "",
				showreport: false,
				showbox: false,
				showopt: true,
				rflag: false,
				questionList: [],
				questionIndex: 0,
				percentrate: 0,
				choice: "",
				percent: 0,
				mindex: 999,
				blanks: "___",
				styles: "answer-item",
				num: 0,
				answerList: []
			}
		},
		methods: {
			getTest() {
				var objstr = JSON.stringify({
					pgbbh: this.bbinfo.pgbbh
				});
				this.$http.post(this.hqpgbmx, objstr).then(function(response){
					console.log(response);
					if(response.body.results[0].lx == 4) {
						// return response.body.results[0].jsdz;
						//"http://csweb.wbaobei.com.cn/" + response.body.results[0].jsdz
						this.$http.post("http://127.0.0.1:8080/wbaobei/" + response.body.results[0].jsdz).then(function(response) {
							console.log(response);
						}, function(response) {

						})
					}
				}, function(response) {
					console.log('fail');
				})
			},
			retest() {
				var objstr = JSON.stringify({
		      pgbbh: this.bbinfo.pgbbh
		    });
		    this.$http.post(this.hqpgbmx, objstr).then(function(response){
		      console.log(response);
					if(response.body.results[0].lx == 4) {
						response.body.results.splice(0,1);
					} else {
					}
					this.questionList = response.body.results;
					this.percentrate = 1 / this.questionList.length * 100;
					this.showopt = false;
					this.rflag = false;
					this.showbox = true;
		    }, function(response) {
		      console.log('fail');
		    })
			},
			showRst() {
				console.log(this.bbinfo.bbpgbid);
				var objjjj = JSON.stringify({
		      yhid: myfun.fetch().yhid,
		      // bbid: myfun.fetch().bbList[this.$store.state.count].bbid,
					bbpgbid: this.bbinfo.bbpgbid
		    });
		    this.$http.post(this.getReport,objjjj).then(function(response){
		      console.log(response);
					var REG_BODY = /<body[^>]*>([\s\S]*)<\/body>/;
				  var result = REG_BODY.exec(response.body.result);
					// console.log(result[1]);
					this.reportData = result[1];
					this.showreport = true;
		    }, function(response){
		        console.log('fail');
		    });
			},
			showRecord() {
				// this.showbox = true;
				var objjjj = JSON.stringify({
		      yhid: myfun.fetch().yhid,
					bbpgbid: this.bbinfo.bbpgbid
		    });
		    this.$http.post(this.bbpgbxq,objjjj).then(function(response){
		      console.log(response);
					this.questionList = response.body.results;
					this.showbox = true;
					this.rflag = true;
		    }, function(response){
		        console.log('fail');
		    });
			},
			subsurvey() {
				this.fullscreenLoading = true;
				var objstr = JSON.stringify({
					yhid: myfun.fetch().yhid,
					bbid: myfun.fetch().bbList[26].bbid,
		      pgbbh: this.bbinfo.pgbbh,
					kh: this.bbinfo.kh,
					xxlist: this.answerList
		    });
		    this.$http.post(this.savePgb, objstr).then(function(response){
		      console.log(response);
					this.fullscreenLoading = false;
					var msg = "";
					if(response.body.code == "1") {
						msg = response.body.remark;
						this.$confirm(msg, '提交成功', {
		          confirmButtonText: '确定',
		          type: 'success'
		        }).then(() => {

		        }).catch(() => {

		        });
					} else {
						this.$confirm(response.body.message, '提交失败', {
		          confirmButtonText: '确定',
		          type: 'error'
		        }).then(() => {

		        }).catch(() => {

		        });
					}
		    }, function(response) {
		      console.log('fail');
		    })
			},
			next() {
				this.questionIndex++;
			},
			myTest: function(x, lx,index) {
				console.log(index);
				this.mindex = index;
				// this.styles = "answer-item hover"
				setTimeout(() => {
					if(this.questionIndex == (this.questionList.length - 1)) {
						console.log(this.questionIndex);
						this.percent += this.percentrate;
						this.answerList.push({
							pgbbh: this.bbinfo.pgbbh,
							mxxh: this.questionList[this.questionIndex].mxxh,
							xh: x
						});
						this.rflag = true;
						return;
					}
					this.percent += this.percentrate;
					this.answerList.push({
						pgbbh: this.bbinfo.pgbbh,
						mxxh: this.questionIndex + 1,
						xh: x
					})
					if(lx == 1) {
						this.questionIndex++;
						this.mindex = 999;
						// this.styles = "answer-item hover"
					}
					console.log(this.answerList);
        }, 300);
			}
		}
	}
</script>

<style lang="scss" type="text/css" scoped>
	$MAIN_COLOR: #4fc1e9;
	.el-message-box {
		width: 760px;
	}
	.survey-wrapper {
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
		.opt-panel {
			display: flex;
			justify-content: center;
			margin-bottom: 20px;
		}
		.survey-box {
			position: relative;
			margin: 0 auto 40px auto;
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
				box-sizing: border-box;
				border: 1px solid #eee;
				padding: 0 20px;
				padding-bottom: 52px;
				height: 610px;
				overflow-y: scroll;
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
						width: 75%;
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
						width: 80%;
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
							&.select-span {
								background: $MAIN_COLOR;
								color: #fff;
								cursor: pointer;
							}
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
