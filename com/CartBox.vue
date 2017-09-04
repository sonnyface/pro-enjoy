<template>
	<div class="cartBox02" >

		<ul class="goodsList">
			<li class="goods01" v-for="(items,index1) in shopList">
				<strong class="chioce" @click="chioce(index1)">
					<i @click="chance(index1)" class="iconfont">&#xe602;</i>
				</strong>
				<img :src="items.img"/>
				<div class="cartText">
					<h2>{{items.title}}</h2>
					<p><span>类型: 规格</span></p>
					<p><a>单价: {{parseInt((items.price)/100)}}元</a></p>
					<p>
						<a class="toAdd">
							<span @click="addGoods(index1)">+</span>
							<span class="spanIpt">{{items.num}}</span>
							<span @click="reduceGoods(index1)">-</span>
						</a>
						<i @click="removeGoods(index1)" class="iconfont">&#xe601;</i>
					</p>					
				</div>
			</li>
		</ul>
		 <p v-if="shopList.length===0" class="shopping">您的购物车为空</p>

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

		<div class="shopBoxcar">
			<div class="Boxcar1" >
				<div class="shopSell">
					<i></i>
					<span >全选</span>
					<p>
						合计：
						<b>{{parseInt((totalPrice)/100)}}</b>
						元
					</p>
				</div>
				
			</div>
			<div class="Boxcar2" @click="toTotal()">
				去结算
			</div>
		</div>
	
	</div>
</template>

<script>
	import "./../scss/cartBox.scss";
	import MyAjax from "./../md/MyAjax.js";
	import router from "./../router/router.js";
	import tween from "tween";	
	export default {
		data(){
			return {
				goodsList:[],
				shopList:[],
				totalPrice:[]			
			}
		},
		methods:{
			toTotal(){
				router.push({path:"menu"})
				
			},
			addGoods(index1){
				var first=eval(localStorage.getItem("goods"));
				console.log(first);
				var num=this.shopList[index1].num++;
				console.log(num);	
			

			},
			reduceGoods(index1){
				if(this.shopList[index1].num>1){
					var num=this.shopList[index1].num--;
					console.log(num);
				}
				
			},
			chioce(index1){	
				$(".goods01").eq(index1).find(".chioce").find("i").html("&#xe651;").css({color:"#666"});
			},
			chance(index1){
				$(".goods01").eq(index1).find(".chioce").find("i").html("&#xe602;")
			},
			removeGoods(index1){
				var first=eval(localStorage.getItem("goods"));
				console.log(first);							
		            
		        if(index1==0){		        	
		        	this.shopList.splice(index1,1);
		        	localStorage.removeItem("goods");
		        }else{
		        	 var goods02=first.splice(index1,1)
		        	 this.shopList.splice(index1,1); 

			         var setGoods=JSON.stringify(first);
			         console.log(setGoods);
			         localStorage.setItem("goods",setGoods) 
			    }
				
			},
			 tween:function(newValue,oldValue){
            var vm=this;
            var twen=new TWEEN.Tween({animatenum:oldValue});
            function animate() {
                requestAnimationFrame(animate);
                TWEEN.update();
            };
            twen.to({animatenum:newValue},750);
            twen.onUpdate(function(){
            //toFixed();保留几位小数
            vm.animatenum = this.animatenum.toFixed();
            })
            twen.start();
            animate();
            }
		},
		mounted(){
			var that=this;
			//this.tween=0;			
			var url="https://api.ricebook.com/3/enjoy_product/cart_recommend_product.json?city_id=1";
			MyAjax.fetch(url,function(data){
				//console.log(data);
				that.goodsList=data.content;

			},function(err){
				console.log(err)
			})

			var goods=localStorage.getItem("goods");
			var arr=eval(goods);
			that.shopList=arr;
			console.log(arr);

		},
		  watch:{
	         toComput2:function(newValue,oldValue){
	         this.tween(newValue,oldValue);
	       }

	     },

		computed:{
		     //计算总金额
		     toComput2(){
		         var that=this;
		         //每次进来要重置总金额
		         that.totalPrice=0;
		         that.shopList.forEach(function(mess){
		         that.totalPrice+=parseInt(mess.price*mess.num);
		         })
		        return this.totalPrice;
		     }
	     },
	     filters:{
         filtermoney:function(value){
         return '￥'+value ;
         }
     },

	}
</script>

<style>
</style>