import React from 'react';
import {
  Home,
  Calendar,
  FileText,
  Award,
  Menu,
} from 'lucide-react';
import { useAuth } from '../../lib/auth-context';

interface MobileNavProps {
  activePage: string;
  onPageChange: (page: string) => void;
  onMenuClick: () => void;
}

export function MobileNav({ activePage, onPageChange, onMenuClick }: MobileNavProps) {
  const { currentRole } = useAuth();

  const mobileItems = [
    { id: 'dashboard', label: 'Início', icon: Home },
    { id: 'opportunities', label: 'Oportunidades', icon: Calendar },
    ...(currentRole === 'discente' ? [{ id: 'approval-requests', label: 'Aproveitamento', icon: FileText }] : []),
    ...(currentRole === 'discente' ? [{ id: 'certificates', label: 'Certificados', icon: Award }] : []),
    { id: 'menu', label: 'Menu', icon: Menu },
  ];

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-neutral-200 shadow-lg">
      <div className="flex items-center justify-around h-16">
        {mobileItems.map(item => {
          const Icon = item.icon;
          const isActive = activePage === item.id;

          return (
            <button
              key={item.id}
              onClick={() => item.id === 'menu' ? onMenuClick() : onPageChange(item.id)}
              className={`flex flex-col items-center justify-center flex-1 h-full transition-colors ${
                isActive ? 'text-primary-600' : 'text-neutral-600'
              }`}
            >
              <Icon className="w-6 h-6" />
              <small className="mt-1">{item.label}</small>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
