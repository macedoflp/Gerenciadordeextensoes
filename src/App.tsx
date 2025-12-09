import React, { useState } from 'react';
import { AuthProvider, useAuth } from './lib/auth-context';
import { Header } from './components/layout/Header';
import { Sidebar } from './components/layout/Sidebar';
import { MobileNav } from './components/layout/MobileNav';
import { MobileSidebar } from './components/layout/MobileSidebar';
import { HomePortal } from './components/pages/Login';
import { Dashboard } from './components/pages/Dashboard';
import { Opportunities } from './components/pages/Opportunities';
import { ApprovalRequests } from './components/pages/ApprovalRequests';
import { Certificates } from './components/pages/Certificates';
import { PublicPortal } from './components/pages/PublicPortal';
import { Signup } from './components/pages/Signup';
import { ForgotPassword } from './components/pages/ForgotPassword';
import { MyEnrollments } from './components/pages/MyEnrollments';
import { Groups } from './components/pages/Groups';
import { PPC } from './components/pages/PPC';
import { Reports } from './components/pages/Reports';
import { Communications } from './components/pages/Communications';
import { Users } from './components/pages/Users';
import { Settings } from './components/pages/Settings';
import { Home } from 'lucide-react';

function AppContent() {
  const { isAuthenticated, login } = useAuth();
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [showMobileSidebar, setShowMobileSidebar] = useState(false);
  const [authView, setAuthView] = useState<'login' | 'signup' | 'forgot-password'>('login');

  // Handle Login
  if (!isAuthenticated) {
    if (authView === 'signup') {
      return <Signup onBack={() => setAuthView('login')} onSuccess={() => setAuthView('login')} />;
    }
    if (authView === 'forgot-password') {
      return <ForgotPassword onBack={() => setAuthView('login')} />;
    }
    return (
      <HomePortal
        onLogin={login}
        onSignup={() => setAuthView('signup')}
        onForgotPassword={() => setAuthView('forgot-password')}
      />
    );
  }

  // Render Page
  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard onNavigate={setCurrentPage} />;
      case 'opportunities':
        return <Opportunities />;
      case 'my-enrollments':
        return <MyEnrollments />;
      case 'approval-requests':
        return <ApprovalRequests />;
      case 'certificates':
        return <Certificates />;
      case 'groups':
        return <Groups />;
      case 'ppc':
        return <PPC />;
      case 'reports':
        return <Reports />;
      case 'communications':
        return <Communications />;
      case 'public-portal':
        return <PublicPortal />;
      case 'users':
        return <Users />;
      case 'settings':
        return <Settings />;
      default:
        return <Dashboard onNavigate={setCurrentPage} />;
    }
  };

  return (
    <div className="min-h-screen bg-neutral-50">
      <Header onMenuClick={() => setShowMobileSidebar(true)} />
      
      <div className="flex">
        <Sidebar activePage={currentPage} onPageChange={setCurrentPage} />
        
        <main className="flex-1 p-4 lg:p-6 pb-20 lg:pb-6">
          <div className="max-w-7xl mx-auto">
            {renderPage()}
          </div>
        </main>
      </div>

      <MobileNav
        activePage={currentPage}
        onPageChange={setCurrentPage}
        onMenuClick={() => setShowMobileSidebar(true)}
      />

      <MobileSidebar
        isOpen={showMobileSidebar}
        onClose={() => setShowMobileSidebar(false)}
        activePage={currentPage}
        onPageChange={setCurrentPage}
      />
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}
