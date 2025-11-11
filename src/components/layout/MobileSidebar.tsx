import React from 'react';
import {
  Home,
  Calendar,
  FileText,
  Award,
  Users,
  Settings,
  BarChart3,
  Bell,
  BookOpen,
  UserCog,
  CheckSquare,
  FolderOpen,
  X,
} from 'lucide-react';
import { useAuth } from '../../lib/auth-context';
import type { UserRole } from '../../lib/types';

interface MobileSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  activePage: string;
  onPageChange: (page: string) => void;
}

interface NavItem {
  id: string;
  label: string;
  icon: React.ElementType;
  roles: UserRole[];
}

const navItems: NavItem[] = [
  { id: 'dashboard', label: 'Dashboard', icon: Home, roles: ['discente', 'docente', 'coordenador', 'secretaria', 'administrador'] },
  { id: 'opportunities', label: 'Oportunidades', icon: Calendar, roles: ['discente', 'docente', 'coordenador', 'secretaria'] },
  { id: 'my-enrollments', label: 'Minhas Inscrições', icon: CheckSquare, roles: ['discente'] },
  { id: 'approval-requests', label: 'Aproveitamento', icon: FileText, roles: ['discente', 'coordenador', 'secretaria'] },
  { id: 'certificates', label: 'Certificados', icon: Award, roles: ['discente', 'docente', 'coordenador', 'secretaria'] },
  { id: 'groups', label: 'Grupos', icon: Users, roles: ['docente', 'coordenador', 'administrador'] },
  { id: 'ppc', label: 'PPC', icon: BookOpen, roles: ['coordenador', 'secretaria'] },
  { id: 'reports', label: 'Relatórios', icon: BarChart3, roles: ['coordenador', 'secretaria', 'administrador'] },
  { id: 'communications', label: 'Comunicações', icon: Bell, roles: ['coordenador', 'secretaria'] },
  { id: 'public-portal', label: 'Portal Público', icon: FolderOpen, roles: ['discente', 'docente', 'coordenador', 'secretaria'] },
  { id: 'users', label: 'Gerenciar Usuários', icon: UserCog, roles: ['administrador'] },
  { id: 'settings', label: 'Configurações', icon: Settings, roles: ['administrador'] },
];

export function MobileSidebar({ isOpen, onClose, activePage, onPageChange }: MobileSidebarProps) {
  const { currentRole } = useAuth();

  const filteredItems = navItems.filter(item =>
    currentRole && item.roles.includes(currentRole)
  );

  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/50 z-40 lg:hidden"
        onClick={onClose}
      />

      {/* Sidebar */}
      <aside className="fixed top-0 left-0 bottom-0 w-64 bg-white z-50 lg:hidden shadow-xl">
        <div className="flex items-center justify-between p-4 border-b border-neutral-200">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
              <span className="text-white">E</span>
            </div>
            <h3 className="m-0">Menu</h3>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-neutral-100 rounded-lg transition-colors"
            aria-label="Fechar menu"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <nav className="p-4 space-y-1 overflow-y-auto h-[calc(100vh-5rem)]">
          {filteredItems.map(item => {
            const Icon = item.icon;
            const isActive = activePage === item.id;

            return (
              <button
                key={item.id}
                onClick={() => {
                  onPageChange(item.id);
                  onClose();
                }}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                  isActive
                    ? 'bg-primary-100 text-primary-700'
                    : 'text-neutral-700 hover:bg-neutral-100'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>
      </aside>
    </>
  );
}
