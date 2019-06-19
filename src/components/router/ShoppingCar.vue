<template>
    <div class="shopcar-container">
        <div class="goods-list">

            <div class="mui-card" v-for="(item,i) in shopCarList" :key="item.id">
                <!--内容区-->
                <div class="mui-card-content">
                    <mt-switch  v-model="$store.getters.getGoodsStatus[item.id]" @change="onSwitchChange(item.id,$store.getters.getGoodsStatus[item.id])"></mt-switch>
                    <img :src="item.thumb_path">
                    <div class="info">
                        <h1>{{item.title}}</h1>
                        <p>
                            <span class="price">￥{{item.sell_price}}</span>
                            <numbox :initCount="$store.getters.getGoodsCount[item.id]" :goodsId="item.id"></numbox>
                            <a href="#" @click.prevent="deleteGoods(item.id,i)">删除</a>
                        </p>
                    </div>

                </div>
            </div>

            <div class="mui-card">
                <!--内容区-->
                <div class="mui-card-content jiesuan">
                    <div class="left">
                        <p>总计(不含运费)</p>
                        <p>已勾选商品<span class="red">{{$store.getters.getCountAndAmount.allCount}}</span>件，总价￥<span class="red">{{$store.getters.getCountAndAmount.allAmount}}</span></p>
                    </div>
                    <mt-button type="danger">去结算</mt-button>
                </div>
            </div>

            <p>{{$store.getters.getGoodsStatus}}</p>

        </div>
    </div>

</template>

<script>
    import numbox from '../goods/shopcar_numbox.vue'

    export default {
        data() {
            return {
                shopCarList: [],
                itemList: []
            }
        },
        created() {
            this.getShopCarList();
        },
        methods: {
            getShopCarList: function () {
                var ids = this.$store.getters.getIds;
                console.log("ids:" + ids)
                this.$http.get('http://47.107.137.210:8899/api/goods/getshopcarlist/' + ids).then(function (result) {
                    if (result.body.status == 0) {
                        this.shopCarList = result.body.message;
                    }
                    console.log(this.shopCarList);
                    console.log(this.shopCarList[1].title);
                })
            },
            deleteGoods:function (id,index) {
                this.shopCarList.splice(index,1);
                this.$store.commit("deleteCarsInfo", id)
            },
            onSwitchChange:function (id,value) {
                console.log(id);
                console.log(value)
                this.$store.commit("updateSelectedInfo", {id:id,selected:value})
            }
        },
        components: {
            numbox
        }
    }
</script>

<style lang="scss" scoped>
    .shopcar-container {
        .mui-card-content {
            display: flex;
            align-items: center;
            padding: 10px;
        }

        background-color: #eee;
        overflow: hidden;

        img {
            width: 60px;
            height: 60px;
        }

        h1 {
            font-size: 13px;
        }

        .info {
            .price {
                color: red;
                font-weight: bold;
            }
        }

        .jiesuan{
            display: flex;
            justify-content:space-between;
            align-items: center;
        }

        .red{
            color:red;
            font-weight: bold;
            font-size: 16px;
        }
    }
</style>