<template>
    <div class="goods-list">

        <div class="goods-item" v-for="item in itemList" :key="item.id" @click="gotoDetail(item.id)">
            <img :src="item.img_url" alt="手机图片">
            <h3 class="title">{{item.title}}</h3>
            <div class="info">
                <div>
                    <p class="price">
                        <span class="now">{{item.sell_price}}</span>
                        <span class="old">{{item.market_price}}</span>
                    </p>
                </div>
                <div>
                    <p class="sell">
                        <span>热卖中</span>
                        <span>剩{{item.stock_quantity}}件</span>
                    </p>
                </div>
            </div>
        </div>
        <mt-button type="danger" size="large" plain @click="loadMore">加载更多</mt-button>

    </div>
</template>

<script>
    import { Toast } from 'mint-ui';
    export default {
        data(){
            return {
                itemList:[],
                pageIndex:0,
            }
        },
        created() {
            this.getData();
        },
        methods:{
            getData:function () {
                this.$http.get('http://47.107.137.210:8899/api/getgoods?pageindex='+this.pageIndex).then(function (result) {
                    if(result.body.status == 0){
                        if(result.body.message.length == 0){
                            Toast('没有数据了');
                        } else {
                            this.itemList=this.itemList.concat(result.body.message);
                        }
                    } else {
                        Toast('数据获取失败');
                    }
                })
            },
            loadMore:function () {
                this.pageIndex++;
                this.getData();
            },
            gotoDetail:function (id) {
                this.$router.push({name:'goodsDetail',params:{id,id}});
            }
        }
    }
</script>

<style lang="scss" scoped>
    .goods-list{
        display: flex;
        flex-wrap: wrap;
        padding: 7px;
        justify-content: space-between;
        padding-bottom: 60px;
        .goods-item{
            width: 49%;
            border: 1px solid #ccc;
            margin: 4px 0px;
            padding: 2px;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            min-height: 292px;
            img{
                width: 100%;
            }
            .title{
                font-size: 14px;
            }
            .info{
                background-color: #eee;
                p{
                    margin: 0px;
                    padding: 5px;
                }
               .price{
                   .now{
                        color:red;
                       font-weight: bold;
                       font-size: 16px;
                   }
                   .old{
                        text-decoration: line-through;
                       font-size: 12px;
                       margin-left: 10px;
                   }
               }
                .sell{
                    display: flex;
                    justify-content: space-between;
                }
            }
        }
    }
</style>