// Tipos principais do sistema

export type UserRole = 'discente' | 'docente' | 'coordenador' | 'secretaria' | 'administrador';

export type OpportunityStatus = 
  | 'rascunho' 
  | 'aguardando_aprovacao' 
  | 'publicada' 
  | 'aberta' 
  | 'em_execucao' 
  | 'encerrada' 
  | 'cancelada';

export type RequestStatus = 'pendente' | 'em_analise' | 'aprovado' | 'indeferido';

export type ModalityType = 
  | 'oficina' 
  | 'curso' 
  | 'projeto' 
  | 'evento' 
  | 'prestacao_servico' 
  | 'outro';

export interface User {
  id: string;
  name: string;
  email: string;
  registration: string; // matrícula ou SIAPE
  roles: UserRole[];
  avatar?: string;
  course?: string;
  semester?: number;
}

export interface Opportunity {
  id: string;
  title: string;
  description: string;
  modality: ModalityType;
  workload: number; // carga horária
  startDate: string;
  endDate: string;
  vacancies: number;
  availableVacancies: number;
  status: OpportunityStatus;
  responsibleId: string;
  responsibleName: string;
  createdBy: string;
  createdAt: string;
  attachments?: string[];
  participants?: Participant[];
}

export interface Participant {
  userId: string;
  userName: string;
  userEmail: string;
  status: 'inscrito' | 'aprovado' | 'rejeitado' | 'cancelado';
  enrolledAt: string;
  completedHours?: number;
  attendance?: AttendanceRecord[];
}

export interface AttendanceRecord {
  date: string;
  hours: number;
  description: string;
}

export interface ApprovalRequest {
  id: string;
  userId: string;
  userName: string;
  userEmail: string;
  description: string;
  requestedHours: number;
  certificateFile: string;
  certificateMetadata: {
    issuer: string;
    date: string;
    title: string;
  };
  status: RequestStatus;
  submittedAt: string;
  reviewedAt?: string;
  reviewedBy?: string;
  reviewerName?: string;
  decision?: string;
  feedback?: string;
  deadline?: string;
}

export interface Certificate {
  id: string;
  code: string;
  userId: string;
  userName: string;
  opportunityId?: string;
  opportunityTitle: string;
  workload: number;
  issueDate: string;
  qrCode: string;
  pdfUrl?: string;
}

export interface Group {
  id: string;
  name: string;
  description: string;
  email: string;
  responsibleId: string;
  responsibleName: string;
  members: GroupMember[];
  createdAt: string;
}

export interface GroupMember {
  userId: string;
  userName: string;
  role?: string;
  joinedAt: string;
}

export interface PPC {
  id: string;
  version: string;
  minimumWorkload: number;
  createdBy: string;
  createdAt: string;
  effectiveFrom: string;
  effectiveUntil?: string;
}

export interface Notification {
  id: string;
  userId: string;
  type: 'info' | 'success' | 'warning' | 'error';
  title: string;
  message: string;
  read: boolean;
  createdAt: string;
  actionUrl?: string;
}

export interface DashboardMetrics {
  completedHours: number;
  pendingHours: number;
  totalRequired: number;
  certificates: number;
  pendingRequests: number;
  activeOpportunities: number;
}
