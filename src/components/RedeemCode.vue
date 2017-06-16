<template lang="html">
  <div>
    <div class="exchange-part">
      <el-input placeholder="请输入兑换码" v-model="rcode">
        <template slot="prepend">兑换码：</template>
      </el-input>
      <el-button type="primary" @click="exchange">兑换</el-button>
    </div>
    <div class="baby-list" v-if="flag">
      <el-table
        :data="bbList"
        border
        stripe
        style="width: 100%">
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
          label="出生日期"
          width="180">
          <template scope="scope">
            <el-icon name="time"></el-icon>
            <span style="margin-left: 10px">{{ scope.row.csrq }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template scope="scope">
            <el-button size="small" icon="document" @click.native.prevent="redeemGo(scope.row.bbid)">兑换</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="pgblist">
      <el-tag type="gray">已激活的评估表列表</el-tag>
      <div v-for="item in tclist">
        <div class="box">
          <div class="ribbon">
          </div>
          <span>{{item.xsbt}}</span>
        </div>
        <el-table
          :data="item.zdlist"
          border
          stripe
          style="width: 100%">
          <el-table-column
            prop="mc"
            label="筛查表">
          </el-table-column>
          <el-table-column
            prop="synld"
            label="年龄段">
          </el-table-column>
        </el-table>
      </div>

    </div>
  </div>
</template>

<script>
import myfun from '../assets/js/test.js'
export default {
  mounted() {
    var objstr = JSON.stringify({
      yhid: this.yhid
    });
    this.$http.post('http://127.0.0.1:8080/wbaobei/phone/tclist', objstr).then(function(response){
      console.log(response);
      this.tclist = response.body.results;
    }, function(response) {
      console.log('fail');
    })
  },
  data() {
    return {
      yhid: myfun.fetch().yhid,
      bbList: myfun.fetch().bbList,
      tclist: [],
      tableData: [{
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
        gendar: '男宝贝',
        birth: '2017-1-15'
      },{
        name: '宝贝二',
        gendar: '男宝贝',
        birth: '2017-1-15'
      },{
        name: '宝贝三',
        gendar: '男宝贝',
        birth: '2017-1-15'
      },{
        name: '宝贝四',
        gendar: '男宝贝',
        birth: '2017-1-15'
      }],
    }
  },
  methods: {
    exchange: function() {
      this.flag = true;
    },
    redeemGo: function(bbid) {
      var objstr = JSON.stringify({
        kh: this.rcode,
        bbid: bbid
      });
      this.$http.post('http://127.0.0.1:8080/wbaobei/phone/ggkdh', objstr).then(function(response){
        console.log(response);
        if(response.body.code == "1") {
          this.$message({
            type: 'success',
            message: '兑换成功!'
          });
        } else {
          this.$message.error(response.body.message);
        }
      }, function(response) {
        console.log('fail');
      })
      // this.$message({
      //   type: 'success',
      //   message: '兑换成功!'
      // });
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
  .box {
    width: 30%;
    height: 24px;
    margin-top: 10px;
    margin-bottom: 10px;
    background: #f1f1f1;
    box-shadow: 0 0 15px rgba(0,0,0,.1);
    span {
      margin-left: 20px;
      font-size: 16px;
      color: #4fc1e9;
    }
    .ribbon {
      width: 10px;
      height: 20px;
      float: left;
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
