from rest_framework import permissions

class IsFinanceRoleOrReadOnly(permissions.BasePermission):
    def has_permission(self, request, view):
        return (
            request.user.role in ['SuperAdmin', 'Finance']
            or request.method in permissions.SAFE_METHODS
        )
