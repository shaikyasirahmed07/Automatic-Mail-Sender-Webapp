import React, { useState } from 'react';

const EmailForm = () => {
  const [formData, setFormData] = useState({
    to: '',
    subject: '',
    message: '',
  });
  const [status, setStatus] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('Sending...');

    try {
      const response = await fetch('/.netlify/functions/send-email', {
        method: 'POST',
        body: JSON.stringify(formData),
      });
      
      const result = await response.json();
      setStatus(result.message || 'Email sent successfully!');
      setFormData({ to: '', subject: '', message: '' });
    } catch (error) {
      setStatus('Error sending email');
    }
  };

  return (
    <div className="email-form">
      <h2>Send Automatic Email</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            type="email"
            name="to"
            value={formData.to}
            onChange={handleChange}
            placeholder="Recipient Email"
            required
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            placeholder="Subject"
            required
          />
        </div>
        <div className="form-group">
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Message"
            required
          />
        </div>
        <button type="submit">Send Email</button>
      </form>
      {status && <p className="status">{status}</p>}
    </div>
  );
};

export default EmailForm;