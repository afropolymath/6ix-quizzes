from rest_framework import permissions


class IsAccountOwner(permissions.BasePermission):
    def has_object_permission(self, request, view, platformuser):
        if request.user:
            return platformuser == request.user
        return False
