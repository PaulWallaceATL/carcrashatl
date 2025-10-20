import { createClient } from '@/lib/supabase/server'

export const metadata = {
  title: 'Supabase Connection Test',
  description: 'Test Supabase integration',
}

export default async function TestSupabasePage() {
  let connectionStatus = {
    success: false,
    message: '',
    error: null as string | null,
    timestamp: new Date().toISOString()
  }

  try {
    const supabase = await createClient()
    
    // Test connection
    const { data, error } = await supabase
      .from('_test_connection')
      .select('*')
      .limit(1)
    
    if (error) {
      if (error.message.includes('relation') || 
          error.message.includes('Could not find the table') ||
          error.message.includes('does not exist') ||
          error.code === 'PGRST116' ||
          error.code === '42P01') {
        connectionStatus = {
          success: true,
          message: 'Supabase connection successful!',
          error: null,
          timestamp: new Date().toISOString()
        }
      } else {
        connectionStatus = {
          success: false,
          message: 'Connection error',
          error: error.message,
          timestamp: new Date().toISOString()
        }
      }
    } else {
      connectionStatus = {
        success: true,
        message: 'Supabase connection successful!',
        error: null,
        timestamp: new Date().toISOString()
      }
    }
  } catch (error: any) {
    connectionStatus = {
      success: false,
      message: 'Failed to connect',
      error: error.message || 'Unknown error',
      timestamp: new Date().toISOString()
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 p-4">
      <div className="max-w-2xl w-full bg-white rounded-2xl shadow-xl p-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Supabase Connection Test
          </h1>
          <p className="text-gray-600">
            Testing connection to your Supabase instance
          </p>
        </div>

        <div className={`rounded-lg p-6 ${
          connectionStatus.success 
            ? 'bg-green-50 border-2 border-green-200' 
            : 'bg-red-50 border-2 border-red-200'
        }`}>
          <div className="flex items-start space-x-4">
            <div className={`flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center ${
              connectionStatus.success ? 'bg-green-500' : 'bg-red-500'
            }`}>
              {connectionStatus.success ? (
                <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              ) : (
                <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              )}
            </div>
            
            <div className="flex-1">
              <h2 className={`text-xl font-semibold mb-2 ${
                connectionStatus.success ? 'text-green-900' : 'text-red-900'
              }`}>
                {connectionStatus.success ? '✅ Connection Successful' : '❌ Connection Failed'}
              </h2>
              
              <p className={`mb-3 ${
                connectionStatus.success ? 'text-green-700' : 'text-red-700'
              }`}>
                {connectionStatus.message}
              </p>
              
              {connectionStatus.error && (
                <div className="bg-white rounded p-4 mb-3">
                  <p className="text-sm font-mono text-red-600 break-all">
                    {connectionStatus.error}
                  </p>
                </div>
              )}
              
              <p className="text-sm text-gray-600">
                <strong>Timestamp:</strong> {connectionStatus.timestamp}
              </p>
            </div>
          </div>
        </div>

        {!connectionStatus.success && (
          <div className="mt-6 bg-blue-50 border-2 border-blue-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-blue-900 mb-3">
              💡 Troubleshooting Tips
            </h3>
            <ul className="space-y-2 text-sm text-blue-800">
              <li>• Check that environment variables are set in Vercel</li>
              <li>• Verify NEXT_PUBLIC_SUPABASE_URL is correct</li>
              <li>• Verify NEXT_PUBLIC_SUPABASE_ANON_KEY is correct</li>
              <li>• Make sure your Supabase project is not paused</li>
              <li>• Check Vercel deployment logs for errors</li>
            </ul>
          </div>
        )}

        <div className="mt-8 grid grid-cols-2 gap-4">
          <a
            href="/"
            className="text-center px-6 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors"
          >
            ← Back to Home
          </a>
          <a
            href="https://supabase.com/dashboard/project/feskndfxadrkdlipvfkn"
            target="_blank"
            rel="noopener noreferrer"
            className="text-center px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            Open Supabase Dashboard →
          </a>
        </div>
      </div>
    </div>
  )
}

