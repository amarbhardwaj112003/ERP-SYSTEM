import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import CommonHeader from './CommonHeader';

export default function ManagerLayout() {
  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <CommonHeader title="Orders" />
        <main className="p-4 overflow-auto"><Outlet /></main>
      </div>
    </div>
  );
}
