import React, { useState } from 'react';
import { Plus, Search, UserCog, Edit, Trash2 } from 'lucide-react';
import { mockUsers } from '../../lib/mock-data';

export function Users() {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredUsers = mockUsers.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2>Gerenciar Usuários</h2>
          <p className="text-neutral-600">
            Crie e gerencie usuários gestores do sistema
          </p>
        </div>
        <button className="flex items-center gap-2 px-4 py-3 bg-primary-600 hover:bg-primary-700 text-white rounded-lg transition-colors">
          <Plus className="w-5 h-5" />
          <span>Novo Gestor</span>
        </button>
      </div>

      {/* Search */}
      <div className="bg-white rounded-lg border border-neutral-200 p-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Buscar usuários..."
            className="w-full pl-11 pr-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
          />
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-lg border border-neutral-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-neutral-50 border-b border-neutral-200">
              <tr>
                <th className="px-6 py-4 text-left">Nome</th>
                <th className="px-6 py-4 text-left">E-mail</th>
                <th className="px-6 py-4 text-left">Matrícula/SIAPE</th>
                <th className="px-6 py-4 text-left">Perfis</th>
                <th className="px-6 py-4 text-left">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-200">
              {filteredUsers.map(user => (
                <tr key={user.id} className="hover:bg-neutral-50">
                  <td className="px-6 py-4">{user.name}</td>
                  <td className="px-6 py-4">
                    <small>{user.email}</small>
                  </td>
                  <td className="px-6 py-4">{user.registration}</td>
                  <td className="px-6 py-4">
                    <div className="flex flex-wrap gap-1">
                      {user.roles.map(role => (
                        <span
                          key={role}
                          className="px-2 py-1 bg-primary-100 text-primary-700 rounded-full"
                        >
                          <small>{role}</small>
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <button
                        className="p-2 hover:bg-neutral-100 rounded-lg transition-colors"
                        aria-label="Editar permissões"
                      >
                        <UserCog className="w-4 h-4 text-neutral-600" />
                      </button>
                      <button
                        className="p-2 hover:bg-neutral-100 rounded-lg transition-colors"
                        aria-label="Editar usuário"
                      >
                        <Edit className="w-4 h-4 text-neutral-600" />
                      </button>
                      <button
                        className="p-2 hover:bg-error-50 rounded-lg transition-colors"
                        aria-label="Remover usuário"
                      >
                        <Trash2 className="w-4 h-4 text-error-600" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
