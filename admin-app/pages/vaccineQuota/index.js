import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { useDispatch } from 'react-redux'
import Layout from '../../components/Layout'
import style from "./index.module.css"

import Table from "../../components/Table"
import Modal from "../../components/Modal"
import { getVaccineQuota } from '../../api'

function index({ vaccineQuota }) {
  const dispatch = useDispatch()
  const router = useRouter()

  const [showModal, setShowModal] = useState(false)
  const [formValues, setFormValues] = useState({
    vaccineType: "",
    cluster: "",
    ageGroup: "",
    quota: 0
  })
  const [data, setData] = useState([])

  useEffect(() => {
    if (!localStorage.getItem("token"))
      router.back()

    if (vaccineQuota)
      vaccineQuota.map(quota => setData(prevData => [...prevData, []]))
  }, [])

  const modalBody = () => (
    <form className={style.form}>
      <div className={style.formWrapper}>
        <label className={style.label}>vaccine type</label>
        <select className={style.input} onChange={e => setFormValues({ ...formValues, vaccineType: e.target.value })}>
          <option value="">select a value</option>
        </select>
      </div>
      <div className={style.formWrapper}>
        <label className={style.label}>cluster</label>
        <select className={style.input} onChange={e => setFormValues({ ...formValues, cluster: e.target.value })}>
          <option value="">select a value</option>
        </select>
      </div>
      <div className={style.formWrapper}>
        <label className={style.label}>age group</label>
        <select className={style.input} onChange={e => setFormValues({ ...formValues, ageGroup: e.target.value })}>
          <option value="">select a value</option>
          <option value="Kid">Kid</option>
          <option value="Adult">Adult</option>
          <option value="Elderly">Elderly</option>
        </select>
      </div>
      <div className={style.formWrapper}>
        <label className={style.label}>quota</label>
        <input type="number" className={style.input} onChange={e => setFormValues({ ...formValues, quota: e.target.value })} />
      </div>
    </form>
  )

  const onAdd = () => {
    dispatch({ type: "ADD_VACCINEQUOTA", values: formValues })
    setShowModal(false)
  }

  return (
    <Layout>
      <div className={style.box}>
        <div className={style.toolbar}>
          <h2 className={style.h2}>Vaccine Quota</h2>
          <button className={`${style.btn} ${style.blue}`} onClick={() => setShowModal(true)}>
            <i className="material-icons">add</i>
            Add
          </button>
        </div>
        <Table columns={["Vaccine Type", "Cluster", "Age Group", "Quota"]} rows={data} />
      </div>
      <Modal title="add vaccine quota" show={showModal} onClose={() => setShowModal(false)} body={modalBody()} onAdd={onAdd} />
    </Layout>
  )
}

export async function getInitialProps() {
  const res = await getVaccineQuota()
  if (res) return {
    props: {
      vaccineQuota: res
    }
  }
  else return null
}

export default index
