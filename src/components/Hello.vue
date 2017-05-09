<template>
  <div>
    <header-bar></header-bar>
    <div class="form-wrapper">
      <el-row :gutter="10" type="flex" justify="center">
        <el-col :span="14" class="bg-white">
          <div class="form-banner">
            <div class="fb-outline">
              <span>注册帐号</span>
            </div>
          </div>
          <el-row class="pt60">
            <el-col :xs="24" :sm="12" :md="12" class="pl70">
              <el-form :model="ruleForm2" :rules="rules2" ref="ruleForm2" label-position="right" label-width="100px" class="demo-ruleForm">
                <el-form-item label="手机号" prop="age">
                  <el-input v-model.number="ruleForm2.age"  placeholder="请输入手机号"></el-input>
                </el-form-item>
                <el-form-item label="短信验证码" prop="age">
                  <el-input v-model.number="ruleForm2.age"  placeholder="请输入短信验证码" class="msg-code"></el-input>
                  <el-button  type="success">获取短信验证码</el-button>
                </el-form-item>
                <el-form-item label="密码" prop="pass">
                  <el-input type="password" v-model="ruleForm2.pass" placeholder="请输入密码" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="确认密码" prop="checkPass">
                  <el-input type="password" v-model="ruleForm2.checkPass" placeholder="请再次输入密码" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item>
                  <el-checkbox v-model="ruleForm2.checked">我已阅读并同意</el-checkbox>
                </el-form-item>
                <el-form-item>
                  <el-button class="sub-btn" type="primary" size="large" @click="submitForm('ruleForm2')">注册</el-button>
                  <el-button @click="resetForm('ruleForm2')">重置</el-button>
                </el-form-item>
              </el-form>
            </el-col>
            <el-col :xs="0" :sm="12" :md="12">
              <img src="../assets/logo.png">
            </el-col>
          </el-row>
        </el-col>
      </el-row>
    </div>
    <footer-bar></footer-bar>
  </div>
</template>

<script>
  import HeaderBar from './HeaderBar.vue';
  import FooterBar from './FooterBar.vue';
  export default {
    components: {
      HeaderBar,
      FooterBar
    },
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
      }
    }
  }
</script>

<style scope>
  .form-wrapper {
    padding-top: 50px;
    padding-bottom: 70px;
    background: #f4f4f4;
  }

  .form-banner {
    padding-left: 40px;
  }

  .form-banner .fb-outline {
    height: 60px;
    border-bottom: 1px solid #f4f4f4;
  }

  .form-banner .fb-outline span {
    display: inline-block;
    height: 59px;
    line-height: 59px;
    border-bottom: 2px solid #0996d4;
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

  .demo-ruleForm .el-input {
    width: 90%;
  }

  .demo-ruleForm .el-input.msg-code {
    width: 50%;
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
  }

  .sub-btn {
    width: 124px;
  }

</style>
