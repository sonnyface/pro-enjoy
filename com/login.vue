<template>
	<div class="login">
		<div class="logo02">
			<img src="./../images/logo01.png"  alt="">
		</div>
		<form>
			<input type="text" name="userID" id="userID"  placeholder="用户名">
			<input type="password" name="password" id="password"   placeholder="密码">
			<div class="method">
				<p @click="toRegister()">立即注册</p>
				<p>忘记密码？</p>
			</div>
			<input type="button" name="login" id="btn" @click="tologin()" value="登录">		
			
		</form>
		<div class="bottom">
			<p>未注册的用户登录后自动创建账户</p>
			<p> 登录即表示您同意<a href="https://topic.ricebook.com/topicpage/agreement.html">用户协议</a></p>
		</div>

	</div>
	
</template>

<script>
import "./../scss/login.scss";
import { Toast } from 'mint-ui';
import MyAjax from "./../md/MyAjax.js";
import router from "./../router/router.js";

	export default {
		data(){
			return{

			}
		},
		methods:{
			toRegister(){
				router.push({path:"Register"})
			},
			tologin(){
				var userID=$("#userID").val();
				var password=$("#password").val();
				console.log(userID,password);
				$("#btn").attr("disabled","disabled");
				$("#btn").val("正在登录...");
				$("#btn").css({background:"#666"});

				if(userID=="" || password==""){
					Toast({
					  message: '请输入用户名/邮箱/手机',
					  position: 'bottom',
					  duration: 2000
					});
				}else{
						$("#btn").attr("disabled","disabled");						

						var url ='http://datainfo.duapp.com/shopdata/userinfo.php?status=login&userID='+userID+'&password='+password;

						MyAjax.fetch(url,function(data){

							$("#btn").removeAttr("disabled");
							$("#btn").val("注册");
							$("#btn").css({background:"#000"});

							if(data=="0"){
								Toast({
									  message: '用户不存在',
									  position: 'bottom',
									  duration: 2000
									});								
							}else if(data=="2"){
								Toast({
									  message: '密码错误',
									  position: 'bottom',
									  duration: 2000
									});								
							}else{
								
									$("#btn").val("正在登录...");
									$("#btn").css({background:"#666"});
									localStorage.setItem("isLogin","1");
									localStorage.setItem("userID",userID);	
									
									Toast({
									  message: '登录成功',
									  position: 'bottom',
									  duration: 2000
									});

								setTimeout(function(){
									
									router.push({ path: 'home' })
								},3000)
							}
							
						},function(err){
							console.log(err);							
							
						})

				   }

			  }
		},
		mounted(){

		}
	}
</script>

