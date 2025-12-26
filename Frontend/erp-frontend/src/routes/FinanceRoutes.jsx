import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "../auth/ProtectedRoute";

import FinanceDashboard from "../modules/finance/pages/FinanceDashboard";
import AccountList from "../modules/finance/pages/AccountList";
import AddAccount from "../modules/finance/pages/AddAccount";
import TransactionList from "../modules/finance/pages/TransactionList";
import AddTransaction from "../modules/finance/pages/AddTransaction";
import InvoiceList from "../modules/finance/pages/InvoiceList";
import AddInvoice from "../modules/finance/pages/AddInvoice";

export default function FinanceRoutes() {
  return (
    <Routes>
      <Route element={<ProtectedRoute allowedRoles={["SuperAdmin", "Finance"]} />}>

        <Route index element={<FinanceDashboard />} />

        {/* Accounts */}
        <Route path="accounts" element={<AccountList />} />
        <Route path="accounts/add" element={<AddAccount />} />

        {/* Transactions */}
        <Route path="transactions" element={<TransactionList />} />
        <Route path="transactions/add" element={<AddTransaction />} />

        {/* Invoices */}
        <Route path="invoices" element={<InvoiceList />} />
        <Route path="invoices/add" element={<AddInvoice />} />
      </Route>
    </Routes>
  );
}
