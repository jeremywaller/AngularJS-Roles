# AngularJS-Roles
Handles all client-side roles/permissions for an AngularJS 1.5 application

Handles all roles/permissions for the application. All roles/permissions must be defined
in the permissions object. Both the state/route provider and the permissions directive use 
the permissions defined here. Permissions may be nested 2 levels deep as shown. 

To use, call the 'hasPermission' function, passing the permission lookup using dot notation
(e.g. myPage.topMenu). The function will return a boolean to indicate if the user has the 
necessary permission.

Roles for the current user are defined on a global variable 'CurrentUser.AssignedRoles' which is
populated by a call to the server when the application launches. If you wish to use a different
method to retreive roles from the server, edit the angular.forEach loop in the 'compareUserRoles'
function as necessary.

The included directive allows for roles/permissions to be accessed from any HTML element within the application.
To use, include the attribute 'required-permission="yourDefinedPermission"' on any element.
By default, if the user does not have the necessary permission the element will be hidden.
Optional: The element can be disabled instead of hidden by including the an additional attribute
'if-unauthorized="disable"'

#Route Security

If you use AngularUI Router (which I highly recommend!), the AngularJS Roles Service can be used to prevent unwanted access to routes.

````javascript
////////////////////
// Protected Page //
////////////////////

.state('protectedPage', {
  url: '/',
  controller: 'protectedPageController',
  templateUrl: 'protectedPage.html',
  onEnter: ['$state', 'roleService', function ($state, roleService) {
    if (!roleService.hasPermission(this.name)) {
    $state.go('login');
    }
  }]
})


// roleService.js

// Only users with the 'AuthenticatedUser' role will be able to access the protectedPage state.
function appPermissions(area, subarea) {
  var permissions = {
    protectedPage: ['AuthenticatedUser']
  }
}

````
