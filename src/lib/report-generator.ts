/**
 * Generate a user-friendly HTML report for case submissions
 */

interface CaseAnalysis {
  strengthScore: number;
  estimatedValue: {
    min: number;
    max: number;
  };
  keyFactors: string[];
  nextSteps: string[];
  urgentActions: string[];
}

interface CaseDetails {
  name: string;
  email: string;
  phone: string;
  accidentDate: string;
  location: string;
  description: string;
  injuries: string;
  policeReportFiled: boolean;
}

interface UploadedFile {
  name: string;
  type: string;
  category: string;
}

export function generateCaseReport(
  caseNumber: string,
  caseDetails: CaseDetails,
  caseAnalysis: CaseAnalysis,
  uploadedFiles: UploadedFile[]
): string {
  const currentDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  const strengthRating = 
    caseAnalysis.strengthScore >= 80 ? 'Excellent' :
    caseAnalysis.strengthScore >= 60 ? 'Good' :
    caseAnalysis.strengthScore >= 40 ? 'Fair' : 'Needs Improvement';

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Case Report - ${caseNumber}</title>
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
      line-height: 1.6;
      color: #333;
      max-width: 900px;
      margin: 0 auto;
      padding: 40px 20px;
      background: #f9fafb;
    }
    .header {
      text-align: center;
      margin-bottom: 40px;
      padding: 30px;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      border-radius: 12px;
    }
    .header h1 {
      margin: 0 0 10px 0;
      font-size: 32px;
    }
    .case-number {
      font-size: 24px;
      font-weight: bold;
      font-family: 'Courier New', monospace;
      background: rgba(255,255,255,0.2);
      padding: 10px 20px;
      border-radius: 8px;
      display: inline-block;
      margin-top: 10px;
    }
    .section {
      background: white;
      padding: 30px;
      margin-bottom: 20px;
      border-radius: 12px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    }
    .section h2 {
      color: #667eea;
      margin-top: 0;
      margin-bottom: 20px;
      padding-bottom: 10px;
      border-bottom: 2px solid #667eea;
      font-size: 24px;
    }
    .strength-meter {
      background: #e5e7eb;
      height: 30px;
      border-radius: 15px;
      overflow: hidden;
      margin: 20px 0;
      position: relative;
    }
    .strength-fill {
      height: 100%;
      background: linear-gradient(90deg, #f59e0b, #10b981);
      display: flex;
      align-items: center;
      justify-content: flex-end;
      padding-right: 15px;
      color: white;
      font-weight: bold;
      transition: width 1s ease;
    }
    .value-range {
      background: linear-gradient(135deg, #10b981 0%, #059669 100%);
      color: white;
      padding: 20px;
      border-radius: 8px;
      text-align: center;
      margin: 20px 0;
    }
    .value-range .amount {
      font-size: 32px;
      font-weight: bold;
      margin: 10px 0;
    }
    .info-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 20px;
      margin: 20px 0;
    }
    .info-item {
      padding: 15px;
      background: #f9fafb;
      border-radius: 8px;
      border-left: 4px solid #667eea;
    }
    .info-label {
      font-weight: bold;
      color: #6b7280;
      font-size: 12px;
      text-transform: uppercase;
      margin-bottom: 5px;
    }
    .info-value {
      color: #111827;
      font-size: 16px;
    }
    .list-section {
      margin: 20px 0;
    }
    .list-section h3 {
      color: #374151;
      font-size: 18px;
      margin-bottom: 15px;
    }
    .list-item {
      padding: 12px;
      margin-bottom: 10px;
      background: #f9fafb;
      border-radius: 8px;
      display: flex;
      align-items: start;
    }
    .list-item.success {
      border-left: 4px solid #10b981;
    }
    .list-item.warning {
      border-left: 4px solid #f59e0b;
    }
    .list-item.info {
      border-left: 4px solid #3b82f6;
    }
    .icon {
      margin-right: 10px;
      font-size: 18px;
    }
    .evidence-list {
      list-style: none;
      padding: 0;
    }
    .evidence-item {
      padding: 10px;
      margin-bottom: 8px;
      background: #f9fafb;
      border-radius: 6px;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .badge {
      display: inline-block;
      padding: 4px 12px;
      border-radius: 12px;
      font-size: 12px;
      font-weight: 600;
      text-transform: capitalize;
    }
    .badge.image { background: #dbeafe; color: #1e40af; }
    .badge.document { background: #fef3c7; color: #92400e; }
    .footer {
      text-align: center;
      padding: 30px;
      color: #6b7280;
      margin-top: 40px;
      border-top: 2px solid #e5e7eb;
    }
    .important-note {
      background: #fef3c7;
      border: 2px solid #f59e0b;
      padding: 20px;
      border-radius: 8px;
      margin: 20px 0;
    }
    .important-note h3 {
      color: #92400e;
      margin-top: 0;
    }
    @media print {
      body { background: white; }
      .section { box-shadow: none; border: 1px solid #e5e7eb; }
    }
    @media (max-width: 768px) {
      .info-grid { grid-template-columns: 1fr; }
      body { padding: 20px 10px; }
    }
  </style>
</head>
<body>
  <div class="header">
    <h1>🚗 Car Accident Case Report</h1>
    <p>AI-Powered Case Analysis & Evaluation</p>
    <div class="case-number">${caseNumber}</div>
    <p style="margin-top: 15px; font-size: 14px; opacity: 0.9;">Generated on ${currentDate}</p>
  </div>

  <!-- Case Strength Analysis -->
  <div class="section">
    <h2>📊 Case Strength Analysis</h2>
    <div style="text-align: center; margin: 30px 0;">
      <div style="font-size: 64px; font-weight: bold; color: #667eea;">${caseAnalysis.strengthScore}</div>
      <div style="font-size: 24px; color: #6b7280; margin-top: 10px;">${strengthRating}</div>
    </div>
    <div class="strength-meter">
      <div class="strength-fill" style="width: ${caseAnalysis.strengthScore}%;">
        ${caseAnalysis.strengthScore}%
      </div>
    </div>
    <p style="color: #6b7280; text-align: center; margin-top: 20px;">
      Based on the evidence provided and case details, your case has a <strong>${strengthRating.toLowerCase()}</strong> strength rating.
    </p>
  </div>

  <!-- Estimated Value -->
  <div class="section">
    <h2>💰 Estimated Case Value</h2>
    <div class="value-range">
      <div style="font-size: 14px; opacity: 0.9;">Estimated Settlement Range</div>
      <div class="amount">
        $${caseAnalysis.estimatedValue.min.toLocaleString()} - $${caseAnalysis.estimatedValue.max.toLocaleString()}
      </div>
      <div style="font-size: 14px; margin-top: 10px; opacity: 0.9;">
        Based on similar cases and your evidence quality
      </div>
    </div>
    <p style="color: #6b7280; font-size: 14px;">
      <strong>Note:</strong> This is an AI-generated estimate based on similar cases. Actual settlement values may vary based on specific circumstances, negotiations, and legal proceedings.
    </p>
  </div>

  <!-- Client Information -->
  <div class="section">
    <h2>👤 Client Information</h2>
    <div class="info-grid">
      <div class="info-item">
        <div class="info-label">Full Name</div>
        <div class="info-value">${caseDetails.name}</div>
      </div>
      <div class="info-item">
        <div class="info-label">Email</div>
        <div class="info-value">${caseDetails.email}</div>
      </div>
      <div class="info-item">
        <div class="info-label">Phone</div>
        <div class="info-value">${caseDetails.phone || 'Not provided'}</div>
      </div>
      <div class="info-item">
        <div class="info-label">Accident Date</div>
        <div class="info-value">${new Date(caseDetails.accidentDate).toLocaleDateString()}</div>
      </div>
      <div class="info-item">
        <div class="info-label">Location</div>
        <div class="info-value">${caseDetails.location}</div>
      </div>
      <div class="info-item">
        <div class="info-label">Police Report</div>
        <div class="info-value">${caseDetails.policeReportFiled ? '✅ Filed' : '❌ Not Filed'}</div>
      </div>
    </div>
  </div>

  <!-- Accident Description -->
  <div class="section">
    <h2>📝 Accident Description</h2>
    <p style="background: #f9fafb; padding: 20px; border-radius: 8px; white-space: pre-wrap; line-height: 1.8;">${caseDetails.description}</p>
    ${caseDetails.injuries ? `
      <h3 style="margin-top: 30px; color: #374151;">Reported Injuries</h3>
      <p style="background: #fef3c7; padding: 20px; border-radius: 8px; border-left: 4px solid #f59e0b; white-space: pre-wrap;">${caseDetails.injuries}</p>
    ` : ''}
  </div>

  <!-- Key Strengths -->
  <div class="section">
    <h2>✅ Key Strengths in Your Case</h2>
    <div class="list-section">
      ${caseAnalysis.keyFactors.map(factor => `
        <div class="list-item success">
          <span class="icon">✓</span>
          <span>${factor}</span>
        </div>
      `).join('')}
    </div>
  </div>

  <!-- Urgent Actions -->
  <div class="section">
    <h2>⚠️ Urgent Actions Required</h2>
    <div class="important-note">
      <h3>⏰ Time-Sensitive Actions</h3>
      <p>The following actions should be completed as soon as possible to strengthen your case and protect your rights:</p>
    </div>
    <div class="list-section">
      ${caseAnalysis.urgentActions.map(action => `
        <div class="list-item warning">
          <span class="icon">⚡</span>
          <span>${action}</span>
        </div>
      `).join('')}
    </div>
  </div>

  <!-- Next Steps -->
  <div class="section">
    <h2>📋 Recommended Next Steps</h2>
    <div class="list-section">
      ${caseAnalysis.nextSteps.map((step, index) => `
        <div class="list-item info">
          <span class="icon">${index + 1}.</span>
          <span>${step}</span>
        </div>
      `).join('')}
    </div>
  </div>

  <!-- Evidence Submitted -->
  <div class="section">
    <h2>📎 Evidence Submitted</h2>
    <p style="color: #6b7280; margin-bottom: 20px;">Total files uploaded: <strong>${uploadedFiles.length}</strong></p>
    <ul class="evidence-list">
      ${uploadedFiles.map(file => `
        <li class="evidence-item">
          <span>${file.name}</span>
          <span class="badge ${file.type}">${file.type}</span>
        </li>
      `).join('')}
    </ul>
  </div>

  <!-- Important Information -->
  <div class="section">
    <h2>ℹ️ Important Information</h2>
    <div class="important-note">
      <h3>🔐 Your Case Number</h3>
      <p>Your unique case number is: <strong style="font-family: monospace; font-size: 18px;">${caseNumber}</strong></p>
      <p>Save this number! You can use it along with your email address to track your case status at any time.</p>
    </div>
    
    <h3 style="margin-top: 30px; color: #374151;">What Happens Next?</h3>
    <ol style="line-height: 2;">
      <li><strong>Review:</strong> Our team will review your case details within 24-48 hours</li>
      <li><strong>Contact:</strong> We'll reach out to you via email or phone to discuss next steps</li>
      <li><strong>Consultation:</strong> Schedule a free consultation to discuss your case in detail</li>
      <li><strong>Action:</strong> If we take your case, we'll begin working immediately to protect your rights</li>
    </ol>

    <h3 style="margin-top: 30px; color: #374151;">Track Your Case</h3>
    <p>You can check your case status anytime by visiting our case tracking page with your case number and email address.</p>
  </div>

  <!-- Footer -->
  <div class="footer">
    <p><strong>Disclaimer:</strong> This AI-generated report provides preliminary analysis based on the information provided. It does not constitute legal advice. Actual case outcomes may vary. Consult with a qualified attorney for specific legal guidance.</p>
    <p style="margin-top: 20px;">© ${new Date().getFullYear()} Car Crashes in Atlanta. All rights reserved.</p>
    <p style="margin-top: 10px; font-size: 12px;">Generated by AI Case Builder | ${caseNumber}</p>
  </div>
</body>
</html>`;
}

/**
 * Trigger download of HTML report
 */
export function downloadReport(html: string, caseNumber: string) {
  const blob = new Blob([html], { type: 'text/html' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `${caseNumber}-Case-Report.html`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

