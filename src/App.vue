<template>
  <div>
    <shop-add @singleInfo="singleShopInfoToShopList"></shop-add>
    <shop-list :singleShopInfo="fromShopAddsingleShopInfo" @addToShopCart="addToShopCartDeal"></shop-list>
  </div>
</template>

<script>
import ShopAdd from './components/ShopAdd'
import ShopList from './components/ShopList'
export default {
  name: "App",
  components: { 
    ShopAdd,
    ShopList
  },
  data() {
    return {
      fromShopAddsingleShopInfo:{},
    }
  },
  methods: {
    singleShopInfoToShopList(val){
      let obj = {
        id: val.id,
        name: val.name,
        price: val.price,
        amount: val.amount,
      }
      this.fromShopAddsingleShopInfo = obj
    },
    addToShopCartDeal(shop){
      console.log(shop);
    }
  }
};
</script>