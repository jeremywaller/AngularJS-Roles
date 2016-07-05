// Allows for roles/permissions to be accessed from any HTML element within the application.
// To use, include the attribute 'required-permission="yourDefinedPermission"' on any element.
// By default, if the user does not have the necessary permission the element will be hidden.
// Optional: The element can be disabled instead of hidden by including the an additional attribute
// 'if-unauthorized="disable"'

// Note, this must be used in conjunction with the role service. You must define your permissions
// there first.

applicationModule.directive('requiredPermission', ['roleService', function (roleService) {
    return {
        restrict: 'A',
        link: function (scope, elem, attrs) {
            if (roleService.hasPermission(attrs.requiredPermission)) {
                if (angular.isDefined(attrs.ifUnauthorized) && attrs.ifUnauthorized == 'disable') {
                    elem.attr('disabled', false);
                } else {
                    elem.show();
                }
            } else {
                if (angular.isDefined(attrs.ifUnauthorized) && attrs.ifUnauthorized == 'disable') {
                    elem.attr('disabled', true);
                } else {
                    elem.hide();
                }
            }
        }
    }
}])