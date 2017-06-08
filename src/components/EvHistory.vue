<template lang="html">
  <div>
    <div class="history-panel">
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
