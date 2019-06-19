<template>
    <div class="cmt-container">
        <h3>发表评论</h3>
        <hr>
        <textarea placeholder="请输入要bb的内容（最多吐槽120字）" maxlength="120" v-model="comment"></textarea>
        <mt-button type="primary" size="large" @click="uploadComment">发表评论</mt-button>
        <div class="cmt-list">
            <div class="cmt-item" v-for="(item,index) in commentList" :key="item.id">
                <div class="cmt-title">
                    第{{index}}楼&nbsp;&nbsp;&nbsp;&nbsp;用户:{{item.user_name}}&nbsp;&nbsp;发表时间:{{item.add_time|formatTime}}
                </div>
                <div class="cmt-content">
                    {{item.content}}
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
        return{
            comment:'',
            pageIndex:0,
            commentList:[]
        }
    },
    created() {
        this.getData();
    },
    methods:{
        getData:function () {
            this.$http.get('http://47.107.137.210:8899/api/getcomments/55?pageindex='+this.pageIndex).then(function (result) {
                if(result.body.status == 0){
                    if(result.body.message.length == 0){
                        Toast('没有数据了');
                    } else {
                        this.commentList=this.commentList.concat(result.body.message);
                    }
                } else {
                    Toast('数据获取失败');
                }
                console.log('==================:'+this.pageIndex);
                console.log(result.body.message);
                console.log(this.commentList);
            })
        },
        loadMore:function () {
            this.pageIndex++;
            this.getData();
        },
        uploadComment:function () {
            if(this.comment.trim().length == 0){
                Toast('评论不能为空');
                return;
            }
            var comment = {
                id:Date.now(),
                user_name:'用户:'+Date.now(),
                add_time:Date.now(),
                content:this.comment
            }
            console.log(comment)
            this.$http.post('http://47.107.137.210:8899/api/postcomment/55',comment,{emulateJSON:true}).then(function (result) {
                console.log(result.body)
                if(result.body.status == 0){
                    //评论成功
                    this.commentList.unshift(comment)
                    this.comment = "";
                }
            });
        }
    }
}
</script>

<style lang="scss" scoped>
    .cmt-container{
        padding-bottom: 100px;
        h3{
            font-size: 18px;
        }
        textarea{
            font-size:14px;
            height:85px;
            margin:0px;
        }
        .cmt-list{
            margin: 5px 0px;
            font-size:13px;
            .cmt-title{
                line-height: 30px;
                background-color: #ccc;
            }
            .cmt-content{
                line-height: 35px;
                text-indent:2em;
            }
        }
    }
</style>