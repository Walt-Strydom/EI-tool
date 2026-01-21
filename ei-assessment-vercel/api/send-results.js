const nodemailer = require('nodemailer');

module.exports = async (req, res) => {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

  // Handle OPTIONS request
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, error: 'Method not allowed' });
  }

  try {
    const { name, date, sectionScores, total, answers } = req.body;

    // Validate required fields
    if (!name || !date || !sectionScores || !total) {
      return res.status(400).json({ success: false, error: 'Missing required fields' });
    }

    // Create transporter using SMTP2GO credentials from environment variables
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'mail.smtp2go.com',
      port: parseInt(process.env.SMTP_PORT || '2525'),
      secure: false, // Use TLS
      auth: {
        user: process.env.SMTP_USERNAME,
        pass: process.env.SMTP_PASSWORD
      }
    });

    // Build email subject
    const subject = `EI Assessment for ${name} - ${date}`;

    // Build plain text body
    let textBody = 'Emotional Intelligence Assessment Results\n';
    textBody += '='.repeat(50) + '\n\n';
    textBody += `Participant: ${name}\n`;
    textBody += `Date: ${date}\n\n`;
    textBody += 'Section Scores:\n';
    textBody += '-'.repeat(50) + '\n';
    
    for (const [section, score] of Object.entries(sectionScores)) {
      textBody += `${section}: ${score}/100\n`;
    }
    
    textBody += '\n' + '='.repeat(50) + '\n';
    textBody += `Total EI Score: ${total}/500\n`;
    textBody += '='.repeat(50) + '\n\n';
    textBody += 'Detailed Answers:\n';
    textBody += '-'.repeat(50) + '\n\n';
    
    if (answers && answers.length > 0) {
      answers.forEach(a => {
        textBody += `[${a.section}]\n`;
        textBody += `Q: ${a.question}\n`;
        textBody += `A: ${a.answer}\n\n`;
      });
    }

    // Build HTML body
    let htmlBody = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; }
    .container { max-width: 800px; margin: 0 auto; }
    .header { background: #3b82f6; color: white; padding: 30px 20px; text-align: center; }
    .header h1 { margin: 0; font-size: 24px; }
    .content { padding: 30px 20px; background: #ffffff; }
    .info-box { background: #f9fafb; padding: 15px; border-radius: 8px; margin: 20px 0; }
    .info-row { display: flex; padding: 8px 0; }
    .info-label { font-weight: 600; width: 120px; color: #4b5563; }
    .info-value { color: #111827; }
    .scores-table { width: 100%; border-collapse: collapse; margin: 20px 0; background: white; box-shadow: 0 1px 3px rgba(0,0,0,0.1); border-radius: 8px; overflow: hidden; }
    .scores-table thead { background: #f3f4f6; }
    .scores-table th { padding: 12px; text-align: left; font-weight: 600; color: #374151; border-bottom: 2px solid #e5e7eb; }
    .scores-table td { padding: 12px; border-bottom: 1px solid #f3f4f6; }
    .scores-table tr:last-child td { border-bottom: none; }
    .total-score { background: #dbeafe; padding: 20px; border-radius: 8px; margin: 20px 0; text-align: center; }
    .total-score .number { font-size: 36px; font-weight: bold; color: #1e40af; margin: 10px 0; }
    .total-score .label { color: #1e3a8a; font-size: 14px; text-transform: uppercase; letter-spacing: 1px; }
    .answers-section { margin-top: 30px; }
    .answer-item { background: #ffffff; border-left: 4px solid #3b82f6; padding: 15px; margin: 10px 0; border-radius: 4px; box-shadow: 0 1px 2px rgba(0,0,0,0.05); }
    .answer-section-name { color: #3b82f6; font-weight: 600; font-size: 12px; text-transform: uppercase; margin-bottom: 8px; }
    .answer-question { font-weight: 500; color: #111827; margin-bottom: 5px; }
    .answer-response { color: #059669; font-weight: 600; }
    .footer { background: #f9fafb; padding: 20px; text-align: center; color: #6b7280; font-size: 14px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>🧠 Emotional Intelligence Assessment Results</h1>
    </div>
    
    <div class="content">
      <div class="info-box">
        <div class="info-row">
          <div class="info-label">Participant:</div>
          <div class="info-value">${escapeHtml(name)}</div>
        </div>
        <div class="info-row">
          <div class="info-label">Date:</div>
          <div class="info-value">${escapeHtml(date)}</div>
        </div>
      </div>

      <h2 style="color: #111827; margin-top: 30px;">Section Scores</h2>
      <table class="scores-table">
        <thead>
          <tr>
            <th>Section</th>
            <th style="text-align: right;">Score</th>
            <th style="text-align: right;">Percentage</th>
          </tr>
        </thead>
        <tbody>`;

    for (const [section, score] of Object.entries(sectionScores)) {
      const percentage = score;
      htmlBody += `
          <tr>
            <td>${escapeHtml(section)}</td>
            <td style="text-align: right;"><strong>${score}/100</strong></td>
            <td style="text-align: right;">${percentage}%</td>
          </tr>`;
    }

    htmlBody += `
        </tbody>
      </table>

      <div class="total-score">
        <div class="label">Total EI Score</div>
        <div class="number">${total}/500</div>
        <div class="label">${Math.round((total/500)*100)}% Overall</div>
      </div>`;

    if (answers && answers.length > 0) {
      htmlBody += `
      <div class="answers-section">
        <h2 style="color: #111827;">Detailed Answers</h2>`;
      
      answers.forEach(a => {
        htmlBody += `
        <div class="answer-item">
          <div class="answer-section-name">${escapeHtml(a.section)}</div>
          <div class="answer-question">Q: ${escapeHtml(a.question)}</div>
          <div class="answer-response">A: ${escapeHtml(a.answer)}</div>
        </div>`;
      });
      
      htmlBody += `
      </div>`;
    }

    htmlBody += `
    </div>
    
    <div class="footer">
      <p>This assessment was completed on ${escapeHtml(date)}</p>
      <p>Emotional Intelligence Self-Assessment Tool</p>
    </div>
  </div>
</body>
</html>`;

    // Send email
    const info = await transporter.sendMail({
      from: `"EI Assessment" <${process.env.EMAIL_FROM || process.env.SMTP_USERNAME}>`,
      to: process.env.ADMIN_EMAIL,
      subject: subject,
      text: textBody,
      html: htmlBody
    });

    console.log('Email sent successfully:', info.messageId);

    return res.status(200).json({ 
      success: true, 
      message: 'Email sent successfully',
      messageId: info.messageId 
    });

  } catch (error) {
    console.error('Error sending email:', error);
    return res.status(500).json({ 
      success: false, 
      error: error.message || 'Failed to send email' 
    });
  }
};

function escapeHtml(text) {
  const map = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;'
  };
  return String(text).replace(/[&<>"']/g, m => map[m]);
}
