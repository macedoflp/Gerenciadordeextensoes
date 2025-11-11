import React, { useState } from 'react';
import { Download, Filter, BarChart3 } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

export function Reports() {
  const [filterPeriod, setFilterPeriod] = useState('2025.1');

  const hoursData = [
    { name: 'Concluídas', value: 450, color: '#22c55e' },
    { name: 'Em análise', value: 120, color: '#f59e0b' },
    { name: 'Restantes', value: 230, color: '#e5e5e5' },
  ];

  const studentsData = [
    { name: '0-20h', alunos: 15 },
    { name: '20-40h', alunos: 28 },
    { name: '40-60h', alunos: 32 },
    { name: '60-80h', alunos: 18 },
    { name: '80h+', alunos: 7 },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2>Relatórios e Indicadores</h2>
          <p className="text-neutral-600">
            Visualize métricas e exporte relatórios do sistema
          </p>
        </div>
        <div className="flex items-center gap-2">
          <select
            value={filterPeriod}
            onChange={(e) => setFilterPeriod(e.target.value)}
            className="px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
          >
            <option value="2025.1">2025.1</option>
            <option value="2024.2">2024.2</option>
            <option value="2024.1">2024.1</option>
          </select>
        </div>
      </div>

      {/* Export Buttons */}
      <div className="flex flex-wrap gap-2">
        <button className="flex items-center gap-2 px-4 py-2 bg-success-600 hover:bg-success-700 text-white rounded-lg transition-colors">
          <Download className="w-4 h-4" />
          <span>Exportar Excel</span>
        </button>
        <button className="flex items-center gap-2 px-4 py-2 bg-error-600 hover:bg-error-700 text-white rounded-lg transition-colors">
          <Download className="w-4 h-4" />
          <span>Exportar PDF</span>
        </button>
        <button className="flex items-center gap-2 px-4 py-2 bg-neutral-600 hover:bg-neutral-700 text-white rounded-lg transition-colors">
          <Download className="w-4 h-4" />
          <span>Exportar CSV</span>
        </button>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Pie Chart */}
        <div className="bg-white rounded-lg border border-neutral-200 p-6">
          <h3>Distribuição de Horas</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={hoursData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, value }) => `${name}: ${value}h`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {hoursData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Bar Chart */}
        <div className="bg-white rounded-lg border border-neutral-200 p-6">
          <h3>Alunos por Faixa de Horas</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={studentsData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="alunos" fill="#0066ff" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Critical Students */}
      <div className="bg-white rounded-lg border border-neutral-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="m-0">Alunos Críticos (&lt; 30% da carga)</h3>
          <span className="px-3 py-1 bg-warning-100 text-warning-700 rounded-full">
            <small>8 alunos</small>
          </span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-neutral-50">
              <tr>
                <th className="px-4 py-3 text-left">Matrícula</th>
                <th className="px-4 py-3 text-left">Nome</th>
                <th className="px-4 py-3 text-left">Curso</th>
                <th className="px-4 py-3 text-left">Horas</th>
                <th className="px-4 py-3 text-left">Progresso</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-200">
              <tr>
                <td className="px-4 py-3">202012345</td>
                <td className="px-4 py-3">João Silva</td>
                <td className="px-4 py-3">Ciência da Computação</td>
                <td className="px-4 py-3">24/80h</td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <div className="flex-1 bg-neutral-200 rounded-full h-2 max-w-[100px]">
                      <div className="bg-warning-500 h-2 rounded-full" style={{ width: '30%' }} />
                    </div>
                    <small>30%</small>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Ranking */}
      <div className="bg-white rounded-lg border border-neutral-200 p-6">
        <h3 className="mb-4">Ranking por Carga Horária</h3>
        <div className="space-y-3">
          {[
            { name: 'Maria Santos', hours: 95, course: 'Eng. Civil' },
            { name: 'Pedro Costa', hours: 88, course: 'Administração' },
            { name: 'Ana Lima', hours: 82, course: 'Direito' },
          ].map((student, index) => (
            <div key={index} className="flex items-center gap-4 p-4 bg-neutral-50 rounded-lg">
              <div className="w-8 h-8 bg-primary-600 text-white rounded-full flex items-center justify-center">
                {index + 1}
              </div>
              <div className="flex-1">
                <p className="m-0 mb-1">{student.name}</p>
                <small className="text-neutral-600">{student.course}</small>
              </div>
              <div className="text-right">
                <h4 className="m-0">{student.hours}h</h4>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}