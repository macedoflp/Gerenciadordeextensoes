import React, { useState } from "react";
import { Mail, Lock, Eye, EyeOff, AlertCircle } from "lucide-react";

interface LoginProps {
  onLogin: (email: string, password: string) => Promise<boolean>;
  onSignup: () => void;
  onForgotPassword: () => void;
}

export function Login({ onLogin, onSignup, onForgotPassword }: LoginProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const success = await onLogin(email, password);
      if (!success) {
        setError("E-mail ou senha incorretos. Verifique seus dados e tente novamente.");
      }
    } catch (err) {
      setError("Erro ao fazer login. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-sky-700 via-sky-800 to-sky-900 p-6">
      <div className="w-full bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl p-8 border border-neutral-100 transition-all">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-sky-600 text-white shadow-lg mb-4">
            <span className="text-3xl font-bold">E</span>
          </div>
          <h1 className="text-2xl font-semibold text-neutral-800 mb-1">
            Sistema de Extensão
          </h1>
          <p className="text-sm text-neutral-500">
            Acesse sua conta para continuar
          </p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-neutral-700 mb-1.5">
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
            <label htmlFor="password" className="block text-sm font-medium text-neutral-700 mb-1.5">
              Senha
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
              <input
                id="password"
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

        {/* Signup Link */}
        <div className="mt-6 text-center">
          <p className="text-sm text-neutral-600">
            Não tem uma conta?{" "}
            <button
              onClick={onSignup}
              className="text-sky-600 hover:text-sky-700 font-medium transition-colors"
            >
              Cadastre-se
            </button>
          </p>
        </div>

        {/* Demo Accounts */}
        <div className="mt-8 pt-5 border-t border-neutral-200">
          <p className="text-center text-neutral-500 text-sm mb-2 font-medium">
            Contas de demonstração:
          </p>
          <div className="space-y-1 text-sm text-neutral-600">
            <p><strong>Discente:</strong> joao.silva@universidade.edu.br</p>
            <p><strong>Docente:</strong> maria.souza@universidade.edu.br</p>
            <p><strong>Coordenador:</strong> carlos.mendes@universidade.edu.br</p>
            <p><strong>Senha:</strong> qualquer valor</p>
          </div>
        </div>

        {/* Footer */}
        <p className="text-center text-neutral-400 text-xs mt-8">
          © 2025 Universidade Federal. Todos os direitos reservados.
        </p>
      </div>
    </div>
  );
}
