<template>
    <div >
        <ul class="mui-table-view">
            <li class="mui-table-view-cell mui-media" v-for="item in itemList" :key="item.id">
                <router-link :to="'/home/newsDetail/'+item.id">
                    <img class="mui-media-object mui-pull-left" src="http://img.cdn.qiniu.dcloud.net.cn/shuijiao.jpg">
                    <div class="mui-media-body">
                        <h1>{{item.title}}</h1>
                        <p class='mui-ellipsis'>
                            <span>发表时间:{{item.add_time  | formatTime}}</span>
                            <span>点击:{{item.click}}次</span>
                        </p>
                    </div>
                </router-link>
            </li>
        </ul>
    </div>
</template>

<script>
    export default {
        data(){
            return {
                itemList:[]
            }
        },
        created() {
            this.getData()
        },
        methods:{
            getData:function () {
                this.$http.get('http://47.107.137.210:8899/api/getnewslist').then(function (result) {
                    if(result.body.status == 0){
                        this.itemList = result.body.message;
                    } else {
                    }
                    console.log(result.body);
                })
            }
        },
        filters:{
            formatDate(val){
                console.log(val);
                var date = new Date(parseInt(val));
                var year = date.getFullYear();
                var month = date.getMonth();
                var day = date.getDay();
                return `${year}-${month}-${day}`;
            }
        }
    }
</script>

<style lang="scss" scoped>
    .mui-table-view{
        li{
            h1{
                font-size: 14px;
            }
            .mui-ellipsis{
                font-size: 12px;
                color:#226aff;
                display:flex;
                justify-content: space-between;
            }
        }
    }
</style>