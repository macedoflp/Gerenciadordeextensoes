import React, { useState } from 'react';
import { Search, Filter, Mail, Lock, Eye, EyeOff, AlertCircle, X } from 'lucide-react';
import { mockOpportunities } from '../../lib/mock-data'; 
import { OpportunityCard } from '../OpportunityCard'; 
import { Opportunity, ModalityType } from '../../lib/types';



interface LoginProps {
  onLogin: (email: string, password: string) => Promise<boolean>;
  onClose: () => void;
  onSignup: () => void;
  onForgotPassword: () => void;
}

export function LoginModalContent({ onLogin, onClose, onSignup, onForgotPassword }: LoginProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [filterModality, setFilterModality] = useState<ModalityType | 'all'>('all');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {

      const success = await onLogin(email, password); 
      if (!success) {
        setError("E-mail ou senha incorretos. Verifique seus dados e tente novamente.");
      } else {

        onClose(); 
      }
    } catch (err) {
      setError("Erro ao fazer login. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  return (

    <div className="bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl p-8 border border-neutral-200 transition-all mx-auto relative">

        <button
            onClick={onClose}
            className="absolute top-4 right-4 text-neutral-400 hover:text-neutral-600 transition-colors"
            aria-label="Fechar Modal"
        >
            <X className="w-6 h-6" />
        </button>

        {/* Logo */}
        <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-sky-600 text-white shadow-lg mb-4">
                <span className="text-3xl font-bold">E</span>
            </div>
            <h2 className="text-2xl font-semibold text-neutral-800 mb-1">
                Sistema de Extensão
            </h2>
            <p className="text-sm text-neutral-500">
                Acesse sua conta para se inscrever
            </p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email */}
            <div>
                <label htmlFor="modal-email" className="block text-sm font-medium text-neutral-700 mb-1.5">
                    E-mail institucional
                </label>
                <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
                    <input
                        id="modal-email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="seu.email@universidade.edu.br"
                        className="w-full pl-11 pr-4 py-3 text-sm border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-all"
                        required
                    />
                </div>
                <small className="text-neutral-500 mt-1 block">
                    Use seu e-mail institucional para acessar
                </small>
            </div>

            {/* Password */}
            <div>
                <label htmlFor="modal-password" className="block text-sm font-medium text-neutral-700 mb-1.5">
                    Senha
                </label>
                <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
                    <input
                        id="modal-password"
                        type={showPassword ? "text" : "password"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Digite sua senha"
                        className="w-full pl-11 pr-12 py-3 text-sm border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-all"
                        required
                    />
                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600"
                    >
                        {showPassword ? (
                            <EyeOff className="w-5 h-5" />
                        ) : (
                            <Eye className="w-5 h-5" />
                        )}
                    </button>
                </div>
            </div>

            {/* Error Message */}
            {error && (
                <div className="flex items-start gap-2 p-3 bg-red-50 border border-red-200 rounded-lg animate-fadeIn">
                    <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                    <p className="text-red-700 text-sm leading-snug">{error}</p>
                </div>
            )}

            {/* Forgot Password */}
            <div className="text-right">
                <button
                    type="button"
                    onClick={onForgotPassword}
                    className="text-sm text-sky-600 hover:text-sky-700 transition-colors"
                >
                    Esqueci minha senha
                </button>
            </div>

            {/* Submit Button */}
            <button
                type="submit"
                disabled={loading}
                className="w-full py-3 rounded-lg bg-sky-600 hover:bg-sky-700 disabled:bg-neutral-300 text-white font-medium text-sm tracking-wide transition-colors flex items-center justify-center"
            >
                {loading ? "Entrando..." : "Entrar"}
            </button>
        </form>

        {/* Demo Accounts */}
        <div className="mt-8 pt-5 border-t border-neutral-200">
            <p className="text-center text-neutral-500 text-sm mb-2 font-medium">
                Contas de demonstração:
            </p>
            <div className="space-y-1 text-sm text-neutral-600">
                <p><strong>Discente:</strong> joao.silva@discente.ufma.br</p>
                <p><strong>Docente:</strong> maria.souza@docente.ufma.br</p>
                <p><strong>Coordenador:</strong> carlos.mendes@docente.ufma.br</p>
                <p><strong>Senha:</strong> qualquer valor</p>
            </div>
        </div>

        {/* Footer */}
        <p className="text-center text-neutral-400 text-xs mt-8">
            © 2025 Universidade Federal. Todos os direitos reservados.
        </p>
    </div>
  );
}


interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50 backdrop-blur-sm transition-opacity" onClick={onClose}>
            <div className="relative w-full max-w-lg max-h-full overflow-y-auto" onClick={e => e.stopPropagation()}>
                {children}
            </div>
        </div>
    );
};



interface HomePortalProps {

    onLogin: (email: string, password: string) => Promise<boolean>;
    onSignup: () => void;
    onForgotPassword: () => void;
}

export function HomePortal({ onLogin, onSignup, onForgotPassword }: HomePortalProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterModality, setFilterModality] = useState<string>('all');
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false); // Novo estado para o modal


  const openLoginModal = () => setIsLoginModalOpen(true);
  const closeLoginModal = () => setIsLoginModalOpen(false);


  const openOpportunities = mockOpportunities.filter(
    (opp: Opportunity) => opp.status === 'aberta' || opp.status === 'publicada'
  );

  const filteredOpportunities = openOpportunities.filter((opp: Opportunity) => {
    const matchesSearch = opp.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      opp.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesModality = filterModality === 'all' || opp.modality === filterModality;
    return matchesSearch && matchesModality;
  });

  return (

    <div className="min-h-screen bg-neutral-100 pb-12">
        

        <header className="sticky top-0 z-10 w-full bg-white shadow-md border-b border-neutral-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex justify-between items-center">
                <div className="text-xl font-bold text-sky-700">
                    Portal de Extensão
                </div>
                <button
                    onClick={openLoginModal}
                    className="bg-sky-600 hover:bg-sky-700 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition-colors text-sm"
                >
                    Entrar no Sistema
                </button>
            </div>
        </header>


        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
            <div className="space-y-6">
                

                <div className="bg-sky-800 rounded-xl p-8 text-white">
                    <h1 className="m-0 mb-3 text-3xl font-extrabold text-white">Portal Público de Extensão</h1>
                    <p className="m-0 text-primary-100 text-lg">
                        Explore oportunidades de extensão universitária abertas à comunidade. Não é necessário login
                        para visualizar as atividades disponíveis.
                    </p>
                </div>
                

                <div className="bg-white rounded-lg border border-neutral-200 p-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Search */}
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
                            <input
                                type="text"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                placeholder="Buscar oportunidades por título ou descrição..."
                                className="w-full pl-11 pr-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                            />
                        </div>


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


                <div className="bg-secondary-50 border border-secondary-200 rounded-lg p-4">
                    <p className="m-0 text-secondary-800">
                        <strong>Atenção:</strong> Para se inscrever nas oportunidades, você precisa clicar em **"Entrar no Sistema"** no topo e fazer login com suas credenciais institucionais.
                    </p>
                </div>


                {filteredOpportunities.length === 0 ? (
                    <div className="bg-white rounded-lg border border-neutral-200 p-12 text-center">
                        <p className="text-neutral-500 m-0">
                            Nenhuma oportunidade aberta encontrada no momento com os filtros selecionados.
                        </p>
                    </div>
                ) : (
                    <>
                        <div className="flex items-center justify-between">
                            <h3 className="text-2xl font-semibold text-neutral-800">Oportunidades Abertas</h3>
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
        </main>


        <Modal isOpen={isLoginModalOpen} onClose={closeLoginModal}>
            <LoginModalContent 
                onLogin={onLogin} 
                onClose={closeLoginModal} 
                onSignup={onSignup} 
                onForgotPassword={onForgotPassword} 
            />
        </Modal>

    </div>
  );
}