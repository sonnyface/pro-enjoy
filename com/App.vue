<template>
	<div class="container">
		
		<div class="type">
			<router-view></router-view>
		</div>	
	
		<footer class="footer" id="footer">
			<router-view name="footer"></router-view>
		</footer>
	</div>
</template>

<script>
	import "./../scss/animate.scss";
	import MainFooter from "./MainFooter.vue";
	export default {
		data(){
			return {
				
			}
		},
		methods:{
			
		},
		components:{
			"v-footer":MainFooter
		}
		
	}
</script>


