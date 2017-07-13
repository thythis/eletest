<template>
	<div>
    <header-bar v-bind:img-data="imgData" txt="我已注册，现在就" path="login" btntxt="登录"></header-bar>
		<div class="reg-form-wrapper">
		  <el-row :gutter="10" type="flex" justify="center">
		    <el-col :xs="24" :sm="20" :md="18" :lg="14" class="bg-white">
		      <div class="form-banner">
		        <div class="fb-outline">
		          <span>注册帐号</span>
		        </div>
		      </div>
		      <el-row class="pt60">
		        <el-col :xs="24" :sm="14" :md="13" :lg="12" class="pl70">
		          <el-form :model="ruleForm2" :rules="rules2" ref="ruleForm2" label-position="right" label-width="100px" class="demo-ruleForm">
		            <el-form-item label="手机号" prop="phone" class="clearfix">
		              <el-input v-model.number="ruleForm2.phone"  placeholder="请输入手机号"></el-input>
		            </el-form-item>
		            <el-form-item label="验证码" prop="msgcode">
		              <el-input v-model.number="ruleForm2.msgcode"  placeholder="请输入短信验证码" class="msg-code"></el-input>
		              <el-button  type="success" :disabled="yzmflag" @click="sendCode">{{yzmtxt | change}}</el-button>
		            </el-form-item>
		            <el-form-item label="密码" prop="pass">
		              <el-input type="password" v-model="ruleForm2.pass" placeholder="请输入密码" auto-complete="off"></el-input>
		            </el-form-item>
		            <el-form-item label="确认密码" prop="checkPass">
		              <el-input type="password" v-model="ruleForm2.checkPass" placeholder="请再次输入密码" auto-complete="off"></el-input>
		            </el-form-item>
		            <el-form-item>
		              <el-checkbox v-model="ruleForm2.checked">我已阅读并同意</el-checkbox><span class="aoi" @click="openProto">《卫宝贝用户许可协议》</span>
		            </el-form-item>
		            <el-form-item>
		              <el-button class="sub-btn" type="primary" size="large" :disabled="subflag" @click="submitForm('ruleForm2')">注册</el-button>
		              <el-button @click="resetForm('ruleForm2')">重置</el-button>
		            </el-form-item>
		          </el-form>
		        </el-col>
		        <el-col :xs="0" :sm="10" :md="11" :lg="12" class="rPanel">
		          <img src="../assets/img/children.png">
              <div class="code-container">
                <ul>
                  <li class="spline">
                    <img src="../assets/img/appcode.jpg" alt="">
                    <h3>卫宝贝APP</h3>
                  </li>
                  <li>
                    <img src="../assets/img/wx.jpg" alt="">
                    <h3>卫宝贝微信号</h3>
                  </li>
                </ul>
              </div>
		        </el-col>
		      </el-row>
		    </el-col>
		  </el-row>
		</div>
		<el-dialog
		  title="卫宝贝用户许可协议"
		  :visible.sync="showproto">
			<div v-html="protoinfo"></div>
		  <span slot="footer" class="dialog-footer">
		    <el-button type="primary" @click="showproto = false">同意</el-button>
		  </span>
		</el-dialog>
	</div>
</template>

<script>
  import desc from '../assets/img/desc.png'
	import {regUrl, getYzm, getProtocol} from '@/config/env'
	import md5 from 'js-md5';
  import HeaderBar from '../components/HeaderBar.vue';
  export default {
    components: {
      HeaderBar,
    },
    data() {
      var checkPhone = (rule, value, callback) => {
        var reg = /1[0-9]{10}/;
        var re = new RegExp(reg);
        if (!value) {
          // new Error('手机号不能为空')
          return callback(this.$message({
            message: '手机号不能为空',
            type: 'error',
            duration: 1000
          }));
        }
        setTimeout(() => {
          if (!Number.isInteger(value)) {
            callback(this.$message({
            message: '请输入数字值',
            type: 'error',
            duration: 1000
          }));
          } else {
						this.yzmflag = false;
            callback();
          }
        }, 300);
      };
      var checkMsg = (rule, value, callback) => {
        if (!value) {
          return callback(this.$message({
            message: '验证码不能为空',
            type: 'error',
            duration: 1000
          }));
        }
        setTimeout(() => {
          if (!Number.isInteger(value)) {
            callback(this.$message({
            message: '请输入数字值',
            type: 'error',
            duration: 1000
          }));
          } else {
            callback();
          }
        }, 1000);
      };
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(this.$message({
            message: '请输入密码',
            type: 'error',
            duration: 1000
          }));
        } else {
          if (this.ruleForm2.checkPass !== '') {
            this.$refs.ruleForm2.validateField('checkPass');
          }
          callback();
        }
      };
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(this.$message({
            message: '请再次输入密码',
            type: 'error',
            duration: 1000
          }));
        } else if (value !== this.ruleForm2.pass) {
          callback(this.$message({
            message: '两次输入密码不一致',
            type: 'error',
            duration: 1000
          }));
        } else {
					this.subflag = false;
          callback();
        }
      };
      return {
        imgData: {
          desc: desc
        },
				regUrl,
				getYzm,
				getProtocol,
				showproto: false,
				subflag: true,
				yzmflag: false,
        txt: 'thy',
				yzmtxt: '获取验证码',
				protoinfo: '',
        ruleForm2: {
          pass: '',
          checkPass: '',
          phone: '',
					dxid: 0,
          msgcode: '',
          checked: true
        },
        rules2: {
          pass: [
            { validator: validatePass, trigger: 'blur' }
          ],
          checkPass: [
            { validator: validatePass2, trigger: 'blur' }
          ],
          phone: [
            { validator: checkPhone, trigger: 'blur' }
          ],
          msgcode: [
            { validator: checkMsg, trigger: 'blur' }
          ]
        }
      };
    },
    methods: {
      submitForm(formName) {
				var encrymm = md5(this.ruleForm2.pass);
				var obj = {
					sjh: this.ruleForm2.phone,
					lx: 4,
					mm: encrymm,
					dxid: this.ruleForm2.dxid,
					yzm: this.ruleForm2.msgcode
				}
				var objstr = JSON.stringify(obj);

				this.$http.post(this.regUrl, objstr).then(function(response){
						console.log(response);
						if(response.body.code == 1) {
							this.$confirm('注册成功！', '提示', {
								confirmButtonText: '确定',
								type: 'success'
							}).then(() => {
                this.$router.push('/login');
              })
						} else {
							this.$confirm(response.body.message, '提示', {
			          confirmButtonText: '确定',
			          type: 'warning'
			        })
						}
				}, function(response){
						console.log('fail');
				});

        // this.$refs[formName].validate((valid) => {
        //   if (valid) {
        //     this.subflag = false;
        //   }
        // });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      openProto() {
				this.$http.get(this.getProtocol).then(function(response){
						console.log(response);
						this.protoinfo = response.body;
				}, function(response){
						console.log('fail');
				});
				this.showproto = true;
      },
      sendCode() {
				var obj = {
					sjh: this.ruleForm2.phone
				}
				var objstr = JSON.stringify(obj);

				this.$http.post(this.getYzm, objstr).then(function(response){
						console.log(response);
						if(response.body.code == 1) {
							this.ruleForm2.dxid = response.body.dxid;
							this.$message({
							  message: '验证码已发送',
							  type: 'info',
							  duration: 2000
							});
							this.yzmflag = true;
							this.yzmtxt = 10;
							let time = setInterval(() => {
								this.yzmtxt--;
			          if(this.yzmtxt == 0) {
									this.yzmtxt = '重新发送';
									this.yzmflag = false;
									clearInterval(time);
								}
			        }, 1000);
						} else {
							this.$message({
							  message: response.body.message,
							  type: 'error',
							  duration: 2000
							})
						}
				}, function(response){
						console.log('fail');
				});
      }
    },
		filters: {
			change(value) {
				 if(!value) return "";
	       if(!isNaN(value)){
						return `重新发送(${value}S)`;
	       }else{
	           return value;
	       }
			}
		}
  }
</script>

<style scoped>

  .reg-form-wrapper {
    padding-top: 50px;
    padding-bottom: 70px;
    background: url(../assets/img/reg_back.png) no-repeat;
    background-size: cover;
  }

  .reg-form-wrapper .form-banner {
    padding-left: 40px;
  }

  .reg-form-wrapper .form-banner .fb-outline {
    height: 60px;
    border-bottom: 1px solid #f4f4f4;
  }

  .reg-form-wrapper .form-banner .fb-outline span {
    display: inline-block;
    height: 59px;
    line-height: 59px;
    border-bottom: 2px solid #4fc1e9;
    font-weight: 400;
    font-size: 22px;
    color: #333;
  }

  .pt60 {
    padding-top: 60px;
    padding-bottom: 100px;
  }

  .pl70 {
    padding-left: 70px;
  }

  .reg-form-wrapper .demo-ruleForm .el-input {
    width: 90%;
  }

  .reg-form-wrapper .demo-ruleForm .el-input.msg-code {
    width: 50%;
  }

  .reg-form-wrapper .el-form-item {
    margin-bottom: 24px;
  }

  .reg-form-wrapper .el-form-item .aoi {
    cursor: pointer;
    color: #4fc1e9;
  }

  .rPanel {
    text-align: center;
  }

  ul, ul li {
    margin: 0;
    padding: 0;
    list-style: none;
  }

  .rPanel .code-container {
    border: 2px dashed #f9f9f9;
    width: 300px;
    margin: 0 auto;
    padding: 25px 0;
  }

  .rPanel .code-container li {
    display: inline-block;
    width: 140px;
  }

  .rPanel .code-container li.spline {
    border-right: 1px solid #f1f1f1;
  }

  .rPanel .code-container li h3 {
    font-weight: normal;
    font-size: 1rem;
  }

  .el-form-item__error {
    padding-top: 6px;
  }

  .el-form-item__error:before {
    content: '!';
    display: inline-block;
    border-radius: 50%;
    width: 14px;
    height: 14px;
    color: #fff;
    background: red;
    text-align: center;
    display: inline-block;
    margin-right: 3px;
    vertical-align: middle;
    margin-top: -3px;
    font-weight: bold;
  }

  .bg-white {
    background: #fff;
		opacity: 0.85;
  }

  .sub-btn {
    width: 124px;
  }

</style>
