import React from 'react';
import { BookOpen, Plus, Calendar, User } from 'lucide-react';
import { mockPPC } from '../../lib/mock-data';

export function PPC() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2>PPC - Projeto Pedagógico do Curso</h2>
          <p className="text-neutral-600">
            Gerencie versões do PPC e carga horária mínima de extensão
          </p>
        </div>
        <button className="flex items-center gap-2 px-4 py-3 bg-primary-600 hover:bg-primary-700 text-white rounded-lg transition-colors">
          <Plus className="w-5 h-5" />
          <span>Nova Versão</span>
        </button>
      </div>

      {/* Current Version */}
      <div className="bg-gradient-to-r from-primary-600 to-primary-700 rounded-xl p-6 text-white">
        <div className="flex items-center gap-3 mb-3">
          <BookOpen className="w-6 h-6" />
          <h3 className="m-0 text-white">Versão Atual: {mockPPC[1].version}</h3>
        </div>
        <p className="m-0 text-primary-100 mb-4">
          Carga horária mínima de extensão: <strong>{mockPPC[1].minimumWorkload} horas</strong>
        </p>
        <div className="flex items-center gap-4 text-primary-100">
          <small>Vigência desde: {new Date(mockPPC[1].effectiveFrom).toLocaleDateString('pt-BR')}</small>
        </div>
      </div>

      {/* Version History */}
      <div className="bg-white rounded-lg border border-neutral-200 p-6">
        <h3 className="mb-4">Histórico de Versões</h3>
        <div className="space-y-4">
          {mockPPC.map(ppc => (
            <div key={ppc.id} className="flex items-center justify-between p-4 bg-neutral-50 rounded-lg">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h4 className="m-0">Versão {ppc.version}</h4>
                  {!ppc.effectiveUntil && (
                    <span className="px-2 py-1 bg-success-100 text-success-700 rounded-full">
                      <small>Atual</small>
                    </span>
                  )}
                </div>
                <div className="flex flex-wrap items-center gap-4 text-neutral-600">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <small>
                      Vigência: {new Date(ppc.effectiveFrom).toLocaleDateString('pt-BR')}
                      {ppc.effectiveUntil && ` - ${new Date(ppc.effectiveUntil).toLocaleDateString('pt-BR')}`}
                    </small>
                  </div>
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4" />
                    <small>Criado por ID: {ppc.createdBy}</small>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <p className="m-0 mb-1">
                  <small className="text-neutral-600">Carga mínima</small>
                </p>
                <h4 className="m-0">{ppc.minimumWorkload}h</h4>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
