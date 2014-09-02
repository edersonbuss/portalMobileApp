(function() {
    'use strict';
    angular
        .module('app')
        .factory('cartaoService', cartaoService);

    cartaoService.$inject = ['$resource'];

    /**
     * @ngInject
     */
    function cartaoService($resource) {
         var api_base_url = "http://localhost:8080/portal-emissor/api";

        return $resource(api_base_url + '/parcelamento/simula', {

                cnpj: 88957659003105,
                dia_vencimento: 25,
                valor: 500

            }, {
                query: {
                    //isArray: true,
                    method: 'GET'
    
                },
                update: {
                    method: 'PUT',
                    isArray: false
                }
            }

        )

    }

})();