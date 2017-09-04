
<template> 
	<div class="mainMenu"> 
          <div class="menuContent">  
                <div class="menutitle">
                     本地精选
				</div>
				<ul class="menulist">
                     <li v-for="item in listdata">
						  <div class="list1"> {{item.title}}  </div>
						  <div class="list2"> {{item.price | priceStr}}  </div>
                          <div class="list3">￥{{item.num}}</div>

					 </li>
				</ul>
				
				<div class="quan">
                     <div class="quanleft">
                         <span class="iconfont">&#xe654;</span><span>礼券</span>
					 </div>
					 <div class="quanright">
						 <span>暂无可用礼券</span><span class="iconfont sa">&#xe6ca;</span>
					 </div>
				</div>
				<div class="quanbox">
					  <div class="textbox"><input type="text" class="text" />  </div>
					  <div class="btnbox"><button class="btn">兑换</button></div>
				</div>
				<div class="int"></div>
				<div class="goodstotal">
                     <div class="totalleft">商品金额</div>
					 <div class="totalright">{{totalmoney}}元</div>
				</div>
				<div class="int"></div>
				<div class="cover"></div>
				<div class="paybox">
					<div class="paycon"> 
						<span class="iconfont close">&#xe613;</span>
					</div>
					<div class="paymenu">支付订单</div>
					<div class="paymoney">{{totalmoney}}</div>
					<div class="payway">
						<p class="way1">
							<img src="./../images/pay.png" />
						    <span class="spa1">支付宝支付</span>
						</p>
						<p class="way2">
							<span class="spa2">
								<span class="iconfont">&#xe601;</span>
							</span>
						</p>
					</div>
				</div>
				<div class="menufooter">
                      <div class="f1">合计:{{totalmoney}}元</div>
					  <div class="f2">去支付</div>
				</div>
            
          </div> 
    </div> 
</template>

<script>
import Vue from "vue";
import "./../scss/menu.scss";

 Vue.filter("priceStr",function(value){
            var val=value/100;
			return val + "元";
	});
	export default {
		data(){
			return {
				listdata:[],
				totalmoney:""
			}
        },
        mounted(){ 
			 var that=this;
			 var listobj=localStorage.getItem("goods");  
			 var data=eval(listobj);
			 that.listdata=data;  

			 var count=localStorage.getItem("total");
			 that.totalmoney=count;

			 $(".sa").on("click",function(){
				  $(".quanbox").toggleClass("ss");
			 })

			 $(".f2").on("click",function(){

				  $(".cover").toggleClass("co");
				  setTimeout(function(){
                    $(".paybox").show();
				  },1000)
			 })
		  
		    $(".close").on("click",function(){
                   $(".paybox").hide();
                   $(".cover").toggleClass("co");
			})

		}
	}
</script>


<style scoped>


 .box .main .menuContent  .ss{
	  display: block;
  }


 .box .main .menuContent .co{
	 display:block;
 }
</style>