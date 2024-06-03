import React, { useState } from 'react';
import Contacts from './Contacts';
import "../contacts/Contacts"
const ContactsCard = () => {  // Fixed component name
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [formError, setFormError] = useState(null);
  const [formSuccess, setFormSuccess] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setFormError(null);
    setFormSuccess(null);

    if (!name || !email || !message) {
      setFormError('All fields are required');
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/contacts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, email, message })
      });

      if (!response.ok) {
        throw new Error('Failed to submit contact');
      }

      setFormSuccess('Contact submitted successfully!');
      setName('');
      setEmail('');
      setMessage('');
    } catch (error) {
      setFormError('Failed to submit contact');
    }
  };

  return (
    <section className="contact-section">
      <div className="container">
        <div className="contact-form-wrapper">
          <h1>Contact Us</h1>
          <form noValidate onSubmit={handleSubmit} className="contact-form">
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="form-control"
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="form-control"
              />
            </div>
            <div className="form-group">
              <label htmlFor="message">Message</label>
              <textarea
                id="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="form-control"
                rows="4"
              ></textarea>
            </div>
            {formError && <p className="form-error">{formError}</p>}
            {formSuccess && <p className="form-success">{formSuccess}</p>}
            <button type="submit" className="btn-submit">Submit</button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactsCard;  
