<template>
	<div>
		<main-header></main-header>
		<div class="content-wrapper">
			<div class="main">
				<el-tree :data="data" :props="defaultProps" @node-click="handleNodeClick"></el-tree>
				<menu-tree></menu-tree>
			</div>
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
	        data: [{
	          label: '长处和困难问卷',
	          children: [{
	            label: '二级 1-1',
	            children: [{
	              label: '三级 1-1-1'
	            }]
	          }]
	        }, {
	          label: '一级 2',
	          children: [{
	            label: '二级 2-1',
	            children: [{
	              label: '三级 2-1-1'
	            }]
	          }, {
	            label: '二级 2-2',
	            children: [{
	              label: '三级 2-2-1'
	            }]
	          }]
	        }, {
	          label: '一级 3',
	          children: [{
	            label: '二级 3-1',
	            children: [{
	              label: '三级 3-1-1'
	            }]
	          }, {
	            label: '二级 3-2',
	            children: [{
	              label: '三级 3-2-1'
	            }]
	          }]
	        }],
	        defaultProps: {
	          children: 'children',
	          label: 'label'
	        }
	      };
	    },
	    methods: {
	      handleNodeClick(data) {
	        console.log(data);
	      }
	    }
	}
</script>

<style scoped>
	.content-wrapper .main {
		width: 80%;
		margin: 0 auto;
	}

	
</style>