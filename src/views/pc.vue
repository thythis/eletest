<template lang="html">
  <div>
    <el-row>
      <el-col :span="4">
        <el-menu default-active="2" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose">
          <el-submenu index="1">
            <template slot="title"><i class="el-icon-message"></i>宝贝管理</template>
            <el-menu-item-group>
              <el-menu-item index="1-1">添加宝贝</el-menu-item>
              <el-menu-item index="1-2">修改宝贝信息</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-menu-item index="2"><i class="el-icon-menu"></i>兑换码</el-menu-item>
          <el-menu-item index="3"><i class="el-icon-setting"></i>评估历史</el-menu-item>
        </el-menu>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
}
</script>

<style lang="css">
</style>
