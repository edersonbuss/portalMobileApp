/*! portal-emissor-mobile v1.0.0 | (c) 2014 edersonbuss |  */
(function () {
  'use strict';
  angular
    .module('app')
    .factory('propostaService', propostaService);

    // manually declaring is time wasting
propostaService.$inject = ['$resource'];

/**
 * @ngInject
 */
  function propostaService ($resource) { 
        
     
    var api_base_url = "http://localhost:8080/portal-emissor/api";
  //return $http.get(api_base_url + '/regional/list');
       
             //return $resource(options.api.base_url + '/system/servicos/:id', {
              http://localhost:8080/portal-emissor/api/proposal/consultCard
              return $resource(api_base_url + '/parcelamento/simula', {
                     
                     cnpj:88957659003105,
                     dia_vencimento:25,
                     valor:500

                 }, {
                     query: {
                         //isArray: true,
                         method: 'GET'
                        // headers: {Authorization: 'Basic dXNlcl9pdHM6ZGVzZW52'}
                        //withCredentials : true
                        

               
                     },
                     update: {
                         method: 'PUT',
                         isArray: false
                     }
                 }

             )
        

        

        
  }

})();




// 'use strict';
// appServices.factory('propostaService', ['$resource',
//     function($resource) { 

//     //var headers = {
//      //           'Access-Control-Allow-Origin' : '*',
//       //          'Access-Control-Allow-Methods' : 'POST, GET, OPTIONS, PUT',
//        //         'Content-Type': 'application/json',
//        //         'Accept': 'application/json'

//         //    };
// //document/type/list
//         return $resource(options.api.base_url + '/system/servicos/:id', {
//          // return $resource(options.api.base_url + '/document/type/list/:id', {
//                 id: '@id'
//             }, {
//                 query: {
//                     isArray: true,
//                     method: 'GET'
                
             

           
//                 },
//                 update: {
//                     method: 'PUT',
//                     isArray: false
//                 }
//             }

//         )
//     }
// ]);


// /**
//  * The Projects factory handles saving and loading projects
//  * from local storage, and also lets us save and load the
//  * last active project index.
//  */
// appServices.factory('Projects', function() {
//   return {
//     all: function() {
//       var projectString = window.localStorage['projects'];
//       if(projectString) {
//         return angular.fromJson(projectString);
//       }
//       return [];
//     },
//     save: function(projects) {
//       window.localStorage['projects'] = angular.toJson(projects);
//     },
//     newProject: function(projectTitle) {
//       // Add a new project
//       return {
//         title: projectTitle,
//         tasks: []
//       };
//     },
//     getLastActiveIndex: function() {
//       return parseInt(window.localStorage['lastActiveProject']) || 0;
//     },
//     setLastActiveIndex: function(index) {
//       window.localStorage['lastActiveProject'] = index;
//     }
//   }
// });

//return $resource('/api/todo/:id', { id: '@id' }, { update: { method: 'PUT' } });

//return $resource( 
//		// url
//		urlBase+'/produto/:oid:search/:oidEmissor', 
//		// parâmetros
//		{ 
//			oid: '@oid',
//			oidEmissor: '@oidEmissor'
//		}, 
//		// definição dos métodos
//		{ 
//			query: {
//				params: {search: 'search'},
//				isArray: true 
//			},
//			update: { 
//				method: 'PUT', 
//				isArray: false 
//			}
//		} 
//	)

