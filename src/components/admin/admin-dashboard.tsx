'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  LogOut,
  Search,
  Filter,
  Eye,
  Mail,
  Phone,
  Calendar,
  FileText,
  AlertCircle,
  CheckCircle,
  Clock,
  TrendingUp,
  Users,
  FolderOpen,
} from 'lucide-react';

interface Case {
  id: string;
  case_number: string;
  name: string;
  email: string;
  phone: string | null;
  case_type: string;
  status: string;
  priority: number;
  description: string;
  incident_date: string | null;
  incident_location: string | null;
  created_at: string;
  updated_at: string;
  case_notes?: { count: number }[];
  case_activities?: { count: number }[];
}

interface Props {
  initialCases: Case[];
  stats: {
    total: number;
    new: number;
    reviewing: number;
    in_progress: number;
    closed: number;
  };
  user: any;
}

export default function AdminDashboard({ initialCases, stats, user }: Props) {
  const router = useRouter();
  const [cases, setCases] = useState<Case[]>(initialCases);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [selectedCase, setSelectedCase] = useState<Case | null>(null);

  const handleLogout = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push('/admin/login');
    router.refresh();
  };

  const handleStatusChange = async (caseId: string, newStatus: string) => {
    const supabase = createClient();
    
    const { error } = await supabase
      .from('cases')
      .update({ status: newStatus, updated_at: new Date().toISOString() })
      .eq('id', caseId);

    if (!error) {
      // Update local state
      setCases(cases.map(c => 
        c.id === caseId ? { ...c, status: newStatus, updated_at: new Date().toISOString() } : c
      ));
      if (selectedCase?.id === caseId) {
        setSelectedCase({ ...selectedCase, status: newStatus });
      }
    }
  };

  const filteredCases = cases.filter(c => {
    const matchesSearch = searchTerm === '' || 
      c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.case_number.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || c.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'reviewing': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'contacted': return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'in_progress': return 'bg-indigo-100 text-indigo-800 border-indigo-200';
      case 'settled': return 'bg-green-100 text-green-800 border-green-200';
      case 'closed': return 'bg-gray-100 text-gray-800 border-gray-200';
      case 'rejected': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getCaseTypeLabel = (type: string) => {
    return type.split('_').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
              <p className="text-sm text-gray-600">Welcome back, {user.email}</p>
            </div>
            <Button
              variant="outline"
              onClick={handleLogout}
              className="flex items-center space-x-2"
            >
              <LogOut className="h-4 w-4" />
              <span>Logout</span>
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
          <Card className="p-6">
            <div className="flex items-center justify-between mb-2">
              <div className="text-sm font-medium text-gray-600">Total Cases</div>
              <FolderOpen className="h-5 w-5 text-gray-400" />
            </div>
            <div className="text-3xl font-bold text-gray-900">{stats.total}</div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between mb-2">
              <div className="text-sm font-medium text-gray-600">New</div>
              <AlertCircle className="h-5 w-5 text-blue-500" />
            </div>
            <div className="text-3xl font-bold text-blue-600">{stats.new}</div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between mb-2">
              <div className="text-sm font-medium text-gray-600">Reviewing</div>
              <Clock className="h-5 w-5 text-yellow-500" />
            </div>
            <div className="text-3xl font-bold text-yellow-600">{stats.reviewing}</div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between mb-2">
              <div className="text-sm font-medium text-gray-600">In Progress</div>
              <TrendingUp className="h-5 w-5 text-indigo-500" />
            </div>
            <div className="text-3xl font-bold text-indigo-600">{stats.in_progress}</div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between mb-2">
              <div className="text-sm font-medium text-gray-600">Closed</div>
              <CheckCircle className="h-5 w-5 text-green-500" />
            </div>
            <div className="text-3xl font-bold text-green-600">{stats.closed}</div>
          </Card>
        </div>

        {/* Filters */}
        <Card className="p-6 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search by name, email, or case number..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Filter className="h-5 w-5 text-gray-400" />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Status</option>
                <option value="new">New</option>
                <option value="reviewing">Reviewing</option>
                <option value="contacted">Contacted</option>
                <option value="in_progress">In Progress</option>
                <option value="settled">Settled</option>
                <option value="closed">Closed</option>
                <option value="rejected">Rejected</option>
              </select>
            </div>
          </div>
        </Card>

        {/* Cases List */}
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Cases Column */}
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Cases ({filteredCases.length})
            </h2>
            
            {filteredCases.length === 0 ? (
              <Card className="p-12 text-center">
                <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600">No cases found</p>
              </Card>
            ) : (
              filteredCases.map((caseItem) => (
                <Card
                  key={caseItem.id}
                  className={`p-6 cursor-pointer transition-all hover:shadow-lg ${
                    selectedCase?.id === caseItem.id ? 'ring-2 ring-blue-500' : ''
                  }`}
                  onClick={() => setSelectedCase(caseItem)}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <div className="flex items-center space-x-2 mb-2">
                        <span className="font-mono text-sm font-semibold text-gray-900">
                          {caseItem.case_number}
                        </span>
                        {caseItem.priority > 0 && (
                          <Badge className="bg-red-100 text-red-800 border-red-200">
                            High Priority
                          </Badge>
                        )}
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900">{caseItem.name}</h3>
                    </div>
                    <Badge className={getStatusColor(caseItem.status)}>
                      {caseItem.status.replace('_', ' ')}
                    </Badge>
                  </div>

                  <div className="space-y-2 text-sm text-gray-600">
                    <div className="flex items-center space-x-2">
                      <Mail className="h-4 w-4" />
                      <span>{caseItem.email}</span>
                    </div>
                    {caseItem.phone && (
                      <div className="flex items-center space-x-2">
                        <Phone className="h-4 w-4" />
                        <span>{caseItem.phone}</span>
                      </div>
                    )}
                    <div className="flex items-center space-x-2">
                      <FileText className="h-4 w-4" />
                      <span>{getCaseTypeLabel(caseItem.case_type)}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Calendar className="h-4 w-4" />
                      <span>Submitted {new Date(caseItem.created_at).toLocaleDateString()}</span>
                    </div>
                  </div>

                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <p className="text-sm text-gray-700 line-clamp-2">{caseItem.description}</p>
                  </div>
                </Card>
              ))
            )}
          </div>

          {/* Case Details Column */}
          <div className="lg:sticky lg:top-24 lg:self-start">
            {selectedCase ? (
              <Card className="p-6">
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">
                      {selectedCase.name}
                    </h2>
                    <span className="font-mono text-sm text-gray-600">
                      {selectedCase.case_number}
                    </span>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setSelectedCase(null)}
                  >
                    Close
                  </Button>
                </div>

                {/* Status Selector */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Case Status
                  </label>
                  <select
                    value={selectedCase.status}
                    onChange={(e) => handleStatusChange(selectedCase.id, e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="new">New</option>
                    <option value="reviewing">Reviewing</option>
                    <option value="contacted">Contacted</option>
                    <option value="in_progress">In Progress</option>
                    <option value="settled">Settled</option>
                    <option value="closed">Closed</option>
                    <option value="rejected">Rejected</option>
                  </select>
                </div>

                {/* Contact Information */}
                <div className="space-y-4 mb-6">
                  <h3 className="font-semibold text-gray-900">Contact Information</h3>
                  <div className="space-y-3">
                    <div className="flex items-start space-x-3">
                      <Mail className="h-5 w-5 text-gray-400 mt-0.5" />
                      <div>
                        <div className="text-sm font-medium text-gray-700">Email</div>
                        <a href={`mailto:${selectedCase.email}`} className="text-sm text-blue-600 hover:text-blue-700">
                          {selectedCase.email}
                        </a>
                      </div>
                    </div>
                    {selectedCase.phone && (
                      <div className="flex items-start space-x-3">
                        <Phone className="h-5 w-5 text-gray-400 mt-0.5" />
                        <div>
                          <div className="text-sm font-medium text-gray-700">Phone</div>
                          <a href={`tel:${selectedCase.phone}`} className="text-sm text-blue-600 hover:text-blue-700">
                            {selectedCase.phone}
                          </a>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Case Details */}
                <div className="space-y-4 mb-6">
                  <h3 className="font-semibold text-gray-900">Case Details</h3>
                  <div className="space-y-3 text-sm">
                    <div>
                      <span className="font-medium text-gray-700">Case Type:</span>
                      <span className="ml-2 text-gray-600">{getCaseTypeLabel(selectedCase.case_type)}</span>
                    </div>
                    {selectedCase.incident_date && (
                      <div>
                        <span className="font-medium text-gray-700">Incident Date:</span>
                        <span className="ml-2 text-gray-600">
                          {new Date(selectedCase.incident_date).toLocaleDateString()}
                        </span>
                      </div>
                    )}
                    {selectedCase.incident_location && (
                      <div>
                        <span className="font-medium text-gray-700">Location:</span>
                        <span className="ml-2 text-gray-600">{selectedCase.incident_location}</span>
                      </div>
                    )}
                    <div>
                      <span className="font-medium text-gray-700">Priority:</span>
                      <span className="ml-2 text-gray-600">{selectedCase.priority || 'Normal'}</span>
                    </div>
                  </div>
                </div>

                {/* Description */}
                <div className="space-y-4">
                  <h3 className="font-semibold text-gray-900">Description</h3>
                  <p className="text-sm text-gray-700 whitespace-pre-wrap">
                    {selectedCase.description}
                  </p>
                </div>

                {/* Timestamps */}
                <div className="mt-6 pt-6 border-t border-gray-200 text-xs text-gray-500 space-y-1">
                  <div>Created: {new Date(selectedCase.created_at).toLocaleString()}</div>
                  <div>Updated: {new Date(selectedCase.updated_at).toLocaleString()}</div>
                </div>
              </Card>
            ) : (
              <Card className="p-12 text-center">
                <Eye className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600">Select a case to view details</p>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

