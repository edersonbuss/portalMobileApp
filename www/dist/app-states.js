/*! portal-emissor-mobile v1.0.0 | (c) 2014 edersonbuss |  */
(function () {
    'use strict';
  angular
    .module('app')
    .config(config);

function config($stateProvider, $urlRouterProvider,$httpProvider)  { 
 
    $stateProvider
    .state('app', {
      url: '/app',
      abstract: true,
      templateUrl: 'partials/templates/menu.html',
      //templateUrl: 'menu.html',
      //controller: 'AppController as ctrl'
    })
    
    .state('app.home', {
      url: "/home",
      views: {
        'menu-content' :{
          templateUrl: "partials/home/home.html",
          controller: 'HomeController as crtl'
        }
      },
      data: {
          requiredAuthentication: true,
          pageTitle: 'Home' //pageTitle, que ser√° usado para definir o t√≠tulo da p√°gina 
      }
    })
   
     .state('login', {
        url: '/login',
        templateUrl: 'partials/login/login.html',
        controller: 'LoginController as ctrl',
        data: {
            requiredAuthentication: false,
            pageTitle: 'Login' //pageTitle, que ser√° usado para definir o t√≠tulo da p√°gina 
        }
    })

    .state('app.logout', {
      url: "/logout",
      views: {
        'main' : {
         controller: "LogoutController",
         controllerAs :  'ctrl' 
        }
      },
      data: {
            requiredAuthentication: true
        } 
    })


    // Define um estado de n√≠vel superior
    .state('proposta', {
            // Com  abstract: true, significa que esse estado n√£o pode ser explicitamente ativado.
            // Ele s√≥ pode ser implicitamente ativado ativando um estado filho.
            abstract: true,
            //Este estado abstrato ir√° anteceder '/contacts "para todas as URLs de todos os seus filhos.
            url: '/proposta',
            templateUrl: 'partials/templates/side-menus.html',
            //resolve antes do controller ser instaciado
            resolve: {
                propostaService: 'propostaService',
                propostaList: function(propostaService) {
                    // Return a promise to make sure the customer is completely
                    // resolved before the controller is instantiated
                    return propostaService.query();
                }
            },
            data: {
                requiredAuthentication: true,
                pageTitle: 'Proposta'
            }

        })

         // Usando um '.' dentro de um nome do estado declara uma crian√ßa dentro de um dos pais.
        //Ent√£o, voc√™ tem uma nova "lista" Estado dentro do Estado os "contactos" do pai.
        .state('proposta.list', {
            url: '/list', //ou  url: '',
            // loaded into ui-view of parent's template
            //templateUrl: 'partials/proposta/list.html',
            
           

            views: {
                'main': {
                  templateUrl: "partials/proposta/list.html",
                  controller: 'PropostaListController',
                  controllerAs :  'ctrl' 
                }
            }

        })
        // Voc√™ pode ter filhos ilimitadas dentro de um estado. Aqui est√° um segundo filho
        // Estado dentro do Estado pai 'contatos'.
        .state('proposta.entry', {
            url: '/entry/{id:[0-9]{1,9}}', //ou :id
            // loaded into ui-view of parent's template
            //templateUrl: 'partials/proposta/entry.html',
            views: {
                'main': {
                  templateUrl: "partials/proposta/entry.html",
                   controller: 'PropostaEntryController',
                   controllerAs :  'ctrl' 
                }
            },
            //controller: 'PropostaController as ctrl', // as ctrl
            resolve: {
                propostaService: 'propostaService',
                proposta: function(propostaService, $stateParams) {
                    if (!$stateParams.id) return {};
                    var propostaId = $stateParams.id;
                   return propostaService.get({id: propostaId});
                   
                }
            }

          })
          
        .state('autorizacaoPOS', {
        abstract: true,
        url: '/autorizacao_pos_virtual',
        templateUrl: 'partials/templates/menu.html',
        data: {
                requiredAuthentication: true,
                pageTitle: 'autorizacaoPOS'
        }
  	
       })  
       
       .state('autorizacaoPOS.consultaPlano', {
      url: "/consulta",
      views: {
        'menu-content' :{
        	templateUrl: "partials/autorizacaoposvirtual/consultaPlano.html",
        	//AlÈm disso, herdar $ escopo objetos para baixo para as crianÁas, apenas entender que isso acontece por meio da hierarquia de vista , n„o a hierarquia do Estado.
        }
      }
    })
       
       .state('autorizacaoPOS.consultaPlano.list', {
      url: "/lista/:cpf",
      views: {
        'list-tab' :{
        	templateUrl: "partials/autorizacaoposvirtual/list.html",
        	controller: 'AutorizacaoPOSListController',
        	//AlÈm disso, herdar $ escopo objetos para baixo para as crianÁas, apenas entender que isso acontece por meio da hierarquia de vista , n„o a hierarquia do Estado.
        }
      },
       resolve: {
    	   autorizacaoPOSService: 'autorizacaoPOSService',
    	   autorizacao: function(autorizacaoPOSService,$stateParams) {
             	 return autorizacaoPOSService.lista($stateParams).query();
              }
       }
    })
    
        .state('autorizacaoPOS.consultaPlano.list.entry', {
      url: "/entry/{oid:[0-9]{1,9}}'",
      views: {
        'entry-tab': {
        	 templateUrl: "partials/autorizacaoposvirtual/entry.html",
        	// controller: 'AutorizacaoPOSEntryController',
        }
      }
    
      
    })
          
          
       .state('parcelamento', {
        abstract: true,
        url: '/parcelamento',
        templateUrl: 'partials/templates/menu.html',
        data: {
                requiredAuthentication: true,
                pageTitle: 'Parcelamento'
        }
  	
       })
          
        
    .state('parcelamento.simula', {
      url: "/simula",
      views: {
        'menu-content' :{
        	templateUrl: "partials/parcelamento/simula.html",
        	//AlÈm disso, herdar $ escopo objetos para baixo para as crianÁas, apenas entender que isso acontece por meio da hierarquia de vista , n„o a hierarquia do Estado.
        }
      }
    })
    
     .state('parcelamento.simula.list', {
      url: "/list?cnpj&dia_vencimento&valor",
      views: {
        'list-tab': {
        	 templateUrl: "partials/parcelamento/list.html",
        	 controller: 'ParcelamentoListController',
        }
      },
      resolve: {
          parcelamentoService: 'parcelamentoService',
             parcelamento: function(parcelamentoService,$stateParams) {
            	 return parcelamentoService.simulaParceladoEmissor($stateParams).query();
             }
      }
    })
    
     .state('parcelamento.consultaplano', {
      url: "/consulta_plano",
      views: {
        'menu-content' :{
        	templateUrl: "partials/parcelamento/consulta.plano.html",
        	//AlÈm disso, herdar $ escopo objetos para baixo para as crianÁas, apenas entender que isso acontece por meio da hierarquia de vista , n„o a hierarquia do Estado.
        }
      }
    })
    
     .state('parcelamento.consultaplano.list', {
      url: "/list?cnpj&cpf&valor_transacao&valor_entrada&tipo_transacao&numero_cartao",
      views: {
        'list-tab': {
        	 templateUrl: "partials/parcelamento/list.html",
        	 controller: 'ParcelamentoListController',
        }
      },
      resolve: {
          parcelamentoService: 'parcelamentoService',
             parcelamento: function(parcelamentoService,$stateParams) {
            	 return parcelamentoService.consultaPlanoParcelamento($stateParams).query();
             }
      }
    });
//    
//    .state('app.parcelamento.list.entry', {
//      url: "/entry/{id:[0-9]{1,9}}'",
//      views: {
//        'entry-tab': {
//        	 templateUrl: "partials/parcelamento/entry.html",
//        	 controller: 'ParcelamentoEntryController',
//        }
//      },
//     
//      data: {
//          requiredAuthentication: true,
//          pageTitle: 'Parcelamento'
//      }
//    });
}

  // $urlRouterProvider.otherwise("/tab/home");
  //$urlRouterProvider.otherwise("/app/home");



})();

