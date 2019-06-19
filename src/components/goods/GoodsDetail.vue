<template>
    <div class="goodsinfo-container">
        <transition
            @before-enter="beforeEnter"
            @enter="enter"
            @after-enter="afterEnter"
            >
            <div class="ball" v-show="showBall" ref="ball"></div>
        </transition>
        <div class="mui-card">
            <Swipe :itemList="swipeList"></Swipe>
        </div>

        <!-- 商品购买区-->
        <div class="mui-card">
            <!--页眉，放置标题-->
            <div class="mui-card-header">{{goodsInfo.title}}</div>
            <div class="mui-card-content">
                <div class="mui-card-content-inner">
                    <p class="price">
                        市场价:<span class="old">￥{{goodsInfo.market_price}}</span>销售价:<span class="now_price">￥{{goodsInfo.sell_price}}</span>
                    </p>
                    <p>购买数量<numbox @getNum="onNumChange" :max="goodsInfo.stock_quantity"></numbox></p>
                    <p>
                        <mt-button type="primary" size="small" >立即购买</mt-button>
                        <mt-button type="danger" size="small" @click="addToShoppingCar">加入购物车</mt-button>
                    </p>
                </div>

            </div>
        </div>

        <div class="mui-card">
            <!--页眉，放置标题-->
            <div class="mui-card-header">商品参数</div>
            <!--内容区-->
            <div class="mui-card-content">
                <div class="mui-card-content-inner">
                    <p>商品货号:{{goodsInfo.goods_no}}</p>
                    <p>库存情况:{{goodsInfo.stock_quantity}}</p>
                    <p>上架时间:{{goodsInfo.add_time |formatTime}}</p>
                </div>
            </div>
            <!--页脚，放置补充信息或支持的操作-->
            <div class="mui-card-footer">
                <mt-button type="primary" size="large" plain @click="gotoPicText">图文介绍</mt-button>
                <mt-button type="danger" size="large" plain @click="gotoComment">商品评论</mt-button>
            </div>
        </div>
    </div>
</template>

<script>
    import { Toast } from 'mint-ui';
    import Swipe from '../subcom/Swipe.vue'
    import numbox from './goodsinfo_number.vue'
    export default {
        data(){
            return {
                id:this.$route.params.id,
                swipeList:[],
                goodsInfo:{},
                number:1,
                showBall:false
            }
        },
        created(){
          this.getSwipeData();
          this.getGoodsInfo();
        },
        methods:{
            getSwipeData:function () {
                this.$http.get("http://47.107.137.210:8899/api/getthumimages").then(function (result) {
                    if(result.body.status == 0){
                        Toast('数据获取成功');
                        result.body.message.forEach(function (item) {
                            item.img = item.src;
                        })
                        this.swipeList = result.body.message;
                    } else {
                        Toast('数据获取失败');
                    }
                    console.log(result.body);
                })
            },
            getGoodsInfo:function () {
                this.$http.get("http://47.107.137.210:8899/api/goods/getinfo/"+this.id).then(function (result) {
                    if(result.body.status == 0){
                        this.goodsInfo = result.body.message[0];
                    } else {
                        Toast('数据获取失败');
                    }
                    console.log(result.body);
                })
            },
            gotoPicText:function () {
                this.$router.push('goodsPicText');
            },
            gotoComment:function () {
                this.$router.push('goodsComment');
            },
            addToShoppingCar:function () {
                // this.showBall = !this.showBall;
                this.showBall = !this.showBall;
                console.log('ok')
                //把添加到购物车的商品 保存到 store中
                //{ id }
                var goods = {
                    id:this.id,
                    goods_no:this.goodsInfo.goods_no,
                    sell_price:this.goodsInfo.sell_price,
                    selected:true,
                    count:this.number
                }
                this.$store.commit("add2SCar", goods);
            },
            beforeEnter(el) {
                console.log('beforeEnter')
                el.style.transform = "translate(0,0)"
            },
            enter(el,done) {
                console.log('enter')
                var ballRect = this.$refs.ball.getBoundingClientRect();
                var badgeRect = document.getElementById("badge").getBoundingClientRect();
                var xDist = badgeRect.left - ballRect.left;
                var yDist = badgeRect.top - ballRect.top;
                console.log(ballRect)
                el.offsetWidth
                el.style.transform = `translate(${xDist}px,${yDist}px)`
                el.style.transition = "all 1s cubic-bezier(.17,.67,.83,.67)"
                done();
            },
            afterEnter(el) {
                console.log('afterEnter')
                this.showBall = !this.showBall;
            },
            onNumChange:function (number) {
                console.log("number:"+number)
                this.number = number;
            }
        },
        components:{
            Swipe,numbox
        }
    }
</script>

<style lang="scss" scoped>
    .ball{
        width:15px;
        height: 15px;
        border-radius: 50%;
        background-color: red;
        position: absolute;
        left:133px;
        top:362px;
        z-index: 99;
    }
    .goodsinfo-container{
        background-color: #eee;
        overflow: hidden;
        padding-bottom: 50px;
        .price{
            .now_price{
                color:red;
                font-size: 16px;
                font-weight: bold;
            }
            .old{
                text-decoration: line-through;
                font-size: 12px;
                margin-left: 10px;
            }
        }

        .mui-card-footer{
            display: block;
            button{
                margin:10px 0px;
            }
        }
    }
</style>