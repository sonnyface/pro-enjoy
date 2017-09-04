<template>
	<div class="city" >
		<header class="header ">
			<div class="txt">
				<span @click="toClassify()">分类</span>
			</div>
			<div class="logo">
				<div class="city" @click="toHeader()">
					<img src="./../images/logo.png" alt="" />
					<p>
						<span class="cityAdress">{{cityList}}</span>
						<i class="iconfont">&#xe60b;</i>
					</p>
				</div>								
			</div>
			<div class="icon" >
				<span @click="tologin()">登录</span>
				<i class="iconfont" @click="toSearch()">&#xe606;</i>				
			</div>			
		</header>

		<!-- 搜索框功能 v-show -->
		<div class="search" v-show="toShow" > 
			<i class="iconfont">&#xe60e;</i>
			<input type="text" class="searchIpt" placeholder="搜索本地精选 / 快递到家"/>
			<div class="soucuo" @click="toInput()">搜索</div>
		</div>

		<div class="content cityContent">			
				<h2>本地服务开通城市</h2>
				<ul id="cityID">
					<li v-bind:classID="104">上海</li>
					<li v-bind:classID="140">北京</li>
					<li v-bind:classID="144">南京</li>
					<li v-bind:classID="185">天津</li>
					<li v-bind:classID="216">广州</li>
					<li v-bind:classID="235">成都</li>
					<li v-bind:classID="260">杭州</li>
					<li v-bind:classID="299">深圳</li>
					<li v-bind:classID="347">苏州</li>
					<li v-bind:classID="362">西安</li>
					<li v-bind:classID="388">重庆</li>
					<li v-bind:classID="401">长沙</li>
				</ul>	
		</div>	
	
	</div>
</template>

<script>
	import "./../scss/city.scss";
	import MyAjax from "./../md/MyAjax.js";
	import router from "./../router/router.js";
	export default {
		data(){
			return {
				cityList:[]	,
				toShow:false		
			}
		},	
		methods:{
			toHeader(){
				window.history.go("-1");
			},
			toClassify(){
				router.push({path:"kind"})
			},
			toDetail(id,enjoy_url){
				var shopID=enjoy_url.split("?id=")[1];
				var shopId=shopID.split("&")[0];

				router.push({
					path:"detail",
					query:{
						id:id,
						shopId:shopId						
					}
				});
				
			},
			toInput(){
				var input=$(".searchIpt").val();
				console.log(input);
				router.push({
					path:"searchList",
					query:{
						ipt:input
					}
				})
			}
		},
		mounted(){
			var that =this;
			$("#cityID").find('li').on("click",function(){
				var id=$(this).attr("classID");
				var food=$(this).html();
				localStorage.setItem("cityName",food);				

					router.push({
						path:"home",
						query:{
							id:id,
							foodList:food
						}
				})

			})

			var cityName=localStorage.getItem("cityName");
			that.cityList=cityName;	
		}
	}
</script>

<style>
</style>