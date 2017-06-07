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
        <el-button class="edit-btn" type="primary">兑换</el-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
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
</style>
