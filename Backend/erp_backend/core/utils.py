import uuid

def generate_unique_employee_id():
    return f"EMP-{uuid.uuid4().hex[:8].upper()}"

def generate_unique_order_id():
    return f"ORD-{uuid.uuid4().hex[:10].upper()}"
