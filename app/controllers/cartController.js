function cartControllerFunction($scope,$state,Cart){
    cartControllerVM= this;
	cartControllerVM.cart = Cart.getCart();
    cartControllerVM.total=Cart.getTotal();
    
    
    cartControllerVM.calculateTotal=function(){
        cartControllerVM.total=0;
        for(let i of cartControllerVM.cart){
            cartControllerVM.total+= i.quantity*i.price;
            
        }
        Cart.setTotal(cartControllerVM.total);
        cartControllerVM.total=Cart.getTotal();
    }
    

    cartControllerVM.add= function(index){
        cartControllerVM.cart[index].quantity+=1;
        cartControllerVM.calculateTotal();
    }
    
    cartControllerVM.minus=function(index){
        if(cartControllerVM.cart[index].quantity>1){
            cartControllerVM.cart[index].quantity-=1;
            cartControllerVM.calculateTotal();
        }else{
            bootbox.alert("La cantidad mínima es 1");
        }
    }
}