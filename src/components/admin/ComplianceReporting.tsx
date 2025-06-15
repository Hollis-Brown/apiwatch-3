import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  DocumentTextIcon,
  DocumentCheckIcon,
  DocumentMagnifyingGlassIcon,
  ArrowDownTrayIcon,
  CalendarIcon,
  CheckCircleIcon,
  XCircleIcon,
} from '@heroicons/react/24/outline';

// Sample data
const complianceReports = [
  {
    id: 1,
    name: 'GDPR Compliance Report',
    type: 'Monthly',
    status: 'Completed',
    generated: '2024-02-15',
    nextDue: '2024-03-15',
    size: '2.4 MB',
  },
  {
    id: 2,
    name: 'SOC 2 Audit Report',
    type: 'Quarterly',
    status: 'In Progress',
    generated: '2024-01-01',
    nextDue: '2024-04-01',
    size: '4.8 MB',
  },
  {
    id: 3,
    name: 'HIPAA Compliance Report',
    type: 'Annual',
    status: 'Pending',
    generated: '2023-12-01',
    nextDue: '2024-12-01',
    size: '3.2 MB',
  },
];

const complianceChecks = [
  {
    id: 1,
    name: 'Data Encryption',
    standard: 'GDPR',
    status: 'Compliant',
    lastChecked: '2024-02-15',
  },
  {
    id: 2,
    name: 'Access Controls',
    standard: 'SOC 2',
    status: 'Compliant',
    lastChecked: '2024-02-10',
  },
  {
    id: 3,
    name: 'Data Retention',
    standard: 'HIPAA',
    status: 'Non-Compliant',
    lastChecked: '2024-02-01',
  },
  {
    id: 4,
    name: 'Audit Logging',
    standard: 'PCI DSS',
    status: 'In Progress',
    lastChecked: '2024-02-05',
  },
];

export default function ComplianceReporting() {
  const [selectedReport, setSelectedReport] = useState<number | null>(null);
  const [showGenerateModal, setShowGenerateModal] = useState(false);
  const [reportType, setReportType] = useState('GDPR');

  const handleGenerateReport = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle report generation logic here
    setShowGenerateModal(false);
  };

  return (
    <div className="space-y-6">
      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gray-800 rounded-xl p-4"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400">Active Reports</p>
              <p className="text-2xl font-bold text-white">12</p>
            </div>
            <DocumentTextIcon className="w-8 h-8 text-primary" />
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-gray-800 rounded-xl p-4"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400">Compliance Score</p>
              <p className="text-2xl font-bold text-white">94%</p>
            </div>
            <DocumentCheckIcon className="w-8 h-8 text-status-green" />
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-gray-800 rounded-xl p-4"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400">Pending Reviews</p>
              <p className="text-2xl font-bold text-white">3</p>
            </div>
            <DocumentMagnifyingGlassIcon className="w-8 h-8 text-status-yellow" />
          </div>
        </motion.div>
      </div>

      {/* Compliance Reports */}
      <div className="bg-gray-800 rounded-xl p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-white">Compliance Reports</h2>
          <button
            onClick={() => setShowGenerateModal(true)}
            className="flex items-center gap-2 px-4 py-2 bg-primary rounded-lg text-white hover:bg-primary/90"
          >
            <DocumentTextIcon className="w-5 h-5" />
            Generate Report
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left text-sm text-gray-400">
                <th className="pb-4">Report Name</th>
                <th className="pb-4">Type</th>
                <th className="pb-4">Status</th>
                <th className="pb-4">Generated</th>
                <th className="pb-4">Next Due</th>
                <th className="pb-4">Size</th>
                <th className="pb-4">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              {complianceReports.map((report) => (
                <tr key={report.id}>
                  <td className="py-4">
                    <div className="flex items-center gap-3">
                      <DocumentTextIcon className="w-5 h-5 text-gray-400" />
                      <span className="text-white">{report.name}</span>
                    </div>
                  </td>
                  <td className="py-4 text-gray-400">{report.type}</td>
                  <td className="py-4">
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${
                        report.status === 'Completed'
                          ? 'bg-status-green/20 text-status-green'
                          : report.status === 'In Progress'
                          ? 'bg-status-yellow/20 text-status-yellow'
                          : 'bg-status-red/20 text-status-red'
                      }`}
                    >
                      {report.status}
                    </span>
                  </td>
                  <td className="py-4 text-gray-400">{report.generated}</td>
                  <td className="py-4 text-gray-400">{report.nextDue}</td>
                  <td className="py-4 text-gray-400">{report.size}</td>
                  <td className="py-4">
                    <button className="text-primary hover:text-primary/80">
                      Download
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Compliance Checks */}
      <div className="bg-gray-800 rounded-xl p-6">
        <h2 className="text-lg font-semibold text-white mb-6">
          Compliance Checks
        </h2>
        <div className="space-y-4">
          {complianceChecks.map((check) => (
            <motion.div
              key={check.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center justify-between p-4 bg-gray-700/50 rounded-lg"
            >
              <div>
                <h3 className="text-white font-medium">{check.name}</h3>
                <p className="text-sm text-gray-400">
                  Standard: {check.standard}
                </p>
              </div>
              <div className="flex items-center gap-4">
                <span
                  className={`px-2 py-1 rounded-full text-xs ${
                    check.status === 'Compliant'
                      ? 'bg-status-green/20 text-status-green'
                      : check.status === 'In Progress'
                      ? 'bg-status-yellow/20 text-status-yellow'
                      : 'bg-status-red/20 text-status-red'
                  }`}
                >
                  {check.status}
                </span>
                <span className="text-sm text-gray-400">
                  Last checked: {check.lastChecked}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Generate Report Modal */}
      {showGenerateModal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-gray-800 rounded-xl p-6 w-full max-w-md"
          >
            <h3 className="text-lg font-semibold text-white mb-4">
              Generate Compliance Report
            </h3>
            <form onSubmit={handleGenerateReport} className="space-y-4">
              <div>
                <label
                  htmlFor="reportType"
                  className="block text-sm font-medium text-gray-400 mb-1"
                >
                  Report Type
                </label>
                <select
                  id="reportType"
                  value={reportType}
                  onChange={(e) => setReportType(e.target.value)}
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white"
                >
                  <option value="GDPR">GDPR Compliance</option>
                  <option value="SOC2">SOC 2</option>
                  <option value="HIPAA">HIPAA</option>
                  <option value="PCIDSS">PCI DSS</option>
                </select>
              </div>
              <div>
                <label
                  htmlFor="dateRange"
                  className="block text-sm font-medium text-gray-400 mb-1"
                >
                  Date Range
                </label>
                <div className="flex gap-2">
                  <input
                    type="date"
                    id="startDate"
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white"
                  />
                  <input
                    type="date"
                    id="endDate"
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white"
                  />
                </div>
              </div>
              <div className="flex justify-end gap-3 mt-6">
                <button
                  type="button"
                  onClick={() => setShowGenerateModal(false)}
                  className="px-4 py-2 text-gray-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-primary rounded-lg text-white hover:bg-primary/90"
                >
                  Generate Report
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
} 