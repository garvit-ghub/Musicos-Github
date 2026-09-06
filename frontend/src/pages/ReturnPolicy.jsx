
const textualStyle = {
  maxWidth: '900px',
  margin: '0 auto',
  padding: '40px',
  background: '#18181b',
  borderRadius: '16px',
  border: '1px solid rgba(255, 255, 255, 0.05)',
  lineHeight: '1.8',
  color: '#a1a1aa'
};

const ReturnPolicy = () => {
  return (
    <div style={textualStyle}>
      <h2 style={{ color: '#fff', marginBottom: '20px', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '15px' }}>
        Return & Refund Policy
      </h2>

      <p style={{ marginBottom: '20px' }}>
        At Musicos, we want you to be completely satisfied with your purchase. Since our courses are digital products, our refund policy differs from traditional physical goods. Please read the following terms carefully before making a purchase.
      </p>

      <h4 style={{ color: '#10b981', marginTop: '25px', marginBottom: '10px' }}>1. Refund Eligibility</h4>
      <p style={{ marginBottom: '15px' }}>
        Due to the digital nature of our courses, refunds are considered only under specific circumstances. You may request a refund within 7 days of purchase if you have not accessed more than 20% of the course content. Once a significant portion of the course has been consumed, refunds will not be granted.
      </p>

      <h4 style={{ color: '#10b981', marginTop: '25px', marginBottom: '10px' }}>2. How to Request a Refund</h4>
      <p style={{ marginBottom: '15px' }}>
        To initiate a refund, contact our support team at <span style={{ color: '#10b981' }}>support@musicos.com</span> with your order ID and reason for the refund request. Our team will review your request and respond within 3-5 business days.
      </p>

      <h4 style={{ color: '#10b981', marginTop: '25px', marginBottom: '10px' }}>3. Valid Grounds for Refund</h4>
      <p style={{ marginBottom: '15px' }}>
        Refunds may be approved in the following cases:
      </p>
      <ul style={{ marginBottom: '15px', paddingLeft: '20px', listStyleType: 'disc' }}>
        <li style={{ marginBottom: '8px' }}>The course content does not match the description provided at the time of purchase.</li>
        <li style={{ marginBottom: '8px' }}>Technical issues prevent you from accessing the course and our support team is unable to resolve them within a reasonable timeframe.</li>
        <li style={{ marginBottom: '8px' }}>Duplicate payment or accidental purchase of the same course.</li>
        <li style={{ marginBottom: '8px' }}>The course was cancelled or removed by Musicos before you could access it.</li>
      </ul>

      <h4 style={{ color: '#10b981', marginTop: '25px', marginBottom: '10px' }}>4. Non-Refundable Situations</h4>
      <p style={{ marginBottom: '15px' }}>
        Refunds will not be provided in the following cases:
      </p>
      <ul style={{ marginBottom: '15px', paddingLeft: '20px', listStyleType: 'disc' }}>
        <li style={{ marginBottom: '8px' }}>You have changed your mind after purchasing the course.</li>
        <li style={{ marginBottom: '8px' }}>You have accessed more than 20% of the course content.</li>
        <li style={{ marginBottom: '8px' }}>The course was purchased during a promotional offer or discount sale.</li>
        <li style={{ marginBottom: '8px' }}>A refund request is made after the 7-day refund window has expired.</li>
        <li style={{ marginBottom: '8px' }}>You found another course that you prefer over the purchased one.</li>
      </ul>

      <h4 style={{ color: '#10b981', marginTop: '25px', marginBottom: '10px' }}>5. Refund Processing</h4>
      <p style={{ marginBottom: '15px' }}>
        Once your refund is approved, the amount will be credited back to your original payment method within 7-10 business days. You will receive an email confirmation once the refund has been processed. Please note that your bank or payment provider may take additional time to reflect the credit in your account.
      </p>

      <h4 style={{ color: '#10b981', marginTop: '25px', marginBottom: '10px' }}>6. Course Access After Refund</h4>
      <p style={{ marginBottom: '15px' }}>
        Upon approval of your refund, your access to the course will be revoked immediately. You must delete any downloaded course materials, notes, or resources obtained from the course. Retaining or sharing such materials after a refund is a violation of our terms.
      </p>

      <h4 style={{ color: '#10b981', marginTop: '25px', marginBottom: '10px' }}>7. Changes to This Policy</h4>
      <p style={{ marginBottom: '15px' }}>
        Musicos reserves the right to update or modify this refund policy at any time. Any changes will be reflected on this page with an updated effective date. We encourage you to review this policy periodically.
      </p>

      <h4 style={{ color: '#10b981', marginTop: '25px', marginBottom: '10px' }}>8. Contact Us</h4>
      <p style={{ marginBottom: '15px' }}>
        If you have any questions or concerns about our refund policy, please don't hesitate to reach out to us at <span style={{ color: '#10b981' }}>support@musicos.com</span>. We're here to help.
      </p>

      <p style={{ marginTop: '30px', fontStyle: 'italic', fontSize: '0.9rem' }}>
        Last updated: September 2026
      </p>
    </div>
  );
};

export default ReturnPolicy;
