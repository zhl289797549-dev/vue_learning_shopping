<template>
    <div class="mui-numbox" data-numbox-min="1" style="height: 25px;">
        <button class="mui-btn mui-numbox-btn-minus" type="button">-</button>
        <input class="mui-numbox-input" type="number" :value="initCount" ref="numbox" @change="onNumChange"/>
        <button class="mui-btn mui-numbox-btn-plus" type="button">+</button>
    </div>
</template>

<script>
    import mui from '../../lib/mui/js/mui.js'
    export default {
        data(){
            return {

            }
        },
        mounted() {
            mui('.mui-numbox').numbox();
        },
        methods:{
            onNumChange:function () {
                var value = this.$refs.numbox.value;
                console.log(value)
                this.$store.commit("updateCarsInfo", {id:this.goodsId,count:value})
            }
        },
        props:['initCount','goodsId']
    }
</script>

<style lang="scss" scoped>

</style>