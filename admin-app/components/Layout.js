import Head from 'next/head'
import Link from "next/link"
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import style from "./Layout.module.css"

const Layout = ({ children }) => {
  const router = useRouter()
  const [showNav, setShowNav] = useState(false)
  const [token, setToken] = useState(false)

  useEffect(() => {
    if (localStorage.getItem("token")) setToken(localStorage.getItem("token"))
  }, [])

  return (<>
    <Head>
      <title>Vaccine Application | Administration</title>
      <link href="https://fonts.googleapis.com/icon?family=Material+Icons"
        rel="stylesheet" />
      <link rel="icon" href="/favicon.ico" />
    </Head>

    <main>
      <div className={style.container}>
        <div className={`${style.headSection} ${style.blue}`}>
          <div className={style.hamburger} onClick={() => setShowNav(!showNav)}>
            <span className={style.bar}></span>
            <span className={style.bar}></span>
            <span className={style.bar}></span>
          </div>
          <span className={style.title}>
            <Link href="/">Vaccine Scheduler</Link>
          </span>
        </div>
        <div className={style.midSection} >
          <div className={`${style.blue} ${style.nav}`} style={showNav ? { display: "block" } : {}}>
            <ul className={style.ul}>
              <li><Link href="/appointment">Appointments</Link></li>
              <li><Link href="/cluster">Clusters</Link></li>
              <li><Link href="/staff">Staff</Link></li>
              <li><Link href="/user">Users</Link></li>
              <li><Link href="/vaccineBatch">Vaccine Batches</Link></li>
              <li><Link href="/vaccineQuota">Vaccine Quota</Link></li>
              <li><Link href="/vaccineType">Vaccine Types</Link></li>
              {
                token && <li><div className={`${style.logout}`} onClick={() => { localStorage.removeItem("token"); router.push('/') }}>Logout</div></li>
              }
            </ul>
          </div>
          <div className={style.body}>
            {children}
          </div>
        </div>
        <div className={`${style.blue} ${style.footSection}`}>
          Developed by Taher
        </div>
      </div>
    </main>
  </>)
}

export default Layout