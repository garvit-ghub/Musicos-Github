const BRAND = {
    primary: '#10b981',
    primaryDark: '#059669',
    accent: '#f97316',
    bg: '#0f0f11',
    card: '#1a1a1f',
    text: '#fafafa',
    textSecondary: '#a1a1aa',
    border: '#27272a',
};

const baseWrapper = (content) => `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Musicos</title>
</head>
<body style="margin:0; padding:0; background-color:${BRAND.bg}; font-family:'Segoe UI', Arial, Helvetica, sans-serif; color:${BRAND.text};">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:${BRAND.bg}; padding:40px 20px;">
        <tr>
            <td align="center">
                <table role="presentation" width="520" cellpadding="0" cellspacing="0" style="background-color:${BRAND.card}; border-radius:16px; border:1px solid ${BRAND.border}; overflow:hidden;">
                    <tr>
                        <td style="height:4px; background:linear-gradient(90deg, ${BRAND.primary}, ${BRAND.accent});"></td>
                    </tr>
                    <tr>
                        <td style="padding:40px 36px;">
                            ${content}
                        </td>
                    </tr>
                    <tr>
                        <td style="padding:0 36px 32px;">
                            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-top:1px solid ${BRAND.border}; padding-top:24px;">
                                <tr>
                                    <td style="padding-top:24px; text-align:center;">
                                        <p style="margin:0 0 8px; font-size:16px; font-weight:700; color:${BRAND.primary};">🎵 Musicos</p>
                                        <p style="margin:0 0 4px; font-size:12px; color:${BRAND.textSecondary};">Premium Musical Courses &amp; Learning</p>
                                        <p style="margin:0; font-size:11px; color:${BRAND.textSecondary};">This is a transactional email from Musicos. &copy; ${new Date().getFullYear()} Musicos. All rights reserved.</p>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>
</html>`;

const formatItems = (items) => {
    if (!items || !items.length) return '';
    return items.map((item) => {
        const name = item.name || item.productID?.name || 'Course';
        const price = item.price || 0;
        const qty = item.quantity || 1;
        const subtotal = price * qty;
        const category = item.category || item.productID?.category || '';
        return `
        <tr>
            <td style="padding:12px 0; border-bottom:1px solid ${BRAND.border};">
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                    <tr>
                        <td style="font-size:14px; color:${BRAND.text}; font-weight:600; padding-bottom:4px;">
                            ${name}
                        </td>
                        <td align="right" style="font-size:14px; color:${BRAND.primary}; font-weight:700; white-space:nowrap;">
                            ₹${price.toLocaleString('en-IN')}
                        </td>
                    </tr>
                    <tr>
                        <td style="font-size:12px; color:${BRAND.textSecondary};">
                            Qty: ${qty}${category ? ` &middot; ${category}` : ''}
                        </td>
                        <td align="right" style="font-size:12px; color:${BRAND.textSecondary};">
                            ₹${subtotal.toLocaleString('en-IN')}
                        </td>
                    </tr>
                </table>
            </td>
        </tr>`;
    }).join('');
};

const orderItemsSummary = (orderId, items, totalAmount) => {
    const itemRows = formatItems(items);
    return `
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:24px;">
            <tr>
                <td style="background:linear-gradient(135deg, rgba(16,185,129,0.12), rgba(16,185,129,0.04)); border:1px solid rgba(16,185,129,0.25); border-radius:10px; padding:14px 18px; text-align:center; margin-bottom:24px;">
                    <p style="margin:0 0 4px; font-size:11px; color:${BRAND.textSecondary}; text-transform:uppercase; letter-spacing:1.5px;">Order ID</p>
                    <p style="margin:0; font-size:16px; font-weight:700; color:${BRAND.primary}; font-family:'Courier New', monospace; letter-spacing:1px;">#${orderId.toString().slice(-8).toUpperCase()}</p>
                </td>
            </tr>
        </table>

        <h2 style="margin:0 0 12px; font-size:15px; font-weight:700; color:${BRAND.text}; text-transform:uppercase; letter-spacing:1px;">Courses Purchased</h2>
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:24px;">
            <tr>
                <td style="background:rgba(255,255,255,0.03); border-radius:10px; padding:4px 16px;">
                    <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                        ${itemRows}
                        <tr>
                            <td colspan="2" style="padding:14px 0 4px;">
                                <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                                    <tr>
                                        <td style="font-size:14px; font-weight:700; color:${BRAND.text};">Total Paid</td>
                                        <td align="right" style="font-size:18px; font-weight:800; color:${BRAND.primary};">₹${totalAmount.toLocaleString('en-IN')}</td>
                                    </tr>
                                </table>
                            </td>
                        </tr>
                    </table>
                </td>
            </tr>
        </table>`;
};

const otpVerificationEmail = (userName, otp, expiryMinutes) => ({
    subject: `Your Musicos Verification Code: ${otp}`,
    text: `Hello ${userName},\n\nYour verification code is: ${otp}\n\nThis code expires in ${expiryMinutes} minutes.\n\nIf you didn't request this, please ignore this email.\n\n- The Musicos Team`,
    html: baseWrapper(`
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
            <tr>
                <td align="center" style="padding-bottom:24px;">
                    <div style="width:64px; height:64px; border-radius:50%; background:linear-gradient(135deg, ${BRAND.primary}, ${BRAND.primaryDark}); display:inline-block; line-height:64px; text-align:center; font-size:28px;">🎵</div>
                </td>
            </tr>
        </table>

        <h1 style="margin:0 0 8px; font-size:24px; font-weight:700; text-align:center; color:${BRAND.text};">Verify Your Email</h1>
        <p style="margin:0 0 32px; font-size:15px; text-align:center; color:${BRAND.textSecondary}; line-height:1.6;">
            Hey <strong style="color:${BRAND.text};">${userName}</strong>, welcome to <strong style="color:${BRAND.primary};">Musicos</strong>! 🎸<br/>
            Use the code below to verify your account.
        </p>

        <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
            <tr>
                <td align="center" style="padding-bottom:32px;">
                    <div style="display:inline-block; background:linear-gradient(135deg, ${BRAND.primary}, ${BRAND.primaryDark}); border-radius:12px; padding:4px;">
                        <table role="presentation" cellpadding="0" cellspacing="0" style="background:${BRAND.bg}; border-radius:10px; padding:20px 16px;">
                            <tr>
                                <td style="padding:12px 32px;">
                                    <span style="font-size:36px; font-weight:800; letter-spacing:12px; color:${BRAND.text}; font-family:'Courier New', monospace;">${otp}</span>
                                </td>
                            </tr>
                        </table>
                    </div>
                </td>
            </tr>
        </table>

        <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
            <tr>
                <td style="background:rgba(249,115,22,0.08); border:1px solid rgba(249,115,22,0.2); border-radius:10px; padding:14px 18px; text-align:center; margin-bottom:24px;">
                    <p style="margin:0; font-size:13px; color:${BRAND.accent};">
                        ⏱️ This code expires in <strong>${expiryMinutes} minutes</strong>. Enter it on the verification screen to activate your account.
                    </p>
                </td>
            </tr>
        </table>

        <p style="margin:24px 0 0; font-size:13px; text-align:center; color:${BRAND.textSecondary}; line-height:1.6;">
            Didn't create an account? You can safely ignore this email &mdash; no account will be created.
        </p>
    `),
});

const otpResendEmail = (userName, otp, expiryMinutes) => ({
    subject: `New Musicos Verification Code: ${otp}`,
    text: `Hello ${userName},\n\nYour new verification code is: ${otp}\n\nThis code expires in ${expiryMinutes} minutes.\n\nIf you didn't request this, please ignore this email.\n\n- The Musicos Team`,
    html: baseWrapper(`
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
            <tr>
                <td align="center" style="padding-bottom:24px;">
                    <div style="width:64px; height:64px; border-radius:50%; background:linear-gradient(135deg, ${BRAND.primary}, ${BRAND.primaryDark}); display:inline-block; line-height:64px; text-align:center; font-size:28px;">🔄</div>
                </td>
            </tr>
        </table>

        <h1 style="margin:0 0 8px; font-size:24px; font-weight:700; text-align:center; color:${BRAND.text};">New Verification Code</h1>
        <p style="margin:0 0 32px; font-size:15px; text-align:center; color:${BRAND.textSecondary}; line-height:1.6;">
            Hey <strong style="color:${BRAND.text};">${userName}</strong>, here's your new verification code.
        </p>

        <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
            <tr>
                <td align="center" style="padding-bottom:32px;">
                    <div style="display:inline-block; background:linear-gradient(135deg, ${BRAND.primary}, ${BRAND.primaryDark}); border-radius:12px; padding:4px;">
                        <table role="presentation" cellpadding="0" cellspacing="0" style="background:${BRAND.bg}; border-radius:10px; padding:20px 16px;">
                            <tr>
                                <td style="padding:12px 32px;">
                                    <span style="font-size:36px; font-weight:800; letter-spacing:12px; color:${BRAND.text}; font-family:'Courier New', monospace;">${otp}</span>
                                </td>
                            </tr>
                        </table>
                    </div>
                </td>
            </tr>
        </table>

        <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
            <tr>
                <td style="background:rgba(249,115,22,0.08); border:1px solid rgba(249,115,22,0.2); border-radius:10px; padding:14px 18px; text-align:center; margin-bottom:24px;">
                    <p style="margin:0; font-size:13px; color:${BRAND.accent};">
                        ⏱️ This code expires in <strong>${expiryMinutes} minutes</strong>. Enter it on the verification screen.
                    </p>
                </td>
            </tr>
        </table>

        <p style="margin:24px 0 0; font-size:13px; text-align:center; color:${BRAND.textSecondary}; line-height:1.6;">
            Didn't request a new code? You can safely ignore this email.
        </p>
    `),
});

const orderConfirmationEmail = (userName, orderId, items, totalAmount) => ({
    subject: `💳 Payment Successful! Order #${orderId.toString().slice(-8).toUpperCase()}`,
    text: `Hello ${userName},\n\nYour payment was successful and your order has been placed!\n\nOrder ID: ${orderId}\nTotal: ₹${totalAmount.toLocaleString('en-IN')}\n\nCourses:\n${items.map((i) => `  - ${i.name || i.productID?.name || 'Course'}`).join('\n')}\n\nCheck your inbox — a separate email with your course download link has been sent!\n\nThank you for choosing Musicos!\n\n- The Musicos Team`,
    html: baseWrapper(`
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
            <tr>
                <td align="center" style="padding-bottom:24px;">
                    <div style="width:64px; height:64px; border-radius:50%; background:linear-gradient(135deg, ${BRAND.primary}, ${BRAND.primaryDark}); display:inline-block; line-height:64px; text-align:center; font-size:28px;">💳</div>
                </td>
            </tr>
        </table>

        <h1 style="margin:0 0 8px; font-size:24px; font-weight:700; text-align:center; color:${BRAND.text};">Payment Successful!</h1>
        <p style="margin:0 0 8px; font-size:15px; text-align:center; color:${BRAND.textSecondary}; line-height:1.6;">
            Hey <strong style="color:${BRAND.text};">${userName}</strong>, your payment has been confirmed! 🎉
        </p>
        <p style="margin:0 0 28px; font-size:14px; text-align:center; color:${BRAND.textSecondary};">
            Here's your receipt &mdash; your course access is being prepared.
        </p>

        ${orderItemsSummary(orderId, items, totalAmount)}

        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:24px;">
            <tr>
                <td style="background:linear-gradient(135deg, rgba(16,185,129,0.08), rgba(16,185,129,0.02)); border:1px solid rgba(16,185,129,0.2); border-radius:10px; padding:18px 20px;">
                    <h3 style="margin:0 0 10px; font-size:14px; color:${BRAND.primary};">📬 What Happens Next?</h3>
                    <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                        <tr>
                            <td style="padding:4px 0; font-size:13px; color:${BRAND.textSecondary}; line-height:1.6;">✅ &nbsp;Payment confirmed &mdash; you're all set!</td>
                        </tr>
                        <tr>
                            <td style="padding:4px 0; font-size:13px; color:${BRAND.textSecondary}; line-height:1.6;">📧 &nbsp;Check your inbox &mdash; your course download link has been sent!</td>
                        </tr>
                        <tr>
                            <td style="padding:4px 0; font-size:13px; color:${BRAND.textSecondary}; line-height:1.6;">🎓 &nbsp;Start learning right away!</td>
                        </tr>
                    </table>
                </td>
            </tr>
        </table>

        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-top:28px;">
            <tr>
                <td align="center">
                    <a href="#" style="display:inline-block; background:linear-gradient(135deg, ${BRAND.primary}, ${BRAND.primaryDark}); color:#ffffff; text-decoration:none; padding:14px 36px; border-radius:10px; font-size:14px; font-weight:700; letter-spacing:0.5px;">
                        View My Orders
                    </a>
                </td>
            </tr>
        </table>
    `),
});

const orderDeliveredEmail = (userName, orderId, items, totalAmount, downloadUrl) => ({
    subject: `🎓 Your Musicos Course is Ready! Order #${orderId.toString().slice(-8).toUpperCase()}`,
    text: `Hello ${userName},\n\nYour course is ready! Here's your download link:\n\n${downloadUrl}\n\nOrder ID: ${orderId}\nTotal: ₹${totalAmount.toLocaleString('en-IN')}\n\nCourses:\n${items.map((i) => `  - ${i.name || i.productID?.name || 'Course'}`).join('\n')}\n\nWe hope you enjoy the course! If you have a moment, we'd love to hear your feedback.\n\nThank you for choosing Musicos!\n\n- The Musicos Team`,
    html: baseWrapper(`
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
            <tr>
                <td align="center" style="padding-bottom:24px;">
                    <div style="width:64px; height:64px; border-radius:50%; background:linear-gradient(135deg, ${BRAND.accent}, #eab308); display:inline-block; line-height:64px; text-align:center; font-size:28px;">🎓</div>
                </td>
            </tr>
        </table>

        <h1 style="margin:0 0 8px; font-size:24px; font-weight:700; text-align:center; color:${BRAND.text};">Your Course is Ready!</h1>
        <p style="margin:0 0 8px; font-size:15px; text-align:center; color:${BRAND.textSecondary}; line-height:1.6;">
            Hey <strong style="color:${BRAND.text};">${userName}</strong>, your course has been delivered! 🎉
        </p>
        <p style="margin:0 0 28px; font-size:14px; text-align:center; color:${BRAND.textSecondary};">
            Click the button below to download your course and start learning.
        </p>

        ${orderItemsSummary(orderId, items, totalAmount)}

        <!-- Download Button -->
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:28px;">
            <tr>
                <td align="center" style="padding:8px 0;">
                    <a href="${downloadUrl}" target="_blank" style="display:inline-block; background:linear-gradient(135deg, ${BRAND.accent}, #ea580c); color:#ffffff; text-decoration:none; padding:16px 40px; border-radius:10px; font-size:16px; font-weight:700; letter-spacing:0.5px;">
                        ⬇️ Download Your Course
                    </a>
                </td>
            </tr>
            <tr>
                <td align="center" style="padding-top:10px;">
                    <p style="margin:0; font-size:12px; color:${BRAND.textSecondary};">
                        If the button doesn't work, copy this link:<br/>
                        <a href="${downloadUrl}" style="color:${BRAND.primary}; word-break:break-all;">${downloadUrl}</a>
                    </p>
                </td>
            </tr>
        </table>

        <!-- Review CTA -->
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:24px;">
            <tr>
                <td style="background:linear-gradient(135deg, rgba(249,115,22,0.1), rgba(234,179,8,0.05)); border:1px solid rgba(249,115,22,0.25); border-radius:12px; padding:24px; text-align:center;">
                    <p style="margin:0 0 8px; font-size:20px;">⭐</p>
                    <h3 style="margin:0 0 8px; font-size:16px; color:${BRAND.text};">Enjoying the Course?</h3>
                    <p style="margin:0 0 18px; font-size:13px; color:${BRAND.textSecondary}; line-height:1.6;">
                        Your review helps other musicians discover great courses on Musicos.
                    </p>
                    <a href="#" style="display:inline-block; background:linear-gradient(135deg, ${BRAND.accent}, #ea580c); color:#ffffff; text-decoration:none; padding:12px 32px; border-radius:8px; font-size:14px; font-weight:700;">
                        Leave a Review
                    </a>
                </td>
            </tr>
        </table>

        <!-- Thank You -->
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
            <tr>
                <td style="background:rgba(16,185,129,0.06); border:1px solid rgba(16,185,129,0.15); border-radius:10px; padding:18px 20px; text-align:center;">
                    <p style="margin:0; font-size:14px; color:${BRAND.textSecondary}; line-height:1.6;">
                        Thank you for choosing <strong style="color:${BRAND.primary};">Musicos</strong>. 🎵<br/>
                        Happy learning &mdash; we can't wait to see you again!
                    </p>
                </td>
            </tr>
        </table>
    `),
});

module.exports = {
    otpVerificationEmail,
    otpResendEmail,
    orderConfirmationEmail,
    orderDeliveredEmail,
};
