function homeControllerFunction($scope,$state,Cart){
    homeControllerVM= this;
	homeControllerVM.cart = Cart.getCart();
	//$state.go('generalData');
}