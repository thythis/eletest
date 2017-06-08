<template lang="html">
  <div>
    <div class="exchange-part">
      <el-input placeholder="请输入兑换码" v-model="rcode">
        <template slot="prepend">兑换码：</template>
      </el-input>
      <el-button type="primary" @click="exchange">兑换</el-button>
    </div>
    <div class="baby-list" v-if="flag">
      <div class="baby-item" v-for="(item, index) in list">
        <img src="../assets/img/baby1.jpg" alt="">
        <div class="baby-desc">
          <h3>{{item.name}}</h3>
          <span>{{item.birth}}</span>
        </div>
        <el-button class="edit-btn" type="primary" @click="redeemGo(index)">兑换</el-button>
      </div>
    </div>
    <div class="pgblist">
      <el-tag type="gray">已激活的评估表列表</el-tag>
      <el-collapse v-model="activeNames">
        <el-collapse-item title="自闭症筛查" name="1">
          <div>自闭症筛查</div>
          <div>6月-2岁<el-tag type="success">正常</el-tag></div>
        </el-collapse-item>
        <el-collapse-item title="自闭症筛查" name="2">
          <div>自闭症筛查</div>
          <div>6月-2岁<el-tag type="success">正常</el-tag></div>
        </el-collapse-item>
        <el-collapse-item title="自闭症筛查" name="3">
          <div>自闭症筛查</div>
          <div>6月-2岁<el-tag type="success">正常</el-tag></div>
        </el-collapse-item>
      </el-collapse>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeNames: ['1'],
      rcode: '',
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
    }
  },
  methods: {
    exchange: function() {
      this.flag = true;
    },
    redeemGo: function(index) {
      this.$message({
        type: 'success',
        message: '兑换成功!'
      });
    }
  }
}
</script>
<style lang="scss">
  .exchange-part {
    width: 80%;
    margin: 50px auto 0 auto;
    .el-input {
      width: 50%;
    }
    .el-button {
      margin-left: 10px;
    }
  }
  .pgblist {
    width: 80%;
    margin:20px auto;
  }
  .el-collapse {
    margin-top: 10px;
    .el-tag {
      height: 20px;
      line-height: 18px;
      margin-left: 40px;
    }
    .el-collapse-item {
      &.is-active {
        .el-collapse-item__header {
          color: #4fc1e9;
        }
      }
    }
  }
</style>
