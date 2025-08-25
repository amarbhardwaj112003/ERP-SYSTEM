export const ROLES = {
  SUPERADMIN: 'superadmin',
  HR: 'hr',
  MANAGER: 'manager',
  EMPLOYEE: 'employee',
};

export const roleHome = {
  [ROLES.SUPERADMIN]: '/admin/dashboard',
  [ROLES.HR]: '/hr/dashboard',
  [ROLES.MANAGER]: '/orders/dashboard',
  [ROLES.EMPLOYEE]: '/orders/customer', // or '/hr/employee-profile'
};
