import angular from 'angular';

import aboutHTML from 'components/about/about.md!md';
import errorHTML from 'components/error/error.html!text';

import barsComponent from 'components/bars/bars';

configRoutes.$inject = ['$routeProvider'];
function configRoutes ($routeProvider) {
  $routeProvider
  .when('/about', {
    template: aboutHTML
  })
  .when('/error', {
    template: errorHTML
  })
  .when('/404', {
    template: errorHTML
  })
  .when('/', {
    template: '<bars data-package="$resolve.dataPackage"></bars>',
    datapackageUrl: 'components/bars/datapackage.json'
  })
  .otherwise({
    redirectTo: '/'
  });
}

const routes = angular
  .module('routes', [])
  .component('bars', barsComponent)
  .config(configRoutes)
  .name;

export default routes;
