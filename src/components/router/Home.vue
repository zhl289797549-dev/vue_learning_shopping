<template>
    <div >
        <Swipe :itemList="itemList"></Swipe>
        <ul class="mui-table-view mui-grid-view mui-grid-9">
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-4"><router-link to="/home/newsList">
                <img src="../../imgs/menu1.png">
                <div class="mui-media-body">新闻资讯</div></router-link></li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-4"><router-link to="/picshare/pics">
                <img src="../../imgs/menu2.png">
                <div class="mui-media-body">图片分享</div></router-link></li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-4"><router-link to="/goods/goodslist">
                <img src="../../imgs/menu3.png">
                <div class="mui-media-body">商品购买</div></router-link></li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-4"><router-link to="/goods/goodslist">
                <img src="../../imgs/menu4.png">
                <div class="mui-media-body">留言反馈</div></router-link></li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-4"><a href="#">
                <img src="../../imgs/menu5.png">
                <div class="mui-media-body">视频专区</div></a></li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-4"><a href="#">
                <img src="../../imgs/menu6.png">
                <div class="mui-media-body">联系我们</div></a></li>
        </ul>
    </div>
</template>

<script>
    import { Toast } from 'mint-ui';
    import Swipe from '../subcom/Swipe.vue'
    export default {
        data(){
            return {
                itemList:[]
            }
        },
        created() {
            console.log('Home created ')
            this.getData();
        },
        methods:{
            getData:function () {
                this.$http.get("http://47.107.137.210:8899/action.ashx/commonaction/2").then(function (result) {
                    if(result.body.status == 0){
                        Toast('数据获取成功');
                        this.itemList = result.body.message;
                    } else {
                        Toast('数据获取失败');
                    }
                    console.log(result.body);
                })
            }
        },
        components:{
            Swipe
        }
    }
</script>

<style lang="scss" scoped>
    .mui-grid-view.mui-grid-9{
        background-color: white;
        border-top:0px;
        border-left:0px;
        .mui-table-view-cell{
            border-right:0px;
            border-bottom:0px;
        }
        img{
            width:60px;
            height:60px;
        }
        .mui-media-body{
            font-size:16px;
        }
    }

</style>