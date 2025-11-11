import React, { useState } from 'react';
import { Plus, Search, Filter, X } from 'lucide-react';
import { useAuth } from '../../lib/auth-context';
import { mockOpportunities } from '../../lib/mock-data';
import { OpportunityCard } from '../OpportunityCard';
import { CreateOpportunityModal } from '../modals/CreateOpportunityModal';
import { OpportunityDetailModal } from '../modals/OpportunityDetailModal';
import type { Opportunity } from '../../lib/types';

export function Opportunities() {
  const { currentRole } = useAuth();
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedOpportunity, setSelectedOpportunity] = useState<Opportunity | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [filterModality, setFilterModality] = useState<string>('all');

  const canCreate = currentRole === 'discente' || currentRole === 'docente' || currentRole === 'coordenador';

  const filteredOpportunities = mockOpportunities.filter(opp => {
    const matchesSearch = opp.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      opp.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || opp.status === filterStatus;
    const matchesModality = filterModality === 'all' || opp.modality === filterModality;
    return matchesSearch && matchesStatus && matchesModality;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2>Oportunidades de Extensão</h2>
          <p className="text-neutral-600">
            Explore e inscreva-se em atividades de extensão universitária
          </p>
        </div>
        {canCreate && (
          <button
            onClick={() => setShowCreateModal(true)}
            className="flex items-center gap-2 px-4 py-3 bg-primary-600 hover:bg-primary-700 text-white rounded-lg transition-colors"
          >
            <Plus className="w-5 h-5" />
            <span>Criar Oportunidade</span>
          </button>
        )}
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg border border-neutral-200 p-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Buscar oportunidades..."
              className="w-full pl-11 pr-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>

          {/* Status Filter */}
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="w-full pl-11 pr-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent appearance-none"
            >
              <option value="all">Todos os status</option>
              <option value="aberta">Abertas</option>
              <option value="publicada">Publicadas</option>
              <option value="em_execucao">Em execução</option>
              <option value="encerrada">Encerradas</option>
            </select>
          </div>

          {/* Modality Filter */}
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
            <select
              value={filterModality}
              onChange={(e) => setFilterModality(e.target.value)}
              className="w-full pl-11 pr-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent appearance-none"
            >
              <option value="all">Todas as modalidades</option>
              <option value="oficina">Oficina</option>
              <option value="curso">Curso</option>
              <option value="projeto">Projeto</option>
              <option value="evento">Evento</option>
              <option value="prestacao_servico">Prestação de Serviço</option>
            </select>
          </div>
        </div>

        {/* Active Filters */}
        {(searchTerm || filterStatus !== 'all' || filterModality !== 'all') && (
          <div className="flex items-center gap-2 mt-4 pt-4 border-t border-neutral-200">
            <small className="text-neutral-600">Filtros ativos:</small>
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="flex items-center gap-1 px-2 py-1 bg-primary-100 text-primary-700 rounded-full hover:bg-primary-200 transition-colors"
              >
                <small>"{searchTerm}"</small>
                <X className="w-3 h-3" />
              </button>
            )}
            {filterStatus !== 'all' && (
              <button
                onClick={() => setFilterStatus('all')}
                className="flex items-center gap-1 px-2 py-1 bg-primary-100 text-primary-700 rounded-full hover:bg-primary-200 transition-colors"
              >
                <small>Status: {filterStatus}</small>
                <X className="w-3 h-3" />
              </button>
            )}
            {filterModality !== 'all' && (
              <button
                onClick={() => setFilterModality('all')}
                className="flex items-center gap-1 px-2 py-1 bg-primary-100 text-primary-700 rounded-full hover:bg-primary-200 transition-colors"
              >
                <small>Modalidade: {filterModality}</small>
                <X className="w-3 h-3" />
              </button>
            )}
          </div>
        )}
      </div>

      {/* Results */}
      {filteredOpportunities.length === 0 ? (
        <div className="bg-white rounded-lg border border-neutral-200 p-12 text-center">
          <p className="text-neutral-500 m-0">
            Nenhuma oportunidade encontrada com os filtros selecionados.
          </p>
        </div>
      ) : (
        <>
          <p className="text-neutral-600">
            <small>
              Mostrando {filteredOpportunities.length} de {mockOpportunities.length} oportunidades
            </small>
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredOpportunities.map(opportunity => (
              <OpportunityCard
                key={opportunity.id}
                opportunity={opportunity}
                onView={() => setSelectedOpportunity(opportunity)}
                onEnroll={() => {
                  // Handle enrollment
                  alert(`Inscrito em: ${opportunity.title}`);
                }}
              />
            ))}
          </div>
        </>
      )}

      {/* Modals */}
      {showCreateModal && (
        <CreateOpportunityModal
          onClose={() => setShowCreateModal(false)}
          onSuccess={() => {
            setShowCreateModal(false);
            alert('Oportunidade criada com sucesso!');
          }}
        />
      )}

      {selectedOpportunity && (
        <OpportunityDetailModal
          opportunity={selectedOpportunity}
          onClose={() => setSelectedOpportunity(null)}
        />
      )}
    </div>
  );
}
