//1。引入组件，用于路由对应的页面
import Home from "./../com/Home.vue";
import Kind from "./../com/Kind.vue";
import Cart from "./../com/Cart.vue";
import User from "./../com/User.vue";
import Detail from "./../com/Detail.vue";
import Login from "./../com/login.vue";
import Register from "./../com/Register.vue";
import Classify from "./../com/Classify.vue";
import FoodList from "./../com/FoodList.vue";
import CartBox from "./../com/CartBox.vue";
import City from "./../com/City.vue";
import SearchList from "./../com/SearchList.vue";
import Menu from "./../com/Menu.vue";


import MainFooter from "./../com/MainFooter.vue";
import DetailFooter from "./../com/DetailFooter.vue";
//import cartFooter from "./../com/cartFooter.vue";

// 2. 定义路由
// 每个路由应该映射一个组件。 其中"component" 可以是
// 通过 Vue.extend() 创建的组件构造器，
// 或者，只是一个组件配置对象。

const routes = [
{path:"/",redirect:"/home"},
	{path:"/home",components:{
		default:Home,
		footer:MainFooter
	}},
	{path:"/kind",components:{
		default:Kind,
		footer:MainFooter
	}},
	// {path:"/kind/:classID",name:"kind",component:Kind},
	{path:"/cart",components:{
		default:Cart,
		footer:MainFooter
	}},
	{path:"/user",components:{
		default:User,
		footer:MainFooter
	}},
	{path:"/login",components:{
		default:Login
	}},
	{path:"/register",components:{
		default:Register
	}},
	{path:"/detail",components:{
		default:Detail,
		footer:DetailFooter		
	}},
	{path:"/classify",components:{
		default:Classify			
	}},
	{path:"/foodList",components:{
		default:FoodList
	}},
	{path:"/cartBox",components:{
		default:CartBox,
		//footer:cartFooter
	}},
	{path:"/city",components:{
		default:City		
	}},
	{path:"/searchList",components:{
		default:SearchList		
	}},
	{path:"/menu",components:{
		default:Menu		
	}}

	
];


export default routes;