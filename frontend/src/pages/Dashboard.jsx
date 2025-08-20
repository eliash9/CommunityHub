import { useState } from 'react';
import { Routes, Route, Link, useParams, useNavigate, useLocation } from 'react-router-dom';

// Tab Components
import CalendarTab from '../components/dashboard/CalendarTab';
import AnnouncementsTab from '../components/dashboard/AnnouncementsTab';
import PollsTab from '../components/dashboard/PollsTab';
import TasksTab from '../components/dashboard/TasksTab';
import MembersTab from '../components/dashboard/MembersTab';

const Dashboard = () => {
  const { communityId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [communityName, setCommunityName] = useState('Komunitas ' + communityId);
  
  // Determine active tab
  const getActiveTab = () => {
    const path = location.pathname;
    if (path.includes('/calendar')) return 'calendar';
    if (path.includes('/announcements')) return 'announcements';
    if (path.includes('/polls')) return 'polls';
    if (path.includes('/tasks')) return 'tasks';
    if (path.includes('/members')) return 'members';
    return 'calendar'; // Default tab
  };

  const activeTab = getActiveTab();

  // Redirect to calendar tab if no specific tab is selected
  if (location.pathname === `/community/${communityId}`) {
    navigate(`/community/${communityId}/calendar`);
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex-shrink-0 flex items-center">
              <Link to="/" className="text-2xl font-bold text-primary-600 hover:text-primary-700 transition-colors duration-300">CommunityHub</Link>
              <span className="ml-4 text-gray-500">|</span>
              <h2 className="ml-4 text-lg font-medium text-gray-900">{communityName}</h2>
            </div>
            <div className="ml-4 flex items-center md:ml-6">
              <button className="bg-white p-1 rounded-full text-gray-400 hover:text-primary-500 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500">
                <span className="sr-only">View notifications</span>
                <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
              </button>

              {/* Profile dropdown */}
              <div className="ml-3 relative">
                <div>
                  <button className="max-w-xs bg-white flex items-center text-sm rounded-full hover:ring-2 hover:ring-primary-300 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500">
                    <span className="sr-only">Open user menu</span>
                    <div className="h-8 w-8 rounded-full bg-primary-600 hover:bg-primary-700 transition-colors duration-300 flex items-center justify-center text-white font-medium">
                      U
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Tab Navigation */}
      <div className="border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="-mb-px flex space-x-8" aria-label="Tabs">
            <Link
              to={`/community/${communityId}/calendar`}
              className={`${activeTab === 'calendar' ? 'border-primary-500 text-primary-600' : 'border-transparent text-gray-500 hover:text-primary-600 hover:border-primary-300'} whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-300`}
            >
              Kalender Kegiatan
            </Link>
            <Link
              to={`/community/${communityId}/announcements`}
              className={`${activeTab === 'announcements' ? 'border-primary-500 text-primary-600' : 'border-transparent text-gray-500 hover:text-primary-600 hover:border-primary-300'} whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-300`}
            >
              Pengumuman
            </Link>
            <Link
              to={`/community/${communityId}/polls`}
              className={`${activeTab === 'polls' ? 'border-primary-500 text-primary-600' : 'border-transparent text-gray-500 hover:text-primary-600 hover:border-primary-300'} whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-300`}
            >
              Voting / Polling
            </Link>
            <Link
              to={`/community/${communityId}/tasks`}
              className={`${activeTab === 'tasks' ? 'border-primary-500 text-primary-600' : 'border-transparent text-gray-500 hover:text-primary-600 hover:border-primary-300'} whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-300`}
            >
              Jadwal Giliran / Tugas
            </Link>
            <Link
              to={`/community/${communityId}/members`}
              className={`${activeTab === 'members' ? 'border-primary-500 text-primary-600' : 'border-transparent text-gray-500 hover:text-primary-600 hover:border-primary-300'} whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-300`}
            >
              Anggota
            </Link>
          </nav>
        </div>
      </div>

      {/* Tab Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <Routes>
          <Route path="/calendar" element={<CalendarTab communityId={communityId} />} />
          <Route path="/announcements" element={<AnnouncementsTab communityId={communityId} />} />
          <Route path="/polls" element={<PollsTab communityId={communityId} />} />
          <Route path="/tasks" element={<TasksTab communityId={communityId} />} />
          <Route path="/members" element={<MembersTab communityId={communityId} />} />
        </Routes>
      </main>
    </div>
  );
};

export default Dashboard;