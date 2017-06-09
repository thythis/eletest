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
      <div class="box">
        <div class="ribbon">
          thy
        </div>
      </div>
      <el-table
        :data="tableData"
        stripe
        style="width: 100%">
        <el-table-column
          prop="pgbname"
          label="筛查表">
        </el-table-column>
        <el-table-column
          prop="agerange"
          label="年龄段">
        </el-table-column>
      </el-table>
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
      tableData: [{
        pgbname: '自闭症筛查',
        agerange: '6月-2岁'
      }, {
        pgbname: '自闭症筛查',
        agerange: '6月-2岁'
      }, {
        pgbname: '自闭症筛查',
        agerange: '6月-2岁'
      }, {
        pgbname: '自闭症筛查',
        agerange: '6月-2岁'
      }],
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
    .box {
      width: 150px;
      height: 30px;
      margin-top: 10px;
      margin-bottom: 10px;
      background: #f1f1f1;
      box-shadow: 0 0 15px rgba(0,0,0,.1);
      .ribbon {
        width: 10px;
        height: 20px;
        position: relative;
        margin-bottom: 12px;
        color: #48576a;
        background: #4fc1e9;
        top: -3px;
        left: 10px;
        &:before {
          content: '';
          position: absolute;
          height: 0;
          width: 0;
          border-bottom: 3px solid #4fc1c9;
          border-right: 3px solid transparent;
          right: -3px;
        }
        &:after {
          content: '';
          position: absolute;
          height: 0;
          width: 0;
          border-left: 5px solid #4fc1e9;
          border-right: 5px solid #4fc1e9;
          border-bottom: 5px solid transparent;
          bottom: -5px;
        }
      }
    }
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
