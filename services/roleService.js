// Handles all roles/permissions for the application. All roles/permissions must be defined
// in the permissions object. Both the state/route provider and the permissions directive use 
// the permissions defined here. Permissions may be nested 2 levels deep as shown. 

// To use, call the 'hasPermission' function, passing the permission lookup using dot notation
// (e.g. myLeave.topMenu). The function will return a boolean to indicate if the user has the 
// necessary permission.

// Roles for the current user are defined on a global variable 'CurrentUser.AssignedRoles' which is
// populated by a call to the server when the application launches. If you wish to use a different
// method to retreive roles from the server, edit the angular.forEach loop in the 'compareUserRoles'
// function as necessary.


applicationModule.factory('roleService', ['$state',

function ($state) {

    return {
        isInRole: isInRole,
        hasPermission: hasPermission,
        appPermissions: appPermissions
    }

    function appPermissions(area, subarea) {
        
        // Set your permissions here.
        var permissions = {
            base: {
                examplePage: ['User'],
                exampleAdminPage: ['Admin'],
                exampleMixedRights: ['User', 'HR'],
            },
            topMenu: {
                menuOne: ['User'],
                menuTwo: ['Admin', 'Supervisor', 'HR'],
            }
        }

        if (angular.isDefined(subarea)) {
            return permissions[area][subarea];
        } else {
            return permissions[area];
        }        
    }
    

    function isInRole(roles) {

        var roleMatch = false;

        if (roles.length > 1) {
            angular.forEach(roles, function (value, key) {
                if (compareUserRoles(value)) {
                    roleMatch = true;
                }
            });
        } else {
            if (compareUserRoles(roles)) {
                roleMatch = true;
            }
        }

        return roleMatch;
    }

    function compareUserRoles(role) {

        var roleMatch = false;

        // Loop through roles in the global user variable.
        // Replace CurrentUser.AssignedRoles with your object that holds roles for the current user.
        angular.forEach(CurrentUser.AssignedRoles, function (value, key) { 
            if (role == value.text) {
                roleMatch = true;
            }
        });

        return roleMatch;
    }

    function hasPermission(area) {

        try {
            var areaArray = area.split('.');

            var permission = appPermissions(areaArray[0], areaArray[1]);

            return isInRole(permission);

        } catch (e) {
            e.message = "That role has not been defined.";
            throw e;
        }

    }
}]);