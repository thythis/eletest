<template>
	<div>
		<div class="header-wrapper">
			<el-row type="flex" justify="center">
			  <el-col :span="14">
			  	<div class="grid-content">
			  		<el-row type="flex" justify="space-between">
			  			<el-col :span="10" class="logo">
			  				<span>用户登录</span>
			  			</el-col>
			  			<el-col :span="6"  class="LEntry">
			  				<span class="desc">我还没注册，现在就</span>
                <router-link to="reg"><el-button type="success" class="login-btn">注册</el-button></router-link>
			  			</el-col>
			  		</el-row>
			  	</div>
			  </el-col>
			</el-row>
		</div>
		<div class="log-form-wrapper">
		  <el-row :gutter="10" type="flex" justify="center">
		    <el-col :span="4" :offset="10" class="bg-white">
		      <div class="form-banner">
		        <div class="fb-outline">
		          <span>用户登录</span>
		        </div>
		      </div>
	          <el-form :model="ruleForm2" :rules="rules2" ref="ruleForm2" class="demo-ruleForm">
	              <el-input v-model.number="ruleForm2.age"  placeholder="请输入手机号">
	              	<template slot="prepend"><i class="iconfont icon-person"></i></template>
	              </el-input>

	              <el-input v-model.number="ruleForm2.age"  placeholder="请输入密码">
	              	<template slot="prepend"><i class="iconfont icon-lock"></i></template>
	              </el-input>

	              <el-button type="success" size="large" class="log-btn">登录</el-button>

	          </el-form>
			  <el-row type="flex" justify="center">
			  		<el-col :span="9">
		              <el-checkbox v-model="ruleForm2.checked">自动登录</el-checkbox>
			  		</el-col>
			  		<el-col :span="6" :offset="4">
				  	  <a href="#">无法登录</a>
			  		</el-col>
			  </el-row>
		      <!-- <el-row class="pt60">
		        <el-col :xs="24" :sm="12" :md="12" class="pl70">
		        </el-col>
		      </el-row> -->
		    </el-col>
		  </el-row>
		</div>
	</div>
</template>

<script>
  export default {
    data() {
      var checkAge = (rule, value, callback) => {
        var reg = /1[0-9]{10}/;
        var re = new RegExp(reg);
        if (!value) {
          return callback(new Error('年龄不能为空'));
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
          if (this.ruleForm2.checkPass !== '') {
            this.$refs.ruleForm2.validateField('checkPass');
          }
          callback();
        }
      };
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.ruleForm2.pass) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
      return {
        ruleForm2: {
          pass: '',
          checkPass: '',
          age: '',
          checked: true
        },
        rules2: {
          pass: [
            { validator: validatePass, trigger: 'blur' }
          ],
          checkPass: [
            { validator: validatePass2, trigger: 'blur' }
          ],
          age: [
            { validator: checkAge, trigger: 'blur' }
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
	.header-wrapper {
		background: #fff;
	}

	.logo,.LEntry {
		height: 80px;
		line-height: 80px;
	}

	.logo span {
		color: #999;
		font-size: 18px;
		padding-left: 5px;
		line-height: 80px;
	}

	.LEntry .desc {
		color: #666;
		font-size: 14px;
	}

	.LEntry .login-btn {
		color: #fff;
		width: 90px;
		margin-left: 12px;
	}

    .grid-content {
        min-height: 36px;
    }

    .bg-blue {
    	background: #20A0FF;
    }

  .log-form-wrapper {
    padding-top: 50px;
    padding-bottom: 70px;
    background: #f4f4f4;
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
    border-bottom: 2px solid #0996d4;
    font-weight: 400;
    font-size: 18px;
    color: #0996d4;
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
  }

  .log-form-wrapper .demo-ruleForm .el-input {
    width: 80%;
    margin-top: 25px;
  }

  .log-form-wrapper .demo-ruleForm .el-input.msg-code {
    width: 50%;
  }

  .log-form-wrapper .el-form-item {
    margin-bottom: 24px;
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