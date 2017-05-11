<template>
	<div class="wrape-top-bar">
		<div class="top-bar">
			<div class="count">
				累计浏览人次 <strong ref="nana" class="vcount">294,534,844</strong>&nbsp;&nbsp;
				已服务健康评估人数 <strong class="hcount">473,608</strong>
			</div>
			
			
		</div>
	</div>
</template>

<script>
	import {myfun} from "../assets/js/test.js"
	export default {
		mounted() {
			var options = {
			  useEasing : true, 
			  useGrouping : true, 
			  separator : ',', 
			  decimal : '.', 
			};
			// var demo = new CountUp(this.$refs.nana, 0, 3631, 0, 2.5, options);
			// demo.start();
		}
	}
</script>

<style scope>
	.wrape-top-bar {
		height: 50px;
		line-height: 50px;
		border-bottom: 1px solid #7db4c8;
	}

	.wrape-top-bar .top-bar {
		height: 50px;
		line-height: 50px;
		padding: 0 2%;
	}

	.wrape-top-bar .top-bar .count {
		display: inline-block;
		float: left;
		font-size: 12px;
		color: #666;
	}

	.wrape-top-bar .top-bar .count .vcount {
		color: #ea5281;
	}

	.wrape-top-bar .top-bar .count .hcount {
		color: #2e8eb6;
	}
</style>