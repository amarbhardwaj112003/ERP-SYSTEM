from rest_framework import viewsets, permissions
from rest_framework.decorators import action
from rest_framework.response import Response
from django_filters.rest_framework import DjangoFilterBackend # type: ignore
from rest_framework.filters import SearchFilter, OrderingFilter

from .models import (
    Department, Employee, Attendance, LeaveRequest,
    Salary, Document, PerformanceReview
)
from .serializers import (
    DepartmentSerializer, EmployeeSerializer, AttendanceSerializer,
    LeaveRequestSerializer, SalarySerializer, DocumentSerializer,
    PerformanceReviewSerializer
)
from accounts.permissions import IsSuperAdmin, IsHRManager


class DepartmentViewSet(viewsets.ModelViewSet):
    queryset = Department.objects.all()
    serializer_class = DepartmentSerializer
    permission_classes = [permissions.IsAuthenticated, IsSuperAdmin | IsHRManager]


class EmployeeViewSet(viewsets.ModelViewSet):
    queryset = Employee.objects.select_related('user', 'department')
    serializer_class = EmployeeSerializer
    permission_classes = [permissions.IsAuthenticated, IsSuperAdmin | IsHRManager]
    filter_backends = [DjangoFilterBackend, SearchFilter, OrderingFilter]
    filterset_fields = ['department__name']
    search_fields = ['user__username', 'employee_id', 'designation']

    @action(detail=True, methods=['get'], url_path='profile')
    def profile(self, request, pk=None):
        employee = self.get_object()
        serializer = self.get_serializer(employee)
        return Response(serializer.data)


class AttendanceViewSet(viewsets.ModelViewSet):
    queryset = Attendance.objects.select_related('employee__user')
    serializer_class = AttendanceSerializer
    permission_classes = [permissions.IsAuthenticated]


class LeaveRequestViewSet(viewsets.ModelViewSet):
    queryset = LeaveRequest.objects.select_related('employee__user')
    serializer_class = LeaveRequestSerializer
    permission_classes = [permissions.IsAuthenticated]

    @action(detail=True, methods=['post'], permission_classes=[IsSuperAdmin | IsHRManager])
    def approve(self, request, pk=None):
        leave = self.get_object()
        leave.status = 'approved'
        leave.save()
        return Response({'detail': 'Leave approved'})

    @action(detail=True, methods=['post'], permission_classes=[IsSuperAdmin | IsHRManager])
    def reject(self, request, pk=None):
        leave = self.get_object()
        leave.status = 'rejected'
        leave.save()
        return Response({'detail': 'Leave rejected'})


class SalaryViewSet(viewsets.ModelViewSet):
    queryset = Salary.objects.select_related('employee__user')
    serializer_class = SalarySerializer
    permission_classes = [permissions.IsAuthenticated, IsSuperAdmin | IsHRManager]


class DocumentViewSet(viewsets.ModelViewSet):
    queryset = Document.objects.select_related('employee__user')
    serializer_class = DocumentSerializer
    permission_classes = [permissions.IsAuthenticated, IsSuperAdmin | IsHRManager]


class PerformanceReviewViewSet(viewsets.ModelViewSet):
    queryset = PerformanceReview.objects.select_related('employee__user', 'reviewer')
    serializer_class = PerformanceReviewSerializer
    permission_classes = [permissions.IsAuthenticated, IsSuperAdmin | IsHRManager]

    def perform_create(self, serializer):
        serializer.save(reviewer=self.request.user)
