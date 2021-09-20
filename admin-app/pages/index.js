import { useState, useEffect } from 'react'
import Layout from '../components/Layout'
import style from './index.module.css'
import { signIn } from '../api'
import { useRouter } from 'next/router'

export default function Home() {
  const router = useRouter()
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  useEffect(() => {
    // if (localStorage.getItem("token"))
    //   router.back()
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    signIn(username, password)
      .then(token => {
        localStorage.setItem('token', token)
        router.push('/appointment')
      })
      .catch(err => console.error(err))
  }
  return (
    <Layout>
      <form className={style.form}>
        <div className={style.formWrapper}>
          <label className={style.label}>username</label>
          <input type="text" className={style.input} onChange={e => setUsername(e.target.value)} value={username} />
        </div>
        <div className={style.formWrapper}>
          <label className={style.label}>Password</label>
          <input type="password" className={style.input} onChange={e => setPassword(e.target.value)} value={password} />
        </div>
        <button className={`${style.btn} ${style.blue}`} onClick={handleSubmit}>Login</button>
      </form>
    </Layout>
  )
}
