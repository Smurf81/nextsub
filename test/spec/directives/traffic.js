'use strict';

describe('Directive: traffic', function () {

  // load the directive's module
  beforeEach(module('nextsubApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<traffic></traffic>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the traffic directive');
  }));
});
