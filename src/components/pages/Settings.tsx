import React, { useState } from 'react';
import { Shield, Bell, Palette, Globe, Save } from 'lucide-react';

export function Settings() {
  const [highContrast, setHighContrast] = useState(false);
  const [notifications, setNotifications] = useState(true);

  const handleSave = () => {
    if (highContrast) {
      document.body.classList.add('high-contrast');
    } else {
      document.body.classList.remove('high-contrast');
    }
    alert('Configurações salvas com sucesso!');
  };

  return (
    <div className="space-y-6">
      <div>
        <h2>Configurações do Sistema</h2>
        <p className="text-neutral-600">
          Gerencie preferências e configurações globais
        </p>
      </div>

      {/* Permissions */}
      <div className="bg-white rounded-lg border border-neutral-200 p-6">
        <div className="flex items-center gap-3 mb-4">
          <Shield className="w-6 h-6 text-primary-600" />
          <h3 className="m-0">Permissões e Segurança</h3>
        </div>
        <p className="text-neutral-600 mb-4">
          Configure permissões granulares para cada perfil de usuário
        </p>
        <button className="px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg transition-colors">
          Gerenciar Permissões
        </button>
      </div>

      {/* Notifications */}
      <div className="bg-white rounded-lg border border-neutral-200 p-6">
        <div className="flex items-center gap-3 mb-4">
          <Bell className="w-6 h-6 text-primary-600" />
          <h3 className="m-0">Notificações</h3>
        </div>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="m-0 mb-1">Notificações automáticas</p>
              <small className="text-neutral-600">
                Enviar notificações para eventos do sistema
              </small>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={notifications}
                onChange={(e) => setNotifications(e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-neutral-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-neutral-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
            </label>
          </div>
        </div>
      </div>

      {/* Accessibility */}
      <div className="bg-white rounded-lg border border-neutral-200 p-6">
        <div className="flex items-center gap-3 mb-4">
          <Palette className="w-6 h-6 text-primary-600" />
          <h3 className="m-0">Acessibilidade</h3>
        </div>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="m-0 mb-1">Modo alto contraste</p>
              <small className="text-neutral-600">
                Aumenta o contraste de cores para melhor legibilidade
              </small>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={highContrast}
                onChange={(e) => setHighContrast(e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-neutral-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-neutral-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
            </label>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="m-0 mb-1">Leitor de tela</p>
              <small className="text-neutral-600">
                Ativar suporte para leitores de tela
              </small>
            </div>
            <button className="px-4 py-2 bg-neutral-100 hover:bg-neutral-200 text-neutral-700 rounded-lg transition-colors">
              Configurar
            </button>
          </div>
        </div>
      </div>

      {/* System */}
      <div className="bg-white rounded-lg border border-neutral-200 p-6">
        <div className="flex items-center gap-3 mb-4">
          <Globe className="w-6 h-6 text-primary-600" />
          <h3 className="m-0">Sistema</h3>
        </div>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="m-0 mb-1">Idioma</p>
              <small className="text-neutral-600">Português (Brasil)</small>
            </div>
            <button className="px-4 py-2 bg-neutral-100 hover:bg-neutral-200 text-neutral-700 rounded-lg transition-colors">
              Alterar
            </button>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="m-0 mb-1">Logs do sistema</p>
              <small className="text-neutral-600">Visualizar logs de atividades</small>
            </div>
            <button className="px-4 py-2 bg-neutral-100 hover:bg-neutral-200 text-neutral-700 rounded-lg transition-colors">
              Ver logs
            </button>
          </div>
        </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-end">
        <button
          onClick={handleSave}
          className="flex items-center gap-2 px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white rounded-lg transition-colors"
        >
          <Save className="w-4 h-4" />
          <span>Salvar Configurações</span>
        </button>
      </div>
    </div>
  );
}
