<template lang="html">
  <div>
    <div class="baby-list" v-if="!flag">
      <div class="baby-item" v-for="(item, index) in list">
        <img src="../assets/img/baby1.jpg" alt="">
        <div class="baby-desc">
          <h3>{{item.name}}</h3>
          <span>{{item.birth}}</span>
        </div>
        <el-button class="edit-btn" type="primary" icon="edit" @click="babyEdit(item, index)">编辑</el-button>
      </div>
    </div>
    <transition name="el-fade-in">
      <div class="edit-panel" v-if="flag">
        <el-form label-position="left" ref="form" :model="form" label-width="80px">
          <el-form-item label="真实姓名">
            <el-col :span="10">
              <el-input v-model="form.name" placeholder="请输入宝宝姓名"></el-input>
            </el-col>
          </el-form-item>
          <el-form-item label="性别">
            <el-radio-group v-model="form.resource">
              <el-radio label="男宝贝"></el-radio>
              <el-radio label="女宝贝"></el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="出生日期">
            <el-col :span="10">
              <el-date-picker type="date" placeholder="选择日期" v-model="form.birth" style="width: 100%;"></el-date-picker>
            </el-col>
          </el-form-item>
          <el-form-item label="保健号">
            <el-col :span="10">
              <el-input v-model="form.bjh" placeholder="请输入保健号"></el-input>
            </el-col>
            <el-button type="primary" >绑定</el-button>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" @click="saveEdit">保存</el-button>
            <el-button >取消</el-button>
          </el-form-item>
        </el-form>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  data() {
    return {
      flag: false,
      list: [{
        name: '宝贝一',
        birth: '2017-1-15'
      },{
        name: '宝贝二',
        birth: '2017-1-15'
      },{
        name: '宝贝三',
        birth: '2017-1-15'
      }],
      form: {
        index: 0,
        name: '',
        birth: '',
        resource: '',
        bjh: ''
      }
    }
  },
  methods: {
    babyEdit: function(item, index) {
      console.log(index);
      this.form.index = index;
      this.form.name = item.name;
      this.form.birth = item.birth;
      this.flag = true;
    },
    editCancel: function() {
      this.flag = false;
    },
    saveEdit: function() {
      this.list[this.form.index] = this.form;
      this.list[this.form.index].birth = this.form.birth.getFullYear() + '-' +
      (this.form.birth.getMonth() + 1 > 9 ? this.form.birth.getMonth() + 1 : '0' + (this.form.birth.getMonth() + 1)) + '-' +
      (this.form.birth.getDate() > 9 ? this.form.birth.getDate() : '0' + this.form.birth.getDate());
      this.flag = false;
      console.log(this.list);
    }
  }
}
</script>

<style lang="scss">
  .baby-list {
    width: 80%;
    overflow: hidden;
    margin: 50px auto 0 auto;
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
        &:nth-child(4) {
          .el-button {
            margin-left: 20px;
          }
        }
      }
    }
  }
</style>
