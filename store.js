  //important//
  
  
  if(document.readyState=='loading'){
      document.addEventListener('DOMContentLoaded',ready)



   }
     
      
      else
      {
         ready()


      }

    function ready(){
   


      var removeCartItemButtons=document.getElementsByClassName('btn-danger');
      //looping through element having class 'btn-danger//
      for(var i=0; i<removeCartItemButtons.length;i++){
      var button=removeCartItemButtons[i]
      button.addEventListener('click',removeCartItem)
        
      
      
      
      }
     var quantityInputs=document.getElementsByClassName('cart-quantity-input')
        for(var i=0; i<quantityInputs.length;i++){
         var input=quantityInputs[i]
         input.addEventListener('change',quantityChanged)

      }
     var addToCartItem=document.getElementsByClassName('shop-item-button')
         for(var i=0; i<addToCartItem.length;i++){
            var button=addToCartItem[i]
            button.addEventListener('click' ,addToCartClicked)
         }
      
         document.getElementsByClassName('btn-purchase')[0].addEventListener('click',purchaseclicked)
    }
   
     function purchaseclicked(){
      alert('Thank you for your purchase')
      var cartItems=document.getElementsByClassName('cart-items')[0]
      while(cartItems.hasChildNodes()){
         cartItems.removeChild(cartItems.firstChild)
      }
      updateCarTotal()
     }

 function removeCartItem(event){
   var ButtonClicked=event.target
   ButtonClicked.parentElement.parentElement.remove()
   updateCarTotal()

 }
  
function quantityChanged(event){
 var input=event.target
 if(isNaN(input.value )|| input.value<=0){

   input.value=1
 }
  updateCarTotal()

}
function addToCartClicked(event){
  var button=event.target
  var shopitem=button.parentElement.parentElement
  var title=shopitem.getElementsByClassName('shop-item-title')[0].innerText
  var price=shopitem.getElementsByClassName('shop-item-price')[0].innerText
  var imageSrc=shopitem.getElementsByClassName('shop-item-image')[0].src

  console.log(title,price,imageSrc);
  addItemToCart(title,price,imageSrc)
  updateCarTotal()



}
function addItemToCart(title,price,imageSrc) {
   var cartRow=document.createElement('div')
   cartRow.classList.add('cart-row')
   
   var cartItems=document.getElementsByClassName('cart-items')[0]
   var cartItemsNames=cartItems.getElementsByClassName('cart-item-title')
     for(i=0;i<cartItemsNames.length;i++){
       if(cartItemsNames[i].innerText==title){
         alert('this item is already added to cart')
         return 
       }
     }
   var cartRowContent=`
   <div class="cart-item cart-column">
       <img class="cart-item-image" src="${imageSrc}" width="100" height="100">
       <span class="cart-item-title">${title}</span>
   </div>
   <span class="cart-price cart-column">${price}</span>
   <div class="cart-quantity cart-column">
       <input class="cart-quantity-input" type="number" value="1">
       <button class="btn btn-danger" type="button">REMOVE</button>
   </div> `
   cartRow.innerHTML=cartRowContent
   cartItems.append(cartRow)
   cartRow.getElementsByClassName('btn-danger')[0].addEventListener('click',removeCartItem)
   cartRow.getElementsByClassName('cart-quantity-input')[0].addEventListener('change',quantityChanged)
}


function updateCarTotal(){
 var cartItemContainer=document.getElementsByClassName('cart-items')[0]
  var cartRows= cartItemContainer.getElementsByClassName('cart-row')
  var total=0;
  for(var i=0;i< cartRows.length;i++){
    var cartRow=cartRows[i]
     var priceElement=cartRow.getElementsByClassName('cart-price ')[0]
     var quantityElement=cartRow.getElementsByClassName('cart-quantity-input')[0]
     //parseFloat convert ay string into in number//
     var price=parseFloat(priceElement.innerText.replace('$',''))
     var quantity=quantityElement.value
     total=total + (price*quantity);

  }
  total=Math.round(total *100)/100
document.getElementsByClassName('cart-total-price')[0].innerText=  '$' + total;
}