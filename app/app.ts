/// <reference path="../typings/index.d.ts" />

module WorldBuilder {
    export interface Identifiable {
        guid: string;
    }

    export interface Nameable {
        name: string;
    }

    export class GUID {
        private constructor() { }

        /**
         * Creates a random GUID as identification for this project.
         *
         * @returns {string}
         */
        public static create(): string {
            // http://stackoverflow.com/a/2117523/2346327
            return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
                var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
                return v.toString(16);
            });
        }
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
        }]);
}
