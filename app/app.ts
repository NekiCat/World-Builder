/// <reference path="../typings/index.d.ts" />

module WorldBuilder {
    export interface Identifiable {
        guid: string;
    }

    export interface Nameable {
        name: string;
    }


    /**
     * Creates a random GUID as identification for this project.
     *
     * @returns {string}
     */
    export function createGUID(): string {
        // http://stackoverflow.com/a/2117523/2346327
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
            return v.toString(16);
        });
    }

    /**
     * Interface for the scope of a ProjectController.
     */
    export interface ProjectListScope extends ng.IScope {
        $storage: ProjectStorage;
        createProject: () => void;
        deleteProject: (project: Project) => void;
    }

    angular.module("WorldBuilder", ["ngRoute", "ngStorage"])
        .config(["$locationProvider", "$routeProvider", ($locationProvider: ng.ILocationProvider, $routeProvider: ng.route.IRouteProvider) => {
            $locationProvider.hashPrefix("!");
            $routeProvider.otherwise({ redirectTo: "/projects" });
        }])
        .filter("escape", ["$window", ($window) => {
            return $window.encodeURIComponent;
        }])
        .directive('wbClickOff', ["$parse", "$document", function($parse, $document) {
            // http://anand.codes/projects/click-off/
            return {
                compile: function($element, attr) {
                    // Parse the expression to be executed
                    // whenever someone clicks _off_ this element.
                    var fn = $parse(attr["wbClickOff"]);
                    return function(scope, element, attr) {
                        // add a click handler to the element that
                        // stops the event propagation.
                        element.bind("click", function(event) {
                            event.stopPropagation();
                        });
                        angular.element($document[0].body).bind("click", function(event) {
                            scope.$apply(function() {
                                fn(scope, {$event:event});
                            });
                        });
                    };
                }
            };
        }]);
}
