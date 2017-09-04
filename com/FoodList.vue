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
						<span>{{cityList}}</span>
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
			<div class="foodHead01">
				<div class="all">
					<a >全部</a>
				</div>
				<div class="all" @click="toRanks()">
					<a>智能排序 <i class="iconfont">&#xe60b;</i></a>
				</div>
			</div>
			<div class="rank" v-show="isShow">
				<ul class="ranksUl" >
					<li @click="toFoodLists(item01.sort_id)" v-for="item01 in rankLink" 
					v-bind:classid="item01.sort_id">{{item01.sort_name}}</li>								
				</ul>
			</div>

			<div class="shoppList09">				
				<ul class="shoppList08" v-for="item in shoppList">
					<li>
						<img lazy="loaded" :src="item.product_image" alt="">
						<div class="likeList">
							<h5>{{item.name}}</h5>
							<p>{{parseInt((item.price)/100)}}元/{{item.original_price}}</p>
							<p>
								<i v-bind:class="item.area?'iconfont':'iconfonts'" >&#xe60c;</i>
								<span>{{item.area}}</span>								
							</p>
						</div>
					</li>					
				</ul>						
			</div>

		</div>

		

	</div>
</template>

<script>
	import "./../scss/foodList.scss";
	import MyAjax from "./../md/MyAjax.js";
	import router from "./../router/router.js";
	export default {
		data(){
			return {
				shoppList:[],
				// shoppList02:[],
				rankLink:[],
				isShow:false,
				cityList:[],
				toShow:false				
			}
		},

		methods:{
			toSearch(){
			this.toShow = !this.toShow ;
                if(this.toShow){
                	console.log(this.toShow)
                } else{
                	console.log(this.toShow)
                }
			},
			toHome(){
				router.push({path:"home"});
			},
			tologin(){
				router.push({path:"login"});
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
			toRanks(){				
				var that=this;	
				this.isShow = !this.isShow ;
                if(this.isShow){                     
                   var url1="https://api.ricebook.com/4/tab/sub_category.json?category_id=4&city_id=140&from_id=0";
					MyAjax.fetch(url1,function(data1){
						console.log(data1)
						that.isShow=true;	
						that.rankLink=data1.sort;
					},function(err){
						console.log(err)
					}) 	

                }else{ 
               	 console.log(this.isShow)                     
                }
                
             },

		 	 //智能排序
		     toFoodLists(sort_id){
			  	//console.log(sort_id);
			  	var that=this;
				var numID=this.$route.query.numID;
				var listID=this.$route.query.listID;
				// console.log(numID,listID)
			
				$(".ranksUl").find("li").eq(sort_id-1).css({background:"#eee",color:"red"}).siblings().css({background:"#fff",color:"#000"})				
				if(sort_id==3){
					$(".ranksUl").find("li").eq(sort_id-2).css({background:"#eee",color:"red"}).siblings().css({background:"#fff",color:"#000"})
				}
				if(sort_id==2){
					$(".ranksUl").find("li").eq(sort_id).css({background:"#eee",color:"red"}).siblings().css({background:"#fff",color:"#000"})
				}
				
				
			  	var url="https://api.ricebook.com/4/tab/category_product_list.json?category_id="+numID+"&sort="+sort_id+"&from_id=0&city_id="+listID+"&page=0";
					MyAjax.fetch(url,function(data){
						//console.log(data)
						that.shoppList=data;
						that.isShow=false;
					},function(err){
						console.log(err)
					})

			  }
		},
		mounted(){
			var that=this;
			var numID=this.$route.query.numID;
			var listID=this.$route.query.listID;
			console.log(numID,listID);

			var cityName=localStorage.getItem("cityName");
			that.cityList=cityName;

			var url="https://api.ricebook.com/4/tab/category_product_list.json?category_id="+numID+"&sort=1&from_id=0&city_id="+listID+"&page=0";
			MyAjax.fetch(url,function(data){
				//console.log(data)
				that.shoppList=data;
			},function(err){
				console.log(err)
			})
			
		}
	}
</script>

<style>
</style>