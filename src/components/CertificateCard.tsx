import React from 'react';
import { Download, ExternalLink, Award } from 'lucide-react';
import type { Certificate } from '../lib/types';

interface CertificateCardProps {
  certificate: Certificate;
  onDownload?: () => void;
  onValidate?: () => void;
}

export function CertificateCard({ certificate, onDownload, onValidate }: CertificateCardProps) {
  return (
    <div className="bg-white rounded-lg border-2 border-primary-200 shadow-md overflow-hidden">
      {/* Header with Award Icon */}
      <div className="border-b border-neutral-200 p-6">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <Award className="w-6 h-6" />
              <h3 className="m-0 text-white">Certificado de Extensão</h3>
            </div>
            <p className="m-0 text-primary-100">
              <small>Universidade Federal</small>
            </p>
          </div>
          <div className="text-right">
            <p className="m-0 text-primary-100">
              <small>Código:</small>
            </p>
            <p className="m-0">{certificate.code}</p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="mb-4">
          <p className="m-0 mb-1">
            <small className="text-neutral-500">Certificamos que</small>
          </p>
          <h3 className="m-0 text-primary-700">{certificate.userName}</h3>
        </div>

        <div className="mb-4">
          <p className="m-0 mb-1">
            <small className="text-neutral-500">Participou de</small>
          </p>
          <p className="m-0">{certificate.opportunityTitle}</p>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-6">
          <div>
            <p className="m-0 mb-1">
              <small className="text-neutral-500">Carga horária</small>
            </p>
            <p className="m-0">{certificate.workload} horas</p>
          </div>
          <div>
            <p className="m-0 mb-1">
              <small className="text-neutral-500">Data de emissão</small>
            </p>
            <p className="m-0">
              {new Date(certificate.issueDate).toLocaleDateString('pt-BR')}
            </p>
          </div>
        </div>

        {/* QR Code */}
        <div className="flex items-center justify-center mb-6 p-4 bg-neutral-50 rounded-lg">
          <div className="text-center">
            <img
              src={certificate.qrCode}
              alt="QR Code para validação"
              className="w-32 h-32 mx-auto mb-2"
            />
            <small className="text-neutral-600">Escaneie para validar</small>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-2">
          <button
            onClick={onDownload}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-primary-600 hover:bg-primary-700 text-white rounded-lg transition-colors"
          >
            <Download className="w-4 h-4" />
            <span>Baixar PDF</span>
          </button>
          <button
            onClick={onValidate}
            className="flex items-center justify-center px-4 py-3 bg-neutral-100 hover:bg-neutral-200 text-neutral-700 rounded-lg transition-colors"
            aria-label="Validar certificado"
          >
            <ExternalLink className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
