function productsControllerFunction($scope,$state,$http,Cart){
    productsControllerVM= this;
	productsControllerVM.cart = Cart.getCart();
    productsControllerVM.items=[];
    $http({method:'GET', url:'app/json/products.json', headers: {'Content-Type': 'application/json' }})
        .then(function(response) {
            productsControllerVM.items=response.data;
        },
        function(response){
            console.log(response);
            bootbox.alert("Error de comunicación, intentalo nuevamente");
        });
    
    productsControllerVM.update = function(id,price){
        $('#total'+id).val( parseInt($('#item'+id).val()) * parseInt(price) ); 
    }

    productsControllerVM.add = function(id,price){
        $('#item'+id).val(parseInt($('#item'+id).val())+1);
         productsControllerVM.update(id,price);
    }
    productsControllerVM.minus = function(id,price){
        if(parseInt($('#item'+id).val())==1){
           bootbox.alert("la cantidad minima debe ser 1");
        }else{
            $('#item'+id).val(parseInt($('#item'+id).val())-1);
            productsControllerVM.update(id,price);
        }
    }
    
    productsControllerVM.addToCart= function(i,itemid){
        tempItem = angular.copy(productsControllerVM.items[i]);
        if(productsControllerVM.cart.length >0){
            a=false;
            for (index = 0; index < productsControllerVM.cart.length; index++) { 
                if(productsControllerVM.cart[index].id == tempItem.id){
                    a=true;
                    productsControllerVM.cart[index].quantity += parseInt($('#item'+itemid).val());
                    Cart.setCart(productsControllerVM.cart);
                    console.log(productsControllerVM.cart);
                    break;
                }
            }
            if(!a){
                tempItem.quantity = parseInt($('#item'+itemid).val());
            
                productsControllerVM.cart.push(tempItem);
                Cart.setCart(productsControllerVM.cart);
            }
            
        }else{
            tempItem.quantity = parseInt($('#item'+itemid).val());
            
            productsControllerVM.cart.push(tempItem);
            Cart.setCart(productsControllerVM.cart);
        }
        
        
        bootbox.confirm({
            message: "Producto agregado al Carrito!",
            buttons: {
                confirm: {
                    label: 'Ir al carrito',
                    className: 'btn-success'
                },
                cancel: {
                    label: 'Volver',
                    className: 'btn-danger'
                }
            },
            callback: function (result) {
                if(result){
                    $state.go('cart');
                }
            }
        });
    }
}
    
