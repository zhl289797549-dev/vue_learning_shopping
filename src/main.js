import Vue from 'vue'
import VueResource from 'vue-resource'
import './lib/mui/css/mui.min.css'
import './lib/mui/css/icons-extra.css'
// 1. 导入 vue-router 包
import VueRouter from 'vue-router'
//导入vuex包
import Vuex from 'vuex'

//注册vuex
Vue.use(Vuex)
// 2. 手动安装 VueRouter 
Vue.use(VueRouter)
Vue.use(VueResource);
// 导入 app 组件
import app from './App.vue'
import { Lazyload } from 'mint-ui';

// 导入 自定义路由模块
import router from './router.js'

import { Header } from 'mint-ui';


// import { Swipe, SwipeItem,Button } from 'mint-ui';
// Vue.component(Header.name, Header);
// Vue.component(Swipe.name, Swipe);
// Vue.component(SwipeItem.name, SwipeItem);
// Vue.component(Button.name,Button)
// Vue.use(Lazyload);
import MintUI from 'mint-ui';
import 'mint-ui/lib/style.css'
import VuePreview from 'vue-preview'
// defalut install
Vue.use(VuePreview)
Vue.use(MintUI);


Vue.filter('formatTime', function (val) {
  const date = new Date(parseInt(val));
  const hour = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();
  return `${hour} : ${minutes} : ${seconds}`;
})
var cars = JSON.parse(localStorage.getItem("cars") || '[]');
// new Vuex.Store()实例，得到一个数据仓储对象
var store = new Vuex.Store({
  state:{
    cars:cars
  },
  mutations:{
    add2SCar(state,goods){
      var flag = false;
      state.cars.some(function (item) {
        if(item.id == goods.id){
          item.count = item.count + parseInt(goods.count);
          flag = true;
          return true;
        }
      })
      if(!flag){
        state.cars.push(goods);
      }
      localStorage.setItem("cars",JSON.stringify(cars))
    },
    updateCarsInfo:function(state,obj){
      state.cars.forEach(item=>{
        if(item.id == obj.id){
          item.count = parseInt(obj.count);
        }
      })
      localStorage.setItem("cars",JSON.stringify(state.cars))
    },
    deleteCarsInfo:function(state,id){
      state.cars.some((item,i)=>{
        if(item.id == id){
          state.cars.splice(i,1);
          return true;
        }
      })
      localStorage.setItem("cars",JSON.stringify(state.cars))
    },
    updateSelectedInfo:function(state,obj){
      state.cars.forEach(item=>{
        if(item.id == obj.id){
          item.selected = obj.selected;
        }
      })
      localStorage.setItem("cars",JSON.stringify(state.cars))
    }
  },
  getters:{
    getCount:function (state) {
      var count = 0;
      state.cars.forEach(function (item) {
        count = count +item.count;
      })
      return count;
    },
    getIds:function (state) {
      var idArr = [];
      state.cars.forEach(function (item) {
        idArr.push(item.id)
      })
      return idArr.join(',');
    },
    getGoodsCount:function (state) {
      var o = {};
      state.cars.forEach(item=>{
        o[item.id] = item.count;
      })
      return o;
    },
    getGoodsStatus:function (state) {
      var o = {};
      state.cars.forEach(item=>{
        o[item.id] = item.selected;
      })
      return o;
    },
    getCountAndAmount:function (state) {
      var o = {
        allCount:0,
        allAmount:0
      };
      state.cars.forEach(item=>{
        if(item.selected){
          o.allCount += parseInt(item.count);
          o.allAmount += parseInt(item.count) * item.sell_price;
        }
      })
      return o;
    }
  }
});
var vm = new Vue({
  el: '#app',
  render: c => c(app), // render 会把 el 指定的容器中，所有的内容都清空覆盖，所以 不要 把 路由的 router-view 和 router-link 直接写到 el 所控制的元素中
  router, // 4. 将路由对象挂载到 vm 上
  store  //将vuex创建的store挂载到VM实例上 这样任何组件都能使用store来存取数据
})

// 注意： App 这个组件，是通过 VM 实例的 render 函数，渲染出来的， render 函数如果要渲染 组件， 渲染出来的组件，只能放到 el: '#app' 所指定的 元素中；
// Account 和 GoodsList 组件， 是通过 路由匹配监听到的，所以， 这两个组件，只能展示到 属于 路由的 <router-view></router-view> 中去；