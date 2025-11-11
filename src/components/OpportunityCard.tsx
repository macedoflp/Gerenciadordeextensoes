import React from 'react';
import { Calendar, Users, Clock, MapPin } from 'lucide-react';
import type { Opportunity, OpportunityStatus } from '../lib/types';

interface OpportunityCardProps {
  opportunity: Opportunity;
  onView?: () => void;
  onEnroll?: () => void;
  showActions?: boolean;
}

const statusConfig: Record<OpportunityStatus, { label: string; color: string }> = {
  rascunho: { label: 'Rascunho', color: 'bg-neutral-500' },
  aguardando_aprovacao: { label: 'Aguardando Aprovação', color: 'bg-warning-500' },
  publicada: { label: 'Publicada', color: 'bg-secondary-500' },
  aberta: { label: 'Aberta', color: 'bg-success-500' },
  em_execucao: { label: 'Em Execução', color: 'bg-primary-500' },
  encerrada: { label: 'Encerrada', color: 'bg-neutral-600' },
  cancelada: { label: 'Cancelada', color: 'bg-error-500' },
};

const modalityLabels: Record<string, string> = {
  oficina: 'Oficina',
  curso: 'Curso',
  projeto: 'Projeto',
  evento: 'Evento',
  prestacao_servico: 'Prestação de Serviço',
  outro: 'Outro',
};

export function OpportunityCard({ opportunity, onView, onEnroll, showActions = true }: OpportunityCardProps) {
  const status = statusConfig[opportunity.status];
  const canEnroll = opportunity.status === 'aberta' && opportunity.availableVacancies > 0;

  return (
    <div className="bg-white rounded-lg border border-neutral-200 shadow-sm hover:shadow-md transition-shadow overflow-hidden">
      {/* Status Ribbon */}
      <div className={`${status.color} px-4 py-2`}>
        <small className="text-white">{status.label}</small>
      </div>

      <div className="p-6">
        {/* Title & Modality */}
        <div className="mb-3">
          <h3 className="m-0 mb-2">{opportunity.title}</h3>
          <span className="inline-block px-3 py-1 bg-primary-100 text-primary-700 rounded-full">
            <small>{modalityLabels[opportunity.modality]}</small>
          </span>
        </div>

        {/* Description */}
        <p className="text-neutral-600 mb-4 line-clamp-2">
          {opportunity.description}
        </p>

        {/* Meta Information */}
        <div className="space-y-2 mb-4">
          <div className="flex items-center gap-2 text-neutral-600">
            <Calendar className="w-4 h-4" />
            <small>
              {new Date(opportunity.startDate).toLocaleDateString('pt-BR')} -{' '}
              {new Date(opportunity.endDate).toLocaleDateString('pt-BR')}
            </small>
          </div>

          <div className="flex items-center gap-2 text-neutral-600">
            <Clock className="w-4 h-4" />
            <small>{opportunity.workload}h de carga horária</small>
          </div>

          <div className="flex items-center gap-2 text-neutral-600">
            <Users className="w-4 h-4" />
            <small>
              {opportunity.availableVacancies} de {opportunity.vacancies} vagas disponíveis
            </small>
          </div>

          <div className="flex items-center gap-2 text-neutral-600">
            <MapPin className="w-4 h-4" />
            <small>Responsável: {opportunity.responsibleName}</small>
          </div>
        </div>

        {/* Progress Bar for Vacancies */}
        <div className="mb-4">
          <div className="w-full bg-neutral-200 rounded-full h-2">
            <div
              className="bg-primary-500 h-2 rounded-full transition-all"
              style={{
                width: `${
                  ((opportunity.vacancies - opportunity.availableVacancies) /
                    opportunity.vacancies) *
                  100
                }%`,
              }}
            />
          </div>
        </div>

        {/* Actions */}
        {showActions && (
          <div className="flex gap-2">
            <button
              onClick={onView}
              className="flex-1 px-4 py-2 bg-neutral-100 hover:bg-neutral-200 text-neutral-700 rounded-lg transition-colors"
            >
              Ver detalhes
            </button>
            {canEnroll && onEnroll && (
              <button
                onClick={onEnroll}
                className="flex-1 px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg transition-colors"
              >
                Inscrever-se
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
