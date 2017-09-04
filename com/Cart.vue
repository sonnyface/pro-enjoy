<template>
	<div >
		<div class="cartBox">
			<img src="https://image.ricebook.com/business/21405298623398" alt=""/>
			<div class="invite">
				<p>
    邀请好友加入ENJOY，给TA发放价值50元礼券。好友完成首单消费后，你亦可获得价值50元礼券。
  </p>	
			</div>
			
	  		<div class="cartBtn">
	  			<button>即刻邀请</button>
	  		</div>
	  		<div class="pepNum">
	  			<p>已成功邀请<span>0</span>位好友 | 获得<span>0</span>元礼券</p>

	  		</div>

			


		</div>

	</div>
</template>

<script>
import "./../scss/cart.scss";
	export default {
		data(){
			return {
				
			}
		},mounted(){
			//判断用户有没有登录，如果登录进行ajax请求购物车数据，如果没有登录，那么跳转到登录页面
		}
	}
</script>

<style>
</style>