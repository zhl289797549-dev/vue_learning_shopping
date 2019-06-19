<template>
    <div >
        <mt-swipe :auto="2000">
            <mt-swipe-item v-for="item in itemList" :key="item.url">
                <img :src="item.img" alt="item.img">
            </mt-swipe-item>
        </mt-swipe>
    </div>
</template>

<script>
    export default {
        data(){
            return {
            }
        },
        props:['itemList']
    }
</script>

<style lang="scss" scoped>
    .mint-swipe{
        height:200px;
        .mint-swipe-item{
            &:nth-child(1){
                background-color: red;
            }
            &:nth-child(2){
                background-color: blue;
            }
            &:nth-child(3){
                background-color: green;
            }
            img{
                width:100%;
                height:100%;
            }
        }
    }
</style>