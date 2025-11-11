import React, { useState } from 'react';
import { ArrowLeft, Mail, User, IdCard, CheckCircle } from 'lucide-react';

interface SignupProps {
  onBack: () => void;
  onSuccess: () => void;
}

export function Signup({ onBack, onSuccess }: SignupProps) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    registration: '',
    email: '',
    verificationCode: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setStep(2);
  };

  const handleVerification = async (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate verification
    await new Promise(resolve => setTimeout(resolve, 1000));
    setStep(3);
  };

  if (step === 3) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary-600 to-primary-800 flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8 text-center">
          <div className="w-16 h-16 bg-success-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-8 h-8 text-success-600" />
          </div>
          <h2>Conta criada com sucesso!</h2>
          <p className="text-neutral-600 mb-6">
            Sua conta foi ativada. Você já pode fazer login no sistema.
          </p>
          <button
            onClick={onSuccess}
            className="w-full py-3 bg-primary-600 hover:bg-primary-700 text-white rounded-lg transition-colors"
          >
            Ir para o Login
          </button>
        </div>
      </div>
    );
  }

  if (step === 2) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary-600 to-primary-800 flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8">
          <button onClick={onBack} className="flex items-center gap-2 text-neutral-600 hover:text-neutral-800 mb-6">
            <ArrowLeft className="w-5 h-5" />
            <span>Voltar</span>
          </button>

          <div className="text-center mb-6">
            <h2>Verifique seu e-mail</h2>
            <p className="text-neutral-600">
              Enviamos um código de verificação para <strong>{formData.email}</strong>
            </p>
          </div>

          <form onSubmit={handleVerification} className="space-y-6">
            <div>
              <label htmlFor="code" className="block mb-2">
                Código de verificação
              </label>
              <input
                id="code"
                type="text"
                value={formData.verificationCode}
                onChange={(e) => setFormData({ ...formData, verificationCode: e.target.value })}
                placeholder="Digite o código de 6 dígitos"
                className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-center tracking-widest"
                maxLength={6}
                required
              />
              <small className="text-neutral-600 mt-2 block text-center">
                Para demonstração, digite qualquer código de 6 dígitos
              </small>
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-primary-600 hover:bg-primary-700 text-white rounded-lg transition-colors"
            >
              Verificar e ativar conta
            </button>

            <button
              type="button"
              className="w-full text-primary-600 hover:text-primary-700"
            >
              <small>Reenviar código</small>
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-600 to-primary-800 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8">
        <button onClick={onBack} className="flex items-center gap-2 text-neutral-600 hover:text-neutral-800 mb-6">
          <ArrowLeft className="w-5 h-5" />
          <span>Voltar ao login</span>
        </button>

        <div className="text-center mb-8">
          <h2>Criar sua conta</h2>
          <p className="text-neutral-600">
            Preencha os dados abaixo para se cadastrar
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="block mb-2">
              Nome completo
            </label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
              <input
                id="name"
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Seu nome completo"
                className="w-full pl-11 pr-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                required
              />
            </div>
          </div>

          <div>
            <label htmlFor="registration" className="block mb-2">
              Matrícula
            </label>
            <div className="relative">
              <IdCard className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
              <input
                id="registration"
                type="text"
                value={formData.registration}
                onChange={(e) => setFormData({ ...formData, registration: e.target.value })}
                placeholder="Sua matrícula"
                className="w-full pl-11 pr-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                required
              />
            </div>
          </div>

          <div>
            <label htmlFor="email" className="block mb-2">
              E-mail institucional
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
              <input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="seu.email@universidade.edu.br"
                className="w-full pl-11 pr-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                required
              />
            </div>
            <small className="text-neutral-600 mt-1 block">
              Digite seu e-mail institucional (ex.: nome@universidade.edu.br). Enviaremos um código
              para ativar sua conta.
            </small>
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-primary-600 hover:bg-primary-700 text-white rounded-lg transition-colors"
          >
            Cadastrar
          </button>
        </form>
      </div>
    </div>
  );
}
