<template>
	<div class="login">
		<div class="logo02">
			<img src="./../images/logo01.png"  alt="">
		</div>
		<form>
			<input type="text" name="userID" id="userID"  placeholder="用户名">
			<input type="password" name="password" id="password"   placeholder="密码">
			<div class="method">
				<p></p>
				<p @click="login()">立即登录</p>				
			</div>
			<input type="button" name="login" id="btn" @click="tologin()" value="立即注册">		
			
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
			login(){
				router.push({path:"login"})
			},
			tologin(){
				var userID=$("#userID").val();
				var password=$("#password").val();
				console.log(userID,password);
				$("#btn").attr("disabled","disabled");
				$("#btn").val("正在注册...");
				$("#btn").css({background:"#666"});
				

				if(userID=="" || password==""){
					Toast({
					  message: '请输入用户名/邮箱/手机',
					  position: 'bottom',
					  duration: 2000
					});
				}else{

						var userObj={
							url:"http://datainfo.duapp.com/shopdata/userinfo.php",
							data:{
								status:"register",
								userID:userID,
								password:password
							},
							dataType:"JSON"
						};				

						MyAjax.zeptoAjax(userObj,function(data){

							$("#btn").removeAttr("disabled");
							$("#btn").val("注册");
							$("#btn").css({background:"#000"});

							if(data=="0"){
								Toast({
									  message: '用户名重名',
									  position: 'bottom',
									  duration: 2000
									});								
							}else if(data=="1"){
								
									localStorage.setItem("isLogin","1");
									localStorage.setItem("userID",userID);

								Toast({
									  message: '注册成功',
									  position: 'bottom',
									  duration: 2000
									});								
							}else{	
								Toast({
									  message: '注册失败',
									  position: 'bottom',
									  duration: 2000
									});		

							}
							
						},function(err){
							console.log(err)
						})

				}

			}
		},
		mounted(){

		}
	}
</script>

