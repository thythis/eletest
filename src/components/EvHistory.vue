<template lang="html">
  <div>
    <div class="history-panel">
      <el-tag class="toptag" type="gray">已评估的记录</el-tag>
      <div class="hisitem" v-for="item in hisList">
        <div class="box">
          <div class="ribbon">
          </div>
          <span>{{item.mc}}</span>
        </div>
        <el-table
          :data="item.list"
          :default-sort = "{prop: 'pgrq', order: 'descending'}"
          stripe
          style="width: 100%">
          <el-table-column type="expand">
            <template scope="props">
              <p>{{props.row.remark}}</p>
              <el-button v-if="(props.row.jg=='1'||'2')?showbtn:!showbtn" @click="showReport(props.row.bbpgbid)">查看报表</el-button>
            </template>
          </el-table-column>
          <el-table-column
            prop="pgrq"
            sortable
            label="评估日期">
          </el-table-column>
          <el-table-column
            label="姓名">
            <template scope="scope">
              {{bbname}}
            </template>
          </el-table-column>
          <el-table-column
            prop="mc"
            :show-overflow-tooltip="true"
            label="筛查表">
            <template scope="scope">
              <el-tag type="primary">{{ scope.row.mc }}</el-tag>
            </template>
          </el-table-column>
          <el-table-column
            prop="synld"
            label="年龄段">
          </el-table-column>
          <el-table-column
            prop="jg"
            label="结果"
            width="100"
            :filters="[{ text: '正常', value: '正常' }, { text: '可疑', value: '可疑' }]"
            :filter-method="filterTag"
            filter-placement="bottom-end">
            <template scope="scope">
              <el-tag
                v-if="scope.row.jg?true:false"
                :type="scope.row.jg == '1' ? 'success' : 'warning'"
                close-transition>{{scope.row.jg == '1' ? '正常' : (scope.row.jg == '2'?'可疑':'')}}</el-tag>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <el-dialog
		  :title="reportTitle"
		  :visible.sync="showreport">
		  <div v-html="reportData">
		  	{{reportData}}
		  </div>
		  <span slot="footer" class="dialog-footer">
		    <el-button @click="showreport = false">取 消</el-button>
		    <el-button type="primary" @click="showreport = false">确 定</el-button>
		  </span>
		</el-dialog>
  </div>
</template>

<script>
import myfun from '../assets/js/test.js'
import {getRecord, getReport} from '@/config/env'
export default {
  mounted() {
    var objjjj = JSON.stringify({
      yhid: myfun.fetch().yhid,
      bbid: myfun.fetch().bbList[this.$store.state.count].bbid,
    });
    this.$http.post(this.getRecord,objjjj).then(function(response){
      console.log(response);
      this.hisList = response.body.results;
    }, function(response){
        console.log('fail');
    });
  },
  computed: {
    requestTc() {
      return this.$store.state.count
    }
  },
  watch: {
    requestTc(val) {
      var objjjj = JSON.stringify({
        yhid: myfun.fetch().yhid,
        bbid: myfun.fetch().bbList[this.$store.state.count].bbid,
      });
      this.$http.post(this.getRecord, objjjj).then(function(response){
        console.log(response);
        this.hisList = response.body.results;
        this.bbname = myfun.fetch().bbList[this.$store.state.count].mc;
      }, function(response) {
        this.loading = false;
        console.log('fail');
      })
    }
  },
  data() {
    return {
      getRecord,
      getReport,
      hisList: [],
      bbname: myfun.fetch().bbList[this.$store.state.count].mc,
      showbtn: true,
      reportData: "",
      reportTitle: "",
      showreport: false,
      tableData: [{
        subtime: '2017-01-20',
        pgbname: '自闭症筛查',
        agerange: '6月-2岁',
        tag: '正常',
      }, {
        subtime: '2017-01-20',
        pgbname: '自闭症筛查',
        agerange: '6月-2岁',
        tag: '可疑',
      }, {
        subtime: '2017-01-20',
        pgbname: '自闭症筛查',
        agerange: '6月-2岁',
        tag: '正常',
      }],
    }
  },
  methods: {
    filterTag(value, row) {
      return row.tag === value;
    },
    showReport(bbpgbid) {
      var objjjj = JSON.stringify({
        yhid: myfun.fetch().yhid,
        bbpgbid: bbpgbid,
      });
      this.$http.post(this.getReport,objjjj).then(function(response){
        console.log(response);
        if(response.body.code == "1") {
          var REG_BODY = /<body[^>]*>([\s\S]*)<\/body>/;
          var REG_TITLE = /<h2[^>]*>([\s\S]*)<\/h2>/;
          var result = REG_BODY.exec(response.body.result);
          var title = REG_TITLE.exec(response.body.result);
          this.reportData = result[1];
          this.reportTitle = title[1];
          this.showreport = true;
        }
      }, function(response){
          console.log('fail');
      });
    }
  }
}
</script>

<style lang="scss">
  .history-panel {
    width: 80%;
    margin: 50px auto 0 auto;
    .toptag {
      margin-bottom: 20px;
    }
    .hisitem {
      margin-bottom: 20px;
    }
    .box {
      width: 100%;
    }
  }
</style>
