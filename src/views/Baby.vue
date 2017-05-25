<template>
	<div>
		<main-header></main-header>
		<div class="baby-wrapper">
			<el-row>
				<el-col :span="4">
					<menu-tree :list="list"></menu-tree>
				</el-col>
				<el-col></el-col>
			</el-row>
		</div>
		<main-footer></main-footer>
	</div>
</template>

<script>
	import MainHeader from '../components/MainHeader.vue';
	import MainFooter from '../components/MainFooter.vue';
	import MenuTree from '../components/MenuTree.vue';

	export default {
		components: {
			MainHeader,
			MainFooter,
			MenuTree
		},
		data() {
	      return {
	      	list: [{
	      	  label: '全部类型',
	      	  id: 'c1',
	      	  children: [{
	      	    label: '成长指标',
	      	    id: 'c2'
	      	  },{
	      	  	label: '营养饮食',
	      	  	id: 'c2'
	      	  },{
	      	  	label: '护理保健',
	      	  	id: 'c2'
	      	  },{
	      	  	label: '常见疾病',
	      	  	id: 'c2'
	      	  },{
	      	  	label: '免疫接种',
	      	  	id: 'c2'
	      	  },{
	      	  	label: '家庭教育',
	      	  	id: 'c2'
	      	  },{
	      	  	label: '心理行为语言',
	      	  	id: 'c2'
	      	  },{
	      	  	label: '学校教育',
	      	  	id: 'c2'
	      	  },{
	      	  	label: '艺术培养',
	      	  	id: 'c2'
	      	  },{
	      	  	label: '幼儿园',
	      	  	id: 'c2'
	      	  },{
	      	  	label: '英语',
	      	  	id: 'c2'
	      	  },{
	      	  	label: '阅读',
	      	  	id: 'c2'
	      	  },{
	      	  	label: '玩具',
	      	  	id: 'c2'
	      	  },{
	      	  	label: '其他',
	      	  	id: 'c2'
	      	  }]
	      	}],
	      };
	    }

	}
</script>

<style lang="scss" type="text/css" scoped>
	.baby-wrapper {
		width: 60%;
		margin: 0 auto;

	}
</style>