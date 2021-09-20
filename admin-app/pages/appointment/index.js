import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useRouter } from 'next/router'

import Layout from '../../components/Layout'
import style from "./index.module.css"
import Table from "../../components/Table"
import Modal from "../../components/Modal"
import { getAppointments } from '../../api'

function index({ appointments }) {
  const dispatch = useDispatch()
  const router = useRouter()

  const [showModal, setShowModal] = useState(false)
  const [formValues, setFormValues] = useState({
    user: "",
    cluster: "",
    vaccineBatch: ""
  })
  const [data, setData] = useState([])

  useEffect(() => {
    if (!localStorage.getItem("token"))
      router.back()

    if (appointments)
      appointments.map(appointment => setData(prevData => [...prevData, [appointment.userID, appointment.clusterID, appointment.vaccineBatchID]]))
  }, [])

  const modalBody = () => (
    <form className={style.form}>
      <div className={style.formWrapper}>
        <label className={style.label}>User</label>
        <select className={style.input} onChange={e => setFormValues({ ...formValues, user: e.target.value })}>
          <option value="">select a value</option>
        </select>
      </div>
      <div className={style.formWrapper}>
        <label className={style.label}>Cluster</label>
        <select className={style.input} onChange={e => setFormValues({ ...formValues, cluster: e.target.value })}>
          <option value="">select a value</option>
        </select>
      </div>
      <div className={style.formWrapper}>
        <label className={style.label}>Vaccine Batch</label>
        <select className={style.input} onChange={e => setFormValues({ ...formValues, vaccineBatch: e.target.value })}>
          <option value="">select a value</option>
        </select>
      </div>
    </form>
  )

  const onAdd = () => {
    dispatch({ type: "ADD_APPOINTMENT", values: formValues })
    setShowModal(false)
  }

  return (
    <Layout>
      <div className={style.box}>
        <div className={style.toolbar}>
          <h2 className={style.h2}>Appointments</h2>
          <button className={`${style.btn} ${style.blue}`} onClick={() => setShowModal(true)}>
            <i className="material-icons">add</i>
            Add
          </button>
        </div>
        <Table columns={["User", "Cluster", "Vaccine Batch", "Date of Appointment"]} rows={data} />
      </div>
      <Modal title="add appointment" show={showModal} onClose={() => setShowModal(false)} body={modalBody()} onAdd={onAdd} />
    </Layout>
  )
}

export async function getInitialProps() {
  const res = await getAppointments()
  if (res) return {
    props: {
      appointments: res
    }
  }
  else return null
}

export default index
