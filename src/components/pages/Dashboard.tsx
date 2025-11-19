import React from 'react';
import {
  Award,
  Clock,
  CheckCircle,
  AlertCircle,
  TrendingUp,
  Calendar,
  Users,
  FileText,
} from 'lucide-react';
import { useAuth } from '../../lib/auth-context';
import { mockDashboardMetrics, mockOpportunities, mockApprovalRequests } from '../../lib/mock-data';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

interface DashboardProps {
  onNavigate: (page: string) => void;
}

export function Dashboard({ onNavigate }: DashboardProps) {
  const { user, currentRole } = useAuth();
  const metrics = user ? mockDashboardMetrics[user.id] : null;

  if (currentRole === 'discente') {
    return <StudentDashboard metrics={metrics} onNavigate={onNavigate} />;
  }

  if (currentRole === 'coordenador' || currentRole === 'secretaria') {
    return <CoordinatorDashboard onNavigate={onNavigate} />;
  }

  if (currentRole === 'docente') {
    return <TeacherDashboard onNavigate={onNavigate} />;
  }

  if (currentRole === 'administrador') {
    return <AdminDashboard onNavigate={onNavigate} />;
  }

  return null;
}

function StudentDashboard({ metrics, onNavigate }: any) {
  if (!metrics) return null;

  const progressPercentage = (metrics.completedHours / metrics.totalRequired) * 100;
  const totalHours = metrics.completedHours + metrics.pendingHours;

  const chartData = [
    { name: 'Concluídas', value: metrics.completedHours, color: '#22c55e' },
    { name: 'Em análise', value: metrics.pendingHours, color: '#f59e0b' },
    { name: 'Restantes', value: Math.max(0, metrics.totalRequired - totalHours), color: '#e5e5e5' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2>Bem-vindo ao seu Dashboard</h2>
        <p className="text-neutral-600">Acompanhe seu progresso em atividades de extensão</p>
      </div>

      {/* Progress Summary */}
      <div className="border border-neutral-200 rounded-xl p-6 text-white">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="m-0 mb-2 text-white">Progresso de Extensão</h3>
            <p className="m-0 text-primary-100">
              {metrics.completedHours} de {metrics.totalRequired} horas concluídas
            </p>
          </div>
          <TrendingUp className="w-8 h-8 text-primary-200" />
        </div>
        <div className="w-full bg-primary-800 rounded-full h-3 mb-2">
          <div
            className="bg-white border border-neutral-200 h-3 rounded-full transition-all duration-500"
            style={{ width: `${Math.min(progressPercentage, 100)}%` }}
          />
        </div>
        <div className="flex justify-between">
          <small className="text-primary-100">{progressPercentage.toFixed(1)}% completo</small>
          <small className="text-primary-100">
            {Math.max(0, metrics.totalRequired - totalHours)}h restantes
          </small>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          icon={CheckCircle}
          label="Horas Concluídas"
          value={metrics.completedHours}
          color="success"
        />
        <StatCard
          icon={Clock}
          label="Horas em Análise"
          value={metrics.pendingHours}
          color="warning"
        />
        <StatCard
          icon={Award}
          label="Certificados"
          value={metrics.certificates}
          color="primary"
        />
        <StatCard
          icon={FileText}
          label="Solicitações Pendentes"
          value={metrics.pendingRequests}
          color="neutral"
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Pie Chart */}
        <div className="bg-white rounded-lg border border-neutral-200 p-6">
          <h3>Distribuição de Horas</h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, value }) => `${name}: ${value}h`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-lg border border-neutral-200 p-6">
          <h3>Ações Rápidas</h3>
          <div className="space-y-3">
            <button
              onClick={() => onNavigate('opportunities')}
              className="w-full flex items-center gap-3 p-4 bg-primary-50 hover:bg-primary-100 rounded-lg transition-colors text-left"
            >
              <Calendar className="w-5 h-5 text-primary-600" />
              <div>
                <p className="m-0">Buscar Oportunidades</p>
                <small className="text-neutral-600">Encontre atividades de extensão</small>
              </div>
            </button>
            <button
              onClick={() => onNavigate('approval-requests')}
              className="w-full flex items-center gap-3 p-4 bg-secondary-50 hover:bg-secondary-100 rounded-lg transition-colors text-left"
            >
              <FileText className="w-5 h-5 text-secondary-600" />
              <div>
                <p className="m-0">Solicitar Aproveitamento</p>
                <small className="text-neutral-600">Envie atividades externas</small>
              </div>
            </button>
            <button
              onClick={() => onNavigate('certificates')}
              className="w-full flex items-center gap-3 p-4 bg-success-50 hover:bg-success-100 rounded-lg transition-colors text-left"
            >
              <Award className="w-5 h-5 text-success-600" />
              <div>
                <p className="m-0">Meus Certificados</p>
                <small className="text-neutral-600">Baixe seus certificados</small>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function CoordinatorDashboard({ onNavigate }: any) {
  const pendingRequests = mockApprovalRequests.filter(r => r.status === 'pendente').length;
  const activeOpportunities = mockOpportunities.filter(o => o.status === 'aberta' || o.status === 'em_execucao').length;

  const requestsData = [
    { name: 'Pendentes', value: 5 },
    { name: 'Aprovadas', value: 12 },
    { name: 'Indeferidas', value: 3 },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2>Painel de Coordenação</h2>
        <p className="text-neutral-600">Gerencie atividades de extensão e solicitações</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatCard
          icon={AlertCircle}
          label="Solicitações Pendentes"
          value={pendingRequests}
          color="warning"
          onClick={() => onNavigate('approval-requests')}
        />
        <StatCard
          icon={Calendar}
          label="Oportunidades Ativas"
          value={activeOpportunities}
          color="success"
          onClick={() => onNavigate('opportunities')}
        />
        <StatCard
          icon={Users}
          label="Alunos Ativos"
          value={48}
          color="primary"
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg border border-neutral-200 p-6">
          <h3>Solicitações de Aproveitamento</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={requestsData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#0066ff" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-lg border border-neutral-200 p-6">
          <h3>Filas de Trabalho</h3>
          <div className="space-y-3">
            <QueueItem
              title="Aprovar solicitações de aproveitamento"
              count={pendingRequests}
              priority="high"
              onClick={() => onNavigate('approval-requests')}
            />
            <QueueItem
              title="Validar oportunidades criadas por alunos"
              count={1}
              priority="medium"
              onClick={() => onNavigate('opportunities')}
            />
            <QueueItem
              title="Certificados aguardando emissão"
              count={3}
              priority="low"
              onClick={() => onNavigate('certificates')}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function TeacherDashboard({ onNavigate }: any) {
  const myOpportunities = mockOpportunities.filter(o => o.responsibleId === '2');

  return (
    <div className="space-y-6">
      <div>
        <h2>Painel do Docente</h2>
        <p className="text-neutral-600">Gerencie suas oportunidades e participantes</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatCard
          icon={Calendar}
          label="Minhas Oportunidades"
          value={myOpportunities.length}
          color="primary"
        />
        <StatCard icon={Users} label="Total de Participantes" value={18} color="success" />
        <StatCard icon={CheckCircle} label="Certificados Emitidos" value={12} color="neutral" />
      </div>

      <div className="bg-white rounded-lg border border-neutral-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="m-0">Minhas Oportunidades</h3>
          <button
            onClick={() => onNavigate('opportunities')}
            className="px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg transition-colors"
          >
            Criar Nova
          </button>
        </div>
        <div className="space-y-3">
          {myOpportunities.map(opp => (
            <div key={opp.id} className="flex items-center justify-between p-4 bg-neutral-50 rounded-lg">
              <div>
                <p className="m-0 mb-1">{opp.title}</p>
                <small className="text-neutral-600">
                  {opp.vacancies - opp.availableVacancies}/{opp.vacancies} inscritos
                </small>
              </div>
              <span className="px-3 py-1 bg-success-100 text-success-700 rounded-full">
                <small>{opp.status}</small>
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function AdminDashboard({ onNavigate }: any) {
  return (
    <div className="space-y-6">
      <div>
        <h2>Painel Administrativo</h2>
        <p className="text-neutral-600">Gerencie usuários e configurações do sistema</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <StatCard icon={Users} label="Usuários Ativos" value={156} color="primary" />
        <StatCard icon={Calendar} label="Oportunidades Totais" value={45} color="success" />
        <StatCard icon={Award} label="Certificados Emitidos" value={234} color="warning" />
        <StatCard icon={FileText} label="Logs do Sistema" value={1205} color="neutral" />
      </div>

      <div className="bg-white rounded-lg border border-neutral-200 p-6">
        <h3>Ações Administrativas</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <button
            onClick={() => onNavigate('users')}
            className="flex items-center gap-3 p-4 bg-primary-50 hover:bg-primary-100 rounded-lg transition-colors text-left"
          >
            <Users className="w-6 h-6 text-primary-600" />
            <div>
              <p className="m-0">Gerenciar Usuários</p>
              <small className="text-neutral-600">Criar e editar perfis</small>
            </div>
          </button>
          <button
            onClick={() => onNavigate('settings')}
            className="flex items-center gap-3 p-4 bg-secondary-50 hover:bg-secondary-100 rounded-lg transition-colors text-left"
          >
            <FileText className="w-6 h-6 text-secondary-600" />
            <div>
              <p className="m-0">Configurações</p>
              <small className="text-neutral-600">Permissões e sistema</small>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}

function StatCard({ icon: Icon, label, value, color, onClick }: any) {
  const colorClasses = {
    success: 'bg-success-100 text-success-600',
    warning: 'bg-warning-100 text-warning-600',
    error: 'bg-error-100 text-error-600',
    primary: 'bg-primary-100 text-primary-600',
    neutral: 'bg-neutral-100 text-neutral-600',
  };

  return (
    <div
      onClick={onClick}
      className={`bg-white rounded-lg border border-neutral-200 p-6 ${onClick ? 'cursor-pointer hover:shadow-md transition-shadow' : ''}`}
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-neutral-600 mb-2">{label}</p>
          <h2 className="m-0">{value}</h2>
        </div>
        <div className={`p-3 rounded-lg ${colorClasses[color]}`}>
          <Icon className="w-6 h-6" />
        </div>
      </div>
    </div>
  );
}

function QueueItem({ title, count, priority, onClick }: any) {
  const priorityColors = {
    high: 'bg-error-100 text-error-700',
    medium: 'bg-warning-100 text-warning-700',
    low: 'bg-neutral-100 text-neutral-700',
  };

  return (
    <button
      onClick={onClick}
      className="w-full flex items-center justify-between p-4 bg-neutral-50 hover:bg-neutral-100 rounded-lg transition-colors text-left"
    >
      <div className="flex-1">
        <p className="m-0 mb-1">{title}</p>
        <small className="text-neutral-600">{count} itens pendentes</small>
      </div>
      <span className={`px-3 py-1 rounded-full ${priorityColors[priority]}`}>
        <small>{count}</small>
      </span>
    </button>
  );
}
