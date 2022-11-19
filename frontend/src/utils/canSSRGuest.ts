import {GetServerSideProps,GetServerSidePropsContext,GetServerSidePropsResult} from 'next'
import {parseCookies} from 'nookies'

// função para páginas que só podem ser acessadas por visitantes
export function canSSRGuest<P>(fn:GetServerSideProps<P>){
    return async (ctx:GetServerSidePropsContext): Promise<GetServerSidePropsResult<P>> => {

        const cookies = parseCookies(ctx);

        // se o usuário tentar acessar a página porém já tendo efetuado login, redirecionar
        if(cookies['@nextauth.token']){
            return{
                redirect:{
                    destination: '/dashboard',
                    permanent: false
                }
            }
        }
        
        return await fn(ctx);
    }
}