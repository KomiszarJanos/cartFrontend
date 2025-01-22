import { defineStore } from 'pinia'
import { computed, ref } from 'vue';
import Swal from 'sweetalert2'

export const useShoppingStore = defineStore('shopping', ()=> {
    const products= ref([ ]);
    const cartItems = ref([]);

    const cartItemsToSend = computed(()=>{
      return cartItems.value.map(item=>({
        name: item.name,
        price: item.price,
        quantity: item.quantity
      }));
        
      
    });
    

    const countCartItems= computed(()=>cartItems.value.length);
    
    function addToCart(item) {
            let index = cartItems.value.findIndex(product => product.id === item);
            
            if(index !== -1) {
              var product=cartItems.value.find(p=>p.id===item);
              product.quantity += 1;
              Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Your item has been updated',
                showConfirmButton: false,
                timer: 1500
              });
            }else {
              var productnew=products.value.find(p=>p.id===item)
              productnew.quantity = 1;
              cartItems.value.push(productnew);
              Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Your item has been saved',
                showConfirmButton: false,
                timer: 1500
              });
            }

        };
        function incrementQ(id) {
            let product = cartItems.value.find(product => product.id === id);
            product.quantity +=1; };
        function decrementQ(id) {
            let product = cartItems.value.find(product => product.id === id);
            if (product.quantity > 1) {product.quantity -= 1;}
            else {cartItems.value = cartItems.value.filter(product => product.id !== id); }
            };
        function removeFromCart(id) {
            Swal.fire({
                position: 'top-end',
                icon: 'info',
                title: 'Do You really want to remove the item?',
                showConfirmButton: true,
                showCancelButton:true,
        }).then((result)=> {if(result.isConfirmed)
            {cartItems.value = cartItems.value.filter(product => product.id !== id);
                }})

        }
           
        const order= ref([]);    
        return {removeFromCart, decrementQ, incrementQ,
             addToCart, countCartItems, products, cartItems, order, cartItemsToSend }
    })