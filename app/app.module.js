    'use strict';
	angular.module('app', ['ui.router']);

	angular.module('app')
		.controller('homeController',['$scope','$state','Cart',homeControllerFunction ])
        .controller('productsController',['$scope','$state','$http','Cart',productsControllerFunction ])
        .controller('cartController',['$scope','$state','Cart',cartControllerFunction ])
        .controller('formController',['$scope','$state','Cart',formControllerFunction ])
//		.controller('generalDataController',['$scope','$state','$http','ADD',generalDataControllerFunction])
//		.controller('domiciliaryDataController',['$scope','$state','$http','ADD',domiciliaryDataControllerFunction])
//		.controller('contactDataController',['$scope','$state','$http','ADD',contactDataControllerFunction])
//		.controller('beneficiariesDataController',['$scope','$state','$http','ADD',beneficiariesDataControllerFunction]);
	angular.module('app')
		.factory('Cart', [CartFactoryFunction]);