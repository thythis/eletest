<template lang="html">
  <div>
    <header-bar txt="我已注册，现在就" path="login" btntxt="登录"></header-bar>
    <div class="reg-form-wrapper">
      <el-steps :space="300" :center="true" :active="active" finish-status="success">
        <el-step title="验证手机"></el-step>
        <el-step title="重置密码"></el-step>
        <el-step title="完成"></el-step>
      </el-steps>
		  <el-row :gutter="10" type="flex" justify="center">
		    <el-col :xs="24" :sm="20" :md="18" :lg="14" class="bg-white">
		      <div class="form-banner">
		        <div class="fb-outline">
		          <span>{{resetpass?'重置密码':'验证手机'}}</span>
		        </div>
		      </div>
		      <el-row class="pt60">
		        <el-col :xs="24" :sm="14" :md="13" :lg="12" class="pl70">
		          <el-form :model="ruleForm2" :rules="rules2" ref="ruleForm2" label-position="right" label-width="100px" class="demo-ruleForm">
		            <el-form-item label="手机号" prop="phone" class="clearfix"  v-if="!resetpass">
		              <el-input v-model.number="ruleForm2.phone"  placeholder="请输入手机号"></el-input>
		            </el-form-item>
		            <el-form-item label="短信验证码" prop="msgcode"  v-if="!resetpass">
		              <el-input v-model.number="ruleForm2.msgcode"  placeholder="请输入短信验证码" class="msg-code"></el-input>
		              <el-button  type="success" @click="sendCode" :loading="yzmflag">获取短信验证码</el-button>
		            </el-form-item>
                <el-form-item label="新密码" prop="pass" v-if="resetpass">
		              <el-input type="password" v-model="ruleForm2.pass" placeholder="请输入密码" auto-complete="off"></el-input>
		            </el-form-item>
		            <el-form-item label="确认密码" prop="checkPass"  v-if="resetpass">
		              <el-input type="password" v-model="ruleForm2.checkPass" placeholder="请再次输入密码" auto-complete="off"></el-input>
		            </el-form-item>
		            <el-form-item>
		              <el-button :disabled="nextstep" class="sub-btn" type="primary" size="large" @click="next">下一步</el-button>
		            </el-form-item>
		          </el-form>
		        </el-col>
		      </el-row>
		    </el-col>
		  </el-row>
		</div>
  </div>
</template>

<script>
import HeaderBar from '../components/HeaderBar.vue';
import {getYzmzhmm, zhmmUrl} from '@/config/env';
import md5 from 'js-md5';
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
          this.nextstep = false;
          callback();
        }
      }, 300);
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
        this.nextstep = false;
        callback();
      }
    };
    return {
      getYzmzhmm,
      zhmmUrl,
      resetpass: false,
      nextstep: true,
      yzmflag: false,
      active: 0,
      txt: 'thy',
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
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$notify({
            title: '恭喜您！',
            message: '注册成功',
            type: 'success'
          });
        } else {
          this.$notify({
            title: '注册失败',
            type: 'error'
          });
          return false;
        }
      });
    },
    sendCode() {
      var obj = {
        sjh: this.ruleForm2.phone
      }
      var objstr = JSON.stringify(obj);
      this.yzmflag = true;
      this.$http.post(this.getYzmzhmm, objstr).then(function(response){
          console.log(response);
          this.yzmflag = false;
          if(response.body.code == 1) {
            this.ruleForm2.dxid = response.body.dxid;//114357
            this.$message({
              message: '验证码已发送',
              type: 'info',
              duration: 2000
            })
          } else {
            this.$message({
              message: response.body.message,
              type: 'error',
              duration: 2000
            })
          }
      }, function(response){
          this.yzmflag = false;
          console.log('fail');
      });
    },
    next() {
      if (this.active > 2) {
        this.active = 0;
      }
      this.active++;
      if(this.active == 1) {
        this.resetpass = true;
        this.nextstep = true;
      } else if(this.active == 2) {
        var encrymm = md5(this.ruleForm2.pass);
				var obj = {
					sjh: this.ruleForm2.phone,
					xmm: encrymm,
					dxid: this.ruleForm2.dxid,
					yzm: this.ruleForm2.msgcode
				}
				var objstr = JSON.stringify(obj);

        this.$http.post(this.zhmmUrl, objstr).then(function(response){
						console.log(response);
						if(response.body.code == 1) {
              this.active++;
							this.$confirm('重置密码成功！', '提示', {
								confirmButtonText: '确定',
								type: 'success'
							}).then(() => {
                this.$router.push('/login');
              })
						} else {
							this.$confirm(response.body.message, '提示', {
			          confirmButtonText: '确定',
			          type: 'warning'
			        }).then(() => {
                this.ruleForm2.pass = '';
                this.ruleForm2.checkPass = '';
                this.ruleForm2.phone = '';
                this.ruleForm2.dxid = 0;
                this.ruleForm2.msgcode = '';
                this.active = 0;
                this.nextstep = true;
                this.resetpass = false;
              })
						}
				}, function(response){
						console.log('fail');
				});
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.el-steps {
  margin-bottom: 20px;
}

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
