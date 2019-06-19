<template>
    <div class="pic-detail-view">
        <div class="pic-detail-top">
            <h1>{{picDetail.title}}</h1>
            <p>
                <span>发表时间:{{picDetail.add_time |formatTime}}</span>
                <span>点击:{{picDetail.click}}次</span>
            </p>
        </div>
        <hr>
        <div class="thumb">
            <vue-preview :slides="slide1" @close="handleClose"></vue-preview>
        </div>
        <!-- 内容区域-->
        <div class="pic-detail-content" v-html="picDetail.content">
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
                picDetail:{},
                slide1: [
                    {
                        src: 'https://farm6.staticflickr.com/5591/15008867125_68a8ed88cc_b.jpg',
                        msrc: 'https://farm6.staticflickr.com/5591/15008867125_68a8ed88cc_m.jpg',
                        alt: 'picture1',
                        title: 'Image Caption 1',
                        w: 300,
                        h: 200
                    },
                    {
                        src: 'https://farm4.staticflickr.com/3902/14985871946_86abb8c56f_b.jpg',
                        msrc: 'https://farm4.staticflickr.com/3902/14985871946_86abb8c56f_m.jpg',
                        alt: 'picture2',
                        title: 'Image Caption 2',
                        w: 300,
                        h: 200
                    },
                    {
                        src: 'https://farm4.staticflickr.com/3902/14985871946_86abb8c56f_b.jpg',
                        msrc: 'https://farm4.staticflickr.com/3902/14985871946_86abb8c56f_m.jpg',
                        alt: 'picture2',
                        title: 'Image Caption 2',
                        w: 300,
                        h: 200
                    },
                    {
                        src: 'https://farm6.staticflickr.com/5591/15008867125_68a8ed88cc_b.jpg',
                        msrc: 'https://farm6.staticflickr.com/5591/15008867125_68a8ed88cc_m.jpg',
                        alt: 'picture1',
                        title: 'Image Caption 1',
                        w: 300,
                        h: 200
                    }
                ]
            }
        },
        created() {
            this.getData();
        },
        methods:{
            getData:function () {
                console.log('id:'+this.id)
                this.$http.get('http://47.107.137.210:8899/api/getimageInfo/'+this.id).then(function (result) {
                    if(result.body.status == 0){
                        this.picDetail = result.body.message[0];
                    } else {
                        Toast('数据获取失败');
                    }
                    console.log(result.body);
                })
            },
            handleClose () {
                console.log('close event')
            }
        },
        components:{
            'commont-box':Comment
        }
    }
</script>

<style lang="scss">
    .pic-detail-view{
        padding-left: 10px;
        padding-right: 10px;
        .pic-detail-top{
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
        .thumb{
            .my-gallery{
                display: flex;
                flex-wrap:wrap ;
                figure{
                    width: 30%;
                    margin: 5px;
                    img{
                        width: 100%;
                        box-shadow: 0 0 9px #999;
                    }
                }
            }
        }
    }
</style>