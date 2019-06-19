<template>
    <div>
        <div id="slider" class="mui-slider">
            <div id="sliderSegmentedControl"
                 class="mui-scroll-wrapper mui-slider-indicator mui-segmented-control mui-segmented-control-inverted">
                <div class="mui-scroll">
                    <a :class="['mui-control-item',item.id == 0 ? 'mui-active':'']" v-for="item in catList" :key="item.id" @click="getImgsByCatId(item.id)">
                        {{item.title}}
                    </a>
                </div>
            </div>
        </div>
        <ul class="photo-list">
            <!--<li v-for="item in imgsList" :key="item.id">-->
                <!--<img :src="item.img_url">-->
            <!--</li>-->
            <router-link v-for="item in imgsList" :key="item.id" tag="li" :to="'/picshare/picdetail/'+item.id">
                <img v-lazy="item.img_url">
                <div class="item-title-body">
                    <div class="item-title">
                        {{item.title}}
                    </div>
                    <div class="item-body">
                        {{item.zhaiyao}}
                    </div>
                </div>
            </router-link>
        </ul>
    </div>
</template>

<script>
    import mui from '../../lib/mui/js/mui.js'
    import { Toast } from 'mint-ui';

    export default {
        data() {
            return {
                catList:[],
                imgsList:[]
            };
        },
        mounted() {
            mui('.mui-scroll-wrapper').scroll({
                deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
            });
        },
        created(){
            this.getCatList();
            this.getImgsByCatId(0);
        },
        methods: {
            getCatList:function () {
                this.$http.get('http://47.107.137.210:8899/api/getimgcategory').then(function (result) {
                    if(result.body.status == 0){
                        var all = {
                            id:0,
                            title:"全部"
                        }
                        result.body.message.unshift(all);
                        this.catList = result.body.message;
                    } else {
                        Toast('数据获取失败');
                    }
                    console.log(result.body);
                })
            },
            getImgsByCatId:function (id) {
                this.$http.get('http://47.107.137.210:8899/api/getimages/'+id).then(function (result) {
                    if(result.body.status == 0){
                        this.imgsList = result.body.message;
                    } else {
                        Toast('数据获取失败');
                    }
                    console.log(result.body);
                })
            }
        }

    }
</script>

<style lang="scss" scoped>
    * {
        touch-action: pan-y;
    }
    .photo-list{
        list-style: none;
        margin: 0px;
        padding: 10px;
        padding-bottom: 0px;
        li{
            background-color: #ccc;
            text-align: center;
            margin-bottom: 10px;
            box-shadow: 0 0 9px #999;
            position: relative;
            image[lazy=loading] {
                width: 40px;
                height: 300px;
                margin: auto;
            }
            img{
                width:100%;
                vertical-align: middle;
            }
            .item-title-body{
                color:white;
                text-align: left;
                position: absolute;
                bottom:0px;
                background-color: rgba(0,0,0,0.4);
                max-height: 80px;
                .item-title{

                }
                .item-body{

                }
            }
        }
    }
</style>