<template>
	<div>
    <header-bar v-bind:img-data="imgData" txt="我还没注册，现在就" path="reg" btntxt="注册"></header-bar>
		<div class="log-form-wrapper">
		  <el-row type="flex" justify="center">
        <el-col :xs="16" :sm="14" :md="14" :lg="10">
          <div class="Linfo">
            <div class="bac_desc"></div>
            <div class="code-container">
              <ul>
                <li class="spline">
                  <img src="../assets/img/appcode.jpg" alt="">
                  <p class="pt18">极速下载</p>
                  <p>卫宝贝APP</p>
                </li>
                <li>
                  <img src="../assets/img/wx.jpg" alt="">
                  <p class="pt18">轻松关注</p>
                  <p>卫宝贝微信号</p>
                </li>
              </ul>
            </div>
          </div>
        </el-col>
		    <el-col :xs="7" :sm="6" :md="6" :lg="4" class="bg-white">
		      <div class="form-banner">
		        <div class="fb-outline">
		          <span>用户登录</span>
		        </div>
		      </div>
	          <el-form :model="ruleForm2" :rules="rules2" ref="ruleForm2" class="demo-ruleForm">
	              <el-input :autofocus="!fullscreenLoading" v-model.number="ruleForm2.phone"  placeholder="请输入手机号">
	              	<template slot="prepend"><i class="iconfont icon-person"></i></template>
	              </el-input>

	              <el-input type="password" v-model="ruleForm2.pass"  placeholder="请输入密码">
	              	<template slot="prepend"><i class="iconfont icon-lock"></i></template>
	              </el-input>
								<div class="forgetmm">
									<router-link to="forget">忘记密码</router-link>
								</div>
	              <el-button type="success" size="large" class="log-btn" @click="login" v-loading.fullscreen.lock="fullscreenLoading">登录</el-button>
	          </el-form>
		    </el-col>
		  </el-row>
		</div>
	</div>
</template>

<script>
	import {loginUrl} from '@/config/env'
  import myfun from '../assets/js/test.js'
	import md5 from 'js-md5';
  import desc from '../assets/img/desc2.png'
  import HeaderBar from '../components/HeaderBar.vue';
  export default {
    components: {
      HeaderBar,
    },
		mounted() {
			var that = this;
		},
    data() {
      var checkPhone = (rule, value, callback) => {
        var reg = /1[0-9]{10}/;
        var re = new RegExp(reg);
        if (!value) {
          console.log('thy');
          return callback(new Error('手机号不能为空'));
        }
        setTimeout(() => {
          if (!Number.isInteger(value)) {
            callback(new Error('请输入数字值'));
          } else {
            if (re.test(value)) {
              callback(new Error('必须年满18岁'));
            } else {
              callback();
            }
          }
        }, 1000);
      };
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          callback();
        }
      };
      return {
				loginUrl,
        fullscreenLoading: false,
        imgData: {
          desc: desc
        },
        ruleForm2: {
          pass: '',
          phone: '',
          checked: true
        },
        rules2: {
          pass: [
            { validator: validatePass, trigger: 'blur' }
          ],
          phone: [
            { validator: checkPhone, trigger: 'blur' }
          ]
        }
      };
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!');
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      login() {
        this.fullscreenLoading = true;

				var encrymm = md5(this.ruleForm2.pass);
				var obj = {
					sjh: this.ruleForm2.phone,
	       	mm: encrymm,
	       	lx: 4
				}
				var objstr = JSON.stringify(obj);
				//18664378720
				this.$http.post(this.loginUrl,objstr).then(function(response){
						this.fullscreenLoading = false;
						console.log(response);
						if(response.body.code == "1") {
							var items = {
								yhsjh: this.ruleForm2.phone,
								yhid: response.body.yhid,
								token: response.body.token,
								mm: response.body.mm,
								currenbaby: 0,
								bbList: response.body.bbList
							}
							myfun.save(items);
							myfun.loginFlag(true);
							this.$router.push({path:'/bbmana'});
						} else {
							this.$notify({
								title: '登录失败！',
								message: response.body.message,
								type: 'warning'
							});
						}
				}, function(response){
						console.log('fail');
				});

      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      goreg() {
      	this.$router.push({path:'/reg'})
      }
    }
  }
</script>

<style scope>
@import '../assets/css/iconfont.css';

  ul, ul li {
    margin: 0;
    padding: 0;
    list-style: none;
  }

  .log-form-wrapper {
    padding-top: 60px;
    padding-bottom: 125px;
    background: url(../assets/img/login_bac.png) no-repeat;
    background-size: cover;
  }

  .log-form-wrapper .Linfo {
    /*padding: 38px 0 0 52px;*/
  }

  .log-form-wrapper .Linfo .bac_desc {
    width: 430px;
    height: 110px;
    background: url(../assets/img/bac_desc.png) no-repeat;
  }

  .log-form-wrapper .Linfo .code-container {
    border: 1px dashed #e2eceb;
    width: 399px;
		opacity: 0.75;
    margin-top: 15px;
    margin-left: 5px;
    padding-top: 30px;
    padding-bottom: 20px;
    background: #fff;
  }

	.log-form-wrapper .Linfo .code-container ul {
		display: flex;
	}

  .log-form-wrapper .Linfo .code-container li {
    display: inline-block;
    width: 100px;
    background: #fff;
    padding: 0 48px;
  }

  .log-form-wrapper .Linfo .code-container li.spline {
    border-right: 1px solid #f1f1f1;
  }

  .log-form-wrapper .Linfo .code-container li p {
    margin: 0;
    text-align: center;
    font-size: 1rem;
    line-height: 20px;
  }

  .log-form-wrapper .Linfo .code-container li p.pt18 {
    margin-top: 18px;
  }

  .log-form-wrapper .form-banner {
    /*padding-left: 40px;*/
  }

  .log-form-wrapper .form-banner .fb-outline {
    height: 50px;
    border-bottom: 1px solid #f4f4f4;
  }

  .log-form-wrapper .form-banner .fb-outline span {
    display: inline-block;
    height: 49px;
    line-height: 49px;
    width: 153px;
    text-align: center;
    border-bottom: 2px solid #4fc1e9;
    font-weight: 400;
    font-size: 18px;
    color: #4fc1e9;
  }

  .pt60 {
    padding-top: 60px;
    padding-bottom: 100px;
  }

  .pl70 {
    padding-left: 70px;
  }

  .log-form-wrapper .demo-ruleForm {
  	text-align: center;
    padding-bottom: 60px;
  }

  .log-form-wrapper .demo-ruleForm .el-input {
    height: 40px;
    width: 80%;
    margin-top: 25px;
  }

  .log-form-wrapper .demo-ruleForm .el-input input {
    height: 40px;
  }

  .log-form-wrapper .demo-ruleForm .el-input.msg-code {
    width: 50%;
  }

  .log-form-wrapper .el-form-item {
    margin-bottom: 24px;
  }

	.forgetmm {
		/*margin-top: 5px;*/

		display: flex;
		width: 80%;
		margin: 5px auto 0 auto;
		justify-content: flex-end;
	}

	.forgetmm a {
		color: #4fc1e9;
		text-decoration: underline;
	}

  .log-btn {
  	margin-top: 25px;
  	margin-bottom: 10px;
  	width: 80%;
  }

  .el-form-item__error {
    padding-top: 6px;
  }

  .el-form-item__error:before {
    content: '!';
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
    padding: 0!important;
  }

  .sub-btn {
    width: 124px;
  }

</style>
