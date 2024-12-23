const express = require('express');
const cors = require('cors');


const app = express();
const port = 3000;

// middleware
app.use(cors());
app.use(express.json());




let cart = [
  { productId: 1, name: 'Laptop', price: 50000, quantity: 1 },
  { productId: 2, name: 'Mobile', price: 20000, quantity: 2 }
];


// routes
app.get('/', (req, res) => {
  res.send('FlipDeal Product Listing API');
});


// add to cart
app.get('/cart/add', (req, res) => {
  const productId = parseInt(req.query.productId);
  const name = req.query.name;
  const price = parseFloat(req.query.price);
  const quantity = parseInt(req.query.quantity);

  let cartCopy = [...cart];


 const newProduct = { productId, name, price, quantity };


  cartCopy.push(newProduct);

  res.status(200).send({
    cartItems: cartCopy
  });
 
 

})

// edit cart

app.get('/cart/edit', (req, res) => {
  const productId = parseInt(req.query.productId);
  const quantity = parseInt(req.query.quantity);

   
function updateQuantity(cart, productId, quantity) {
     for (let i = 0; i < cart.length; i++) {
       if(cart[i].productId === productId) {
         cart[i].quantity = quantity;
       }
     }

     return cart;
}

const updatedCart = updateQuantity(cart, productId, quantity);
res.status(200).json({
  cartItems: updatedCart
});


})


// delete from cart
app.get('/cart/delete', (req, res) => {
   const productId = parseInt(req.query.productId);

   let cartCopy = [...cart];

   function deleteProduct(cartItem, productId) {
    return cartItem.productId !== productId;
    }


    const updatedCart = cartCopy.filter(cartItem => deleteProduct(cartItem, productId));
    res.status(200).json({
      cartItems: updatedCart
    });
 })


// get cart
app.get('/cart', (req, res) => {


  res.status(200).json({
    cartItems: cart
  });
})


//total quantity of items in the cart

app.get('/cart/total-quantity', (req, res) => {
  

   let totalQuantity = 0;
   function calculateTotalQantity(cart) {
    for(let i = 0; i < cart.length; i++) {
      totalQuantity += cart[i].quantity;
    }
    return totalQuantity;
   }

    const result = calculateTotalQantity(cart);
    res.status(200).json({
      totalQuantity: result
    });


  

})


// total price of items in the cart

app.get('/cart/total-price', (req, res) => {
  
  function calculateTotalPrice(cart){
    let totalPrice = 0;
    for(let i = 0; i < cart.length; i++) {
      totalPrice += cart[i].price * cart[i].quantity;
    }
    return totalPrice;    
  }


  const result = calculateTotalPrice(cart);
  res.status(200).json({
    totalPrice: result
  });
});

app.listen(port, () => {
  console.log(`app listening on port ${port}`);
});
