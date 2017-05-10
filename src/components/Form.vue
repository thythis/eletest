<template>
	<div>
		<router-view></router-view>
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