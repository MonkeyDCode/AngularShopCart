angular.module('app')
	.config(['$stateProvider','$urlRouterProvider', function($stateProvider, $urlRouterProvider){
		$urlRouterProvider.otherwise('/home');
		$stateProvider
			.state('home',{
				url:'/home',
				templateUrl : 'pages/home.html',
				controller : 'homeController',
				controllerAs : 'homeControllerVM' 
			})
            .state('products',{
				url:'/products',
				templateUrl : 'pages/products.html',
				controller : 'productsController',
				controllerAs : 'productsControllerVM' 
			})
            .state('cart',{
				url:'/cart',
				templateUrl : 'pages/cart.html',
				controller : 'cartController',
				controllerAs : 'cartControllerVM' 
			})
            .state('form',{
				url:'/form',
				templateUrl : 'pages/form.html',
				controller : 'formController',
				controllerAs : 'formControllerVM' 
			})

			;
	}]);