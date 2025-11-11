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
} from 'lucide-react';
import { useAuth } from '../../lib/auth-context';
import type { UserRole } from '../../lib/types';

interface SidebarProps {
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

export function Sidebar({ activePage, onPageChange }: SidebarProps) {
  const { currentRole } = useAuth();

  const filteredItems = navItems.filter(item =>
    currentRole && item.roles.includes(currentRole)
  );

  return (
    <aside className="hidden lg:flex lg:flex-col w-64 bg-white border-r border-neutral-200 h-[calc(100vh-4rem)] sticky top-16">
      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        {filteredItems.map(item => {
          const Icon = item.icon;
          const isActive = activePage === item.id;

          return (
            <button
              key={item.id}
              onClick={() => onPageChange(item.id)}
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
  );
}
