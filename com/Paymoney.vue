<template>
	<div class="cartBox02" >
		<ul class="goodsList">
			<li class="goods01" v-for="items in shopList">
				<strong></strong>
				<img :src="items.img"/>
				<div class="cartText">
					<h2>{{items.title}}</h2>
					<p><span>类型: 规格</span></p>
					<p><a>单价: {{parseInt((items.price)/100)}}元</a></p>
					<p>
						<a>
							<span>+</span>
							<span class="spanIpt">1</span>
							<span>-</span>
						</a>
						<i class="iconfont">&#xe601;</i>
					</p>					
				</div>
			</li>
		</ul>
		<div class="likes">
			<h3>猜你喜欢</h3>
			<ul class="youLike">
				<li  v-for="(item,index) in goodsList" v-if="index<6">
					<img :src="item.product_image" alt="">
					<p>{{item.name}}</p>
					<p>
						<span>{{parseInt((item.price)/100)}}元/位</span>
						<span :class="item.original_price ? 'spanVal' : 'spanVal2'">¥{{parseInt((item.original_price)/100)}}</span>
					</p>
				</li>

			</ul>
		</div>
		
		

	</div>
</template>

<script>
	import "./../scss/paymoney.scss";
	import MyAjax from "./../md/MyAjax.js";
	export default {
		data(){
			return {
				goodsList:[],
				shopList:[]
				
			}
		},
		mounted(){
			var that=this;			
			var url="https://api.ricebook.com/3/enjoy_product/cart_recommend_product.json?city_id=1";
			MyAjax.fetch(url,function(data){
				console.log(data);
				that.goodsList=data.content;

			},function(err){
				console.log(err)
			})

			var goods=localStorage.getItem("goods");
			var arr=eval(goods);
			that.shopList=arr;
			console.log(arr);

		}
	}
</script>

<style>
</style>