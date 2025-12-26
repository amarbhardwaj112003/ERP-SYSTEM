from rest_framework import serializers
from .models import Department, Employee, Attendance, LeaveRequest, Salary, Document, PerformanceReview
from accounts.models import User

# -------------------- Department --------------------
class DepartmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Department
        fields = '__all__'

# -------------------- User --------------------
class UserBasicSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'first_name', 'last_name', 'role']

# -------------------- Employee --------------------
class EmployeeSerializer(serializers.ModelSerializer):
    # Nested user info (GET only)
    user = UserBasicSerializer(read_only=True)

    # POST/PUT: send user_id only
    user_id = serializers.PrimaryKeyRelatedField(
        queryset=User.objects.all(),
        source='user',
        write_only=True
    )

    # Nested department name
    department = serializers.StringRelatedField(read_only=True)

    # POST/PUT: send department_id only
    department_id = serializers.PrimaryKeyRelatedField(
        queryset=Department.objects.all(),
        source='department',
        write_only=True
    )

    class Meta:
        model = Employee
        fields = [
            'id', 'user', 'user_id', 'employee_id', 'designation',
            'joining_date', 'contact', 'address', 'salary',
            'department', 'department_id'
        ]

    def create(self, validated_data):
        return Employee.objects.create(**validated_data)

    def update(self, instance, validated_data):
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()
        return instance

# -------------------- Attendance --------------------
class AttendanceSerializer(serializers.ModelSerializer):
    employee_name = serializers.CharField(source='employee.user.username', read_only=True)
    class Meta:
        model = Attendance
        fields = '__all__'

# -------------------- Leave Request --------------------
class LeaveRequestSerializer(serializers.ModelSerializer):
    employee_name = serializers.CharField(source='employee.user.username', read_only=True)
    class Meta:
        model = LeaveRequest
        fields = '__all__'

# -------------------- Salary --------------------
class SalarySerializer(serializers.ModelSerializer):
    employee_name = serializers.CharField(source='employee.user.username', read_only=True)
    class Meta:
        model = Salary
        fields = '__all__'

# -------------------- Document --------------------
class DocumentSerializer(serializers.ModelSerializer):
    employee_name = serializers.CharField(source='employee.user.username', read_only=True)

    class Meta:
        model = Document
        fields = ['id', 'employee', 'employee_name', 'title', 'file', 'uploaded_at']

# -------------------- Performance Review --------------------
class PerformanceReviewSerializer(serializers.ModelSerializer):
    employee_name = serializers.CharField(source='employee.user.username', read_only=True)
    reviewer_name = serializers.CharField(source='reviewer.username', read_only=True)
    class Meta:
        model = PerformanceReview
        fields = '__all__'
