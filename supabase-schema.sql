-- ============================================
-- CARESTIA LAW - SUPABASE SCHEMA
-- ============================================
-- This schema supports:
-- 1. Public case submissions (no login required)
-- 2. Case lookup via unique case ID + email
-- 3. Admin-only portal for case management
-- 4. Case notes and status tracking
-- ============================================

-- ============================================
-- ENUMS
-- ============================================

-- Case status enum
CREATE TYPE case_status AS ENUM (
  'new',              -- Just submitted
  'reviewing',        -- Admin is reviewing
  'contacted',        -- Admin has contacted client
  'in_progress',      -- Case is active
  'settled',          -- Case settled
  'closed',           -- Case closed
  'rejected'          -- Case not taken
);

-- Case type enum
CREATE TYPE case_type AS ENUM (
  'car_accident',
  'truck_accident',
  'motorcycle_accident',
  'pedestrian_accident',
  'wrongful_death',
  'personal_injury',
  'other'
);

-- ============================================
-- TABLES
-- ============================================

-- Cases table (main case submissions)
CREATE TABLE cases (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  
  -- Case identification
  case_number TEXT UNIQUE NOT NULL DEFAULT 'CASE-' || LPAD(FLOOR(RANDOM() * 999999)::TEXT, 6, '0'),
  
  -- Contact information
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  
  -- Case details
  case_type case_type NOT NULL DEFAULT 'car_accident',
  incident_date DATE,
  incident_location TEXT,
  description TEXT NOT NULL,
  injuries TEXT,
  police_report_filed BOOLEAN DEFAULT false,
  
  -- AI Case Builder data (JSON)
  ai_case_data JSONB,
  
  -- Case management
  status case_status NOT NULL DEFAULT 'new',
  priority INTEGER DEFAULT 0, -- Higher number = higher priority
  
  -- Metadata
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  last_viewed_at TIMESTAMP WITH TIME ZONE,
  
  -- Admin assignment
  assigned_to UUID REFERENCES auth.users(id),
  
  -- Indexes for performance
  CONSTRAINT email_format CHECK (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$')
);

-- Case notes table (admin notes on cases)
CREATE TABLE case_notes (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  case_id UUID NOT NULL REFERENCES cases(id) ON DELETE CASCADE,
  
  -- Note content
  note TEXT NOT NULL,
  is_internal BOOLEAN DEFAULT true, -- If false, visible to client
  
  -- Admin who created the note
  created_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  -- Metadata
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Case timeline/activity log
CREATE TABLE case_activities (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  case_id UUID NOT NULL REFERENCES cases(id) ON DELETE CASCADE,
  
  -- Activity details
  activity_type TEXT NOT NULL, -- e.g., 'status_change', 'note_added', 'email_sent'
  description TEXT NOT NULL,
  metadata JSONB, -- Additional data about the activity
  
  -- Who performed the activity
  performed_by UUID REFERENCES auth.users(id),
  performed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- INDEXES
-- ============================================

CREATE INDEX idx_cases_status ON cases(status);
CREATE INDEX idx_cases_created_at ON cases(created_at DESC);
CREATE INDEX idx_cases_email ON cases(email);
CREATE INDEX idx_cases_case_number ON cases(case_number);
CREATE INDEX idx_case_notes_case_id ON case_notes(case_id);
CREATE INDEX idx_case_activities_case_id ON case_activities(case_id);

-- ============================================
-- ROW LEVEL SECURITY (RLS)
-- ============================================

-- Enable RLS on all tables
ALTER TABLE cases ENABLE ROW LEVEL SECURITY;
ALTER TABLE case_notes ENABLE ROW LEVEL SECURITY;
ALTER TABLE case_activities ENABLE ROW LEVEL SECURITY;

-- ============================================
-- RLS POLICIES - CASES
-- ============================================

-- Allow anyone to INSERT a new case (public form submission)
CREATE POLICY "Anyone can submit a case"
  ON cases
  FOR INSERT
  TO public
  WITH CHECK (true);

-- Allow anyone to SELECT their own case (by case_number + email)
CREATE POLICY "Users can view their own cases"
  ON cases
  FOR SELECT
  TO public
  USING (true); -- We'll filter in the application layer by case_number + email

-- Allow authenticated users (admins) to SELECT all cases
CREATE POLICY "Admins can view all cases"
  ON cases
  FOR SELECT
  TO authenticated
  USING (true);

-- Allow authenticated users (admins) to UPDATE cases
CREATE POLICY "Admins can update cases"
  ON cases
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Allow authenticated users (admins) to DELETE cases
CREATE POLICY "Admins can delete cases"
  ON cases
  FOR DELETE
  TO authenticated
  USING (true);

-- ============================================
-- RLS POLICIES - CASE NOTES
-- ============================================

-- Only admins can view notes
CREATE POLICY "Admins can view all notes"
  ON case_notes
  FOR SELECT
  TO authenticated
  USING (true);

-- Only admins can create notes
CREATE POLICY "Admins can create notes"
  ON case_notes
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Only admins can update notes
CREATE POLICY "Admins can update notes"
  ON case_notes
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Only admins can delete notes
CREATE POLICY "Admins can delete notes"
  ON case_notes
  FOR DELETE
  TO authenticated
  USING (true);

-- ============================================
-- RLS POLICIES - CASE ACTIVITIES
-- ============================================

-- Only admins can view activities
CREATE POLICY "Admins can view all activities"
  ON case_activities
  FOR SELECT
  TO authenticated
  USING (true);

-- Only admins can create activities
CREATE POLICY "Admins can create activities"
  ON case_activities
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- ============================================
-- FUNCTIONS
-- ============================================

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to auto-update updated_at on cases
CREATE TRIGGER update_cases_updated_at
  BEFORE UPDATE ON cases
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Trigger to auto-update updated_at on case_notes
CREATE TRIGGER update_case_notes_updated_at
  BEFORE UPDATE ON case_notes
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Function to log case status changes
CREATE OR REPLACE FUNCTION log_case_status_change()
RETURNS TRIGGER AS $$
BEGIN
  IF OLD.status IS DISTINCT FROM NEW.status THEN
    INSERT INTO case_activities (case_id, activity_type, description, metadata, performed_by)
    VALUES (
      NEW.id,
      'status_change',
      'Status changed from ' || OLD.status || ' to ' || NEW.status,
      jsonb_build_object('old_status', OLD.status, 'new_status', NEW.status),
      auth.uid()
    );
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to auto-log status changes
CREATE TRIGGER log_case_status_change_trigger
  AFTER UPDATE ON cases
  FOR EACH ROW
  EXECUTE FUNCTION log_case_status_change();

-- ============================================
-- INITIAL DATA / VIEWS
-- ============================================

-- View for case summary (useful for admin dashboard)
CREATE VIEW case_summary AS
SELECT 
  c.id,
  c.case_number,
  c.name,
  c.email,
  c.phone,
  c.case_type,
  c.status,
  c.priority,
  c.created_at,
  c.updated_at,
  COUNT(DISTINCT cn.id) as note_count,
  COUNT(DISTINCT ca.id) as activity_count
FROM cases c
LEFT JOIN case_notes cn ON c.id = cn.case_id
LEFT JOIN case_activities ca ON c.id = ca.case_id
GROUP BY c.id;

-- ============================================
-- NOTES FOR SETUP
-- ============================================

-- After running this schema, you need to:
-- 1. Create an admin user in Supabase Auth (Dashboard > Authentication > Users)
--    - Go to: https://supabase.com/dashboard/project/feskndfxadrkdlipvfkn/auth/users
--    - Click "Add User" and create your admin account
--    - Save the email/password securely
--
-- 2. Optional: Create a admin_users table if you want role management
-- 3. Optional: Set up email templates for case confirmations
-- 4. Optional: Create database backups

-- ============================================
-- HELPER QUERIES (for testing)
-- ============================================

-- Get all new cases
-- SELECT * FROM cases WHERE status = 'new' ORDER BY created_at DESC;

-- Get case by case_number and email (for public lookup)
-- SELECT * FROM cases WHERE case_number = 'CASE-123456' AND email = 'user@example.com';

-- Get all cases with notes count
-- SELECT * FROM case_summary ORDER BY created_at DESC;

-- Get case timeline
-- SELECT * FROM case_activities WHERE case_id = 'some-uuid' ORDER BY performed_at DESC;

