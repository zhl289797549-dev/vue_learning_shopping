<template>
    <div class="mui-numbox" data-numbox-min="1">
        <button class="mui-btn mui-numbox-btn-minus" type="button">-</button>
        <input class="mui-numbox-input" type="number" value="1" ref="numbox" @change="onNumChange"/>
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
        props:['max'],
        watch:{
            max:function (newVal,oldVal) {
                console.log(newVal)
                mui('.mui-numbox').numbox().setOption('max',newVal)
            }
        },
        methods:{
            onNumChange:function () {
                var value = this.$refs.numbox.value;
                console.log(value)
                this.$emit('getNum',parseInt(value))
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>