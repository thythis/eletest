<template lang="html">
  <div>
    <!-- @cell-mouse-enter="showPhone" -->
    <el-table
      :data="tableData"
      style="width: 100%">
      <el-table-column
        prop="date"
        label="日期"
        width="180">
      </el-table-column>
      <el-table-column
        prop="name"
        label="姓名"
        width="180">
      </el-table-column>
      <el-table-column
        prop="phone"

        label="电话">
        <template scope="scope">
          <el-tooltip :content="scope.row.phone" placement="bottom" effect="light">
          <el-tag type="warning" :closable="true" @close="handleClose()" v-if="showtag">
            {{scope.row.phone | change}}
          </el-tag>
          </el-tooltip>
          <el-tag type="success" v-if="!showtag">
            {{scope.row.phone}}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column
        label="地址">
        <template scope="scope">
          <el-button size="small" icon="edit" @click.native.prevent="editRow(scope.$index, scope.row)">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showtag: true,
      tableData: [{
        date: '2016-05-02',
        name: '王小虎',
        phone: '18978901234',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-04',
        name: '王小虎',
        phone: '18978901854',
        address: '上海市普陀区金沙江路 1517 弄'
      }, {
        date: '2016-05-01',
        name: '王小虎',
        phone: '18978901456',
        address: '上海市普陀区金沙江路 1519 弄'
      }, {
        date: '2016-05-03',
        name: '王小虎',
        phone: '18945601789',
        address: '上海市普陀区金沙江路 1516 弄'
      }]
    }
  },
  methods: {
    phoneFormat(row, col) {
      // console.log(row);
      var phone = row.phone;
      phone = phone.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2');
      return phone;
    },
    handleClose() {
      this.showtag = false;
    },
    editRow(index, row) {

      console.log(row.phone);
      // this.phoneFormat = null;
    },
    showPhone(row) {
      console.log(row.phone);
    },
  },
  filters: {
    change(value) {
      return value.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2');
    }
  }
}
</script>

<style lang="scss">
</style>
