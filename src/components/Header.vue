<template>
  <nav >
    <div class="flex flex-row justify-between bg-slate-300">
        <div >
          <ul class="flex flex-row items-start gap-3 m-2">
            <li><router-link to="/">Home</router-link></li>
            <li><router-link to="/cart">Cart</router-link></li>
          </ul>
        </div>
        <div class="m-2 contain">
          <img class="imgwidth" src="../images/shopping.png" alt="cart">
          <p class="innercontain">{{data.countCartItems}}</p>
      </div>
    </div>
  </nav>
</template>
<script setup>
import { useShoppingStore } from '@/stores/counter'
const data = useShoppingStore();


</script>
<style scoped>

.div1 {display: flex; flex-direction: row; color: brown; font-weight: bolder;}
.imgwidth {width: 25px; margin-right: 5px;}
.contain {position:relative;}
.innercontain {position:absolute; left: 15px; top: 8px; width:
  22px; height: 22px; color: brown; background-color: yellow; border: solid, 1px, brown; border-radius: 20px; text-align: center;
display: flex; align-items: center; justify-content: center;}

</style>
