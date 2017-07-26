<template>
	<div>
		<div class="survey-wrapper">
			<div class="info" v-if="showpgbintro">
				<div v-if="!showjdxx">
					<h3>评测说明</h3>
					<div class="pgb-desc" v-html="pgbinfo"></div>
					<div class="tys-bar" v-if="bbinfo.zqtys">
						<el-checkbox v-model="checkedtys">我已阅读并同意</el-checkbox><span class="aoi" @click="openProto">知情同意书</span>
					</div>
				</div>
				<transition name="el-fade-in">
					<div v-if="showjdxx" class="jdxx-panel">
						<h3>请选择街道信息</h3>
						<el-select v-model="selectedJd" @change="jdChange(1)" placeholder="请选择街道">
					    <el-option
					      v-for="item in jdOptions"
					      :key="item.value"
					      :label="item.label"
					      :value="item.value">
					    </el-option>
					  </el-select>

						<el-select v-model="selectedYey" :disabled="yeyflag" @change="jdChange(2)" placeholder="请选择幼儿园">
					    <el-option
					      v-for="item in yeyOptions"
					      :key="item.value"
					      :label="item.label"
					      :value="item.value">
					    </el-option>
					  </el-select>

						<el-select
							v-model="selectedBj"
							:disabled="bjflag"
							filterable
							allow-create
							placeholder="请选择或填写街道班级">
					    <el-option
					      v-for="item in bjOptions"
					      :key="item.value"
					      :label="item.label"
					      :value="item.value">
					    </el-option>
					  </el-select>

						<el-button type="primary" size="large" @click="selectF">下一步</el-button>
					</div>
				</transition>
			</div>
			<div class="opt-panel" v-if="showopt">
				<el-button type="primary" :disabled="!checkedtys" @click="retest" :loading="playflag">{{this.bbinfo.zt==2?'开始测评':'重新测评'}}</el-button>
				<el-button type="success" @click="showRst" v-if="ztflag" :loading="playflag">查看报告</el-button>
				<el-button type="warning" @click="showRecord" v-if="jlflag" :loading="playflag">查看记录</el-button>
			</div>
			<!-- 独占模式
			<el-switch
			  v-model="monomode"
			  on-text="on"
			  off-text="">
			</el-switch> -->
			<el-dialog
				size="tiny"
				:before-close="goBack"
				:close-on-press-escape="false"
				:close-on-click-modal="false"
			  :visible.sync="monomode">
				<div class="survey-box" v-if="showbox">
					<div class="box-header">
						<h2 class="title">{{bbinfo.mc}}</h2>
					</div>
					<div class="survey-content fmlx-panel" v-if="showfm">
						<div class="question-panel">
							<p>家庭类型</p>
						</div>
						<div class="answer-panel">
							<div v-for="(item,index) in fmlist">
								<input type="radio" :value="item.xh" name="xx" :id="'c'+item.xh"  v-model="fmlx">
								<label class="answer-item"   @click.prevent="addFmlx(item.xh, index)" :for="'c'+item.xh">
									<span>{{item.xh}}</span>
									<p>{{item.nr}}</p>
								</label>
							</div>
							<el-button :disabled="fmlx?false:true" type="primary" size="large" @click="fire">提交</el-button>
						</div>
					</div>
					<div class="survey-content" v-if="qflag">
						<scroller
						class="page-content">
						<p class="ps">(本测试{{questionList.length}}道题，系统自动跳转，专业心理指导。)</p>
						<div class="progress-bar">
							<span><strong>{{questionIndex + 1}}</strong>/{{questionList.length}}</span>
							<!-- <el-progress :percentage="percent" :show-text="false"></el-progress> -->
							<el-slider :max="questionList.length" :show-tooltip="false" v-model="questionIndex"></el-slider>
						</div>
						<div class="intr-page" v-if="questionList[questionIndex].lx==4">
							<div v-html="testhtml"></div>
							<el-button  type="primary" @click="next(questionList[questionIndex].lx)" size="large">继续</el-button>
						</div>
						<div class="question-panel" v-if="!(questionList[questionIndex].lx==4)">
							<el-form>
								<p>{{questionList[questionIndex].nbbh||questionList[questionIndex].mxxh}}、
									<span v-if="(questionList[questionIndex].lx==1)||(questionList[questionIndex].lx==2)||(!questionList[questionIndex].lx)">{{questionList[questionIndex].nr}}</span>
									<span v-for="(item,index) in processNr" v-if="questionList[questionIndex].lx==3" >
										{{item}}
										<!-- <el-tooltip content="123" placement="bottom" effect="light"> -->
										<!-- <el-tooltip :disabled="showtip[index]" :content="gzinfo[index]" placement="bottom" effect="light"> -->
										<input class="blankipt" @change="blankgz(index)" v-chkdata="{index: index}"  v-if="index<(processNr.length-1)" placeholder="填写" ref="iptitem" v-model="num[index]" />
										<!-- </el-tooltip> -->
										<!-- <el-popover
										ref="popover1"
										placement="bottom"
										trigger="click"
										content="20-1111">
									</el-popover> -->
									<!-- <input  v-popover:popover1 type="text" name="" value="" placeholder="asdflksajdflja"> -->
								</span>
							</p>

							<el-button :disabled="nextflag" :autofocus="nextflag" ref="nextbtn" v-if="(questionList[questionIndex].lx==3)||(questionList[questionIndex].lx==2)" type="primary" @click="next(questionList[questionIndex].lx)">下一题</el-button>
						</el-form>
					</div>
					<div class="answer-panel" v-if="(questionList[questionIndex].lx==null)||(questionList[questionIndex].lx==1)||(questionList[questionIndex].lx==2)">
						<div v-for="(item,index) in questionList[questionIndex].xxlist">
							<input type="checkbox" :value="item.xh" name="xx" :id="'c'+item.xh"  v-model="xhlist">
							<label class="answer-item"   @click.prevent="myTest(item.xh, index)" :for="'c'+item.xh">
								<span>{{item.xh}}</span>
								<p>{{item.nr}}</p>
							</label>
						</div>
					</div>
				</scroller>
			</div>
			<div class="resoult-panel" v-if="rflag">
				<scroller
				:class="[{ 'page-content': subflag, 'page-content nobtn': !subflag }]">
				<div class="list-item" v-for="(item, index) in answerList">
					<span class="qbh">{{item.nbbh||item.mxxh}}</span>
					<span class="qnr">{{item.tmnr||item.nr}}</span>
					<span class="answer">{{item.lx?(item.lx==1?item.xxnr:item.xh):item.xxnr}}</span>
				</div>
			</scroller>
			<button class="sub-btn" v-if="questionList[0].bbpgbid!=null?!subflag:subflag" @click="subsurvey" v-loading.fullscreen.lock="fullscreenLoading">
				提交评测
			</button>
		</div>
	</div>

			</el-dialog>
		</div>
		<el-dialog
		  title="提示"
		  :visible.sync="showreport">
		  <div v-html="reportData">
		  	{{reportData}}
		  </div>
		  <span slot="footer" class="dialog-footer">
		    <el-button @click="showreport = false">取 消</el-button>
		    <el-button type="primary" @click="handleConf">确 定</el-button>
		  </span>
		</el-dialog>

	</div>
</template>

<script>
	import {hqpgbmx, getjdxx, getyeyxx, getbjxx, getReport,bbpgbxq,savePgb} from '@/config/env'
	import myfun from '../assets/js/test.js'
	export default {
		props: {
			bbinfo: {}
		},
		mounted() {
			var synld = this.bbinfo.synld.split('-');
			var bbage = myfun.fetch().bbList[this.$store.state.count].csrq.split('-');
			var min = parseInt(synld[0]);
			var max = parseInt(synld[1]);
			var bbyear = parseInt(bbage[0]);
			var bbMon = parseInt(bbage[1]);
			var d = new Date();
			var nowYear = d.getFullYear();
			var nowMonth = d.getMonth() + 1;
			bbMon = (bbMon > nowMonth) ? (bbMon - nowMonth) : (nowMonth - bbMon);
			var bbyl = (nowYear - bbyear) * 12 + bbMon;
			if((min <= bbyl) && (bbyl <= max)) {
				this.testflag = true;
			} else {
				this.testflag = false;
			}
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
						if(binding.value.index == 0) {
							el.focus();
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
				getjdxx,
				getyeyxx,
				getbjxx,
				testflag: false,
				checkedtys: true,
				ztflag: false,
				subflag: true,
				jlflag: true,
				playflag: true,
				showintr: false,
				fullscreenLoading: false,
				reportData: "",
				pgbinfo: "",
				testhtml: "",
				monomode: false,
				showreport: false,
				showbox: false,
				showopt: true,
				showpgbintro: true,
				showjdxx: false,
				showfm: false,
				qflag: true,
				nextflag: true,
				rflag: false,
				yeyflag: true,
				bjflag: true,
				showtip: [],
				questionList: [],
				questionListMap: new Map(),
				mxxhMap: new Map(),
				questionIndex: 0,
				percentrate: 0,
				choice: "",
				blanks: "___",
				num: [],
				gzinfo: [],
				answerList: [],
				xhlist: [],
				fmlist: [
					{
						xh: "1",
						nr: "母亲"
					},{
						xh: "2",
						nr: "父亲"
					},{
						xh: "3",
						nr: "其他"
					},{
						xh: "4",
						nr: "母亲(单亲)"
					},{
						xh: "5",
						nr: "父亲(单亲)"
					}
				],
				fmlx: '',
				jdOptions: [],
				yeyOptions: [],
				bjOptions: [],
				selectedJd: '',
				selectedYey: '',
				selectedBj: '',
				mrjdxx: ''
			}
		},
		computed: {
			percent: function() {
				return this.questionIndex * this.percentrate;
			},
			aboutindex: function() {
				return this.questionIndex;
			},
			processNr: function() {
				if(this.questionList[this.questionIndex].mxList) {
					var arr = [];
					for (var i = 0; i < this.questionList[this.questionIndex].mxList.length; i++) {
						arr.push(this.questionList[this.questionIndex].mxList[i].nr);
						if(this.questionList[this.questionIndex].mxList[i].gz) {
							this.showtip[i] = false;
							this.gzinfo[i] = this.questionList[this.questionIndex].mxList[i].gz;
						} else {
							this.showtip[i] = true;
						}
					}
					arr = arr.join('').split("XXX");
					this.num.length = arr.length - 1;
					return arr;
				}
				if(this.questionList[this.questionIndex].gz) {
					this.showtip[0] = false;
					this.gzinfo[0] = this.questionList[this.questionIndex].gz;
				} else {
					this.showtip[0] = true;
				}
				this.num.length = 1;
				return this.questionList[this.questionIndex].nr.split("XXX");
			},
			descinfo: function() {
				if(this.questionList[this.questionIndex].lx == 4) {
					this.$http.post("/getIntr/" + this.questionList[this.questionIndex].jsdz).then(function(response) {
						console.log(response);
						return response.body;
					}, function(response) {

					});
				}
			}
		},
		watch: {
			aboutindex(val) {
				this.num.length = 0;
				this.gzinfo.length = 0;
				this.nextflag = true;
			}
		},
		methods: {
			openProto() {
				this.$http.get("/getIntr/" + this.bbinfo.zqtys).then(function(response){
						console.log(response);
						var REG_BODY = /<body[^>]*>([\s\S]*)<\/body>/;
					  var result = REG_BODY.exec(response.body);
						this.reportData = result[1];
						this.showreport = true;
				}, function(response){
						console.log('fail');
				});
			},
			handleConf() {
				if(this.bbinfo.zqtys) {
					this.checkedtys = true;
				}
				this.showreport = false;
			},
			blankgz(index) {
				if(this.gzinfo[index]) {
					let arr = this.gzinfo[index].split('-');
					let num = parseInt(this.num[index]);
					arr[0] = parseInt(arr[0]);
					arr[1] = parseInt(arr[1]);
					// (!this.num[index].match(/^\d+$/)) ||
					if((!this.num[index].match(/^\d+$/)) || ((num < arr[0]) || (num > arr[1]))) {
						this.$refs.iptitem[index].value = "";
						this.num[index] = '';
						this.$refs.iptitem[index].focus();
						this.$message.error('输入格式：' + this.gzinfo[index]);
					} else {
						if(index < (this.num.length - 1)) {
							this.$refs.iptitem[index + 1].focus();
						} else {
							this.$refs.iptitem[index].blur();
						}
					}
				} else {
					if(index < (this.num.length - 1)) {
						this.$refs.iptitem[index + 1].focus();
					} else {
						this.$refs.iptitem[index].blur();
					}
				}
				for (var i = 0; i < this.num.length; i++) {
					if((this.num[i] == "")||(!this.num[i])) {
							this.nextflag = true;
							return;
					}
				}
				this.nextflag = false;
			},
			goBack() {
				this.$confirm('确认返回？', '提示', {
	        confirmButtonText: '确定',
	        type: 'success'
	      }).then(() => {
					this.qflag = true;
					this.rflag = false;
					this.answerList = [];
					this.showbox = false;
					this.monomode = false;
	      })
			},
			getTest() {
				var objstr = JSON.stringify({
					pgbbh: this.bbinfo.pgbbh
				});
				this.$http.post(this.hqpgbmx, objstr).then(function(response){
					this.playflag = false;
					console.log(response);
					this.questionList = response.body.results;
					if(response.body.results[0].lx == 4) {
						this.$http.post("/getIntr/" + response.body.results[0].jsdz).then(function(response) {
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
				if(!this.testflag) {
					this.$confirm('宝宝不在评测年龄范围内！', '提示', {
            confirmButtonText: '确定',
            showCancelButton: false,
            type: 'warning'
          })
				} else {
					if(this.bbinfo.zqtys) {
						if(this.bbinfo.qzpgbbh && (this.bbinfo.qzpgbbh == "lh_jbxx")) {
							if(this.questionList[0].lx == 4) {
								this.questionList.splice(0,1);
							}
							for (var i = 0; i < this.questionList.length; i++) {
								this.questionListMap.set(this.questionList[i].nbbh, this.questionList[i].mxxh);
								this.mxxhMap.set(this.questionList[i].mxxh, i);
							}
							this.percentrate = 1 / this.questionList.length * 100;
							// this.showpgbintro = false;
							// this.showopt = false;
							this.showbox = true;
							this.monomode = true;
						} else {
							var objstr = JSON.stringify({
								yhid: myfun.fetch().yhid,
								bbid: myfun.fetch().bbList[this.$store.state.count].bbid,
								token: myfun.fetch().token
							});

							this.$http.post(this.getjdxx, objstr).then(function(response){
								console.log(response);
								for (var i = 0; i < response.body.results[0].jdList.length; i++) {
									this.jdOptions.push({
										value: response.body.results[0].jdList[i].jdid,
										label: response.body.results[0].jdList[i].jdmc,
									})
								}
								if(response.body.results[0].mrjdxx) {
									this.yeyOptions.push({
										value: response.body.results[0].mrjdxx.jdyeyid,
										label: response.body.results[0].mrjdxx.jdyeymc
									});
									this.bjOptions.push({
										value: response.body.results[0].mrjdxx.jdyeybjid,
										label: response.body.results[0].mrjdxx.jdyeybjmc
									});
									this.selectedJd = response.body.results[0].mrjdxx.jdid;
									this.selectedYey = response.body.results[0].mrjdxx.jdyeyid;
									this.selectedBj = response.body.results[0].mrjdxx.jdyeybjid;
								} else {

								}
								this.showopt = false;
								this.rflag = false;
								this.showjdxx = true;
							}, function(response) {
								console.log('fail');
							})
						}
					} else {
						if(this.questionList[0].lx == 4) {
							this.questionList.splice(0,1);
						}
						for (var i = 0; i < this.questionList.length; i++) {
							this.questionListMap.set(this.questionList[i].nbbh, this.questionList[i].mxxh);
							this.mxxhMap.set(this.questionList[i].mxxh, i);
						}
						this.percentrate = 1 / this.questionList.length * 100;
						// this.showpgbintro = false;
						// this.showopt = false;
						this.rflag = false;
						this.showbox = true;
						this.monomode = true;
					}
				}
			},
			selectF() {
				this.rflag = false;
				this.qflag = false;
				this.showpgbintro = false;
				this.showfm = true;
				this.showbox = true;
				this.monomode = true;
			},
			fire() {
				if(isNaN(this.selectedBj)) {
					var objstr = JSON.stringify({
						pgbbh: this.bbinfo.pgbbh,
						fmlx: this.fmlx,
						jdid: this.selectedJd,
						jdyeyid: this.selectedYey,
						qtbj: this.selectedBj
					});
				} else {
					var objstr = JSON.stringify({
						pgbbh: this.bbinfo.pgbbh,
						fmlx: this.fmlx,
						jdid: this.selectedJd,
						jdyeyid: this.selectedYey,
						jdyeybjid: this.selectedBj
					});
				}

				this.$http.post(this.hqpgbmx, objstr).then(function(response){
					console.log(response);
					if(response.body.code == "1") {
						this.questionList = response.body.results;
						if(this.questionList[0].lx == 4) {
							this.$http.post("/getIntr/" + this.questionList[0].jsdz).then(function(response) {
								console.log(response);
								this.testhtml = response.body;
							}, function(response) {

							});
						}
						for (var i = 0; i < this.questionList.length; i++) {
							this.questionListMap.set(this.questionList[i].nbbh, this.questionList[i].mxxh);
							this.mxxhMap.set(this.questionList[i].mxxh, i);
						}
						this.percentrate = 1 / this.questionList.length * 100;
						this.showfm = false;
						this.qflag = true;
					}
				}, function(response) {
					console.log('fail');
				})
			},
			addFmlx(xh, index) {
				this.fmlx = xh;
			},
			jdChange(index) {
				if(index == 1) {
					this.selectedYey = '';
					this.selectedBj = '';
					this.yeyOptions.length = 0;
					this.bjOptions.length = 0;
					this.yeyflag = true;
					this.bjflag = true;
					var objstr = JSON.stringify({
						yhid: myfun.fetch().yhid,
						jdid: this.selectedJd,
						bbid: myfun.fetch().bbList[this.$store.state.count].bbid,
						token: myfun.fetch().token
					});

					this.$http.post(this.getyeyxx, objstr).then(function(response){
						console.log(response);
						if(response.body.result.length > 0) {
							for (var i = 0; i < response.body.result.length; i++) {
								this.yeyOptions.push({
									value: response.body.result[i].jdyeyid,
									label: response.body.result[i].jdyeymc
								})
							}
							this.yeyflag = false;
						}
					}, function(response) {
						console.log('fail');
					})
				} else if(index == 2) {
					this.selectedBj = '';
					this.bjOptions.length = 0;
					this.bjflag = true;
					var objstr = JSON.stringify({
						yhid: myfun.fetch().yhid,
						jdyeyid: this.selectedYey,
						bbid: myfun.fetch().bbList[this.$store.state.count].bbid,
						token: myfun.fetch().token
					});

					this.$http.post(this.getbjxx, objstr).then(function(response){
						console.log(response);
						if(response.body.result.length > 0) {
							for (var i = 0; i < response.body.result.length; i++) {
								this.bjOptions.push({
									value: response.body.result[i].jdyeybjid,
									label: response.body.result[i].jdyeybjmc
								})
							}
							this.bjflag = false;
						}
					}, function(response) {
						console.log('fail');
					})
				}

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
					this.monomode = true;
					this.qflag = false;
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
					bbid: myfun.fetch().bbList[this.$store.state.count].bbid,
		      pgbbh: this.bbinfo.pgbbh,
					kh: this.bbinfo.kh,
					fmlx: this.fmlx,
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
							showCancelButton: false,
		          type: 'success'
		        }).then(() => {
							this.showbox = false;
							this.monomode = false;
							this.showpgbintro = true;
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
			show(ev) {
				if(ev.keyCode == 13) {
					console.log('按回车了');
				}
			},
			next(lx) {
				if(lx == 2) {
					var str = this.xhlist.join('#');
					this.answerList.push({
						pgbbh: this.bbinfo.pgbbh,
						mxxh: this.questionList[this.questionIndex].mxxh,
						nbbh: this.questionList[this.questionIndex].nbbh,
						lx: this.questionList[this.questionIndex].lx,
						tmnr: this.questionList[this.questionIndex].nr,
						xh: str
					})
					this.xhlist.length = 0;
				} else if(lx == 3) {
					for (var i = 0; i < this.num.length; i++) {
						if(this.questionList[this.questionIndex].mxList) {
							var mxxh = this.questionList[this.questionIndex].mxList[i].mxxh;
							var nbbh = this.questionList[this.questionIndex].mxList[i].nbbh;
						} else {
							var mxxh = this.questionList[this.questionIndex].mxxh;
							var nbbh = this.questionList[this.questionIndex].nbbh;
						}
						if((this.bbinfo.pgbbh == "lh_jbxx") && (nbbh == "A12")) {
							this.questionList[this.questionIndex + 1].gz = this.num[i] + "-" + this.num[i];
							console.log(this.questionList[this.questionIndex + 1].gz);
						}
						this.answerList.push({
							pgbbh: this.bbinfo.pgbbh,
							mxxh: mxxh,
							nbbh: nbbh,
							lx: this.questionList[this.questionIndex].lx,
							tmnr: this.questionList[this.questionIndex].nr||this.questionList[this.questionIndex].mxList[i].nr,
							xh: this.num[i]
						})
					}
				}
				if(this.questionList[this.questionIndex + 1].lx == 4) {
					this.$http.post("/getIntr/" + this.questionList[this.questionIndex + 1].jsdz).then(function(response) {
						console.log(response);
						this.testhtml = response.body;
					}, function(response) {

					});
				}
				this.questionIndex++;
				this.nextflag = true;
				this.gzinfo.length = 0;
				this.num.length = 0;
			},
			myTest: function(x, index) {
				var lx = this.questionList[this.questionIndex].lx;
				if(this.questionList[this.questionIndex].gz) {
					var gz = this.questionList[this.questionIndex].gz.split("#");
				}
				if(lx == 2) {
					if(gz&&(gz[0] != "")) {
						var arr = gz[0].split("-");
						arr[0] = parseInt(arr[0]);
						arr[1] = parseInt(arr[1]);
					}
					if(this.xhlist.indexOf(x) >= 0) {
						this.xhlist.splice(this.xhlist.indexOf(x),1);
					} else {
						if(arr) {
							if(this.xhlist.length < arr[1]) {
								this.xhlist.push(x);
							}
						} else {
							this.xhlist.push(x);
						}
					}
					if(this.xhlist.length == 0) {
						this.nextflag = true;
					} else{
						if(arr&&(arr[0] == arr[1])&&(this.xhlist.length != arr[1])) {
							this.nextflag = true;
						} else {
							this.nextflag = false;
						}
					}
				} else if((lx == 1)||!lx) {
					setTimeout(() => {
						if(this.questionIndex == (this.questionList.length - 1)) {
							this.answerList.push({
								pgbbh: this.bbinfo.pgbbh,
								mxxh: this.questionList[this.questionIndex].mxxh,
								nbbh: this.questionList[this.questionIndex].nbbh,
								lx: this.questionList[this.questionIndex].lx,
								tmnr: this.questionList[this.questionIndex].nr,
								xxnr: this.questionList[this.questionIndex].xxlist[index].nr,
								xh: x
							});
							this.qflag = false;
							this.subflag = true;
							this.rflag = true;
							this.gzinfo.length = 0;
							return;
						} else {
							this.answerList.push({
								pgbbh: this.bbinfo.pgbbh,
								mxxh: this.questionList[this.questionIndex].mxxh,
								nbbh: this.questionList[this.questionIndex].nbbh,
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
											this.gzinfo.length = 0;
											return;
										} else {
											var skipIndex = this.questionListMap.get(arr[1]);
											this.questionIndex = this.mxxhMap.get(skipIndex);
											this.gzinfo.length = 0;
											return;
										}
									}
								}
								this.questionIndex++;
							} else {
								if(this.questionList[this.questionIndex + 1].lx == 4) {
									this.$http.post("/getIntr/" + this.questionList[this.questionIndex + 1].jsdz).then(function(response) {
										console.log(response);
										this.testhtml = response.body;
									}, function(response) {

									});
								}
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
	.el-popover {
		min-width: 50px!important;
		text-align: center;
	}
	.el-message-box {
		width: 760px;
	}
	.el-input--mini {
		width: 60px;
		margin: 0 5px;
	}
	.survey-wrapper {
		.el-dialog--tiny {
			width: 25%!important;
		}
		.info {
			width: 80%;
			margin: 10px auto;
			padding: 0 30px 30px 30px;
			background: #faf6f7;
			border-radius: 5px;
			color: #8c8889;
			.jdxx-panel {
				text-align: center;
			}
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
			.tys-bar {
				text-align: right;
				.aoi {
					cursor: pointer;
					color: #4fc1e9;
					font-size: 14px;
				}
			}
		}
		.opt-panel {
			display: flex;
			justify-content: center;
			margin-bottom: 20px;
		}
		.survey-box {
			position: relative;
			margin: 0 auto 0 auto;
			height: 670px;
			box-shadow: 3px 3px 3px #ededed;
			&.monobox {
				width: 100%;
				max-height: 670px;
				margin-bottom: 0;
			}
			.box-header {
				height: 60px;
				line-height: 60px;
				background: $MAIN_COLOR;
				.title {
					color: #fff;
					font-size: 22px;
					text-align: center;
					font-weight: normal;
					overflow: hidden;
					width: 80%;
					white-space: nowrap;
					margin: 0 auto;
					text-overflow: ellipsis;
				}
			}
			.resoult-panel {
				box-sizing: border-box;
				border: 1px solid #eee;
				padding: 0 20px;
				padding-bottom: 52px;
				height: 610px;
				overflow-y: auto;
				.page-content {
					width: 90%;
					height: 554px;
					padding: 0 5%;
					&.nobtn {
						height: 610px;
					}
				}
				.list-item {
					padding: 10px 0;
					display: flex;
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
						width: 70%;
						height: 28px;
						line-height: 28px;
						overflow: hidden;
						text-overflow:ellipsis;
						white-space: nowrap;
					}
					.answer {
						display: inline-block;
						width: 40px;
						height: 28px;
						line-height: 28px;
						margin-left: 20px;
						overflow: hidden;
						text-overflow:ellipsis;
						white-space: nowrap;
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
			.page-content {
				top: 60px;
				height: 610px;
			}
			.survey-content {
				display: flex;
				flex-direction: column;
				height: 610px;
				padding-top: 10px;
				box-sizing: border-box;
				border: 1px solid #eee;
				p {
					text-indent: 0;
				}
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
			    display: flex;          /* 新版本语法: Opera 12.1, Firefox 22+ */
					span {
						margin-right: 16px;
						font-size: 12px;
						strong {
							font-size: 20px;
							color: $MAIN_COLOR;
						}
					}
					.el-slider {
						-webkit-flex: 1;        /* Chrome */
					  -ms-flex: 1;             /* IE 10 */
					  flex: 1;                /* NEW, Spec - Opera 12.1, Firefox 20+ */
					  -webkit-box-flex: 1;     /* OLD - iOS 6-, Safari 3.1-6 */
					  -moz-box-flex: 1;       /* OLD - Firefox 19- */
						display: flex;
						align-items: center;
					}
				}
				.intr-page {
					padding: 0 30px 0 25px;
					display: flex;
					flex-direction: column;
					justify-content: center;
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
				&.fmlx-panel .answer-panel {
					position: relative;
					.el-button--large {
						position: absolute;
						bottom: 0;
						width: 100%;
						height: 50px;
					}
				}
				.answer-panel {
					flex: 1;
					overflow-y: auto;
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
						display: flex;
						align-items: center;
						position: relative;
						padding: 14px 30px 14px 25px;
						font-size: 14px;
						overflow: hidden;
						text-overflow: ellipsis;
						white-space: nowrap;
						&:hover {
							cursor: pointer;
							::after {
								content: '';
								width: 100%;
								height: 100%;
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
							flex-shrink: 0;
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
						p {
							// display: inline-block;
							line-height: 24px;
							white-space: normal;
						}
					}
				}
			}
		}
	}

</style>
