import { useState } from 'react';
import 'axios';
import axios from 'axios';
import { redirect, useNavigate } from 'react-router-dom';

export default function Signup() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();

    function handleSubmit(event: React.FormEvent) {
        event.preventDefault();
        const instance = axios.create({
            baseURL: 'http://127.0.0.1:8000',
            timeout: 10000,
        })

        const data = {
            email: email,
            password: password
        }

        instance.post('/accounts/signup', data)
            .then(response => {
                console.log(response.data);
                navigate('/'); // Redirect to success page
            })
            .catch(error => {
                console.error('There was an error!', error);
                navigate('/signup');
            });
    }

    return (
        <div>
            <form method='POST' action='/signup' onSubmit={handleSubmit}>
                <div>
                    <label htmlFor='email'>Email: </label>
                    <input
                        id='email'
                        name='email'
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor='password'>Password: </label>
                    <input
                        id='password'
                        name='password'
                        type='password'
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    />
                </div>
                <button type='submit'> Signup </button>
            </form>
        </div>
    );
}
