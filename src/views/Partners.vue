<template>
	<div>
		<main-header></main-header>
		<div class="cps-wrapper">
			<el-row>
				<el-col :span="7">
					<menu-tree :list="list"></menu-tree>
				</el-col>
				<el-col :span="17">
					<el-row>
						<el-col :span="12" class="cps-item">
							<img src="../assets/img/cp1.png" alt="">
						</el-col>
						<el-col :span="12" class="cps-item">
							<img src="../assets/img/cp2.png" alt="">
						</el-col>
						<el-col :span="12" class="cps-item">
							<img src="../assets/img/cp3.png" alt="">
						</el-col>
						<el-col :span="12" class="cps-item">
							<img src="../assets/img/cp4.png" alt="">
						</el-col>
						<el-col :span="12" class="cps-item">
							<img src="../assets/img/cp5.png" alt="">
						</el-col>
						<el-col :span="12" class="cps-item">
							<img src="../assets/img/cp6.png" alt="">
						</el-col>
					</el-row>
				</el-col>
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
	      	  label: '深圳市合作医院',
	      	  id: 'c1',
	      	  children: [{
	      	    label: '深圳市妇幼保健院',
	      	    id: 'c2'
	      	  },{
	      	  	label: '深圳市福田妇幼保健院',
	      	  	id: 'c2'
	      	  },{
	      	  	label: '深圳市光明新区妇幼保健院',
	      	  	id: 'c2'
	      	  },{
	      	  	label: '深圳市龙华新区妇幼保健中心',
	      	  	id: 'c2'
	      	  },{
	      	  	label: '深圳市罗湖区妇幼保健院',
	      	  	id: 'c2'
	      	  },{
	      	  	label: '深圳市南山区妇幼保健院',
	      	  	id: 'c2'
	      	  }]
	      	},{
	      		label: '其他医院',
	      		id: 'c3',
	      		children: [{
	      			label: '广西柳州市妇幼保健院',
	      			id: 'c4',
	      		}]
	      	}],
	      };
	    }

	}
</script>

<style lang="scss" type="text/css" scoped>
	.cps-wrapper {
		width: 60%;
		margin: 0 auto;
		.cps-item {
			padding-bottom: 86px;
			text-align: center;
			cursor: pointer;
			&:hover {
				box-shadow: 3px 3px 3px #ededed;
				border-bottom: none;
				img {
					transform: scale(1.1,1.1);
				}
			}
			img {
				width: 288px;
				height: 206px;
				display: inline-block;
				transition: all .8s;
			}
		}
	}
	
</style>