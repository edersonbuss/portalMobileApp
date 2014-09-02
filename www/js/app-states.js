(function() {
    'use strict';
    angular
        .module('app')
        .config(config);

    function config($stateProvider, $urlRouterProvider, $httpProvider) {

        $stateProvider
            .state('app', {
                url: '/app',
                abstract: true,
                templateUrl: 'partials/templates/menu.html',
                //controller: 'AppController as ctrl'
            })

        .state('app.home', {
            url: "/home",
            views: {
                'menu-content': {
                    templateUrl: "partials/home/home.html",
                    controller: 'HomeController as crtl'
                }
            },
            data: {
                requiredAuthentication: true,
                pageTitle: 'Home' 
            }
        })

        

        .state('app.logout', {
            url: "/logout",
            views: {
                'menu-content': {
                    controller: "LogoutController"
                }
            },
            data: {
                requiredAuthentication: true
            }
        })


            .state('auth', {
                url: "/auth",
                abstract: true,
                templateUrl: "partials/templates/auth.html",
                data: {
                    requiredAuthentication: false,
                    pageTitle: 'Login'
                }
            })

            .state('auth.login', {
                url: '/login',
                views: {
                    'auth-signin': {
                        templateUrl: 'partials/login/login.html',
                        controller: 'LoginController as ctrl',
                    }
                }
            })
            .state('auth.signup', {
                url: '/signup',
                views: {
                    'auth-signup': {
                        templateUrl: 'partials/login/auth-signup.html',
                        controller: 'SignUpCtrl'
                    }
                }
                 
            })
            .state('auth.forgotpassword', {
                url: '/forgotpassword',
                views: {
                    'auth-forgot-password': {
                       templateUrl: 'partials/login/forgot-password.html',
                       controller: 'SignUpCtrl'
                        
                    }
                }
                 
            })

            

       


        .state('proposta', {
            // Com  abstract: true, significa que esse estado nÃ£o pode ser explicitamente ativado.
            // Ele sÃ³ pode ser implicitamente ativado ativando um estado filho.
            abstract: true,
            //Este estado abstrato irÃ¡ anteceder '/contacts "para todas as URLs de todos os seus filhos.
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

        // Usando um '.' dentro de um nome do estado declara uma crianÃ§a dentro de um dos pais.
        //EntÃ£o, vocÃª tem uma nova "lista" Estado dentro do Estado os "contactos" do pai.
        .state('proposta.list', {
                url: '/list', //ou  url: '',
                // loaded into ui-view of parent's template
                //templateUrl: 'partials/proposta/list.html',
                views: {
                    'main': {
                        templateUrl: "partials/proposta/list.html",
                        controller: 'PropostaListController',
                        controllerAs: 'ctrl'
                    }
                }

            })
            // VocÃª pode ter filhos ilimitadas dentro de um estado. Aqui estÃ¡ um segundo filho
            // Estado dentro do Estado pai 'contatos'.
            .state('proposta.entry', {
                url: '/entry/{id:[0-9]{1,9}}', //ou :id
                // loaded into ui-view of parent's template
                //templateUrl: 'partials/proposta/entry.html',
                views: {
                    'main': {
                        templateUrl: "partials/proposta/entry.html",
                        controller: 'PropostaEntryController',
                        controllerAs: 'ctrl'
                    }
                },
                //controller: 'PropostaController as ctrl', // as ctrl
                resolve: {
                    propostaService: 'propostaService',
                    proposta: function(propostaService, $stateParams) {
                        if (!$stateParams.id) return {};
                        var propostaId = $stateParams.id;
                        return propostaService.get({
                            id: propostaId
                        });

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

        .state('autorizacaoPOS.transacoes', {
            url: "/lista/:cpf",
            views: {
                'menu-content': {
                    templateUrl: "partials/autorizacaoposvirtual/list.html",
                    controller: 'AutorizacaoPOSListController',
                    //Além disso, herdar $ escopo objetos para baixo para as crianças, apenas entender que isso acontece por meio da hierarquia de vista , não a hierarquia do Estado.
                }
            },
            resolve: {
                autorizacaoPOSService: 'autorizacaoPOSService',
                AuthenticationService: 'AuthenticationService',
                currentUser: function(AuthenticationService) {
                    return AuthenticationService.getUser();
                },
                autorizacaoList: function(currentUser, autorizacaoPOSService) {
                    var autorizacaoList = autorizacaoPOSService.lista(currentUser.cpf).query();
                    return autorizacaoList;
                }
            }
        })

        .state('autorizacaoPOS.transacoes.entry', {
            url: "/entry/:autorizacaoOid",
            views: {
                'entry-tab': {
                    templateUrl: "partials/autorizacaoposvirtual/entry.html",
                    controller: 'AutorizacaoPOSEntryController',
                }
            },
            resolve: {
                autorizacaoPOSService: 'autorizacaoPOSService',
                autorizacao: function(autorizacaoPOSService, autorizacaoList, $stateParams, $state, utilsService) {
                    if (!$stateParams.autorizacaoOid) return {};
                    var autorizacao = utilsService.findById(autorizacaoList.transacoes, $stateParams.autorizacaoOid);
                    return autorizacao;
                    //return autorizacaoList.transacoes[$stateParams.autorizacaoOid];
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
                'menu-content': {
                    templateUrl: "partials/parcelamento/simula.html",
                    //Além disso, herdar $ escopo objetos para baixo para as crianças, apenas entender que isso acontece por meio da hierarquia de vista , não a hierarquia do Estado.
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
                parcelamentoList: function(parcelamentoService, $stateParams) {
                    if (!$stateParams.cnpj) return {};
                    var parcelamentoList = parcelamentoService.simulaParceladoEmissor($stateParams).query();
                    return parcelamentoList;
                }
            }

        })

        .state('parcelamento.simula.list.entry', {
            url: "/entry/:parcelaOid",
            views: {
                'entry-tab': {
                    templateUrl: "partials/parcelamento/entry.html",
                    controller: 'ParcelamentoEntryController',
                }
            },
            resolve: {
                parcelamentoService: 'parcelamentoService',
                parcela: function(parcelamentoService, parcelamentoList, $stateParams, $state, utilsService) {
                    if (!$stateParams.parcelaOid) return {};
                    var parcela = utilsService.findById(parcelamentoList.parcelas, $stateParams.parcelaOid);
                    return parcela;
                    //return autorizacaoList.transacoes[$stateParams.autorizacaoOid];
                }

            }
        })



        .state('parcelamento.consultaplano', {
            url: "/consulta_plano",
            views: {
                'menu-content': {
                    templateUrl: "partials/parcelamento/consulta.plano.html",
                    //Além disso, herdar $ escopo objetos para baixo para as crianças, apenas entender que isso acontece por meio da hierarquia de vista , não a hierarquia do Estado.
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
                parcelamento: function(parcelamentoService, $stateParams) {
                    return parcelamentoService.consultaPlanoParcelamento($stateParams).query();
                }
            }
        });
    }

    // $urlRouterProvider.otherwise("/tab/home");
    //$urlRouterProvider.otherwise("/app/home");

})();