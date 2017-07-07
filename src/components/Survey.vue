<template>
	<div>
		<div class="survey-wrapper">
			<div class="info" v-if="showopt">
				<h3>评测说明</h3>
				<div class="pgb-desc" v-html="pgbinfo"></div>
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
						<el-form>
						<p>{{questionList[questionIndex].nbbh||questionList[questionIndex].mxxh}}、
							<span v-if="(questionList[questionIndex].lx==1)||(questionList[questionIndex].lx==2)||(!questionList[questionIndex].lx)">{{questionList[questionIndex].nr}}</span>
							<span v-for="(item,index) in processNr" v-if="questionList[questionIndex].lx==3">
								{{item}}
								<!-- <el-tooltip :disabled="showtip" :content="item" placement="bottom" effect="light">
									<el-input size="mini" onblur="myblur" v-if="(questionList[questionIndex].lx==3)&&(index<(processNr.length-1))" placeholder="填写" v-model="num[index]"></el-input>
								</el-tooltip> -->
								<el-tooltip :content="gzinfo[index]" placement="bottom" effect="light">
									<input class="blankipt" v-chkdata="{ gz: questionList[questionIndex].mxList?questionList[questionIndex].mxList[index].gz:questionList[questionIndex].gz }" v-if="index<(processNr.length-1)" placeholder="填写" v-model="num[index]" />
								</el-tooltip>
							</span>
						</p>
						<el-button v-if="(questionList[questionIndex].lx==3)||(questionList[questionIndex].lx==2)" type="primary" @click="next(questionList[questionIndex].lx)">下一题</el-button>
					</el-form>
					</div>
					<div class="answer-panel">
						<div v-for="(item,index) in questionList[questionIndex].xxlist">
							<input type="checkbox" :value="item.xh" name="xx" :id="'c'+item.xh"  v-model="xhlist">
							<label class="answer-item"   @click.prevent="myTest(item.xh, index)" :for="'c'+item.xh">
								<span>{{item.xh}}</span>{{item.nr}}
							</label>
						</div>
					</div>
				</div>
				<div class="resoult-panel" v-if="rflag">
					<div class="list-item" v-for="(item, index) in answerList">
						<span class="qbh">{{item.mxxh}}</span>
						<span class="qnr">{{item.tmnr||item.nr}}</span>
						<span class="answer">{{item.lx?(item.lx==1?item.xxnr:item.xh):item.xxnr}}</span>
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
			this.getTest();
		},
		directives: {
			chkdata: {
				inserted: function (el, binding) {
						let gz = binding.value.gz;
						el.onblur = function() {
							if(gz) {
								let arr = gz.split('-');
								let num = parseInt(el.value);
								arr[0] = parseInt(arr[0]);
								arr[1] = parseInt(arr[1]);
								if((!el.value.match(/^\d+$/)) || ((num < arr[0]) || (num > arr[1]))) {
									el.value = "";
									el.focus();
								} else {

								}
							}
						}
        }
			}
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
				pgbinfo: "",
				showreport: false,
				showbox: false,
				showopt: true,
				rflag: false,
				questionList: [],
				questionListMap: new Map(),
				mxxhMap: new Map(),
				questionIndex: 0,
				percentrate: 0,
				choice: "",
				blanks: "___",
				num: [],
				gzinfo: [],
				showtip: [],
				answerList: [],
				xhlist: []
			}
		},
		computed: {
			percent: function() {
				return this.questionIndex * this.percentrate;
			},
			// showtip: function() {
			// 	for (var i = 0; i < this.num.length; i++) {
			// 		if(this.num[i].match(/^\d+$/)) {
			// 			this.num[i] = "";
			// 			return true;
			// 		}
			// 	}
			// 	return false;
			// },
			processNr: function() {
				if(this.questionList[this.questionIndex].mxList) {
					var arr = [];
					for (var i = 0; i < this.questionList[this.questionIndex].mxList.length; i++) {
						arr.push(this.questionList[this.questionIndex].mxList[i].nr);
						if(this.questionList[this.questionIndex].mxList[i].gz) {
							this.gzinfo[i] = this.questionList[this.questionIndex].mxList[i].gz;
						} else {
							this.gzinfo[i] = "任意填写"
						}
					}
					return arr.join('').split("XXX");
				}
				if(this.questionList[this.questionIndex].gz) {
					this.gzinfo[0] = this.questionList[this.questionIndex].gz;
				} else {
					this.gzinfo[0] = "任意填写"
				}
				return this.questionList[this.questionIndex].nr.split("XXX");
			},
			isRequired: function() {
				for (var i = 0; i < this.num.length; i++) {
					if(!this.num[i]) {
						return true;
					}
				}
				return false;
			}
		},
		methods: {
			myblur() {
				console.log('thhhhhh');
			},
			getTest() {
				var objstr = JSON.stringify({
					pgbbh: this.bbinfo.pgbbh
				});
				this.$http.post(this.hqpgbmx, objstr).then(function(response){
					console.log(response);
					this.questionList = response.body.results;
					if(response.body.results[0].lx == 4) {
						this.$http.post("/baseurl/" + response.body.results[0].jsdz).then(function(response) {
							console.log(response);
							this.pgbinfo = response.body;
						}, function(response) {

						});
					}
				}, function(response) {
					console.log('fail');
				})
			},
			retest() {
					if(this.questionList[0].lx == 4) {
						this.questionList.splice(0,1);
					}
					for (var i = 0; i < this.questionList.length; i++) {
						this.questionListMap.set(this.questionList[i].nbbh, this.questionList[i].mxxh);
						this.mxxhMap.set(this.questionList[i].mxxh, i);
					}
					this.percentrate = 1 / this.questionList.length * 100;
					this.showopt = false;
					this.rflag = false;
					this.showbox = true;
			},
			showRst() {
				console.log(this.bbinfo.bbpgbid);
				var objjjj = JSON.stringify({
		      yhid: myfun.fetch().yhid,
					bbpgbid: this.bbinfo.bbpgbid
		    });
		    this.$http.post(this.getReport,objjjj).then(function(response){
		      console.log(response);
					var REG_BODY = /<body[^>]*>([\s\S]*)<\/body>/;
				  var result = REG_BODY.exec(response.body.result);
					this.reportData = result[1];
					this.showreport = true;
		    }, function(response){
		        console.log('fail');
		    });
			},
			showRecord() {
				var objjjj = JSON.stringify({
		      yhid: myfun.fetch().yhid,
					bbpgbid: this.bbinfo.bbpgbid
		    });
		    this.$http.post(this.bbpgbxq,objjjj).then(function(response){
		      console.log(response);
					this.answerList = response.body.results;
					this.showbox = true;
					this.rflag = true;
					this.subflag = false;
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
							this.showbox = false;
							this.showopt = true;
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
			next(lx) {
				if(lx == 2) {
					var str = this.xhlist.join('#');
					this.answerList.push({
						pgbbh: this.bbinfo.pgbbh,
						mxxh: this.questionList[this.questionIndex].mxxh,
						lx: this.questionList[this.questionIndex].lx,
						tmnr: this.questionList[this.questionIndex].nr,
						xh: str
					})
					this.xhlist.length = 0;
				} else if(lx == 3) {
					for (var i = 0; i < this.num.length; i++) {
						if(this.questionList[this.questionIndex].mxList) {
							var mxxh = this.questionList[this.questionIndex].mxList[i].mxxh;
						} else {
							var mxxh = this.questionList[this.questionIndex].mxxh;
						}
						this.answerList.push({
							pgbbh: this.bbinfo.pgbbh,
							mxxh: mxxh,
							lx: this.questionList[this.questionIndex].lx,
							tmnr: this.questionList[this.questionIndex].nr||this.questionList[this.questionIndex].mxList[i].nr,
							xh: this.num[i]
						})
					}
					this.num.length = 0;
				}
				this.questionIndex++;
			},
			myTest: function(x, index) {
				var lx = this.questionList[this.questionIndex].lx;
				if(this.questionList[this.questionIndex].gz) {
					var gz = this.questionList[this.questionIndex].gz.split("#");
				}
				if(lx == 2) {
					if(this.xhlist.indexOf(x) >= 0) {
						this.xhlist.splice(this.xhlist.indexOf(x),1);
					} else {
						this.xhlist.push(x);
					}
				} else if((lx == 1)||!lx) {
					setTimeout(() => {
						if(this.questionIndex == (this.questionList.length - 1)) {
							this.answerList.push({
								pgbbh: this.bbinfo.pgbbh,
								mxxh: this.questionList[this.questionIndex].mxxh,
								lx: this.questionList[this.questionIndex].lx,
								tmnr: this.questionList[this.questionIndex].nr,
								xxnr: this.questionList[this.questionIndex].xxlist[index].nr,
								xh: x
							});
							this.rflag = true;
							return;
						} else {
							this.answerList.push({
								pgbbh: this.bbinfo.pgbbh,
								mxxh: this.questionList[this.questionIndex].mxxh,
								lx: this.questionList[this.questionIndex].lx,
								tmnr: this.questionList[this.questionIndex].nr,
								xxnr: this.questionList[this.questionIndex].xxlist[index].nr,
								xh: x
							});
							if(gz&&(gz[0] != "")) {
								for (var i = 0; i < gz.length; i++) {
									let arr = gz[i].split("@");
									if(x == arr[0]) {
										if(arr[1] == "end") {
											this.questionIndex = this.questionList.length - 1;
											return;
										} else {
											var skipIndex = this.questionListMap.get(arr[1]);
											this.questionIndex = this.mxxhMap.get(skipIndex);
											return;
										}
									}
								}
								this.questionIndex++;
							} else {
								this.questionIndex++;
							}
							console.log(this.answerList);
						}
					}, 300);
				}
			}
		}
	}
</script>

<style lang="scss" type="text/css" scoped>
	$MAIN_COLOR: #4fc1e9;
	.el-message-box {
		width: 760px;
	}
	.el-input--mini {
		width: 60px;
		margin: 0 5px;
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
					.blankipt {
						width: 50px;
						outline: none;
						border-radius: 5px;
						text-align: center;
						&:focus {
							border: 1px solid #4fc1e9;
						}
					}
					p {
						line-height: 32px;
						font-size: 16px;
					}
				}
				.answer-panel {
					input {
						position: absolute;
						clip: rect(0, 0, 0, 0);
						&:checked ~ .answer-item {
							span {
								background: $MAIN_COLOR;
								color: #fff;
							}
						}
					}
					.answer-item {
						display: block;
						position: relative;
						padding: 0 30px 0 25px;
						height: 48px;
						line-height: 48px;
						font-size: 14px;
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
