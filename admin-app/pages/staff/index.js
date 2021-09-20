import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { useDispatch } from 'react-redux'
import Layout from '../../components/Layout'
import style from "./index.module.css"

import Table from "../../components/Table"
import Modal from "../../components/Modal"
import { getStaff } from '../../api'

function index({ staff }) {
  const dispatch = useDispatch()
  const router = useRouter()

  const [showModal, setShowModal] = useState(false)
  const [formValues, setFormValues] = useState({
    firstName: "",
    lastName: "",
    mobileNumber: "",
    email: "",
    cluster: ""
  })
  const [data, setData] = useState([])

  useEffect(() => {
    if (!localStorage.getItem("token"))
      router.back()

    if (staff)
      staff.map(person => setData(prevData => [...prevData, []]))
  }, [])

  const modalBody = () => (
    <form className={style.form}>
      <div className={style.formWrapper}>
        <label className={style.label}>first name</label>
        <input type="text" className={style.input} onChange={e => setFormValues({ ...formValues, firstName: e.target.value })} />
      </div>
      <div className={style.formWrapper}>
        <label className={style.label}>last name</label>
        <input type="text" className={style.input} onChange={e => setFormValues({ ...formValues, lastName: e.target.value })} />
      </div>
      <div className={style.formWrapper}>
        <label className={style.label}>mobile number</label>
        <input type="text" className={style.input} onChange={e => setFormValues({ ...formValues, mobileNumber: e.target.value })} />
      </div>
      <div className={style.formWrapper}>
        <label className={style.label}>email</label>
        <input type="text" className={style.input} onChange={e => setFormValues({ ...formValues, email: e.target.value })} />
      </div>
      <div className={style.formWrapper}>
        <label className={style.label}>cluster</label>
        <select className={style.input} onChange={e => setFormValues({ ...formValues, cluster: e.target.value })}>
          <option value="">select a value</option>
        </select>
      </div>
    </form>
  )

  const onAdd = () => {
    dispatch({ type: "ADD_STAFF", values: formValues })
    setShowModal(false)
  }

  return (
    <Layout>
      <div className={style.box}>
        <div className={style.toolbar}>
          <h2 className={style.h2}>Staff</h2>
          <button className={`${style.btn} ${style.blue}`} onClick={() => setShowModal(true)}>
            <i className="material-icons">add</i>
            Add
          </button>
        </div>
        <Table columns={["First name", "Last name", "Mobile number", "Email", "Cluster"]} rows={data} />
      </div>
      <Modal title="add staff" show={showModal} onClose={() => setShowModal(false)} body={modalBody()} onAdd={onAdd} />
    </Layout>
  )
}

export async function getInitialProps() {
  const res = await getStaff()
  if (res) return {
    props: {
      staff: res
    }
  }
  else return null
}

export default index
