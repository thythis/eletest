<template lang="html">
  <div>
    <div class="baby-list" v-if="!flag">
      <el-button type="primary" icon="plus" class="add-baby" @click="babyAdd">添加宝贝</el-button>
      <el-table
        :data="bbList"
        border
        stripe
        :default-sort = "{prop: 'csrq', order: 'descending'}"
        style="width: 100%">
        <el-table-column
          label="出生日期"
          prop="csrq"
          sortable
          width="180">
          <template scope="scope">
            <el-icon name="time"></el-icon>
            <span style="margin-left: 10px">{{ scope.row.csrq }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="姓名"
          width="100">
          <template scope="scope">
            <div slot="reference" class="name-wrapper">
              <el-tag>{{ scope.row.mc }}</el-tag>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          label="性别"
          width="100">
          <template scope="scope">
            <div slot="reference" class="name-wrapper">
              <el-tag :type="{true:'primary',false:'success'}[scope.row.xb=='1']">{{ scope.row.xb=='1'?'男宝贝':'女宝贝' }}</el-tag>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          label="保健号"
          >
          <template scope="scope">
            <div slot="reference" class="name-wrapper">
              <el-tag>{{ scope.row.bjh }}</el-tag>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template scope="scope">
            <el-button size="small" icon="edit" @click.native.prevent="editRow(scope.$index, scope.row)">编辑</el-button>
            <el-button size="small" icon="delete" type="danger" @click.native.prevent="delRow(scope.row.bbid)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>

    </div>
    <transition name="el-fade-in">
      <div class="edit-panel" v-if="flag">
        <el-form label-position="left" ref="form" :model="form" label-width="80px">
          <el-form-item label="宝宝头像">
            <el-col :span="10">
              <VueImgInputer :img-src="imgval" v-model="form.picValue" size="small"></VueImgInputer>
            </el-col>
          </el-form-item>
          <el-form-item label="真实姓名">
            <el-col :span="10">
              <el-input v-model="form.name" placeholder="请输入宝宝姓名"></el-input>
            </el-col>
          </el-form-item>
          <el-form-item label="性别">
            <el-radio-group v-model="form.gendar">
              <el-radio :label="1">男宝贝</el-radio>
              <el-radio :label="2">女宝贝</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="出生日期">
            <el-col :span="10">
              <el-date-picker type="date" placeholder="选择日期" :picker-options="pickerOptions0" v-model="form.birth" style="width: 100%;"></el-date-picker>
            </el-col>
          </el-form-item>
          <el-form-item label="保健号">
            <el-col :span="10">
              <el-input v-model="form.bjh" placeholder="请输入保健号"></el-input>
            </el-col>
            <el-button type="primary" >绑定</el-button>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" @click="saveEdit" v-loading.fullscreen.lock="fullscreenLoading">保存</el-button>
            <el-button @click="editCancel">取消</el-button>
          </el-form-item>
        </el-form>
      </div>
    </transition>
  </div>
</template>

<script>
import {addBaby, editBaby, delBaby} from '@/config/env'
import myfun from '../assets/js/test.js'
import VueImgInputer from 'vue-img-inputer';
import baby1 from '../assets/img/baby1.jpg';
export default {
  components: {
    VueImgInputer
  },
  data() {
    return {
      addBaby,
      editBaby,
      delBaby,
      bbList: myfun.fetch().bbList,
      fullscreenLoading: false,
      yhid: myfun.fetch().yhid,
      fbirth: "",
      imgval: baby1,
      pickerOptions0: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        }
      },
      flag: false,
      form: {
        picValue: '',
        index: 0,
        type: 0,
        name: '',
        birth: '',
        gendar: '',
        bbid: 0,
        bjh: ''
      }
    }
  },
  methods: {
    picchange() {
      console.log(this.picValue);
    },
    babyAdd: function() {
      this.form.name = '';
      this.form.birth = '';
      this.form.gendar = '';
      this.form.bjh = '';
      this.form.type = 1;
      this.flag = true;
    },
    editCancel: function() {
      this.flag = false;
    },
    delRow: function(bbid) {
      this.$confirm('确认删除一条宝宝数据?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.fullscreenLoading = true;
        var objstr = JSON.stringify({
          yhid: this.yhid,
          bbid: bbid
        });
        this.$http.post(this.delBaby,objstr).then(function(response){
          this.fullscreenLoading = false;
          console.log(response);
          var item = myfun.fetch();
          for (var bb in item.bbList) {
            if (item.bbList[bb].bbid == bbid) {
              item.bbList.splice(bb, 1);
              break;
            }
          }
          this.bbList = item.bbList;
          myfun.save(item);
          this.$message({
            type: 'success',
            duration: 1000,
            message: '删除成功!'
          });
        }, function(response){
						console.log('fail');
				});
      }).catch(() => {
        console.log('shibai');
      });
    },
    editRow: function(index, item) {
      this.form.type = 0;
      this.form.index = index;
      this.form.name = item.mc;
      this.form.birth = item.csrq;
      this.fbirth = item.csrq;
      this.form.gendar = item.xb;
      this.form.bbid = item.bbid;
      this.form.bjh = item.bjh;
      this.flag = true;
    },
    saveEdit: function() {
      this.$confirm('确认保存宝宝信息?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.fullscreenLoading = true;

          if(this.form.type == 1) {
            this.form.birth = this.form.birth.getFullYear() + '-' +
            (this.form.birth.getMonth() + 1 > 9 ? this.form.birth.getMonth() + 1 : '0' + (this.form.birth.getMonth() + 1)) + '-' +
            (this.form.birth.getDate() > 9 ? this.form.birth.getDate() : '0' + this.form.birth.getDate());

            var objjjj = JSON.stringify({
              yhid: this.yhid,
              mc: this.form.name,
              xb: this.form.gendar,
              csrq: this.form.birth,
            });
            this.$http.post(this.addBaby, objjjj).then(function(response){
              this.fullscreenLoading = false;
              console.log(response);
              if(response.body.code == "1") {
                var newbb = response.body;
                this.bbList.push(newbb);
                var item = myfun.fetch();
                item.bbList = this.bbList;
                myfun.save(item);
                this.flag = false;
                this.$message({
                  type: 'success',
                  message: '保存成功!'
                });
              } else {
                this.flag = false;
                this.$message({
                  type: 'error',
                  message: response.body.message
                });
              }
            }, function(response) {
              console.log('fail');
            })

            this.list.push({
              name: this.form.name,
              gendar: this.form.gendar,
              bjh: this.form.bjh,
              birth: this.form.birth
            })
          } else {
            if(!(this.fbirth === this.form.birth)) {
              this.fbirth = this.form.birth.getFullYear() + '-' +
              (this.form.birth.getMonth() + 1 > 9 ? this.form.birth.getMonth() + 1 : '0' + (this.form.birth.getMonth() + 1)) + '-' +
              (this.form.birth.getDate() > 9 ? this.form.birth.getDate() : '0' + this.form.birth.getDate());
            }
            var objjjj = JSON.stringify({
              yhid: this.yhid,
              bbid: this.form.bbid,
              mc: this.form.name,
              xb: this.form.gendar,
              csrq: this.fbirth,
            });
            this.$http.post(this.editBaby, objjjj).then(function(response){
              this.fullscreenLoading = false;
              console.log(response);
              if(response.body.code == "1") {
                // console.log(this.form.index);
                var item = myfun.fetch();
                for (var bb in item.bbList) {
                  if (item.bbList[bb].bbid == this.form.bbid) {
                    item.bbList[bb] = response.body;
                    break;
                  }
                }
                this.bbList = item.bbList;
                myfun.save(item);
                this.flag = false;
                this.$message({
                  type: 'success',
                  message: '保存成功!'
                });
              } else {
                this.flag = false;
                this.$message({
                  type: 'error',
                  message: response.body.message
                });
              }
            }, function(response) {
              console.log('fail');
            })
          }
        }).catch(() => {

        });
    }
  }
}
</script>

<style lang="scss">
  .baby-list {
    width: 90%;
    overflow: hidden;
    margin: 50px auto 20px auto;
    .add-baby {
      margin-bottom: 20px;
    }
    .baby-item {
      height: 80px;
      padding: 10px;
      position: relative;
      &:hover {
        cursor: pointer;
        ::after {
          content: '';
          position: absolute;
          width: 100%;
          height: 100%;
          left: 0;
          top: 0;
          background: rgba(200,200,200,0.1);
        }
      }
      img {
        width: 80px;
        height: 80px;
        border-radius: 50%;
        float: left;
      }
      .baby-desc {
        float: left;
        display: inline-block;
        height: 80px;
        margin-left: 10px;
        h3 {
          font-weight: normal;
          line-height: 18px;
          font-size: 16px;
        }
      }
      .edit-btn {
        position: absolute;
        top: 30px;
        right: 20px;
      }
    }
  }
  .edit-panel {
    width: 80%;
    margin: 50px auto 0 auto;
    .el-form {
      .el-form-item {
        &:nth-child(5) {
          .el-button {
            margin-left: 20px;
          }
        }
      }
    }
  }
</style>
