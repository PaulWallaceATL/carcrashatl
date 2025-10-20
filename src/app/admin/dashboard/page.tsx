import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import AdminDashboard from '@/components/admin/admin-dashboard';

export const metadata = {
  title: 'Admin Dashboard - Case Management',
  description: 'Manage all case submissions',
};

export default async function AdminDashboardPage() {
  const supabase = await createClient();

  // Check if user is authenticated
  const { data: { user }, error } = await supabase.auth.getUser();

  if (error || !user) {
    redirect('/admin/login');
  }

  // Fetch all cases with counts
  const { data: cases, error: casesError } = await supabase
    .from('cases')
    .select(`
      *,
      case_notes(count),
      case_activities(count)
    `)
    .order('created_at', { ascending: false });

  const casesData = cases || [];

  // Get statistics
  const stats = {
    total: casesData.length,
    new: casesData.filter(c => c.status === 'new').length,
    reviewing: casesData.filter(c => c.status === 'reviewing').length,
    in_progress: casesData.filter(c => c.status === 'in_progress').length,
    closed: casesData.filter(c => c.status === 'closed' || c.status === 'settled').length,
  };

  return <AdminDashboard initialCases={casesData} stats={stats} user={user} />;
}

