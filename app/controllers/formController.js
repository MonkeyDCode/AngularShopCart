function formControllerFunction($scope,$state,Cart){
    formControllerVM= this;
	formControllerVM.cart = Cart.getCart();
    formControllerVM.total = Cart.getTotal();
    formControllerVM.data={};
    formControllerVM.isSubmited=false;
    formControllerVM.visa=false;
    formControllerVM.master=false;
    formControllerVM.american=false;
    formControllerVM.nondefined=false;
    var map;
    var geocoder;
    var marker;
    

    formControllerVM.initialize = function() {
        var mapOptions = { center: new google.maps.LatLng(0.0, 0.0), zoom: 2, mapTypeId: google.maps.MapTypeId.ROADMAP };

        var myOptions = {  center: new google.maps.LatLng(19.282896682877784, -99.67661619186401 ), zoom: 15, mapTypeId: google.maps.MapTypeId.ROADMAP };

        geocoder = new google.maps.Geocoder();
        map = new google.maps.Map(document.getElementById("map"),myOptions);
        google.maps.event.addListener(map, 'click', function(event) { formControllerVM.placeMarker(event.latLng); });
    }

    formControllerVM.placeMarker=function(location) {
        if(marker){ 
            marker.setPosition(location); 
        }else{
            marker = new google.maps.Marker({ 
                position: location, 
                map: map
            });
        }
        formControllerVM.getAddress(location);
    }

    formControllerVM.getAddress= function(latLng) {
        geocoder.geocode( {'latLng': latLng},
        function(results, status) {
        if(status == google.maps.GeocoderStatus.OK) {
            if(results[0]) {
                //document.getElementById("address").value = results[0].formatted_address;
                formControllerVM.data.address = results[0].formatted_address;
                $scope.$apply();
            }
            else {
                //document.getElementById("address").value = "No results";
                formControllerVM.data.address ="No se encontro la dirección";
                $scope.$apply();
            }
        }
        else {
            //document.getElementById("address").value = status;
            formControllerVM.data.address=status;
            $scope.$apply();
        }
        });
    }
    
    formControllerVM.evaluate= function(){
        console.log(formControllerVM.data.card);
        regV = /^4[0-9]{15}$/;
        regM =/5[1-5][0-9]{14}$/ ;
        regA =/^3[47][0-9]{13}$/ ;
        if(regV.test(formControllerVM.data.card)){
                formControllerVM.visa=true;
                formControllerVM.master=false;
                formControllerVM.american=false;
                formControllerVM.nondefined=false;
        }else if(regM.test(formControllerVM.data.card)){
                formControllerVM.visa=false;
                formControllerVM.master=true;
                formControllerVM.american=false;
                formControllerVM.nondefined=false;
        }else if(regA.test(formControllerVM.data.card)){
                formControllerVM.visa=false;
                formControllerVM.master=false;
                formControllerVM.american=true;
                formControllerVM.nondefined=false;
        }else{
                formControllerVM.visa=false;
                formControllerVM.master=false;
                formControllerVM.american=false;
                formControllerVM.nondefined=true;
        }
    }
    
    formControllerVM.submit=function(valid){
        
        formControllerVM.isSubmited=true;
        bootbox.dialog({
            title: 'Gracias por la compra',
            message: "<p>Utiliza el siguiente código de descuento para futuras compras.</p>"+
                    "<p> Codigo: <b>" +formControllerVM.makeid()+"</b></p><p>Valor: <b>"+(formControllerVM.total*.05).toFixed(2)+"</b></p>",
            closeButton: false,
            buttons: {

                ok: {
                    label: "Aceptar",
                    className: 'btn-info',
                    callback: function(){
                        Cart.setCart([]);
                        Cart.setTotal(0);
                        $state.go('home');
                    }
                }
            }
        });
        
    }
    
    formControllerVM.makeid=function() {
        var text = "";
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

        for (var i = 0; i < 5; i++)
            text += possible.charAt(Math.floor(Math.random() * possible.length));

        return text;
    }
    
    formControllerVM.initialize();
}