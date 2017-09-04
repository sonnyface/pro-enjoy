<template>
	<div class="foodHight">
		<header class="header ">
			<div class="txt">
				<span @click="toHome()">首页</span>
			</div>
			<div class="logo">
				<div class="city">
					<img src="./../images/logo.png" alt="" />
					<p>
						<span>{{name}}</span>
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
			<ul class="foodHead02">
				<li class="active">
					本地服务
				</li>
				<li >
					全国送
				</li>
			</ul>

			<div class="ranks">
				<ul>
					<li></li>
									
				</ul>
			</div>

			<div class="shoppList09">				
				<ul class="shoppList08" v-for="item in shoppList">
					<li>
						<img lazy="loaded" :src="item.product_image" alt="">
						<div class="likeList">
							<h5>{{item.name}}</h5>
							<p>
								{{parseInt((item.price)/100)}}元/{{item.show_entity_name}}
								<a :class="item.original_price ? 'original2':'original3'">￥{{parseInt((item.original_price)/100)}}</a>
							</p>							
						</div>
					</li>					
				</ul>
								
			</div>
			

		</div>

		

	</div>
</template>

<script>
	import "./../scss/searchList.scss";
	import MyAjax from "./../md/MyAjax.js";
	import router from "./../router/router.js";
	export default {
		data(){
			return {
				shoppList:[],
				name:[],
				toShow:false
						
				
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
				router.push({path:"home"});
			},
			tologin(){
				router.push({psth:"login"});
			}
			
		},
		mounted(){
			var that=this;
			var city=localStorage.getItem("cityName");
			that.name=city;
			var ipt=this.$route.query.ipt

			var url="https://api.ricebook.com/3/enjoy_product/search.json?city_id=347&keyword="+ipt+"&page=0";
					MyAjax.fetch(url,function(data){
						console.log(data)
						that.shoppList=data.products;
					},function(err){
						console.log(err)
					})	
			

			$(".foodHead02").find("li").on("click",function(){
				var index =$(this).index();

				$(".foodHead02").find("li").eq(index).addClass('active').siblings().removeClass('active')

				if(index==0){
					// $(".shoppList09").html("");							
					var url="https://api.ricebook.com/3/enjoy_product/search.json?city_id=347&keyword="+ipt+"&page=0";
					MyAjax.fetch(url,function(data){
						console.log(data)
						that.shoppList=data.products;
					},function(err){
						console.log(err)
					})

				}else {
										
					var url2="https://api.ricebook.com/3/enjoy_product/search.json?city_id=1&keyword="+ipt+"&page=0";
					MyAjax.fetch(url2,function(res){
						console.log(res)
						that.shoppList=res.products;
					},function(err){
						console.log(err)
					})
				}
			})

			



			// $(".type").bind("scroll",function(event){
			// 	var typeHeight=$(".type").height();				
			// })
						
		}
	}
</script>

<style>
</style>