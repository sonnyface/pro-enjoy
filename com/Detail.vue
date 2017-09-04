<template>
	<div >
		<header class="header ">
			<div class="txt">
				<span @click="toHome()">首页</span>
			</div>
			<div class="logo">
				<div class="city">
					<img src="./../images/logo.png" alt="" />
					<p>
						<span>北京</span>
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
			<div class="detaBanner">
			<!-- 轮播图 -->
				<div class="swiper" >
					<mt-swipe>
					  <mt-swipe-item v-for="item01 in bannerList">
					  	<div class="swiperImg">
					  		<img lazy="loaded" v-bind:src="item01.img_url" alt="">
					  	</div>					  	
					  </mt-swipe-item>
					</mt-swipe>	
				</div>
			<!-- 价格 详情 -->
				<div class="valueIfo">
					<div class="detaTit">
						<h2>{{dataList.name}}- <i class="iconfont">&#xe621;</i></h2>
						<p>{{dataList.spec}}</p>	
					</div>
					<div class="dataWord">
						{{dataList.description}}
					</div>
					<div class="value">
						<span>{{parseInt((dataList.price)/100)}}元/{{dataList.show_entity_name}}</span> 
						<span>￥{{parseInt((dataList.origin_price)/100)}}</span> 
						<span>| 随时退</span>
					</div>
				</div>
				<div class="kongBox"></div>

			<!--商家 详情 -->
				<div class="shopUse">
					<div class="shopName">
						<h2>商户信息</h2>
						<hr/>
					</div>
					<div class="shoptit">
						{{mainList.restaurant_name}}
					</div>
					<div class="address">
						<p>
							<i class="iconfont">&#xe60c;</i>
							<i class="iconfont">&#xe6c2;</i>
						</p>
						<p>{{mainList.restaurant_address}}</p>
					</div>
					<div class="phone">
						<p>
							<i class="iconfont">&#xe60c;</i>
							<i class="iconfont">&#xe6c2;</i>
						</p>
						<p>{{phoneNum}}</p>
					</div>

				</div>

				<div class="kongBox"></div>
			<!--商家 菜单 -->
				<div class="menu">
					<div class="shopName">
						<h2>menu</h2>
						<hr/>
					</div>
					<div class="menuTit">
						- {{menuList.sub_title}} -
					</div>
					<ul v-for="item in menuList.text">
						<li>{{item}}</li>						
					</ul>					
				</div>

				<div class="kongBox"></div>

			<!--商家 亮点 -->
			<div class="bling">
				<ul v-for="item01 in blingList">
					<li>
						<img :src="item01.img_url" alt="">
						<h4>{{item01.title}}</h4>
						<p style="line-height:25px;">
							{{item01.content}}
						</p>
					</li>
				</ul>
						
			</div>
			<div class="kongBox"></div>

			<!--商家 使用提示 -->
			<div class="prompt">
				<div class="promptName">
					<h2>使用提示</h2>
					<hr/>
				</div>
				<ul  v-for="(item03,index) in promptList" v-if="index<2">
					<li>{{item03.text}}</li>
				</ul>
				<div class="instructions">
					<p>更多使用说明<i class="iconfont">&#xe60b;</i></p>
				</div>
				<div class="service">
					<p><i class="iconfont">&#xe600;</i>联系客服</p>
				</div>
			</div>
			<div class="kongBox"></div>

			<!--商家 猜你喜欢 -->
			<div class="doLike">
				<div class="doLikeName">
					<h2>猜你喜欢</h2>
					<hr/>
				</div>
				<ul v-for="item04 in doLikeList">
					<li>
						<img :src="item04.product_image_url" alt="">
						<div class="likeList">
							<h5>{{item04.product_name}}</h5>
							<p>{{parseInt((item04.price)/100)}}元/{{item04.show_entity_name}}</p>
						</div>
					</li>
					
				</ul>
			</div>	

			</div>			
		</div>
		
		
	</div>
</template>

<script>
	import "./../scss/detail.scss";
	import MyAjax from "./../md/MyAjax.js";
	import Vue from"vue";
	import router from "./../router/router.js";
	
	import { Swipe, SwipeItem } from 'mint-ui';
	Vue.component(Swipe.name, Swipe);
	Vue.component(SwipeItem.name, SwipeItem);

	export default {
		data(){
			return {
				bannerList:[],
				dataList:[],
				mainList:[],
				phoneNum:[],
				menuList:[],
				blingList:[],
				promptList:[],
				doLikeList:[],
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
				router.push({path:"kind"})
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
			var goodsId=this.$route.query.id;
			var shopId=this.$route.query.shopId;
			var url="https://api.ricebook.com/product/info/product_detail.json?product_id="+shopId+"&sub_product_id="+goodsId;

			MyAjax.fetch(url,function(res){
				console.log(res)
				that.bannerList=res.basic.product_images;
				that.dataList=res.basic;

				 that.mainList=res.modules[0].data.restaurants[0];

				 that.phoneNum=res.modules[0].data.restaurants[0].restaurant_phone_numbers[0];
				 that.menuList=res.modules[1].data.contents[0];
				 that.blingList=res.modules[2].data.lights;
				 that.promptList=res.modules[3].data.contents;
				 that.doLikeList=res.modules[4].data.recommend;
				 console.log(that.menuList)

			},function(err){
				console.log(err)
			})
			
		}
	}
</script>

<style scoped>
	.header{
		height: 44px;
		width: 100%;
		background: red;
	}
	
</style>