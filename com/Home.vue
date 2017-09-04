<template>
	<div class="home" >
		<header class="header ">
			<div class="txt">
				<span @click="toClassify()">分类</span>
			</div>
			<div class="logo" @click="toCity()">
				<div class="city">
					<img src="./../images/logo.png" alt="" />
					<p>
						<span  class="cityAdress">{{cityList}}</span>
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
		
		
		<div class="content homeContent" >
			<!--  <div class="content homeContent" 
			 v-infinite-scroll="loadMore"
			 infinite-scroll-disabled="loading"
			 infinite-scroll-distance="10">
 -->

			<div class="everyWeek">
				<div class="everyFood"  v-for="item in everyFood">
					<div class="foodHeader">
						<h2>{{item.group_section.title}}</h2>
						<p>{{item.group_section.desc}}</p>
					</div>
					<ul class="foodList" v-for="items in item.tabs">
						<li @click="toDetail(items.id,items.enjoy_url)">
							<img v-bind:src="items.url" alt="" />
							<p>{{items.title}}</p>
							<span>{{items.desc}}</span>
						</li>
					</ul>
				</div>				
			</div>

		</div>
		
	</div>
</template>

<script>
	import router from "./../router/router.js";
	import Vue from 'vue';
	import "./../scss/home.scss";
	import MyAjax from"./../md/MyAjax.js";

	import { InfiniteScroll } from 'mint-ui';
	Vue.use(InfiniteScroll);
	
	export default {
		data(){
			return {
				everyFood:[],
				foodList:[],
				toShow:false,
				cityList:[]

				
				}
		},
		methods:{
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
			toSearch(){
			this.toShow = !this.toShow ;
                if(this.toShow){
                	console.log(this.toShow)
                } else{
                	console.log(this.toShow)
                }
			},
			toCity(){
				router.push({path:"city"})
			},
			toClassify(){
				router.push({path:"classify"})
			},
			tologin(){
				router.push({path:"login"})
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

			//下拉加载	
			// loadMore() {
			//   this.loading = true;			  
			//   	var that=this;
			// 	var url="https://api.ricebook.com/hub/home/v1/web/week_choice.json?city_id=140&page=0";
			// 	MyAjax.vueJson(url,function(data){
			// 		console.log(data);
			// 		that.everyFood=data;

			// 		// setTimeout(() => {
			// 	 //    let last = that.everyFood[that.everyFood.length - 1];
			// 		//     for (let i = 1; i <= 10; i++) {
			// 		//       that.everyFood.push(last + i);
			// 		//     }
			// 		//     this.loading = false;
			// 		//   }, 2500);
			
			// 	},function(err){
			// 		console.log(err)
			// 	})
				
			// }			


		},
		mounted(){
			var that=this;	
			var num=0;	
			var id=this.$route.query.id;
			var foodList=this.$route.query.foodList;

			var cityName=localStorage.getItem("cityName");
			that.cityList=cityName;	

			//$(".cityAdress").html(foodList);
			var url="https://api.ricebook.com/hub/home/v1/web/week_choice.json?city_id=140&page="+num;
			MyAjax.vueJson(url,function(data){
				//console.log(data);
				that.everyFood=data;
	
			},function(err){
				console.log(err)
			})
			
		
			if(id && foodList){
				console.log(id,foodList)
					$(".cityAdress").html(foodList);
					var url="https://api.ricebook.com/hub/home/v1/web/week_choice.json?city_id="+id+"&page"+num;
					MyAjax.vueJson(url,function(data){
						//console.log(data);
						that.everyFood=data;
			
					},function(err){
						console.log(err)
					})

			}else{
				$(".cityAdress").html('北京');
			}	

			// //点击出现输入框	
			// $(".searchImg").on("click",function(){
			// 	$(".search").css({display:"block"})
			// })

			

			// $(".type").on("scroll",function(){
			// 	var homeHeight=$(".home").height();				
			// 	var conHeight=$(".homeContent").height();	
			// 	var typeHeight=$(this).scrollTop();
			// 	//console.log(conHeight-typeHeight)				

			// 	if(conHeight-typeHeight<570 || 570*num){
			// 		num=num+1;
			// 		console.log(num)
			// 		var id=this.$route.query.id;				
			// 		var url="https://api.ricebook.com/hub/home/v1/web/week_choice.json?city_id="+id+"&page="+num;
			// 		MyAjax.vueJson(url,function(data){
			// 		    that.everyFood=data;
			
			// 		},function(err){						
			// 			console.log(err)
			// 		})
			// 	}
			// })
		}
		
	}
</script>

<style scoped>
	
</style>