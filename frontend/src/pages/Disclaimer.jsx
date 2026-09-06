

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

const Disclaimer = () => {
  return (
    <div style={textualStyle}>
      <h2 style={{ color: '#fff', marginBottom: '20px', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '15px' }}>
        Disclaimer
      </h2>

      <p style={{ marginBottom: '20px' }}>
        Welcome to Musicos. By accessing or using our website and purchasing any of our music courses, you acknowledge and agree to the terms outlined in this disclaimer. Please read this page carefully before making a purchase.
      </p>

      <h4 style={{ color: '#10b981', marginTop: '25px', marginBottom: '10px' }}>1. Educational Purpose</h4>
      <p style={{ marginBottom: '15px' }}>
        All courses offered on Musicos are intended for educational purposes only. While our courses are designed by experienced musicians and instructors, individual results may vary depending on the learner's dedication, practice routine, and prior experience. We do not guarantee specific outcomes or proficiency levels upon completion of any course.
      </p>

      <h4 style={{ color: '#10b981', marginTop: '25px', marginBottom: '10px' }}>2. Course Content</h4>
      <p style={{ marginBottom: '15px' }}>
        Course content, including videos, materials, and resources, is the intellectual property of Musicos and its instructors. Unauthorized reproduction, redistribution, or sharing of purchased course content is strictly prohibited. We reserve the right to update or modify course content at any time to improve quality and relevance.
      </p>

      <h4 style={{ color: '#10b981', marginTop: '25px', marginBottom: '10px' }}>3. Pricing and Payments</h4>
      <p style={{ marginBottom: '15px' }}>
        All prices displayed on the website are in Indian Rupees (INR) and are inclusive of applicable taxes unless stated otherwise. We reserve the right to change pricing at any time without prior notice. Payments are processed through secure third-party payment gateways. Musicos does not store your card or banking details on our servers.
      </p>

      <h4 style={{ color: '#10b981', marginTop: '25px', marginBottom: '10px' }}>4. Refund Policy</h4>
      <p style={{ marginBottom: '15px' }}>
        Due to the digital nature of our courses, refunds are subject to our Return Policy. If you experience issues with a course or believe it does not meet the description provided, please contact our support team within the specified refund window. We assess each request on a case-by-case basis.
      </p>

      <h4 style={{ color: '#10b981', marginTop: '25px', marginBottom: '10px' }}>5. Accuracy of Information</h4>
      <p style={{ marginBottom: '15px' }}>
        We strive to ensure that all course descriptions, pricing, and details are accurate and up to date. However, occasional errors may occur. Musicos reserves the right to correct any inaccuracies, including pricing errors, without prior notice. If an error affects an order you have placed, we will notify you and offer a full refund or alternative option.
      </p>

      <h4 style={{ color: '#10b981', marginTop: '25px', marginBottom: '10px' }}>6. Third-Party Links</h4>
      <p style={{ marginBottom: '15px' }}>
        Our website may contain links to third-party platforms or services. Musicos is not responsible for the content, policies, or practices of any external websites. Accessing third-party links is at your own risk.
      </p>

      <h4 style={{ color: '#10b981', marginTop: '25px', marginBottom: '10px' }}>7. Limitation of Liability</h4>
      <p style={{ marginBottom: '15px' }}>
        Musicos shall not be held liable for any indirect, incidental, or consequential damages arising from the use of our website or courses. Our total liability shall not exceed the amount paid by you for the specific course in question.
      </p>

      <h4 style={{ color: '#10b981', marginTop: '25px', marginBottom: '10px' }}>8. Contact</h4>
      <p style={{ marginBottom: '15px' }}>
        If you have any questions about this disclaimer, please reach out to us at <span style={{ color: '#10b981' }}>support@musicos.com</span>.
      </p>

      <p style={{ marginTop: '30px', fontStyle: 'italic', fontSize: '0.9rem' }}>
        Last updated: September 2026
      </p>
    </div>
  );
};

export default Disclaimer;
