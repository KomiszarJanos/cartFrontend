<template>
<div class='container mx-auto' v-if="justsee">
  <div class="row my-4">
        <div class="col">
        <div class="card">
              <div class="card-body">
                  <table class="table">
                      <thead>
                          <tr>
                              <th>#</th>
                              <th>Image</th>
                              <th>Name</th>
                              <th>Quantity</th>
                              <th>Price</th>
                              <th>Subtotal</th>
                              <th></th>
                          </tr>
                      </thead>
                      <tbody>
                          <tr v-for="item in data.cartItems" :key="item.id">
                              <td>{{item.id}}</td>
                              <td>
                                  <img :src="item.image" 
                                  class="fluid rounded"
                                  width="60"
                                  height="60"    
                                  :alt="item.name" />
                              </td>
                              <td>
                                  {{item.name}}
                              </td>
                              <td>
                                  <i 
                                      @click="data.incrementQ(item.id)"
                                      class="bi bi-caret-up">➕</i>
                                  <span class="mx-2">
                                      {{item.quantity}}
                                  </span>
                                  <i 
                                      @click="data.decrementQ(item.id)"
                                      class="bi bi-caret-down">➖</i>
                              </td>
                              <td>
                                  ${{item.price}}
                              </td>
                              <td>
                                  ${{item.price * item.quantity}} 
                              </td>
                              <td>
                                  <i 
                                      @click="data.removeFromCart(item.id)"
                                      class="bi bi-cart-x text-danger">❌</i>
                              </td>
                          </tr>
                          <tr>
                              <th colSpan="3" class="text-center">
                                  Total
                              </th>
                              <td colSpan="3" class="text-center">
                                  <span class="badge bg-danger rounded-pill">
                                      ${{ data.cartItems.reduce((acc,item) => acc += item.price * item.quantity,0) }}
                                  </span>
                              </td>
                          </tr>
                      </tbody>
                  </table>
              </div>
             </div>
      </div>
  </div>
  <div v-if="data.cartItems.length !=0" class='row my-4 mx-auto'>
    <button @click="buy" class="rounded-md bg-green-300 h-7">
        <h1> BUY
        </h1>
    </button>
  </div>
</div>
<div v-else class="container-fluid bg-orange-600 h-screen bg-center bg-[url('../public/order.png')]">
    <div class='row'>
        <div class='bg-gradient-to-t from-orange-100 to-orange-300 border-2 shadow-lg shadow-gray-500/50 border-gray-200 rounded-md mt-10 mb-3 w-auto h-auto mx-auto my-auto'>
            
                <form @submit.prevent="submit">
                    <div class="flex flex-row justify-between gap-4 mb-4 mx-2 my-2 mt-2">
                        <label>Please give us your name: </label>
                        <input type="text" class=' bg-slate-100' v-model="name"></input>
                    </div>
                    <div class="flex flex-row justify-between gap-2 mb-4 mx-2" >
                        <label>Please give us your email address: </label>
                        <input type="email" v-model='email' class=' bg-slate-100'></input>
                    </div>
                    <div class="flex flex-row justify-between gap-2 mb-4 mx-2">
                        <label>Please give us your phone number: </label>
                        <input type="tel" v-model="phone" class=" bg-slate-100"></input>
                    </div>
                    <div class="flex flex-row justify-start gap-3 mb-4 mx-2">
                        <h3>Your order: </h3>
                        <div class="w-60">
                            <table v-for="d in data.cartItems" class=" border-gray-800 border-1 p-1">
                                <tbody>
                            <tr class="flex ">
                                <td class=" border-gray-800 border-1 w-40  p-1">{{d.name}}</td>
                                <td class=" border-gray-800 border-1 w-16  p-1 text-end">{{d.quantity}} db</td>
                                <td class=" border-gray-800 border-1 w-32  p-1 text-end"> ${{d.price*d.quantity}} dollar</td>
                            </tr>
                        </tbody>
                            </table>
                            <div><p class="text-end"> Totalsum: ${{ data.cartItems.reduce((acc,item) => acc += item.price * item.quantity,0) }}</p> </div>
                        </div>
                        
                    </div>
                    <div class="mb-4 mx-2">
                        <p class="text-justify">If the order is correct accept the therms, and click the finish buttom, after that we will contact with you! Thank you for choosing us.</p>
                    </div>
                    <div class="mb-4 mx-2 flex flex-row gap-2">
                        <input type="checkbox" v-model="accept">
                        <p>Accept The therms</p>
                    </div>
                    <div class="mb-4 mx-auto my-auto w-16 border-2 border-gray-200 rounded-md text-center bg-green-400">
                        <input type="submit" value="Submit" class="p-2" ></input>
                        
                    </div>
                    <div class="mb-4 mx-auto my-auto w-16">
                        <button @click="cancel" class="bg-red-500 rounded-md text-center p-2 border-black border-2">Cancel</button>
                    </div>
                </form>
            </div>
    </div>
    
</div>

</template>

<script setup>
  import { useShoppingStore } from '@/stores/counter.js'
  import {ref} from 'vue';
  import Swal from 'sweetalert2'
  import axios from 'axios';
  const data= useShoppingStore();
  const justsee =ref(true);
  const buy =()=>{
    justsee.value=false;}
    console.log(data.cartItems);
    console.log(data.cartItemsToSend);
  const name=ref();
  const email=ref();
  const phone=ref();
  const accept=ref(false);
  const errors=ref([]);
  const totalsum =ref();
  totalsum.value=data.cartItems.reduce((acc,item) => acc += item.price * item.quantity,0); 

  const submit =()=>{
        checkform();
        if(errors.value.length>0)
            {
                Swal.fire({
                    position: 'center',
                    icon: 'error',
                    title: errors.value,
                    showConfirmButton: true,
                    }); 
                errors.value=[];
            }
        else 
        {Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Your order is sent!',
                    showConfirmButton: false,
                    timer: 1500
                    });
        var order={
            'name':name.value,
            'emailAddress':email.value,
            'phoneNumber':phone.value,
            'items':[...data.cartItemsToSend],
            'totalsum':totalsum.value
        };
        console.log(order); 
        axios.post('http://localhost:3000/api/order/',order)
        justsee.value=true;
        data.cartItems=[];
        } }

  function checkform(){
    if (name.value==null || name.value.trim()==='' || name.value.length<3) {errors.value.push('Name is required');}
    if(email.value==null || email.value.trim()==='') {errors.value.push('Email is required');}
    if(!validEmail(email.value)) errors.value.push('Valid email required!');
    if(phone.value==null) {errors.value.push("Phone Number is required!");}
    if(!validphone(phone.value)) errors.value.push('Valid phone number is required!');    
    if(accept.value!=true) errors.value.push('Acception of the terms is needed')
}
    function validEmail(email) {
      var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(email);} 
    function validphone(phone) {
        var re= /^\d{11}$/;
        return re.test(phone); }  
   const cancel=()=>{justsee.value=true;}

</script>

<style scoped>
  i{ cursor: pointer;   }
  
</style>

