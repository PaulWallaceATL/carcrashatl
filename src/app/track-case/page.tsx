'use client';

import { useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { ModernLayout } from '@/components/layout/modern-layout';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Search,
  FileText,
  Mail,
  Phone,
  Calendar,
  MapPin,
  AlertCircle,
  CheckCircle,
  Clock,
  Loader2,
} from 'lucide-react';

interface CaseData {
  id: string;
  case_number: string;
  name: string;
  email: string;
  phone: string | null;
  case_type: string;
  status: string;
  description: string;
  incident_date: string | null;
  incident_location: string | null;
  created_at: string;
  updated_at: string;
}

export default function TrackCasePage() {
  const [caseNumber, setCaseNumber] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [caseData, setCaseData] = useState<CaseData | null>(null);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    setCaseData(null);

    try {
      const supabase = createClient();

      const { data, error } = await supabase
        .from('cases')
        .select('*')
        .eq('case_number', caseNumber.toUpperCase().trim())
        .eq('email', email.toLowerCase().trim())
        .single();

      if (error) {
        if (error.code === 'PGRST116') {
          setError('Case not found. Please check your case number and email address.');
        } else {
          setError('An error occurred. Please try again.');
        }
        setLoading(false);
        return;
      }

      setCaseData(data);
      setLoading(false);
    } catch (err: any) {
      setError('An error occurred. Please try again.');
      setLoading(false);
    }
  };

  const getStatusInfo = (status: string) => {
    switch (status) {
      case 'new':
        return {
          color: 'bg-blue-100 text-blue-800 border-blue-200',
          icon: <AlertCircle className="h-5 w-5" />,
          message: 'Your case has been received and is awaiting review.',
        };
      case 'reviewing':
        return {
          color: 'bg-yellow-100 text-yellow-800 border-yellow-200',
          icon: <Clock className="h-5 w-5" />,
          message: 'Our team is currently reviewing your case details.',
        };
      case 'contacted':
        return {
          color: 'bg-purple-100 text-purple-800 border-purple-200',
          icon: <Phone className="h-5 w-5" />,
          message: 'We have reached out to you. Please check your email/phone.',
        };
      case 'in_progress':
        return {
          color: 'bg-indigo-100 text-indigo-800 border-indigo-200',
          icon: <CheckCircle className="h-5 w-5" />,
          message: 'Your case is actively being worked on.',
        };
      case 'settled':
        return {
          color: 'bg-green-100 text-green-800 border-green-200',
          icon: <CheckCircle className="h-5 w-5" />,
          message: 'Your case has been successfully settled.',
        };
      case 'closed':
        return {
          color: 'bg-gray-100 text-gray-800 border-gray-200',
          icon: <CheckCircle className="h-5 w-5" />,
          message: 'This case has been closed.',
        };
      default:
        return {
          color: 'bg-gray-100 text-gray-800 border-gray-200',
          icon: <FileText className="h-5 w-5" />,
          message: 'Case status updated.',
        };
    }
  };

  const getCaseTypeLabel = (type: string) => {
    return type.split('_').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
  };

  return (
    <ModernLayout>
      <main className="py-20 bg-gradient-to-br from-blue-50 to-indigo-50 min-h-screen">
        <div className="max-w-4xl mx-auto px-4">
          
          {/* Header */}
          <div className="text-center mb-12">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center mx-auto mb-4">
              <Search className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Track Your Case
            </h1>
            <p className="text-xl text-gray-700">
              Enter your case number and email to check your case status
            </p>
          </div>

          {/* Search Form */}
          <Card className="p-8 mb-8">
            <form onSubmit={handleSearch} className="space-y-6">
              <div>
                <label htmlFor="caseNumber" className="block text-sm font-medium text-gray-700 mb-2">
                  Case Number
                </label>
                <input
                  id="caseNumber"
                  type="text"
                  required
                  placeholder="CASE-123456"
                  value={caseNumber}
                  onChange={(e) => setCaseNumber(e.target.value.toUpperCase())}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent font-mono"
                  disabled={loading}
                />
                <p className="mt-2 text-sm text-gray-500">
                  Your case number was provided when you submitted your case
                </p>
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  disabled={loading}
                />
                <p className="mt-2 text-sm text-gray-500">
                  Use the same email you used when submitting your case
                </p>
              </div>

              {error && (
                <div className="p-4 bg-red-50 border-2 border-red-200 rounded-lg flex items-start space-x-3">
                  <AlertCircle className="h-5 w-5 text-red-600 mt-0.5 flex-shrink-0" />
                  <div className="text-sm text-red-700">{error}</div>
                </div>
              )}

              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                    Searching...
                  </>
                ) : (
                  <>
                    <Search className="h-5 w-5 mr-2" />
                    Find My Case
                  </>
                )}
              </Button>
            </form>
          </Card>

          {/* Case Results */}
          {caseData && (
            <Card className="p-8">
              <div className="mb-8">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <span className="font-mono text-sm text-gray-600 block mb-2">
                      {caseData.case_number}
                    </span>
                    <h2 className="text-3xl font-bold text-gray-900">{caseData.name}</h2>
                  </div>
                  <Badge className={`${getStatusInfo(caseData.status).color} px-4 py-2 text-base`}>
                    {caseData.status.replace('_', ' ').toUpperCase()}
                  </Badge>
                </div>

                {/* Status Message */}
                <div className={`${getStatusInfo(caseData.status).color.replace('100', '50')} rounded-lg p-6 flex items-start space-x-4`}>
                  <div className={getStatusInfo(caseData.status).color.replace('bg-', 'text-').replace('100', '600')}>
                    {getStatusInfo(caseData.status).icon}
                  </div>
                  <div>
                    <h3 className={`font-semibold mb-1 ${getStatusInfo(caseData.status).color.replace('bg-', 'text-').replace('100', '900')}`}>
                      Status Update
                    </h3>
                    <p className={getStatusInfo(caseData.status).color.replace('bg-', 'text-').replace('100', '700')}>
                      {getStatusInfo(caseData.status).message}
                    </p>
                  </div>
                </div>
              </div>

              {/* Case Information */}
              <div className="space-y-6">
                <h3 className="text-xl font-semibold text-gray-900">Case Information</h3>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="flex items-start space-x-3">
                    <Mail className="h-5 w-5 text-gray-400 mt-0.5" />
                    <div>
                      <div className="text-sm font-medium text-gray-700">Email</div>
                      <div className="text-sm text-gray-900">{caseData.email}</div>
                    </div>
                  </div>

                  {caseData.phone && (
                    <div className="flex items-start space-x-3">
                      <Phone className="h-5 w-5 text-gray-400 mt-0.5" />
                      <div>
                        <div className="text-sm font-medium text-gray-700">Phone</div>
                        <div className="text-sm text-gray-900">{caseData.phone}</div>
                      </div>
                    </div>
                  )}

                  <div className="flex items-start space-x-3">
                    <FileText className="h-5 w-5 text-gray-400 mt-0.5" />
                    <div>
                      <div className="text-sm font-medium text-gray-700">Case Type</div>
                      <div className="text-sm text-gray-900">{getCaseTypeLabel(caseData.case_type)}</div>
                    </div>
                  </div>

                  {caseData.incident_date && (
                    <div className="flex items-start space-x-3">
                      <Calendar className="h-5 w-5 text-gray-400 mt-0.5" />
                      <div>
                        <div className="text-sm font-medium text-gray-700">Incident Date</div>
                        <div className="text-sm text-gray-900">
                          {new Date(caseData.incident_date).toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                  )}

                  {caseData.incident_location && (
                    <div className="flex items-start space-x-3 md:col-span-2">
                      <MapPin className="h-5 w-5 text-gray-400 mt-0.5" />
                      <div>
                        <div className="text-sm font-medium text-gray-700">Incident Location</div>
                        <div className="text-sm text-gray-900">{caseData.incident_location}</div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Description */}
                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Case Description</h4>
                  <p className="text-sm text-gray-900 whitespace-pre-wrap bg-gray-50 rounded-lg p-4">
                    {caseData.description}
                  </p>
                </div>

                {/* Timeline */}
                <div className="pt-6 border-t border-gray-200">
                  <h4 className="text-sm font-medium text-gray-700 mb-4">Timeline</h4>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3 text-sm">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <span className="text-gray-600">Submitted:</span>
                      <span className="text-gray-900 font-medium">
                        {new Date(caseData.created_at).toLocaleString()}
                      </span>
                    </div>
                    <div className="flex items-center space-x-3 text-sm">
                      <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                      <span className="text-gray-600">Last Updated:</span>
                      <span className="text-gray-900 font-medium">
                        {new Date(caseData.updated_at).toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-8 pt-6 border-t border-gray-200 flex flex-col sm:flex-row gap-4">
                <Button
                  variant="outline"
                  onClick={() => {
                    setCaseData(null);
                    setCaseNumber('');
                    setEmail('');
                  }}
                  className="flex-1"
                >
                  Search Another Case
                </Button>
                <Button
                  className="flex-1 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
                  asChild
                >
                  <a href="/contact">Contact Us</a>
                </Button>
              </div>
            </Card>
          )}

          {/* Help Section */}
          <Card className="p-6 mt-8 bg-blue-50 border-blue-200">
            <h3 className="text-lg font-semibold text-blue-900 mb-3">Need Help?</h3>
            <p className="text-sm text-blue-800 mb-4">
              If you can't find your case number or need assistance, please contact us directly.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 text-sm">
              <a href="tel:+1234567890" className="flex items-center space-x-2 text-blue-700 hover:text-blue-800">
                <Phone className="h-4 w-4" />
                <span>(123) 456-7890</span>
              </a>
              <a href="mailto:info@carestialaw.com" className="flex items-center space-x-2 text-blue-700 hover:text-blue-800">
                <Mail className="h-4 w-4" />
                <span>info@carestialaw.com</span>
              </a>
            </div>
          </Card>
        </div>
      </main>
    </ModernLayout>
  );
}

