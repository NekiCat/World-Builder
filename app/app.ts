/// <reference path="../typings/index.d.ts" />

module WorldBuilder {

    /*if (!String.prototype.format) {
     String.prototype.format = function() {
     var args = arguments;
     return this.replace(/{(\d+)}/g, function (match, number) {
     return typeof args[number] != 'undefined'
     ? args[number]
     : match;
     });
     }
     }*/

    export interface Identifiable {
        guid: string;
    }

    export interface Nameable {
        name: string;
    }

    export interface Deletable {
        deleted: boolean;
    }

    export interface ListItem extends Identifiable, Nameable, Deletable { }

    export interface CommonListScope<T extends ListItem> extends ng.IScope {
        createItem: () => void;
        removeItem: (item: T) => void;
        removeUndo: (item: T) => void;
    }

    export interface ProjectStorage extends ng.storage.IStorageService {
        projects: Project[];
    }

    export module Util {
        export function registerAngularController(controllerName: string, controller: any, route: string, templateUrl: string) {
            angular.module("WorldBuilder")
                .config(["$routeProvider", ($routeProvider: ng.route.IRouteProvider) => {
                    $routeProvider.when(route, {
                        templateUrl: templateUrl,
                        controller: controllerName
                    });
                }])
                .controller(controllerName, controller);
        }

        /**
         * Creates a random GUID as identification for this project.
         *
         * @returns {string}
         */
        export function createGUID(): string {
            // http://stackoverflow.com/a/2117523/2346327
            return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
                var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
                return v.toString(16);
            });
        }
    }

    angular.module("WorldBuilder", ["ngRoute", "ngStorage"])
        .config(["$locationProvider", "$routeProvider", ($locationProvider: ng.ILocationProvider, $routeProvider: ng.route.IRouteProvider) => {
            $locationProvider.hashPrefix("!");
            $routeProvider.otherwise({redirectTo: "/projects"});
        }])
        .filter("escape", ["$window", ($window) => {
            return $window.encodeURIComponent;
        }])
        .directive('wbClickOff', ["$parse", "$document", function ($parse, $document) {
            // http://anand.codes/projects/click-off/
            return {
                compile: function ($element, attr) {
                    // Parse the expression to be executed
                    // whenever someone clicks _off_ this element.
                    var fn = $parse(attr["wbClickOff"]);
                    return function (scope, element, attr) {
                        // add a click handler to the element that
                        // stops the event propagation.
                        element.bind("click", function (event) {
                            event.stopPropagation();
                        });
                        angular.element($document[0].body).bind("click", function (event) {
                            scope.$apply(function () {
                                fn(scope, {$event: event});
                            });
                        });
                    };
                }
            };
        }])
        .directive('wbEnter', function () {
            // http://stackoverflow.com/a/17364716/2346327
            return function (scope, element, attrs) {
                element.bind("keydown keypress", function (event) {
                    if (event.which === 13) {
                        scope.$apply(function () {
                            scope.$eval(attrs.wbEnter, {'event': event});
                        });

                        event.preventDefault();
                    }
                });
            };
        });
}
