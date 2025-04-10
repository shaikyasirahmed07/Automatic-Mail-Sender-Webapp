const axios = require('axios');

exports.handler = async (event) => {
  try {
    const { to, subject, message } = JSON.parse(event.body);
    
    // Using EmailJS API (you'll need to signup at emailjs.com and get these credentials)
    const emailjsResponse = await axios.post(
      'https://api.emailjs.com/api/v1.0/email/send',
      {
        service_id: 'YOUR_SERVICE_ID',
        template_id: 'YOUR_TEMPLATE_ID',
        user_id: 'YOUR_USER_ID',
        template_params: {
          to_email: to,
          subject: subject,
          message: message,
        },
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Email sent successfully' }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
};