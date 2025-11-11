import React from 'react';
import { Calendar, Clock, CheckCircle } from 'lucide-react';
import { useAuth } from '../../lib/auth-context';
import { mockOpportunities } from '../../lib/mock-data';

export function MyEnrollments() {
  const { user } = useAuth();

  // Find opportunities where user is enrolled
  const enrolledOpportunities = mockOpportunities.filter(
    opp => opp.participants?.some(p => p.userId === user?.id)
  );

  return (
    <div className="space-y-6">
      <div>
        <h2>Minhas Inscrições</h2>
        <p className="text-neutral-600">
          Acompanhe suas atividades de extensão inscritas
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-lg border border-neutral-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-neutral-600 mb-1">Inscrições Ativas</p>
              <h3 className="m-0">{enrolledOpportunities.length}</h3>
            </div>
            <div className="p-3 bg-primary-100 rounded-lg">
              <Calendar className="w-6 h-6 text-primary-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-neutral-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-neutral-600 mb-1">Horas em Progresso</p>
              <h3 className="m-0">8h</h3>
            </div>
            <div className="p-3 bg-warning-100 rounded-lg">
              <Clock className="w-6 h-6 text-warning-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-neutral-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-neutral-600 mb-1">Concluídas</p>
              <h3 className="m-0">2</h3>
            </div>
            <div className="p-3 bg-success-100 rounded-lg">
              <CheckCircle className="w-6 h-6 text-success-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Enrollments List */}
      {enrolledOpportunities.length === 0 ? (
        <div className="bg-white rounded-lg border border-neutral-200 p-12 text-center">
          <Calendar className="w-12 h-12 text-neutral-300 mx-auto mb-4" />
          <h3 className="text-neutral-700 mb-2">Nenhuma inscrição ativa</h3>
          <p className="text-neutral-500 m-0">
            Explore oportunidades e inscreva-se para começar.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {enrolledOpportunities.map(opp => {
            const participant = opp.participants?.find(p => p.userId === user?.id);
            const progress = participant?.completedHours || 0;
            const progressPercent = (progress / opp.workload) * 100;

            return (
              <div key={opp.id} className="bg-white rounded-lg border border-neutral-200 p-6">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-4">
                  <div className="flex-1">
                    <h4 className="m-0 mb-2">{opp.title}</h4>
                    <div className="flex flex-wrap items-center gap-4 text-neutral-600">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        <small>
                          {new Date(opp.startDate).toLocaleDateString('pt-BR')} -{' '}
                          {new Date(opp.endDate).toLocaleDateString('pt-BR')}
                        </small>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        <small>{opp.workload}h totais</small>
                      </div>
                    </div>
                  </div>
                  <span className="px-3 py-1 bg-success-100 text-success-700 rounded-full">
                    <small>{participant?.status}</small>
                  </span>
                </div>

                {/* Progress */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <small className="text-neutral-600">Progresso</small>
                    <small className="text-neutral-600">
                      {progress}h de {opp.workload}h
                    </small>
                  </div>
                  <div className="w-full bg-neutral-200 rounded-full h-2">
                    <div
                      className="bg-primary-500 h-2 rounded-full transition-all"
                      style={{ width: `${progressPercent}%` }}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
