<template>
	<div>
		<transition name="el-fade-in">
        	<router-view></router-view>
      	</transition>
		<footer-bar></footer-bar>
	</div>
</template>

<script>
 	import FooterBar from './FooterBar.vue';
	export default {
		components: {
		  FooterBar
		},
	}
</script>