import styles from "./styles.module.css"
import { useState, useEffect } from 'react'
import { useAuthentication } from '../../hooks/auth'

const Login = () => {
        const [email, setEmail] = useState("")
        const [password, setPassWord] = useState("")
        const [error, setError] = useState("")
    
            //importando autenticacao
        const {login, error: authError, loading}= useAuthentication();
    
        const handleSubmit = async (e) =>{
            e.preventDefault()
    
            setError("")
    
            const user = {
                email,
                password
            }
            await login(user)
            console.log(user)
        }
    
        useEffect(() => {
            if(authError){
                setError(authError)
            }
        }, [authError])
    return (
    <div className={styles.login}>
        <h1>Entrar</h1>
        <p>Acesse sua conta para começar a usar o sistema</p>
        <form onSubmit={handleSubmit}>
            <label>
                <span>Email:</span>
                <input 
                    type="email" 
                    name="email"  
                    required 
                    placeholder="Email do usuário"
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
                    onChange={(e) => setPassWord(e.target.value)}
                    />
            </label>
            {!loading && <button className='btn'>Entrar</button>}
            {loading && (<button className='btn'>Aguarde...</button>)}
            {error && <p className="error">{error}</p>}
        </form>
    </div>
    )
}

export default Login