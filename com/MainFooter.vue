<template>
	<ul>
		<li ><router-link to="/home"></router-link></li>
		<li ><router-link to="/kind"></router-link></li>
		<li ><router-link to="/cart"></router-link></li>
		<li ><router-link to="/user"></router-link></li>
	</ul>
</template>

<script>
	export default {
		data(){
			return {
				
			}
		},
		methods:{
			
		}
	}
</script>

<style scoped>
	.router-link-exact-active,.router-link-active{
		background:url(./../images/01-1.png) no-repeat center;
        background-size:25px;
	}

</style>