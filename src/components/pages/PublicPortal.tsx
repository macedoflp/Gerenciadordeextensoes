import React, { useState } from 'react';
import { Search, Filter } from 'lucide-react';
import { mockOpportunities } from '../../lib/mock-data';
import { OpportunityCard } from '../OpportunityCard';

export function PublicPortal() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterModality, setFilterModality] = useState<string>('all');

  // Only show open opportunities
  const openOpportunities = mockOpportunities.filter(
    opp => opp.status === 'aberta' || opp.status === 'publicada'
  );

  const filteredOpportunities = openOpportunities.filter(opp => {
    const matchesSearch = opp.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      opp.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesModality = filterModality === 'all' || opp.modality === filterModality;
    return matchesSearch && matchesModality;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className=" rounded-xl p-8 text-white">
        <h1 className="m-0 mb-3 text-white">Portal Público de Extensão</h1>
        <p className="m-0 text-primary-100">
          Explore oportunidades de extensão universitária abertas à comunidade. Não é necessário login
          para visualizar as atividades disponíveis.
        </p>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg border border-neutral-200 p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
      </div>

      {/* Info Banner */}
      <div className="bg-secondary-50 border border-secondary-200 rounded-lg p-4">
        <p className="m-0 text-secondary-800">
          <strong>Atenção:</strong> Para se inscrever nas oportunidades, você precisa fazer login no
          sistema com suas credenciais institucionais.
        </p>
      </div>

      {/* Results */}
      {filteredOpportunities.length === 0 ? (
        <div className="bg-white rounded-lg border border-neutral-200 p-12 text-center">
          <p className="text-neutral-500 m-0">
            Nenhuma oportunidade aberta encontrada no momento.
          </p>
        </div>
      ) : (
        <>
          <div className="flex items-center justify-between">
            <h3>Oportunidades Abertas</h3>
            <p className="text-neutral-600 m-0">
              <small>
                {filteredOpportunities.length} oportunidades disponíveis
              </small>
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredOpportunities.map(opportunity => (
              <OpportunityCard
                key={opportunity.id}
                opportunity={opportunity}
                showActions={false}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
