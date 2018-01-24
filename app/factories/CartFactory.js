function CartFactoryFunction(){
	var cart=[];
    var total=0;
	
	return {
		getCart:function(){
			return cart;
		},
		setCart:function(Cart){
			cart = Cart;
		},
        getTotal:function(){
            return total;
        },
        setTotal:function (Total){
            total=Total;
        }
	}
}