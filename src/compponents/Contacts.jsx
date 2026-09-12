import { useState } from 'react';
import '../styles/contacts.scss';

function Contacts() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '+380',
        message: ''
    });
    
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name === 'phone') {
            if (!value.startsWith('+380')) {
                return;
            }
            const digitsOnly = value.slice(4).replace(/\D/g, '');
            setFormData({ ...formData, phone: '+380' + digitsOnly });
            if (error) setError('');
            if (successMessage) setSuccessMessage('');
            return;
        }

        let processedValue = value;
        if (name === 'name' && value.length > 0) {
            processedValue = value.charAt(0).toUpperCase() + value.slice(1);
        }

        setFormData({ ...formData, [name]: processedValue });
        if (error) setError('');
        if (successMessage) setSuccessMessage('');
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');
        setSuccessMessage('');

        if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
            setError('Please fill all required fields');
            return;
        }

        if (!formData.email.includes('@')) {
            setError('Your email is invalid');
            return;
        }

        const parts = formData.email.split('@');
        if (parts.length !== 2 || !parts[0] || !parts[1] || !parts[1].includes('.')) {
            setError('Your email is invalid');
            return;
        }

        if (formData.phone.length < 13) {
            setError('Phone number is too short');
            return;
        }

        setIsSubmitting(true);

        setTimeout(() => {
            console.log('Form submitted successfully:', formData);
            setIsSubmitting(false);
            setSuccessMessage('Your message has been successfully sent. We will get back to you soon.');
            setFormData({ name: '', email: '', phone: '+380', message: '' });

            setTimeout(() => {
                setSuccessMessage('');
            }, 3000);
        }, 800);
    };

    return (
        <section className="contacts-page">
            <div className="contacts-container">
                <h2 className="contacts-title">Get in Touch</h2>
                <p className="contacts-subtitle">
                    Have questions about our products, need technical support, or want to partner with us? 
                    Fill out the form below or reach us directly through our official channels.
                </p>

                <div className="contacts-content-grid">
                    <div className="contacts-info-column">
                        <div className="info-card">
                            <h3>Visit Our Store</h3>
                            <p>Stryiska St, 199, Lviv, Lviv Oblast, Ukraine, 79000</p>
                        </div>

                        <div className="info-card">
                            <h3>Direct Contacts</h3>
                            <p><strong>Phone:</strong> +380 (63) 123-45-67</p>
                            <p><strong>Email:</strong> support@elix.store</p>
                        </div>

                        <div className="info-card">
                            <h3>Working Hours</h3>
                            <p>Monday – Saturday: 10:00 – 19:00</p>
                            <p>Sunday: Day off</p>
                        </div>
                    </div>

                    <div className="contacts-form-column">
                        <div className="contact-form-wrapper">
                            <form className="contact-form" onSubmit={handleSubmit}>
                                <h3>Send Us a Message</h3>
                                
                                {error && <div className="error-message-text">{error}</div>}
                                {successMessage && <div className="success-message-text">{successMessage}</div>}

                                <div className="form-group">
                                    <label htmlFor="name">Your Name</label>
                                    <input 
                                        type="text" 
                                        id="name" 
                                        name="name" 
                                        value={formData.name} 
                                        onChange={handleChange} 
                                        placeholder="John Doe" 
                                    />
                                </div>

                                <div className="form-row">
                                    <div className="form-group">
                                        <label htmlFor="email">Email Address</label>
                                        <input 
                                            type="email" 
                                            id="email" 
                                            name="email" 
                                            value={formData.email} 
                                            onChange={handleChange} 
                                            placeholder="john@example.com" 
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="phone">Phone Number</label>
                                        <input 
                                            type="tel" 
                                            id="phone" 
                                            name="phone" 
                                            value={formData.phone} 
                                            onChange={handleChange} 
                                            placeholder="+380..." 
                                        />
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="message">Your Message</label>
                                    <textarea 
                                        id="message" 
                                        name="message" 
                                        rows="5" 
                                        value={formData.message} 
                                        onChange={handleChange} 
                                        placeholder="Type your question or request here..." 
                                    ></textarea>
                                </div>

                                <button type="submit" className="submit-btn" disabled={isSubmitting}>
                                    {isSubmitting ? 'Sending...' : 'Send Message'}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Contacts;