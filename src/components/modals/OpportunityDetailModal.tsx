import React from 'react';
import { X, Calendar, Clock, Users, MapPin } from 'lucide-react';
import type { Opportunity } from '../../lib/types';

interface OpportunityDetailModalProps {
  opportunity: Opportunity;
  onClose: () => void;
}

export function OpportunityDetailModal({ opportunity, onClose }: OpportunityDetailModalProps) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-neutral-200">
          <h3 className="m-0">Detalhes da Oportunidade</h3>
          <button
            onClick={onClose}
            className="p-2 hover:bg-neutral-100 rounded-lg transition-colors"
            aria-label="Fechar"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          <div>
            <h2 className="mb-2">{opportunity.title}</h2>
            <div className="flex flex-wrap gap-2">
              <span className="px-3 py-1 bg-primary-100 text-primary-700 rounded-full">
                <small>{opportunity.modality}</small>
              </span>
              <span className="px-3 py-1 bg-success-100 text-success-700 rounded-full">
                <small>{opportunity.status}</small>
              </span>
            </div>
          </div>

          <div>
            <h4>Descrição</h4>
            <p className="text-neutral-700">{opportunity.description}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4>Informações</h4>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <Calendar className="w-5 h-5 text-neutral-400 mt-0.5" />
                  <div>
                    <p className="m-0 mb-1">
                      <small className="text-neutral-600">Período</small>
                    </p>
                    <p className="m-0">
                      {new Date(opportunity.startDate).toLocaleDateString('pt-BR')} -{' '}
                      {new Date(opportunity.endDate).toLocaleDateString('pt-BR')}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-neutral-400 mt-0.5" />
                  <div>
                    <p className="m-0 mb-1">
                      <small className="text-neutral-600">Carga horária</small>
                    </p>
                    <p className="m-0">{opportunity.workload} horas</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Users className="w-5 h-5 text-neutral-400 mt-0.5" />
                  <div>
                    <p className="m-0 mb-1">
                      <small className="text-neutral-600">Vagas</small>
                    </p>
                    <p className="m-0">
                      {opportunity.availableVacancies} de {opportunity.vacancies} disponíveis
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-neutral-400 mt-0.5" />
                  <div>
                    <p className="m-0 mb-1">
                      <small className="text-neutral-600">Responsável</small>
                    </p>
                    <p className="m-0">{opportunity.responsibleName}</p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h4>Participantes ({opportunity.participants?.length || 0})</h4>
              {opportunity.participants && opportunity.participants.length > 0 ? (
                <div className="space-y-2">
                  {opportunity.participants.slice(0, 5).map((participant, index) => (
                    <div key={index} className="p-3 bg-neutral-50 rounded-lg">
                      <p className="m-0 mb-1">{participant.userName}</p>
                      <div className="flex items-center justify-between">
                        <small className="text-neutral-600">{participant.userEmail}</small>
                        <span className="px-2 py-1 bg-success-100 text-success-700 rounded-full">
                          <small>{participant.status}</small>
                        </span>
                      </div>
                    </div>
                  ))}
                  {opportunity.participants.length > 5 && (
                    <p className="text-center text-neutral-600 m-0">
                      <small>+ {opportunity.participants.length - 5} participantes</small>
                    </p>
                  )}
                </div>
              ) : (
                <p className="text-neutral-500">
                  <small>Nenhum participante inscrito ainda</small>
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 p-6 border-t border-neutral-200">
          <button
            onClick={onClose}
            className="px-6 py-3 bg-neutral-100 hover:bg-neutral-200 text-neutral-700 rounded-lg transition-colors"
          >
            Fechar
          </button>
          {opportunity.status === 'aberta' && opportunity.availableVacancies > 0 && (
            <button className="px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white rounded-lg transition-colors">
              Inscrever-se
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
