<template>
	<div class="detailFoot">

		<div class="shopBox1" @click="toBtm()">
			<p>已选择：{{shopList.spec}}(1)份</p>
			<p>切换商品<i class="iconfont">&#xe60b;</i></p>
		</div>

		<div class="shopBox2">
			<div class="box1" @click="toCartBox()">
				<span class="iconfont">&#xe639;</span>
				<i class="iconfont" id="iconfont">&#xe612;</i>
				
			</div>
			<div class="box2" @click="toAddCarts()">
				加入购物车
			</div>
			<div class="box3" >
				立即购买
			</div>
		</div>

		<div class="shopBtm">

			<div class="shopBtm1" >
				<p>已选择：{{shopList.spec}}(1)份</p>
				<p @click="toClose()">关闭<i class="iconfont">&#xe60e;</i></p>
			</div>

			<div class="rushBuy">
				<div class="cirtle"></div>
				<div class="shanGou">
					<p>
						<span>闪购中</span>
						<a>{{valList1.spec}}</a>
						<i>告罄</i>
					</p>
					<p>
						{{parseInt((valList1.price)/100)}}元/{{valList1.show_entity_name}} 
						<span>￥{{parseInt((valList1.origin_price)/100)}}</span>
					</p>
				</div>				
			</div>

			<div class="rushBuy">
				<div class="cirtle" style="background:#fff;">
					<i style="color:red;font-size:20px;" class="iconfont">&#xe602;</i>
				</div>
				<div class="shanGou">
					<p>
						<a>{{valListers.spec}}</a>
					</p>
					<p>
						{{parseInt((valListers.price)/100)}}元/{{valList1.show_entity_name}} 
						<span>￥{{parseInt((valListers.origin_price)/100)}}</span>
					</p>
				</div>				
			</div>

			<div class="xuanNum">
				<b>选择数量</b>
				<p>
					<span>+</span>
					<span class="spanIpt">1</span>
					<span>-</span>
				</p>
			</div>
			<div class="confirm">
				确定
			</div>
		</div>


	</div>

</template>

<script>
	import MyAjax from "./../md/MyAjax.js";
	import "./../scss/detailFooter.scss";
	import  router from "./../router/router.js";

	export default {
		data(){
			return {
				shopList:[],
				valList1:[],
				valListers:[],
				imgList:[],
				title:[],
				price:[],
				foodId:[]

			}
		},
		methods:{
			
			toBtm(){
				$(".shopBtm").css("display","block")
			},
			toClose(){
				$(".shopBtm").css("display","none")
			},			
			toCartBox(){
				router.push({path:"cartBox"})
			},
			toAddCarts(){
				$("#iconfont").css({display:"block"});
				
 				 if(localStorage.getItem("isLogin") == "1"){ 				  

	 				  var first=localStorage.getItem("goods")== null?true:false;  //判断是否添加
					  var isSameShop =false; //判断已经添加
					  localStorage.setItem("isAddShop","1");

					  if(first){
					  	localStorage.setItem('goods','[{"img":"'+this.imgList+'","title":"'+this.title+'","num":1,"price":"'+this.price+'","id":"'+this.foodId+'"}]');
					  	
					  	localStorage.setItem("first","false")
					  }else{
					  	var str =localStorage.getItem("goods");
					  	//console.log(str);				  
					  	var arr=eval(str);					  	

					  	for(var i in arr){
					  		console.log(arr[i])
					  		if(arr[i].id==this.foodId){
					  			arr[i].num=arr[i].num+1; // 让数据num+
					  			//console.log(arr[i].num)
					  			var boxArr=JSON.stringify(arr);
					  			localStorage.setItem("goods",boxArr);
					  			isSameShop=true;
					  		}else{
					  			var str =localStorage.getItem("goods");
							  	//console.log(str);				  
							  	var arr=eval(str);					  	

							  	for(var i in arr){
							  		//console.log(arr[i])
							  		if(arr[i].id==this.foodId){
							  			arr[i].num=arr[i].num+1; // 让数据num+
							  			//console.log(arr[i].num)
							  			var boxArr=JSON.stringify(arr);
							  			localStorage.setItem("goods",boxArr);
							  			isSameShop=true;
							  		}
					  		   }

					  		   if(!isSameShop){
									var obj={img:this.imgList,num:1,title:this.title,price:this.price,id:this.foodId};
									arr.push(obj);
									var boxArr=JSON.stringify(arr);
									localStorage.setItem("goods",boxArr);
									console.log(arr);
								}					 
					    	}					
					   }
					}					
				}else{
					router.push({path:'login'})
				}


			}

		},
		mounted(){
			var that=this;
			var goodsId=this.$route.query.id;
			var shopId=this.$route.query.shopId;
			var url="https://api.ricebook.com/product/info/product_detail.json?product_id="+shopId+"&sub_product_id="+goodsId;
			MyAjax.fetch(url,function(res){
				//console.log(res);
				that.shopList=res.basic;
				that.valList1=res.basic.sub_product_array[0];
				that.valListers=res.basic.sub_product_array[1];				
				that.imgList=res.basic.product_images[0].img_url;
				that.title=res.basic.name;
				that.price=res.basic.price;	
				that.foodId=res.basic.sub_product_id		

				//console.log(valList1)
				console.log(that.valList1)
			},function(err){
				console.log(err)
			})

		}
	}
</script>

<style scoped>	
	
</style>