<template lang="html">
  <div>
    <div class="exchange-part">
      <el-input placeholder="请输入兑换码" v-model="rcode">
        <template slot="prepend">兑换码：</template>
      </el-input>
      <el-button type="primary" @click="exchange">兑换</el-button>
    </div>
    <el-dialog title="选择宝宝兑换评估表" :visible.sync="flag">
      <el-table
        :data="bbList"
        border
        stripe
        :default-sort = "{prop: 'csrq', order: 'descending'}"
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
          prop="csrq"
          sortable
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
    </el-dialog>
    <div class="pgblist">
      <el-tag type="gray">已激活的评估表列表</el-tag>
      <div class="jhlb" v-for="item in tclist">
        <div class="paper-clip-icon">
        </div>
        <div class="paper">{{item.xsbt}}</div>
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
import {getTclist, ggkdh} from '@/config/env'
export default {
  mounted() {
    var objstr = JSON.stringify({
      yhid: this.yhid
    });
    this.$http.post(this.getTclist, objstr).then(function(response){
      console.log(response);
      this.tclist = response.body.results;
    }, function(response) {
      console.log('fail');
    })
  },
  data() {
    return {
      getTclist,
      ggkdh,
      yhid: myfun.fetch().yhid,
      bbList: myfun.fetch().bbList,
      tclist: [],
      activeNames: ['1'],
      rcode: '',
      flag: false,
    }
  },
  methods: {
    exchange: function() {
      this.flag = true;
    },
    redeemGo: function(bbid) {
      var objstr = JSON.stringify({
        yhid: this.yhid,
        kh: this.rcode,
        bbid: bbid
      });
      console.log(bbid);
      this.$http.post(this.ggkdh, objstr).then(function(response){
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
    }
  }
}
</script>
<style lang="scss">
  $MAIN_COLOR: #4fc1e9;
  .el-dialog--small {
    height: 80%;
    overflow-y: scroll;
  }
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
    margin: 20px auto;
    .jhlb {
      position: relative;
    }
    .el-table {
      z-index: 2;
    }
    .paper-clip-icon,
    .paper-clip-icon::after,
    .paper-clip-icon::before {
      border-color: $MAIN_COLOR!important;
    }
    .paper-clip-icon {
      margin-top: 50px;
      width: 16px;
      height: 16px;
      border-bottom: none;
      border-left: 4px solid;
      border-top-left-radius: 3px;
      border-right: 4px solid;
      border-top: none;
      position: relative;
      z-index: 5;
      left: 21px;
      top: -9px;
      transform:rotate(30deg);
    }
    .paper-clip-icon::before {
      position: absolute;
      content: "";
      top: -15px;
      right: -4px;
      width: 10px;
      height: 12px;
      border-top-left-radius: 40px;
      border-top-right-radius: 40px;
      border-bottom: none;
      border-left: 4px solid;
      border-right: 4px solid;
      border-top: 4px solid;
    }
    .paper-clip-icon::after {
      position: absolute;
      content: "";
      bottom: -18px;
      right: 2px;
      width: 4px;
      height: 30px;
      border-bottom-left-radius: 40px;
      border-bottom-right-radius: 40px;
      border-top: none;
      border-left: 4px solid;
      border-right: 4px solid;
      border-bottom: 4px solid;
    }
    .paper {
      width: 98%;
      margin-left: 10px;
      height: 30px;
      position: absolute;
      top: -13px;
      line-height: 30px;
      text-indent: 40px;
      color: $MAIN_COLOR;
      // box-shadow: 0 0 10px rgba(0,0,0,.1);
      background: #f1f1f1;
    }
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
