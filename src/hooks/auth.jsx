import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    updateProfile,
    signOut
} from "firebase/auth"
import { useState, useEffect } from "react"
import {app } from "../firebase/config"

export const useAuthentication = ()=> {
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(null)
    //cleanup
    const [cancelled, setCancelled] = useState(false)
    const auth = getAuth(app)

    function checarSeFoiCancelado (){
        if(cancelled){
            console.log("Operação cancelada")
            return true
        }
        return false
    }


    //registro de usuario
    const createUser = async (data) => {
        checarSeFoiCancelado()
        setError(null)
        setLoading(true)
        
        try{
            const {user} = await createUserWithEmailAndPassword(
                auth,
                data.email,
                data.password
            )

            await updateProfile(user, {
                displayName: data.displayName
            })
        
            setLoading(false)
            return user

        }catch(error){
            console.log(error.message)
            console.log(typeof error.message)

            //verifica se o erro for senha fraca 

            let systemErrorMessage
            if(error.message.includes("Password")){
                systemErrorMessage = "A senha precisa conter pelo menos 6 caracteres"
            }else if(error.message.includes("email-already")){
                systemErrorMessage = "E-mail já cadastrado"
            }else {
                systemErrorMessage = "Ocorreu um erro, por favor tente mais tarde"
            }
            setError(systemErrorMessage)
        }
    }

    //logout - sign out
    const logout = async () => {
    try {
        console.log("Iniciando logout")
        checarSeFoiCancelado();
        await signOut(auth); // Aguarda a conclusão do logout
        console.log("Logout concluido com sucesso")
    } catch (error) {
        console.error("Erro ao deslogar:", error.message);
    }
    };

    //login - sign in
    const login = async (data) => {
        checarSeFoiCancelado()
    
        
        setLoading(true);
        setError(null);
    
        try {
            await signInWithEmailAndPassword(auth, data.email, data.password);
            setLoading(false);
        } catch (error) {
        
            let systemErrorMessage;
    
            if (error.message.includes("user-not-found")) {
                systemErrorMessage = "Usuário não encontrado.";
            } else if (error.message.includes("wrong-password")) {
                systemErrorMessage = "Senha incorreta.";
            }else{
                systemErrorMessage = "Ocorreu um erro. Por favor, tente mais tarde.";
            }
    
            setLoading(false);
            setError(systemErrorMessage);
        }
    };
    


    useEffect(() => {
        return () => setCancelled(true)
    }, [])

    return {
        auth,
        createUser,
        error,
        loading,
        logout,
        login
    }
}