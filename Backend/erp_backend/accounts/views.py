from rest_framework import generics
from rest_framework.permissions import IsAuthenticated
from .models import User
from .serializers import UserSerializer, CreateUserSerializer
from .permissions import IsSuperAdmin
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework.response import Response
from rest_framework import status


#  Use role from Custom User model (not from groups)
class CustomLoginSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        data = super().validate(attrs)
        data.update({
            'user_id': self.user.id,
            'username': self.user.username,
            'email': self.user.email,
            'role': self.user.role,  # <- Use custom model's `role` field
        })
        return data


class CustomLoginView(TokenObtainPairView):
    serializer_class = CustomLoginSerializer


class UserListView(generics.ListAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated, IsSuperAdmin]


class UserCreateView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = CreateUserSerializer
    permission_classes = [IsAuthenticated, IsSuperAdmin]


class UserUpdateView(generics.RetrieveUpdateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated, IsSuperAdmin]


class UserDeleteView(generics.DestroyAPIView):
    queryset = User.objects.all()
    permission_classes = [IsAuthenticated, IsSuperAdmin]

    def perform_destroy(self, instance):
        instance.is_active = False
        instance.save()
