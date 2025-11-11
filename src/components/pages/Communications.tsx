import React, { useState } from 'react';
import { Send, Users, Filter } from 'lucide-react';

export function Communications() {
  const [message, setMessage] = useState('');
  const [subject, setSubject] = useState('');
  const [targetAudience, setTargetAudience] = useState('all');

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Comunicado enviado para: ${targetAudience}`);
    setMessage('');
    setSubject('');
  };

  return (
    <div className="space-y-6">
      <div>
        <h2>Comunicações em Massa</h2>
        <p className="text-neutral-600">
          Envie comunicados para grupos específicos de usuários
        </p>
      </div>

      <div className="bg-white rounded-lg border border-neutral-200 p-6">
        <form onSubmit={handleSend} className="space-y-6">
          <div>
            <label htmlFor="audience" className="block mb-2">
              Público-alvo
            </label>
            <div className="relative">
              <Users className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
              <select
                id="audience"
                value={targetAudience}
                onChange={(e) => setTargetAudience(e.target.value)}
                className="w-full pl-11 pr-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                <option value="all">Todos os usuários</option>
                <option value="students">Apenas discentes</option>
                <option value="teachers">Apenas docentes</option>
                <option value="coordinators">Coordenadores e secretaria</option>
                <option value="course-cc">Alunos de Ciência da Computação</option>
                <option value="semester-6">Alunos do 6º semestre</option>
              </select>
            </div>
          </div>

          <div>
            <label htmlFor="subject" className="block mb-2">
              Assunto
            </label>
            <input
              id="subject"
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="Digite o assunto do comunicado"
              className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              required
            />
          </div>

          <div>
            <label htmlFor="message" className="block mb-2">
              Mensagem
            </label>
            <textarea
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Digite a mensagem do comunicado..."
              rows={8}
              className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 resize-none"
              required
            />
            <small className="text-neutral-600 mt-1 block">
              {message.length} caracteres
            </small>
          </div>

          <div className="flex gap-2">
            <button
              type="submit"
              className="flex items-center gap-2 px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white rounded-lg transition-colors"
            >
              <Send className="w-4 h-4" />
              <span>Enviar Comunicado</span>
            </button>
            <button
              type="button"
              className="px-6 py-3 bg-neutral-100 hover:bg-neutral-200 text-neutral-700 rounded-lg transition-colors"
            >
              Salvar Rascunho
            </button>
          </div>
        </form>
      </div>

      {/* History */}
      <div className="bg-white rounded-lg border border-neutral-200 p-6">
        <h3 className="mb-4">Histórico de Comunicados</h3>
        <div className="space-y-3">
          <div className="p-4 bg-neutral-50 rounded-lg">
            <div className="flex items-start justify-between mb-2">
              <h4 className="m-0">Novo prazo para solicitações de aproveitamento</h4>
              <small className="text-neutral-600">10/06/2025</small>
            </div>
            <p className="text-neutral-600 m-0 mb-2">
              <small>Enviado para: Todos os discentes</small>
            </p>
            <small className="text-neutral-500">
              O prazo para envio de solicitações foi estendido até 30/06/2025...
            </small>
          </div>
        </div>
      </div>
    </div>
  );
}
