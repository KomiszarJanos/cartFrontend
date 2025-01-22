<script setup>
import { useShoppingStore } from '@/stores/counter'
import {onMounted,ref } from 'vue'
import axios from 'axios';
import Swal from 'sweetalert2'

const data = useShoppingStore();


const ProductsList=ref([]);
onMounted(()=>{axios.get('http://localhost:3000/api/products')
   .then(resp=>{ProductsList.value=resp.data.products;
    data.products=resp.data.products;


   })
})



const searcheditem=ref();
const Search=()=>{
    if(searcheditem.value.length>1) 
        {
         const Searchlist=ref([]);
         var Searchdata= searcheditem.value.toUpperCase();     
         Searchlist.value= ProductsList.value.filter(p => p.name.toUpperCase().indexOf(Searchdata) !== -1);
         console.log(Searchlist.value); 
            if ( Searchlist.value.length) {
                 console.log("siker")
                 ProductsList.value=Searchlist.value;
            }
            else {ProductsList.value=data.products;
                    Swal.fire({
                    position: 'top-end',
                    icon: 'error',
                    title: 'No matched items!',
                    showConfirmButton: false,
                    timer: 1500
                    })}
        }
    else {
        Swal.fire({
                position: 'top-end',
                icon: 'error',
                title: 'Not enough charakter!',
                showConfirmButton: false,
                timer: 1500
              });

    }
    
    }
</script>

<template>
<div class="bg-gradient-to-t from-orange-300 to-orange-700 w-screen pb-4">
    <div class="flex flex-row justify-center gap-2 mb-4">
        <div class="mt-4"> Search: </div>
        <div> 
        <input class="bg-slate-300 rounded-md mt-4" type="text" v-model="searcheditem">
        </div>
        <div>
        <button>
            <img src="../images/FaSearch.png" alt="fa" class="w-5" @click="Search">
        </button>
        </div>
    </div>
    <div class="flex flex-wrap gap-2 items-center justify-center mx-auto my-auto">
        <div v-for="product in ProductsList" :key="data.id"
         class="w-96 bg-slate-100 rounded-md flex flex-col items-center shadow mr-8 mt-8">
        <h1 class="mt-3 font-bold text-red-400">{{product.name}}</h1>
        <img :src="product.image" :alt="product.image">
        <p>Price: {{product.price}}</p>
        <button class="mt-2 mb-2 rounded-md p-1 bg-lime-600" @click="data.addToCart(product.id)">Add</button>
        </div>
    </div>
</div>
</template>
<style scoped>
input {border: 2px black solid;}
img {margin-top:28px;}
.shadow {box-shadow: 5px 10px rgb(142, 142, 216);}
</style>
