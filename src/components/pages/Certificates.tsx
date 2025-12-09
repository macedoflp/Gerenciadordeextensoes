import React, { useState } from 'react';
import { Download, Search, Award } from 'lucide-react';
import { useAuth } from '../../lib/auth-context';
import { mockCertificates } from '../../lib/mock-data';
import { CertificateCard } from '../CertificateCard';
import { ValidateCertificateModal } from '../modals/ValidateCertificateModal';

export function Certificates() {
  const { user, currentRole } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [showValidateModal, setShowValidateModal] = useState(false);

  const isStudent = currentRole === 'discente';

  // Filter certificates based on role
  const certificates = isStudent
    ? mockCertificates.filter(cert => cert.userId === user?.id)
    : mockCertificates;

  const filteredCertificates = certificates.filter(cert =>
    cert.opportunityTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
    cert.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
    cert.userName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDownload = (certificate: any) => {
    alert(`Download do certificado ${certificate.code} iniciado!`);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2>Certificados</h2>
          <p className="text-neutral-600">
            {isStudent
              ? 'Visualize e baixe seus certificados de extensão'
              : 'Gerencie certificados emitidos'}
          </p>
        </div>
        <button
          onClick={() => setShowValidateModal(true)}
          className="flex items-center gap-2 px-4 py-3 bg-secondary-600 hover:bg-secondary-700 text-white rounded-lg transition-colors"
        >
          <Search className="w-5 h-5" />
          <span>Validar Certificado</span>
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-lg border border-neutral-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-neutral-600 mb-1">Total de Certificados</p>
              <h3 className="m-0">{certificates.length}</h3>
            </div>
            <div className="p-3 bg-primary-100 rounded-lg">
              <Award className="w-6 h-6 text-primary-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-neutral-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-neutral-600 mb-1">Horas Certificadas</p>
              <h3 className="m-0">
                {certificates.reduce((sum, cert) => sum + cert.workload, 0)}h
              </h3>
            </div>
            <div className="p-3 bg-success-100 rounded-lg">
              <Download className="w-6 h-6 text-success-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-neutral-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-neutral-600 mb-1">Último Emitido</p>
              <h3 className="m-0">
                <small>
                  {certificates.length > 0
                    ? new Date(certificates[0].issueDate).toLocaleDateString('pt-BR')
                    : '-'}
                </small>
              </h3>
            </div>
            <div className="p-3 bg-secondary-100 rounded-lg">
              <Award className="w-6 h-6 text-secondary-600" />
            </div>
          </div>
        </div>
      </div>


      {isStudent && (<div className="bg-white rounded-lg border border-neutral-200 p-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Buscar por título ou código."
            className="w-full pl-11 pr-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          />
        </div>
      </div>)}

      {!isStudent && (<div className="bg-white rounded-lg border border-neutral-200 p-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Buscar por nome."
            className="w-full pl-11 pr-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          />
        </div>
      </div>)}


      {/* Certificates Grid */}
      {filteredCertificates.length === 0 ? (
        <div className="bg-white rounded-lg border border-neutral-200 p-12 text-center">
          <Award className="w-12 h-12 text-neutral-300 mx-auto mb-4" />
          <h3 className="text-neutral-700 mb-2">Nenhum certificado encontrado</h3>
          <p className="text-neutral-500 m-0">
            {isStudent
              ? 'Complete atividades de extensão para receber certificados.'
              : 'Nenhum certificado foi emitido ainda.'}
          </p>
        </div>
      ) : (
        <>
          <p className="text-neutral-600">
            <small>
              Mostrando {filteredCertificates.length} de {certificates.length} certificados
            </small>
          </p>

          {isStudent && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCertificates.map(certificate => (
              <CertificateCard
                key={certificate.id}
                certificate={certificate}
                onDownload={() => handleDownload(certificate)}
                onValidate={() => setShowValidateModal(true)}
              />
            ))}
          </div>
          )}
          {!isStudent && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCertificates.map(certificate => (
              <CertificateCard
                key={certificate.id}
                certificate={certificate}
                onDownload={() => handleDownload(certificate)}
                onValidate={() => setShowValidateModal(true)}
              />
            ))}
          </div>
          )}
        </>
      )}

      {/* Validate Modal */}
      {showValidateModal && (
        <ValidateCertificateModal onClose={() => setShowValidateModal(false)} />
      )}
    </div>
  );
}
