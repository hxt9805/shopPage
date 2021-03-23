<template>
  <div>
    <h1>商品列表</h1>
    <ul>
      <li>
        <span>商品名</span>
        <span>单个价钱</span>
        <span>剩余数量</span>
        <span>操作</span>
      </li>
      <li v-if="srcList.length === 0 ? true : false" style="font-size:30px;margin-top:50px;">无更多商品</li>
      <li v-for="(singleShop) in srcList" :key="singleShop.id">
        <span :title="singleShop.name"> {{singleShop.name}} </span>
        <span> {{singleShop.price}} </span>
        <span> {{singleShop.amount}} </span>
        <span>
          <button @click="deleteShop(singleShop.id)">删除</button>
          <button @click="addToShopCart(singleShop.id)">加车</button>
        </span>
      </li>
    </ul>
  </div>
</template>

<script type="text/ecmascript-6">

  export default {
    props:['singleShopInfo'],
    data() {
      return {
        srcList:[],
        single:{},
      }
    },
    methods: {
      deleteShop(id){
        this.srcList = this.srcList.filter(item=>{
          return item.id !== id
        })
      },
      addToShopCart(id){
        let singleShopInfoArr = this.srcList.filter(item=>{
          return item.id === id
        })
        let obj = {
          id: singleShopInfoArr[0].id,
          name: singleShopInfoArr[0].name,
          price: singleShopInfoArr[0].price,
          amount: singleShopInfoArr[0].amount,
        }
        obj.amount = 1
        this.$emit('addToShopCart',obj)
      }
    },
    computed:{
      localSingleShopInfo: function () {
        return this.singleShopInfo
      }
    },
    watch:{
      single(val,old){
        if (this.srcList.length === 0) {
          this.srcList.push(val);
          return
        }
        if (val.name === old.name) {
          if (!(val.price === old.price && val.amount === old.amount)) {
            this.srcList.forEach(item=>{
              if (val.name === item.name) {
                item.price = val.price
                item.amount = val.amount
              }
            })
          }else{
            alert('无法添加重复的商品，您需要对商品的名称、价钱、数量至少一个做出修改')
          }
        }else{
          this.srcList.push(val);
        }
      },
      singleShopInfo(val){
        this.single = val
      }
    }
  }
</script>

<style scoped>
  ul>li{
    list-style: none;
  }
  ul>li>span{
    display: inline-block;
    width: 100px;
    height: 30px;
    text-align: center;
    border: 1px solid skyblue;
    border-radius: 5px;
    line-height: 30px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
 
</style>
