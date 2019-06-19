import VueRouter from 'vue-router'
import Home from './components/router/Home.vue'
import Member from './components/router/Member.vue'
import ShoppingCar from './components/router/ShoppingCar.vue'
import Search from './components/router/Search.vue'
import NewsList from './components/home/NewsList.vue'
import NewsDetail from './components/home/NewsDetail.vue'
import PicShare from './components/picshare/PicShare.vue'
import PicDetail from './components/picshare/PicDetail.vue'
import GoodsList from './components/goods/GoodsList.vue'
import GoodsDetail from './components/goods/GoodsDetail.vue'
import GoodsPicText from './components/goods/GoodsPicText.vue'
import GoodsComment from './components/goods/GoodsComment.vue'
// 3. 创建路由对象
var router = new VueRouter({
  routes: [
    {
      path:'/',
      redirect:'/home'
    },
      {
          path:'/home/newsList',
          component:NewsList
      },
    {
      path:'/home/newsDetail/:id',
      component:NewsDetail
    },
    {
      path:'/home',
      component:Home
    },
    {
      path:'/member',
      component:Member
    },
    {
      path:'/shoppingCar',
      component:ShoppingCar
    },
    {
      path:'/search',
      component:Search
    },
    {
      path:'/picshare/pics',
      component:PicShare
    },
    {
      path:'/picshare/picdetail/:id',
      component:PicDetail
    },
      {
          path:'/goods/goodslist',
          component:GoodsList
      },
    {
      name:'goodsDetail',
      path:'/goods/goodsdetail/:id',
      component:GoodsDetail
    },
    {
      name:'goodsPicText',
      path:'/goods/goodsPicText',
      component:GoodsPicText
    },
    {
      name:'goodsComment',
      path:'/goods/goodsComment',
      component:GoodsComment
    }
  ],
  linkActiveClass:'mui-active'
})

// 把路由对象暴露出去
export default router