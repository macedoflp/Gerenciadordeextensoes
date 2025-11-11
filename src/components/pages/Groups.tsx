import React from 'react';
import { Users, Mail, Plus } from 'lucide-react';
import { mockGroups } from '../../lib/mock-data';

export function Groups() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2>Grupos de Extensão</h2>
          <p className="text-neutral-600">
            Gerencie grupos de discentes e cargos
          </p>
        </div>
        <button className="flex items-center gap-2 px-4 py-3 bg-primary-600 hover:bg-primary-700 text-white rounded-lg transition-colors">
          <Plus className="w-5 h-5" />
          <span>Criar Grupo</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {mockGroups.map(group => (
          <div key={group.id} className="bg-white rounded-lg border border-neutral-200 p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-start gap-3">
                <div className="p-3 bg-primary-100 rounded-lg">
                  <Users className="w-6 h-6 text-primary-600" />
                </div>
                <div>
                  <h4 className="m-0 mb-1">{group.name}</h4>
                  <p className="text-neutral-600 m-0 mb-2">
                    <small>{group.description}</small>
                  </p>
                  <div className="flex items-center gap-2 text-neutral-600">
                    <Mail className="w-4 h-4" />
                    <small>{group.email}</small>
                  </div>
                </div>
              </div>
            </div>

            <div className="border-t border-neutral-200 pt-4">
              <div className="flex items-center justify-between mb-3">
                <p className="m-0">
                  <small className="text-neutral-600">Responsável</small>
                </p>
                <p className="m-0">
                  <small>{group.responsibleName}</small>
                </p>
              </div>
              <div className="flex items-center justify-between">
                <p className="m-0">
                  <small className="text-neutral-600">Membros</small>
                </p>
                <p className="m-0">
                  <small>{group.members.length}</small>
                </p>
              </div>
            </div>

            <div className="mt-4 flex gap-2">
              <button className="flex-1 px-4 py-2 bg-neutral-100 hover:bg-neutral-200 text-neutral-700 rounded-lg transition-colors">
                Ver membros
              </button>
              <button className="flex-1 px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg transition-colors">
                Gerenciar
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
