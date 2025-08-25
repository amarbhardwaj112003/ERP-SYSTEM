from rest_framework.permissions import BasePermission, SAFE_METHODS



class IsSuperAdmin(BasePermission):
    def has_permission(self, request, view):
        return request.user.is_authenticated and request.user.role.lower() == 'superadmin'


class IsHRManager(BasePermission):
    def has_permission(self, request, view):
        return request.user.is_authenticated and request.user.role.lower() == 'hr_manager'


class IsCRMRoleOrReadOnly(BasePermission):
    def has_permission(self, request, view):
        return (
            request.user.is_authenticated and (
                request.user.role.lower() in ['superadmin', 'manager', 'crm']
                or request.method in SAFE_METHODS
            )
        )


class IsManagerOrEmployee(BasePermission):
    def has_permission(self, request, view):
        return (
            request.user.is_authenticated and
            request.user.role.lower() in ['manager', 'employee']
        )


class IsFinanceRoleOrReadOnly(BasePermission):
    def has_permission(self, request, view):
        return (
            request.user.is_authenticated and (
                request.user.role.lower() in ['superadmin', 'finance_manager', 'finance_executive']
                or request.method in SAFE_METHODS
            )
        )
