import {createContext, ReactNode, useState} from 'react'
import {api} from '../services/apiClient'
import {destroyCookie, setCookie, parseCookies} from 'nookies'
import Router from 'next/router'
import { toast } from 'react-toastify'

type AuthContextData = {
    user: UserProps;
    isAuthenticated: boolean;
    signIn: (credentials: SignInProps) => Promise<void>;
    signOut: () => void;
    signUp: (credentials: SignUpProps) => Promise<void>;
}

type UserProps = {
    id: string;
    name: string;
    email: string;
}

type SignInProps = {
    email: string;
    password: string;
}

type SignUpProps = {
    name: string;
    email: string;
    password: string;
}

type AuthProviderProps = {
    children: ReactNode;
}

export const AuthContext = createContext({} as AuthContextData)

export function signOut(){
    try{
        destroyCookie(undefined, '@nextauth.token')
        Router.push('/')
    }catch{
        console.log("Erro ao deslogar")
    }
}

export function AuthProvider({children}:AuthProviderProps){

    const [user, setUser] = useState<UserProps>()
    const isAuthenticated = !!user;

    async function signIn({email, password}:SignInProps){
        //console.log("email: ", email)
        //console.log("senha: ",password)
        try {
                const response = await api.post('/session', {
                    email,
                    password
                })
                // console.log(response)
                const {id, name, token} = response.data
                setCookie(undefined, '@nextauth.token', token, {
                    maxAge: 60 * 60 * 24 * 30, // expirar em 30 dias
                    path: "/" // quais caminhos terão acesso ao cookie
                })
                setUser({
                    id,
                    name,
                    email
                })
                // passar token para proximas requisicoes
                api.defaults.headers['Authorization'] = `Bearer ${token}`

                toast.success("Logado com sucesso!")

                // redirecionar usuario para /dashboard
                Router.push('/dashboard')

        } catch (error) {
            toast.error("Erro ao acessar!")
            console.log("Erro ao acessar ", error)
        }
    }

    async function signUp({name,email,password}:SignUpProps) {
        try {
                const response = await api.post('/users', {
                    name,
                    email,
                    password
                })

                toast.success("Conta criada com sucesso!")
                //console.log("Cadastrado com sucesso!")

                Router.push('/')

        } catch (error) {
            toast.error("Erro ao dastrar!")
            //console.log("Erro ao dastrar ", error)
        }
        
    }

    return(
        <AuthContext.Provider value={{user,isAuthenticated,signIn,signOut,signUp}}>
            {children}
        </AuthContext.Provider>
    )
}