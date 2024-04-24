import styles from './Login.module.css';

import { useState, useEffect } from 'react';

import { useAutentication } from '../../hooks/useAutentication';


const Login = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const {login, error: authError, loading} = useAutentication();

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    const user = {
      email,
      password
    }    

    const res = await login(user);

    console.log(res);
  }

  useEffect(() => {
    if(authError){
      setError(authError);
    }
  }, [authError])

  return (
    <>
        <div className={styles['login']}>
        <h1>Entrar</h1>
          <p>Faa o login para poder utilizar o sistema</p>
          <form onSubmit={handleSubmit}>
            <label>
              <span>Email:</span>
              <input 
              type="email" 
              name="email" 
              required 
              placeholder="E-mail do usuario"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            </label>
            <label>
              <span>Senha:</span>
              <input 
              type="password" 
              name="password" 
              required 
              placeholder="Insira sua senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            </label>
            {!loading && <button className="btn" type="submit">Entrar</button>}
            {loading && <button className="btn" type="submit" disabled>Aguarde...</button>}
            {error && <p className='error'>{error}</p>}
          </form>
        </div>
    </>
  )
}

export default Login