

export default function Login(){


    return (
        <div>
            <form>
                <div>
                    <label htmlFor='email'>Email: </label>
                    <input
                        id='email'
                        name='email'
                    />
                </div>
                <div>
                    <label htmlFor='password'>Password: </label>
                    <input
                        id='password'
                        name='password'
                        type='password'
                    />
                </div>
                <button type='submit'> Login </button>
            </form>
        </div>
    );
}
