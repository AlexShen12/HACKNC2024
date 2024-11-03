import { useState } from 'react';
import { AxiosClient } from '../../requests/axiosClient';
import { useNavigate } from 'react-router-dom';


export default function Login(){

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();

    function handleSubmit(event: React.FormEvent){
        event.preventDefault();

        const instance: AxiosClient = AxiosClient.getInstance();

        const data = {
            email: email,
            password: password
        }

        console.log(instance);

        instance.post('/accounts/login', data,
            response => {
                console.log(response.data);
                navigate('/');
            },
            error => {
                console.error('There was an error!', error);
                navigate('/login');
            }
        );
    }

    return (
        <div>
            <form method='POST' action='/login' onSubmit={handleSubmit}>
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
                <button type='submit'> Login </button>
            </form>
        </div>
    );
}
