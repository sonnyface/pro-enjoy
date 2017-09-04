<template>
	<div>
		<header class="header ">
			<div class="txt">
				<span @click="toHome()">首页</span>
			</div>
			<div class="logo">
				<div class="city" @click="toCity()">
					<img src="./../images/logo.png" alt="" />
					<p>
						<span class="city">{{cityFood}}</span>
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

		<div class="content">
			<div class="titLisy" v-for="item in dishList">
				<h3>{{item.name}}</h3>
				<ul>
					<li v-for="items in item.sub_category_list" @click="toFoodList(items.city_id,items.sub_category_list[0].id)">{{items.name}}</li>					
				</ul>
			</div>
			
		</div>
		

	</div>
</template>

<script>
	import "./../scss/classify.scss";
	import router from "./../router/router.js";
	import MyAjax from "./../md/MyAjax.js";

	export default {
		data(){
			return{
				dishList:[],
				cityFood:[],
				toShow:false,
			}
		},
		methods:{
			toFoodList(city_id,id){
				// console.log(city_id,id);
				router.push({
					path:"foodList",
					query:{
						listID:city_id,
						numID:id
					}
				})
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
			},
			toHome(){
				router.push({path:"home"})
			},
			tologin(){
				router.push({path:"login"})
			},
			toCity(){
				router.push({path:"city"})
			}

		},
		mounted(){
			var that=this;
			that.cityFood=localStorage.getItem("cityName");
			console.log(that.cityFood)
			//$(".city").html()

			var url="https://s1.ricebook.com/cdn/home/djEvdmlydHVhbC9pbl9jYXRlZ29yeS5qc29uP2NpdHlfaWQ9MTQwJmlzX25ld19sb2NhbD1mYWxzZSZtZDU9NzM3NTVlZGQxYTQyMGYyMjJmYzE3NzBkNzkxZWM0ZDUmMjAxNzA4MjEyMzAw.json";
			MyAjax.fetch(url,function(data){
				console.log(data);
				that.dishList=data;

			},function(err){
				console.log(err)
			})

		}
	}
	
</script>