import React, { useState } from 'react';
import { Plus, FileText, Calendar, Clock, CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import { useAuth } from '../../lib/auth-context';
import { mockApprovalRequests } from '../../lib/mock-data';
import { StatusTimeline } from '../StatusTimeline';
import { CreateRequestModal } from '../modals/CreateRequestModal';
import { ReviewRequestModal } from '../modals/ReviewRequestModal';
import type { ApprovalRequest } from '../../lib/types';

export function ApprovalRequests() {
  const { user, currentRole } = useAuth();
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState<ApprovalRequest | null>(null);
  const [showReviewModal, setShowReviewModal] = useState(false);

  const isCoordinator = currentRole === 'coordenador' || currentRole === 'secretaria';
  const isStudent = currentRole === 'discente';

  // Filter requests based on role
  const requests = isStudent
    ? mockApprovalRequests.filter(r => r.userId === user?.id)
    : mockApprovalRequests;

  const pendingRequests = requests.filter(r => r.status === 'pendente');
  const approvedRequests = requests.filter(r => r.status === 'aprovado');
  const rejectedRequests = requests.filter(r => r.status === 'indeferido');

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'aprovado':
        return <CheckCircle className="w-5 h-5 text-success-600" />;
      case 'indeferido':
        return <XCircle className="w-5 h-5 text-error-600" />;
      case 'em_analise':
        return <Clock className="w-5 h-5 text-warning-600" />;
      default:
        return <AlertCircle className="w-5 h-5 text-neutral-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'aprovado':
        return 'bg-success-100 text-success-700 border-success-200';
      case 'indeferido':
        return 'bg-error-100 text-error-700 border-error-200';
      case 'em_analise':
        return 'bg-warning-100 text-warning-700 border-warning-200';
      default:
        return 'bg-neutral-100 text-neutral-700 border-neutral-200';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2>
            {isCoordinator ? 'Solicitações de Aproveitamento' : 'Meus Aproveitamentos'}
          </h2>
          <p className="text-neutral-600">
            {isCoordinator
              ? 'Analise e aprove solicitações de aproveitamento de horas externas'
              : 'Solicite aproveitamento de atividades externas realizadas'}
          </p>
        </div>
        {isStudent && (
          <button
            onClick={() => setShowCreateModal(true)}
            className="flex items-center gap-2 px-4 py-3 bg-primary-600 hover:bg-primary-700 text-white rounded-lg transition-colors"
          >
            <Plus className="w-5 h-5" />
            <span>Nova Solicitação</span>
          </button>
        )}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-lg border border-neutral-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-neutral-600 mb-1">Pendentes</p>
              <h3 className="m-0">{pendingRequests.length}</h3>
            </div>
            <div className="p-3 bg-warning-100 rounded-lg">
              <Clock className="w-6 h-6 text-warning-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-neutral-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-neutral-600 mb-1">Aprovadas</p>
              <h3 className="m-0">{approvedRequests.length}</h3>
            </div>
            <div className="p-3 bg-success-100 rounded-lg">
              <CheckCircle className="w-6 h-6 text-success-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-neutral-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-neutral-600 mb-1">Indeferidas</p>
              <h3 className="m-0">{rejectedRequests.length}</h3>
            </div>
            <div className="p-3 bg-error-100 rounded-lg">
              <XCircle className="w-6 h-6 text-error-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Requests List */}
      {requests.length === 0 ? (
        <div className="bg-white rounded-lg border border-neutral-200 p-12 text-center">
          <FileText className="w-12 h-12 text-neutral-300 mx-auto mb-4" />
          <h3 className="text-neutral-700 mb-2">Nenhuma solicitação encontrada</h3>
          <p className="text-neutral-500 m-0">
            {isStudent
              ? 'Crie sua primeira solicitação de aproveitamento de horas.'
              : 'Não há solicitações pendentes no momento.'}
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {requests.map(request => (
            <div
              key={request.id}
              className="bg-white rounded-lg border border-neutral-200 p-6 hover:shadow-md transition-shadow"
            >
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                {/* Left: Info */}
                <div className="flex-1">
                  <div className="flex items-start gap-3 mb-3">
                    {getStatusIcon(request.status)}
                    <div className="flex-1">
                      <h4 className="m-0 mb-1">{request.description}</h4>
                      {isCoordinator && (
                        <p className="text-neutral-600 m-0 mb-2">
                          <small>
                            Solicitado por: {request.userName} ({request.userEmail})
                          </small>
                        </p>
                      )}
                      <div className="flex flex-wrap items-center gap-4">
                        <div className="flex items-center gap-2 text-neutral-600">
                          <Clock className="w-4 h-4" />
                          <small>{request.requestedHours}h solicitadas</small>
                        </div>
                        <div className="flex items-center gap-2 text-neutral-600">
                          <Calendar className="w-4 h-4" />
                          <small>
                            Enviado em{' '}
                            {new Date(request.submittedAt).toLocaleDateString('pt-BR')}
                          </small>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Certificate Info */}
                  <div className="bg-neutral-50 rounded-lg p-3 mb-3">
                    <p className="m-0 mb-1">
                      <small className="text-neutral-600">Certificado:</small>
                    </p>
                    <p className="m-0 mb-1">
                      <strong>{request.certificateMetadata.title}</strong>
                    </p>
                    <p className="text-neutral-600 m-0">
                      <small>
                        Emissor: {request.certificateMetadata.issuer} -{' '}
                        {new Date(request.certificateMetadata.date).toLocaleDateString('pt-BR')}
                      </small>
                    </p>
                  </div>

                  {/* Status Badge */}
                  <div className="flex items-center gap-2">
                    <span
                      className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border ${getStatusColor(request.status)}`}
                    >
                      <small>
                        {request.status === 'aprovado' && 'Aprovado'}
                        {request.status === 'indeferido' && 'Indeferido'}
                        {request.status === 'pendente' && 'Pendente'}
                        {request.status === 'em_analise' && 'Em análise'}
                      </small>
                    </span>
                    {request.deadline && request.status === 'pendente' && (
                      <small className="text-warning-600">
                        Prazo: {new Date(request.deadline).toLocaleDateString('pt-BR')}
                      </small>
                    )}
                  </div>

                  {/* Feedback */}
                  {request.feedback && (
                    <div
                      className={`mt-3 p-3 rounded-lg border ${
                        request.status === 'aprovado'
                          ? 'bg-success-50 border-success-200'
                          : 'bg-error-50 border-error-200'
                      }`}
                    >
                      <p className="m-0 mb-1">
                        <small
                          className={
                            request.status === 'aprovado' ? 'text-success-700' : 'text-error-700'
                          }
                        >
                          <strong>Parecer do coordenador:</strong>
                        </small>
                      </p>
                      <p className="text-neutral-700 m-0">
                        <small>{request.feedback}</small>
                      </p>
                      {request.reviewedBy && (
                        <p className="text-neutral-600 m-0 mt-1">
                          <small>
                            Por {request.reviewerName} em{' '}
                            {request.reviewedAt && new Date(request.reviewedAt).toLocaleDateString('pt-BR')}
                          </small>
                        </p>
                      )}
                    </div>
                  )}
                </div>

                {/* Right: Actions */}
                <div className="flex flex-col gap-2">
                  <button
                    onClick={() => setSelectedRequest(request)}
                    className="px-4 py-2 bg-neutral-100 hover:bg-neutral-200 text-neutral-700 rounded-lg transition-colors whitespace-nowrap"
                  >
                    Ver detalhes
                  </button>
                  {isCoordinator && request.status === 'pendente' && (
                    <button
                      onClick={() => {
                        setSelectedRequest(request);
                        setShowReviewModal(true);
                      }}
                      className="px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg transition-colors whitespace-nowrap"
                    >
                      Analisar
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modals */}
      {showCreateModal && (
        <CreateRequestModal
          onClose={() => setShowCreateModal(false)}
          onSuccess={() => {
            setShowCreateModal(false);
            alert('Solicitação enviada com sucesso! Aguarde a análise do coordenador.');
          }}
        />
      )}

      {showReviewModal && selectedRequest && (
        <ReviewRequestModal
          request={selectedRequest}
          onClose={() => {
            setShowReviewModal(false);
            setSelectedRequest(null);
          }}
          onSuccess={() => {
            setShowReviewModal(false);
            setSelectedRequest(null);
            alert('Análise registrada com sucesso!');
          }}
        />
      )}
    </div>
  );
}
