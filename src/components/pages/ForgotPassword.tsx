import React, { useState } from 'react';
import { ArrowLeft, Mail, CheckCircle } from 'lucide-react';

interface ForgotPasswordProps {
  onBack: () => void;
}

export function ForgotPassword({ onBack }: ForgotPasswordProps) {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate sending email
    await new Promise(resolve => setTimeout(resolve, 1000));
    setSent(true);
  };

  if (sent) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary-600 to-primary-800 flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8 text-center">
          <div className="w-16 h-16 bg-success-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-8 h-8 text-success-600" />
          </div>
          <h2>E-mail enviado!</h2>
          <p className="text-neutral-600 mb-6">
            Enviamos um link de recuperação para <strong>{email}</strong>. O link é válido por 1 hora.
          </p>
          <button
            onClick={onBack}
            className="w-full py-3 bg-primary-600 hover:bg-primary-700 text-white rounded-lg transition-colors"
          >
            Voltar ao Login
          </button>
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
          <h2>Recuperar senha</h2>
          <p className="text-neutral-600">
            Digite seu e-mail institucional para receber o link de recuperação
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block mb-2">
              E-mail institucional
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="seu.email@universidade.edu.br"
                className="w-full pl-11 pr-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                required
              />
            </div>
            <small className="text-neutral-600 mt-2 block">
              Enviaremos um link temporário para redefinir sua senha. O link expira em 1 hora.
            </small>
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-primary-600 hover:bg-primary-700 text-white rounded-lg transition-colors"
          >
            Enviar link de recuperação
          </button>
        </form>
      </div>
    </div>
  );
}
