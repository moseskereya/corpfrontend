import { useState } from 'react';
import {toast} from 'react-toastify'
import { useNavigate } from 'react-router-dom';


const EmailForm = () => {
  const [email, setEmail] = useState('');
    const navigate = useNavigate();

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch('http://localhost:8080/api/submit-form', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        toast.success('Email sent!')
        setEmail('');
      } else {
          toast.error('Failed to send email')
          navigate('/notfpund')
      }
    } catch (error) {
      toast.error('Error sending email:', error);
    }
    };
    
    return (
    <div className="login-signup-form animated fadeInDown">
          <div className="form">
        <div className="animated fadeInDown">
            <form onSubmit={onSubmit} autoComplete="current-password">
                <h2 className="title">Send Us Email </h2>
                <br />
                <div className="img_logo"></div>
                <input value={email} type="email"
                     onChange={handleEmailChange}
                    name="email" placeholder="Email" />
                <button className="btn btn-block">Send now</button>
            </form>
            </div>
            </div>
        </div>
            
    );
}

export default EmailForm;
