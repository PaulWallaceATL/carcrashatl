# Supabase Integration Setup Guide

## 🎉 What's Been Built

Your Next.js app now has a complete case management system with Supabase! Here's what's included:

### ✅ Completed Features

1. **Database Schema** - Comprehensive case management tables
2. **Admin Portal** - Secure login and dashboard for case management
3. **Case Tracking** - Public page for clients to check case status
4. **AI Case Builder Integration** - Saves cases directly to database
5. **Authentication** - Supabase Auth for admin access
6. **Row Level Security** - Proper data protection policies

---

## 🚀 Setup Instructions

### Step 1: Create Your Admin Account

Go to Supabase Auth Users page:
**https://supabase.com/dashboard/project/feskndfxadrkdlipvfkn/auth/users**

1. Click **"Add User"**
2. Choose **"Create new user"**
3. Enter your email and password
4. Click **"Create User"**

**Important:** Save your admin credentials securely!

---

## 📱 Using Your New System

### Admin Portal

**Login:** `https://your-domain.vercel.app/admin/login`

After logging in, you'll see:
- **Dashboard** - All submitted cases with stats
- **Case Management** - View details, update status, search/filter
- **Real-time Updates** - Status changes tracked automatically

**Admin Features:**
- View all cases
- Update case status (new → reviewing → contacted → in_progress → settled/closed)
- Search by name, email, or case number
- Filter by status
- View case timeline and activities

---

### Case Tracking (Public)

**URL:** `https://your-domain.vercel.app/track-case`

Users can check their case status by entering:
- Case Number (CASE-XXXXXX)
- Email Address

They'll see:
- Current case status with helpful messages
- Case details and timeline
- Contact information

---

### AI Case Builder (Now Saves to Database!)

**URL:** `https://your-domain.vercel.app/ai-case-builder`

**Updated Flow:**
1. User uploads evidence and fills out form with:
   - Name, email, phone
   - Accident details
   - Description, injuries
2. AI analyzes the case
3. User reviews analysis
4. **NEW:** Case is automatically saved to Supabase
5. User receives a unique case number (CASE-XXXXXX)
6. JSON report downloads as backup

---

## 🗄️ Database Schema

### Tables Created

1. **`cases`** - Main case submissions
   - Auto-generated case numbers
   - Contact info, case details
   - Status tracking, priority system
   - AI case data (JSON)

2. **`case_notes`** - Admin notes on cases
   - Internal or client-visible notes
   - Tracks who created each note

3. **`case_activities`** - Activity log/timeline
   - Auto-logs status changes
   - Tracks all case activities

### Case Status Flow

```
new → reviewing → contacted → in_progress → settled/closed
```

---

## 🔐 Security Features

✅ **Row Level Security (RLS)** enabled on all tables
✅ **Public can:** Submit cases, view their own case (with case# + email)
✅ **Admins can:** View/edit all cases, add notes, update status
✅ **Protected Routes:** Admin portal requires authentication
✅ **Middleware:** Auto-redirects unauthenticated users

---

## 📊 API Endpoints

### POST `/api/cases/submit`
Submit a new case

**Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "555-123-4567",
  "case_type": "car_accident",
  "incident_date": "2025-01-15",
  "incident_location": "Main St & 5th Ave",
  "description": "Description of accident",
  "injuries": "Minor injuries",
  "police_report_filed": true,
  "ai_case_data": {}
}
```

**Response:**
```json
{
  "success": true,
  "case_number": "CASE-123456",
  "case_id": "uuid",
  "message": "Case submitted successfully"
}
```

### GET `/api/test-supabase`
Test Supabase connection (already working!)

---

## 🧪 Testing Everything

### 1. Test Database Connection
Visit: `https://your-domain.vercel.app/test-supabase`
**Expected:** ✅ Green success message

### 2. Test Admin Login
1. Visit: `https://your-domain.vercel.app/admin/login`
2. Enter your admin credentials
3. **Expected:** Redirect to dashboard

### 3. Test Case Submission
1. Visit: `https://your-domain.vercel.app/ai-case-builder`
2. Fill out the form completely
3. Upload some test files
4. Submit the case
5. **Expected:** Case number displayed (CASE-XXXXXX)

### 4. Test Case Tracking
1. Visit: `https://your-domain.vercel.app/track-case`
2. Enter the case number and email from step 3
3. **Expected:** Case details and status shown

### 5. Test Admin Dashboard
1. Login to admin portal
2. **Expected:** See the case from step 3 in the dashboard
3. Try changing the status
4. **Expected:** Status updates immediately

---

## 🎨 Key Pages

| Page | URL | Purpose | Access |
|------|-----|---------|--------|
| Admin Login | `/admin/login` | Admin authentication | Public |
| Admin Dashboard | `/admin/dashboard` | Case management | Admin only |
| Track Case | `/track-case` | Case status lookup | Public |
| AI Case Builder | `/ai-case-builder` | Submit new cases | Public |
| Test Supabase | `/test-supabase` | Connection test | Public |

---

## 🔧 Environment Variables (Already Set in Vercel)

```bash
NEXT_PUBLIC_SUPABASE_URL=https://feskndfxadrkdlipvfkn.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
```

---

## 📝 Next Steps (Optional Enhancements)

1. **Email Notifications**
   - Send confirmation emails when cases are submitted
   - Notify admin of new cases
   - Send status updates to clients

2. **Case Notes Feature**
   - Add admin notes to cases
   - Internal vs client-visible notes

3. **File Upload to Supabase Storage**
   - Store evidence photos in Supabase Storage
   - Link files to cases

4. **Advanced Analytics**
   - Case closure rates
   - Average response time
   - Case type distribution

5. **Export Features**
   - Export cases to CSV
   - Generate PDF reports

---

## 🐛 Troubleshooting

### "Authentication required" error
- Make sure you created an admin user in Supabase Auth
- Check that you're using the correct email/password

### Cases not showing in dashboard
- Verify the database schema was run successfully
- Check the Supabase logs for errors
- Ensure RLS policies are enabled

### Can't track case
- Case number and email must match exactly
- Email is case-insensitive
- Case number format: CASE-XXXXXX

---

## 📞 Support

If you need help:
1. Check Supabase logs: https://supabase.com/dashboard/project/feskndfxadrkdlipvfkn/logs/explorer
2. Check Vercel deployment logs
3. Test the connection at `/test-supabase`

---

## 🎉 You're All Set!

Your case management system is now live and ready to use!

**Quick Links:**
- Admin Portal: `/admin/login`
- Track Cases: `/track-case`
- Submit Cases: `/ai-case-builder`
- Supabase Dashboard: https://supabase.com/dashboard/project/feskndfxadrkdlipvfkn

