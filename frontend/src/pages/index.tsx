import {useContext, FormEvent} from 'react'
import Head from 'next/head'
import Image from 'next/image'
import logoImg from '../../public/logo.svg'
import styles from '../../styles/home.module.scss'
import {Input} from '../components/ui/Input'
import {Button} from '../components/ui/Button'
import Link from 'next/link'
import {AuthContext} from '../contexts/AuthContext'

export default function Home() {

  const {signIn} = useContext(AuthContext)

  let data = {
    email: "algum@teste.com",
    password: "123123"
  }

  async function handleLogin(event:FormEvent) {
    event.preventDefault();
    await signIn(data);
  }

  return (
    <>
    <Head>
      <title>SujeitoPizza - Faça seu login</title>
    </Head>
    <div className={styles.containerCenter}>
      <Image src={logoImg} alt="Logo Sujeito Pizzaria"/>

      <div className={styles.login}>
        <form onSubmit={handleLogin}>
          <Input placeholder='Digite seu email' type="text"/>
          <Input placeholder='Sua senha' type="password"/>
          <Button type="submit" loading={false}>
            Acessar
          </Button>
          <Link href="/signup">
            <a className={styles.text}>Não possui uma conta? Cadastre-se</a>
          </Link>
        </form>
      </div>
    </div>
    </>
  )
}
