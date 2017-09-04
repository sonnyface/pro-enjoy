<template>
	<div >
		<header class="header ">
			<div class="txt">
				<span  @click="tohome()">首页</span>
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

		<div class="content kindContent">
			<div class="banner">

				<!-- 头部 -->
				<div class="bannerImg">
					<div class="kindHeader">
						<div class="tit01">
							<h3>{{kindHeader.title}}</h3>
							<p>
								<i>1</i>/7
							</p>
						</div>
						<div class="tit02">
							<p>
								{{kindHeader.desc}}
							</p>						
						</div>					
					</div>
					<!-- 轮播图 -->
					<div class="swiper" >
						<mt-swipe :show-indicators="false" :auto="0"  >
						  <mt-swipe-item v-for="(item01,index2) in kindList01">
						  	<div class="swiperImg" @click="toDetail(index2)">
						  		<img lazy="loaded" v-bind:src="item01.url" alt="">
						  	</div>
						  	<div class="swiperTit">
						  		<P>{{item01.tag}}</P>
						  		<p>{{item01.title}}</p>
						  		<p>{{item01.desc}}</p>
						  	</div>	
						  </mt-swipe-item>
						</mt-swipe>	
					</div>
				</div>
				
				<!-- 滑动 -->
				<div class="mainhead">
					<p></p>
				</div>
				<div class="main1">					
					<ul>
						<li v-for="(item02,index) in main01" v-if="index==0">
							<img lazy="loaded" src="https://image.ricebook.com/business/20373785523424?imageView2/2/w/325" alt="">
							<div class="conver">
								<p>{{item02.desc}}</p>
								<p>{{item02.title}}</p>
							</div>
						</li>
						<li v-for="(item02,index) in main01" v-if="index==1">
							<img lazy="loaded" src="https://image.ricebook.com/business/20373791223425?imageView2/2/w/325" alt="">
							<div class="conver">
								<p>{{item02.desc}}</p>
								<p>{{item02.title}}</p>
							</div>
						</li>
						<li v-for="(item02,index) in main01" v-if="index==2">
							<img lazy="loaded" src="https://image.ricebook.com/business/20373794123454?imageView2/2/w/325" alt="">
							<div class="conver">
								<p style="font-size:20px">{{item02.desc}}</p>
								<p>{{item02.title}}</p>
							</div>
						</li>						
					</ul>
				</div>
				<div class="mainFoot">
					<p></p>
				</div>
				<!-- 滑动 -->
				<div class="wine">
					<div class="foodBay" v-for="(item03, index) in wine" v-if="index > 1" >
						<div class="moreWine">						
							<h2>{{item03.data.group_section.title}}</h2>
							<p>{{item03.data.group_section.enjoy_url_text}}</p>				
						</div>
						<div class="newShop">
							<p>{{item03.data.group_section.desc}}</p>
						</div>	
						<div class="imager" >
							<img lazy="loaded" v-bind:src="item04.url" v-for="item04 in item03.data.tabs"  alt="">							
						</div>
					</div>
				</div>
				
			</div>
		</div>
	</div>
</template>

<script>
	import "./../scss/kind.scss";
	import MyAjax from "./../md/MyAjax.js";
	import Vue from"vue";
	import router from "./../router/router.js";	
	
	import { Swipe, SwipeItem } from 'mint-ui';
	Vue.component(Swipe.name, Swipe);
	Vue.component(SwipeItem.name, SwipeItem);
	
	export default {
		data(){
			return {
				kindList01:[],
				kindHeader:[],
				main01:[],
				wine:[],
				cityList:[],
				toShow:false
			}
		},
		methods:{
			toDetail(index2){
			    var that=this;				
				var id=that.kindList01[index2].enjoy_url;
				var uid=id.split("=")[1];
				console.log(uid)				 
			},
			toSearch(){
			this.toShow = !this.toShow ;
                if(this.toShow){
                	console.log(this.toShow)
                } else{
                	console.log(this.toShow)
                }
			},
			tohome(){
				router.push({path:"home"})
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
			}
		},
		
		mounted(){
			var that=this;
			var cityName=localStorage.getItem("cityName");
			that.cityList=cityName;	

			var url="https://api.ricebook.com/hub/home/v1/web/explore.json?city_id=140";
			MyAjax.vueJson(url,function(data){
				console.log(data)				
				that.kindList01=data[0].data.tabs;
				that.kindHeader=data[0].data.group_section;
				that.main01=data[1].data.tabs;
				that.wine=data;
				console.log(that.kindList01)			
							

			},function(err){
				console.log(err)
			})
			
			
		}
	}
</script>

<style scoped>
	
</style>