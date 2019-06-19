<template>
    <div class="news-detail-view">
        <!-- 头部-->
        <div class="news-detail-top">
            <h1>{{newsDetail.title}}</h1>
            <p>
                <span>发表时间:{{newsDetail.add_time |formatTime}}</span>
                <span>点击:{{newsDetail.click}}次</span>
            </p>
        </div>
        <hr>
        <!-- 内容区域-->
        <div class="news-detail-content" v-html="newsDetail.content">
        </div>
        <commont-box></commont-box>
    </div>
</template>

<script>
    import { Toast } from 'mint-ui';
    import Comment from '../subcom/Comment.vue'
    export default {
        data(){
            return {
                id:this.$route.params.id,
                newsDetail:{}
            }
        },
        created() {
            this.getData();
        },
        methods:{
            getData:function () {
                console.log('id:'+this.id)
                this.$http.get('http://47.107.137.210:8899/api/getnew/'+this.id).then(function (result) {
                    if(result.body.status == 0){
                        this.newsDetail = result.body.message[0];
                    } else {
                        Toast('数据获取失败');
                    }
                    console.log(result.body);
                })
            }
        },
        components:{
            'commont-box':Comment
        }
    }
</script>

<style lang="scss">
    .news-detail-view{
        padding-left: 10px;
        padding-right: 10px;
        .news-detail-top{
            h1{
                font-size: 18px;
                text-align: center;
                color: red;
            }
            p{
                font-size: 12px;
                color:blue;
                display: flex;
                justify-content: space-between;
            }
        }
        .news-detail-content{
            img{
                width: 100%;
            }
        }
    }
</style>