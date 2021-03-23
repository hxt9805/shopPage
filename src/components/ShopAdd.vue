<template>
  <div>
    <h1>商品添加</h1>
    <ul>
      <li>
        <label for="tradeName">名称</label>
        <input type="text" id="tradeName" v-model="name">
      </li>
      <li>
        <label for="price">价格</label>
        <input type="text" id="price" v-model="price">
      </li>
      <li>
        <label for="amount">数量</label>
        <input type="text" id="amount" v-model="amount">
      </li>
    </ul>
    <button class="btn" @click="addTosingleShopInfo">添加商品</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      name:'青菜',
      price:'1',
      amount: '1',
    };
  },
  methods: {
    addTosingleShopInfo(){
      if (!this.singleShopInfo) {
        alert('商品信息未完整')
        return
      }
      this.singleShopInfo.id = Date.now()
      // console.log(this.singleShopInfo);
      this.$emit('singleInfo',this.singleShopInfo)
    }
  },
  computed:{
    singleShopInfo(){
      if (this.name && this.price && this.amount) {
        return {
          id: '',
          name: this.name,
          price: Number(this.price),
          amount: Number(this.amount)
        }
      }else{
        return null
      }
    }
  }
};
</script>
<style scoped>
  .btn{
    width: 250px;
    height: 40px;
    cursor: pointer;
    border-radius: 10px;
    border: 1px solid skyblue;
  }
</style>