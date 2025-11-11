import React, { useState } from 'react';
import { Bell, Menu, User, LogOut, Settings, ChevronDown } from 'lucide-react';
import { useAuth } from '../../lib/auth-context';
import { mockNotifications } from '../../lib/mock-data';
import type { UserRole } from '../../lib/types';

interface HeaderProps {
  onMenuClick: () => void;
}

const roleLabels: Record<UserRole, string> = {
  discente: 'Discente',
  docente: 'Docente',
  coordenador: 'Coordenador',
  secretaria: 'Secretaria',
  administrador: 'Administrador',
};

export function Header({ onMenuClick }: HeaderProps) {
  const { user, currentRole, switchRole, logout } = useAuth();
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showRoleSwitch, setShowRoleSwitch] = useState(false);

  const userNotifications = mockNotifications.filter(n => n.userId === user?.id);
  const unreadCount = userNotifications.filter(n => !n.read).length;

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-neutral-200 shadow-sm">
      <div className="flex items-center justify-between h-16 px-4 lg:px-6">
        {/* Left: Menu + Logo */}
        <div className="flex items-center gap-4">
          <button
            onClick={onMenuClick}
            className="lg:hidden p-2 hover:bg-neutral-100 rounded-lg transition-colors"
            aria-label="Abrir menu"
          >
            <Menu className="w-6 h-6 text-neutral-700" />
          </button>
          
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
              <span className="text-white">E</span>
            </div>
            <div className="hidden sm:block">
              <h1 className="m-0">Sistema de Extensão</h1>
            </div>
          </div>
        </div>

        {/* Right: Notifications + Profile */}
        <div className="flex items-center gap-2">
          {/* Notifications */}
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative p-2 hover:bg-neutral-100 rounded-lg transition-colors"
              aria-label="Notificações"
            >
              <Bell className="w-5 h-5 text-neutral-700" />
              {unreadCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-error-500 rounded-full flex items-center justify-center">
                  <small className="text-white m-0 p-0">{unreadCount}</small>
                </span>
              )}
            </button>

            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-xl border border-neutral-200 max-h-96 overflow-auto">
                <div className="p-4 border-b border-neutral-200">
                  <h4 className="m-0">Notificações</h4>
                </div>
                {userNotifications.length === 0 ? (
                  <div className="p-4 text-center text-neutral-500">
                    <p className="m-0">Nenhuma notificação</p>
                  </div>
                ) : (
                  <div className="divide-y divide-neutral-100">
                    {userNotifications.map(notification => (
                      <div
                        key={notification.id}
                        className={`p-4 hover:bg-neutral-50 cursor-pointer ${
                          !notification.read ? 'bg-primary-50' : ''
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          <div
                            className={`w-2 h-2 rounded-full mt-2 ${
                              notification.type === 'success'
                                ? 'bg-success-500'
                                : notification.type === 'warning'
                                ? 'bg-warning-500'
                                : notification.type === 'error'
                                ? 'bg-error-500'
                                : 'bg-primary-500'
                            }`}
                          />
                          <div className="flex-1">
                            <h4 className="m-0 mb-1">{notification.title}</h4>
                            <p className="m-0">
                              <small>{notification.message}</small>
                            </p>
                            <small className="text-neutral-400">
                              {new Date(notification.createdAt).toLocaleString('pt-BR')}
                            </small>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Profile Menu */}
          <div className="relative">
            <button
              onClick={() => setShowProfileMenu(!showProfileMenu)}
              className="flex items-center gap-2 p-2 hover:bg-neutral-100 rounded-lg transition-colors"
              aria-label="Menu do usuário"
            >
              <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
                <User className="w-5 h-5 text-primary-600" />
              </div>
              <div className="hidden md:block text-left">
                <p className="m-0">
                  <small>{user?.name}</small>
                </p>
                <small className="text-neutral-500">
                  {currentRole && roleLabels[currentRole]}
                </small>
              </div>
              <ChevronDown className="w-4 h-4 text-neutral-600" />
            </button>

            {showProfileMenu && (
              <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-xl border border-neutral-200">
                <div className="p-4 border-b border-neutral-200">
                  <p className="m-0 mb-1">{user?.name}</p>
                  <small className="text-neutral-600">{user?.email}</small>
                  <br />
                  <small className="text-neutral-500">
                    Matrícula: {user?.registration}
                  </small>
                </div>

                {/* Role Switch */}
                {user && user.roles.length > 1 && (
                  <div className="p-2 border-b border-neutral-200">
                    <button
                      onClick={() => setShowRoleSwitch(!showRoleSwitch)}
                      className="w-full flex items-center justify-between p-2 hover:bg-neutral-100 rounded-md transition-colors"
                    >
                      <span>Trocar perfil</span>
                      <ChevronDown className="w-4 h-4" />
                    </button>
                    {showRoleSwitch && (
                      <div className="mt-1 space-y-1">
                        {user.roles.map(role => (
                          <button
                            key={role}
                            onClick={() => {
                              switchRole(role);
                              setShowRoleSwitch(false);
                              setShowProfileMenu(false);
                            }}
                            className={`w-full text-left p-2 rounded-md transition-colors ${
                              currentRole === role
                                ? 'bg-primary-100 text-primary-700'
                                : 'hover:bg-neutral-100'
                            }`}
                          >
                            {roleLabels[role]}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                <div className="p-2">
                  <button
                    onClick={() => {
                      /* Navigate to settings */
                    }}
                    className="w-full flex items-center gap-2 p-2 hover:bg-neutral-100 rounded-md transition-colors"
                  >
                    <Settings className="w-4 h-4" />
                    <span>Configurações</span>
                  </button>
                  <button
                    onClick={() => {
                      logout();
                      setShowProfileMenu(false);
                    }}
                    className="w-full flex items-center gap-2 p-2 hover:bg-error-50 text-error-600 rounded-md transition-colors"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Sair</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
