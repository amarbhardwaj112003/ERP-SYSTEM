# hrm/urls.py

from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    DepartmentViewSet,
    EmployeeViewSet,
    AttendanceViewSet,
    LeaveRequestViewSet,
    SalaryViewSet,
    DocumentViewSet,
    PerformanceReviewViewSet
)

# Initialize the default router for ViewSets
router = DefaultRouter()
router.register(r'departments', DepartmentViewSet, basename='department')
router.register(r'employees', EmployeeViewSet, basename='employee')
router.register(r'attendance', AttendanceViewSet, basename='attendance')
router.register(r'leaves', LeaveRequestViewSet, basename='leave')
router.register(r'salaries', SalaryViewSet, basename='salary')
router.register(r'documents', DocumentViewSet, basename='document')
router.register(r'reviews', PerformanceReviewViewSet, basename='review')

# Define the URL patterns
urlpatterns = [
    path('', include(router.urls)),  # Includes all router-registered URLs
]
