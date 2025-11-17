import React, { useState } from 'react';
import { X, Loader2, CheckCircle, AlertTriangle } from 'lucide-react'; // Ícones para feedback

interface ValidateCertificateModalProps {
  onClose: () => void;
  // Não precisamos de onSuccess aqui, pois o feedback é dado dentro do modal.
}

export function ValidateCertificateModal({ onClose }: ValidateCertificateModalProps) {
  const [certificateCode, setCertificateCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [validationResult, setValidationResult] = useState<{ type: 'success' | 'error' | null, message: string }>({ type: null, message: '' });

  const handleValidate = async (e: React.FormEvent) => {
    e.preventDefault();
    setValidationResult({ type: null, message: '' });

    if (!certificateCode.trim()) {
      setValidationResult({ type: 'error', message: 'Por favor, insira o código do certificado.' });
      return;
    }

    setIsLoading(true);
    try {
      // Simulação de chamada de API
      await new Promise(resolve => setTimeout(resolve, 2000)); 

      // Lógica de validação simulada
      const code = certificateCode.trim().toUpperCase();
      
      if (code === 'VALIDO123') { 
        setValidationResult({ 
          type: 'success', 
          message: '✅ Certificado validado! Emitido para João Silva no curso de React.js (40h).'
        });
      } else {
        setValidationResult({ 
          type: 'error', 
          message: '❌ Código inválido. Verifique o código e tente novamente.'
        });
      }
      
    } catch (error) {
      setValidationResult({ 
        type: 'error', 
        message: '🚨 Erro na comunicação com o servidor. Tente novamente mais tarde.'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const getFeedbackStyles = () => {
    if (validationResult.type === 'success') {
      return 'bg-green-50 border-green-300 text-green-700';
    }
    if (validationResult.type === 'error') {
      return 'bg-red-50 border-red-300 text-red-700';
    }
    return '';
  };
  
  const FeedbackIcon = validationResult.type === 'success' ? CheckCircle : AlertTriangle;

  return (
    // Overlay e Acessibilidade
    <div 
      className="fixed inset-0 bg-gray-900 bg-opacity-70 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      role="dialog"
      aria-modal="true"
      onClick={onClose} 
    >
      <div 
        className="bg-white rounded-xl shadow-2xl w-lg max-h-[100vh] overflow-hidden  "
        onClick={(e) => e.stopPropagation()} 
      >
        
        <div className="flex items-center justify-between p-5 border-b border-neutral-100 px-6 sm:px-8">
          <h3 className="text-xl py-2 font-bold text-gray-800">Validar Certificado</h3>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:bg-neutral-100 hover:text-gray-700 rounded-lg transition-colors"
            aria-label="Fechar"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 sm:p-8">
          <form id="validate-certificate-form" onSubmit={handleValidate} className="space-y-6">
            
            <p className="text-sm text-gray-600">
              Insira o código de autenticidade, geralmente encontrado no rodapé do certificado, para confirmar sua validade.
            </p>

            <div>
              <label htmlFor="certificateCode" className="block text-sm font-medium text-gray-700 mb-2">
                Código do Certificado <span className="text-red-500">*</span>
              </label>
              <input
                id="certificateCode"
                type="text"
                value={certificateCode}
                onChange={(e) => setCertificateCode(e.target.value)}
                placeholder="Ex: ABC-123-XYZ"
                className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow disabled:bg-gray-50"
                required
                disabled={isLoading}
              />
            </div>


            {validationResult.type && (
                <div 
                    className={`p-4 border-l-4 rounded-lg text-sm transition-opacity duration-300 ${getFeedbackStyles()}`} 
                    role="alert"
                >
                    <div className="flex items-start">
                        <FeedbackIcon className="w-5 h-5 mr-3 flex-shrink-0 mt-0.5" />
                        <p className="font-medium whitespace-pre-line">{validationResult.message}</p>
                    </div>
                </div>
            )}
            
          </form>
        </div>
              <div className="p-4 sm:p-6 border-t border-neutral-100 flex justify-end flex-shrink-0">
                <button
                    type="submit"
                    form="validate-certificate-form"
                    className="px-6 py-3 bg-green-600 rounded-lg font-semibold shadow-md transition-all duration-200 
                            hover:bg-green-700 
                            focus:outline-none focus:ring-4 focus:ring-green-500 focus:ring-opacity-50
                            flex items-center justify-center w-full sm:w-auto text-black"
                    disabled={isLoading || !certificateCode.trim()}
                >
                    {isLoading ? (
                        <>
                        <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                        Validando...
                        </>
                    ) : (
                        'Validar Certificado'
                    )}
                </button>
            </div>
        </div>
      </div>

  );
}