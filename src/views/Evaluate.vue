<template>
	<div>
		<main-header></main-header>
		<div class="content-wrapper">
			<div class="main">
				<el-row>
				  <el-col :span="6"><menu-tree :list="list"></menu-tree></el-col>
				  <el-col :span="18"><survey></survey></el-col>
				</el-row>
			</div>
		</div>
		<main-footer></main-footer>
	</div>
</template>

<script>
	import MainHeader from '../components/MainHeader.vue';
	import MainFooter from '../components/MainFooter.vue';
	import MenuTree from '../components/MenuTree.vue';
	import Survey from '../components/Survey.vue';
	export default {
		components: {
			MainHeader,
			MainFooter,
			MenuTree,
			Survey
		},
		data() {
	      return {
	      	list: [{
	      	  label: '长处和困难问卷',
	      	  id: 'c1',
	      	  children: [{
	      	    label: '二级 1-1',
	      	    id: 'c2',
	      	  }]
	      	}, {
	      	  label: '儿童发育筛查问卷表',
	      	  id: 'c4',
	      	  children: [{
	      	    label: '2/月--4/月',
	      	    id: 'c5',
	      	  }, {
	      	    label: '2岁3月--4岁7月',
	      	    id: 'c7',
	      	  }]
	      	}, {
	      	  label: '儿童行为量表CBCL2~3)',
	      	  id: 'c9',
	      	  children: [{
	      	    label: '二级 3-1',
	      	    id: 'c10',
	      	  }, {
	      	    label: '二级 3-2',
	      	    id: 'c12',
	      	  }]
	      	}],

	      };
	    },
	    methods: {
	    }
	}
</script>

<style lang="scss" scoped type="text/css">
	.content-wrapper {
		.main {
			width: 80%;
			margin: 0 auto;
			margin-bottom: 150px;
		}
	}

</style>
