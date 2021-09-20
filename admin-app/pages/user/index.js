import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Layout from '../../components/Layout'
import style from "./index.module.css"

import Table from "../../components/Table"

function index({ users }) {
  const router = useRouter()
  const [data, setData] = useState([])

  useEffect(() => {
    if (!localStorage.getItem("token"))
      router.back()

    if (users)
      users.map(user => setData(prevData => [...prevData, [user.firstName, user.lastName, user.age, user.mobileNumber, user.pinCode, user.uid]]))
  }, [])

  return (
    <Layout>
      <div className={style.box}>
        <div className={style.toolbar}>
          <h2 className={style.h2}>Users</h2>
        </div>
        <Table columns={["firstName", "lastName", "age", "mobileNumber", "pinCode", "uid"]} rows={data} />
      </div>
    </Layout>
  )
}

export async function getInitialProps() {
  const res = await getAppointments()
  if (res) return {
    props: {
      users: res
    }
  }
  else return null
}

export default index
