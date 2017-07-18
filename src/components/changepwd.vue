<template lang="html">
  <div>
    <div class="change-panel">
      <el-form label-position="left" :rules="rules2" ref="ruleForm" :model="ruleForm" label-width="80px">
        <el-form-item label="原密码" prop="oldpwd">
          <el-col :span="10">
            <el-input type="password" v-model="ruleForm.oldpwd" placeholder="请输入新密码" auto-complete="off"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="新密码" prop="newpwd">
          <el-col :span="10">
            <el-input type="password" v-model="ruleForm.newpwd" placeholder="请输入新密码" auto-complete="off"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="确认密码" prop="checkpwd">
          <el-col :span="10">
            <el-input type="password" v-model="ruleForm.checkpwd" placeholder="请再次输入密码" auto-complete="off"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item>
          <el-button class="sub-btn" type="primary" size="large" @click="subModify">修改密码</el-button>
          <el-button class="sub-btn" size="large" @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>

  </div>
</template>

<script>
import myfun from '../assets/js/test.js';
import {changepwd} from '@/config/env';
import md5 from 'js-md5';
export default {
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(this.$message({
          message: '请输入密码',
          type: 'error',
          duration: 1000
        }));
      } else if(value.length < 6) {
        callback(this.$message({
          message: '密码不能小于6位',
          type: 'error',
          duration: 1000
        }));
      } else {
        if (this.ruleForm.checkpwd !== '') {
          this.$refs.ruleForm.validateField('checkpwd');
        }
        callback();
      }
    };
    var validateOldPass = (rule, value, callback) => {
      if (value === '') {
        callback(this.$message({
          message: '请输入原密码',
          type: 'error',
          duration: 1000
        }));
      } else if(value.length < 6) {
        callback(this.$message({
          message: '密码不能小于6位',
          type: 'error',
          duration: 1000
        }));
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(this.$message({
          message: '请再次输入密码',
          type: 'error',
          duration: 1000
        }));
      } else if (value !== this.ruleForm.newpwd) {
        callback(this.$message({
          message: '两次输入密码不一致',
          type: 'error',
          duration: 1000
        }));
      } else {
        callback();
      }
    };
    return {
      changepwd,
      subflag: true,
      yhid: myfun.fetch().yhid,
      ruleForm: {
        oldpwd: '',
        newpwd: '',
        checkpwd: ''
      },
      rules2: {
        oldpwd: [
          { required: true, validator: validateOldPass, trigger: 'blur' }
        ],
        newpwd: [
          { required: true, validator: validatePass, trigger: 'blur' }
        ],
        checkpwd: [
          { required: true, validator: validatePass2, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    subModify() {
          var encryoldmm = md5(this.ruleForm.oldpwd);
          var ymm = myfun.fetch().mm;
          if(encryoldmm != ymm) {
            this.$message({
              message: '输入原密码错误',
              type: 'error',
              duration: 1000
            })
            this.$refs["ruleForm"].resetFields();
            return;
          } else {
            var encrymm = md5(this.ruleForm.newpwd);
            var obj = {
              yhid: this.yhid,
              xmm: encrymm,
              ymm: encryoldmm,
              token: myfun.fetch().token
            }
            var objstr = JSON.stringify(obj);
            this.$http.post(this.changepwd, objstr).then(function(response){
              console.log(response);
              if(response.body.code == 1) {
                this.$confirm('修改密码成功！', '提示', {
                  confirmButtonText: '确定',
                  showCancelButton: false,
                  type: 'success'
                }).then(() => {
                  this.$router.push('/bbmana');
                })
              } else {
                this.$confirm(response.body.message, '提示', {
                  confirmButtonText: '确定',
                  showCancelButton: false,
                  type: 'warning'
                }).then(() => {
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

<style lang="scss">
  .change-panel {
    width: 80%;
    margin: 50px auto 0 auto;
  }
</style>
