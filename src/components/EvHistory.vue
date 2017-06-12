<template lang="html">
  <div>
    <div class="history-panel">
      <el-tag type="gray">已评估的记录</el-tag>
      <div class="box">
        <div class="ribbon">
        </div>
        <span>大一班小明</span>
      </div>
      <el-table
        :data="tableData"
        border
        stripe
        style="width: 100%">
        <el-table-column
          prop="subtime"
          label="提交时间">
        </el-table-column>
        <el-table-column
          prop="pgbname"
          label="筛查表">
        </el-table-column>
        <el-table-column
          prop="agerange"
          label="年龄段">
        </el-table-column>
        <el-table-column
          prop="tag"
          label="结果"
          width="100"
          :filters="[{ text: '正常', value: '正常' }, { text: '可疑', value: '可疑' }]"
          :filter-method="filterTag"
          filter-placement="bottom-end">
          <template scope="scope">
            <el-tag
              :type="scope.row.tag === '正常' ? 'success' : 'warning'"
              close-transition>{{scope.row.tag}}</el-tag>
          </template>
        </el-table-column>
      </el-table>
      <div class="box">
        <div class="ribbon">
        </div>
        <span>大一班小明</span>
      </div>
      <el-table
        :data="tableData"
        border
        stripe
        style="width: 100%">
        <el-table-column
          prop="subtime"
          label="提交时间">
        </el-table-column>
        <el-table-column
          prop="pgbname"
          label="筛查表">
        </el-table-column>
        <el-table-column
          prop="agerange"
          label="年龄段">
        </el-table-column>
        <el-table-column
          prop="tag"
          label="结果"
          width="100"
          :filters="[{ text: '正常', value: '正常' }, { text: '可疑', value: '可疑' }]"
          :filter-method="filterTag"
          filter-placement="bottom-end">
          <template scope="scope">
            <el-tag
              :type="scope.row.tag === '正常' ? 'success' : 'warning'"
              close-transition>{{scope.row.tag}}</el-tag>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
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
    }
  }
}
</script>

<style lang="scss">
  .history-panel {
    width: 80%;
    margin: 50px auto 0 auto;
  }
</style>
