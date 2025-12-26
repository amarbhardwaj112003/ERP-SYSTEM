import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "../auth/ProtectedRoute";

// CRM pages
import Dashboard from "../modules/crm/Dashboard";

import CustomerList from "../modules/crm/pages/customers/CustomerList";
import AddCustomer from "../modules/crm/pages/customers/AddCustomer";

import LeadList from "../modules/crm/pages/leads/LeadList";
import AddLead from "../modules/crm/pages/leads/AddLead";

import CampaignList from "../modules/crm/pages/campaigns/CampaignList";
import AddCampaign from "../modules/crm/pages/campaigns/AddCampaign";

import InteractionList from "../modules/crm/pages/interactions/InteractionList";

import TicketList from "../modules/crm/pages/tickets/TicketList";
import AddTicket from "../modules/crm/pages/tickets/AddTicket";

export default function CRMRoutes() {
  return (
    <Routes>
      <Route element={<ProtectedRoute allowedRoles={["SuperAdmin", "Manager"]} />}>
        
        {/* Dashboard */}
        <Route index element={<Dashboard />} />

        {/* Customers */}
        <Route path="customers" element={<CustomerList />} />
        <Route path="customers/add" element={<AddCustomer />} />

        {/* Leads */}
        <Route path="leads" element={<LeadList />} />
        <Route path="leads/add" element={<AddLead />} />

        {/* Campaigns */}
        <Route path="campaigns" element={<CampaignList />} />
        <Route path="campaigns/add" element={<AddCampaign />} />

        {/* Interactions */}
        <Route path="interactions" element={<InteractionList />} />

        {/* Support Tickets */}
        <Route path="tickets" element={<TicketList />} />
        <Route path="tickets/add" element={<AddTicket />} />

      </Route>
    </Routes>
  );
}
