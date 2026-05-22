ERP Management System (Django + React)

A full-stack Enterprise Resource Planning (ERP) system built using Django REST Framework for the backend and React.js with Tailwind CSS for the frontend.
This project is designed with role-based access control, modular architecture, and real-world business workflows.

📌 Project Overview

The ERP system helps organizations manage their core business operations including:

Human Resource Management (HRM)

Customer Relationship Management (CRM)

Order Management

Inventory Management

Finance & Accounting

Supply Chain Management

The system supports multiple user roles such as SuperAdmin, Manager, HR Manager, and Employee, each with dedicated dashboards and permissions.

🛠️ Tech Stack
🔹 Backend

Python

Django

Django REST Framework

JWT Authentication

Celery & Redis (for background tasks)

SQLite (development)

PostgreSQL (production ready)

🔹 Frontend

React.js

React Router

Tailwind CSS

Axios

Role-Based Access Control (RBAC)

🔹 Tools & Others

Git & GitHub

Postman (API testing)

Docker (supported)

VS Code

🧩 Modules Implemented
✅ Human Resource Management (HRM)

Employee management

Departments

Attendance tracking

Leave management

Payroll & salaries

Performance reviews

✅ Customer Relationship Management (CRM)

Customer management

Lead management

Customer interaction history

CRM dashboards

✅ Order Management

Order creation

Order tracking

Status updates

Integration with inventory & finance

✅ Inventory Management

Product & stock tracking

Reorder alerts

Inventory audit logs

✅ Finance & Accounting

Income & expense tracking

Invoices

Financial reports

Automated transactions

✅ Supply Chain Management

Supplier management

Procurement

Warehouse & logistics tracking

👥 User Roles & Permissions
Role	Access
SuperAdmin	Full system access
Manager	Orders, Inventory, Finance
HR Manager	HRM module
Employee	Self-service dashboard
📂 Project Structure
ERP-SYSTEM/
│
├── Backend/
│   └── erp_backend/
│       ├── accounts/
│       ├── hrm/
│       ├── crm/
│       ├── inventory/
│       ├── orders/
│       ├── finance/
│       └── supply_chain/
│
├── Frontend/
│   └── erp-frontend/
│       ├── src/
│       │   ├── auth/
│       │   ├── components/
│       │   ├── modules/
│       │   ├── routes/
│       │   ├── services/
│       │   └── layouts/
│
└── README.md

⚙️ Installation & Setup
🔹 Backend Setup
cd Backend
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
python manage.py migrate
python manage.py createsuperuser
python manage.py runserver

🔹 Frontend Setup
cd Frontend/erp-frontend
npm install
npm run dev

🔐 Environment Variables

Create .env files (not committed to GitHub):


Frontend .env
VITE_API_BASE_URL=http://127.0.0.1:8000/api

![Login](screenshots/login.png)
![Dashboard](screenshots/admin.png)
![HRM](screenshots/Hr.png)
![Inventory](screenshots/inventory.png)
![Finance](screenshots/finance.png)
![CRM](screenshots/CRM.png)


