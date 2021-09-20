import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { useDispatch } from 'react-redux'
import Layout from '../../components/Layout'
import style from "./index.module.css"

import Table from "../../components/Table"
import Modal from "../../components/Modal"
import { getVaccineTypes } from '../../api'

function index({ vaccineTypes }) {
  const dispatch = useDispatch()
  const router = useRouter()

  const [showModal, setShowModal] = useState(false)
  const [formValues, setFormValues] = useState({
    brand: "",
    jabsRequired: "",
    waitTime: ""
  })
  const [data, setData] = useState([])

  useEffect(() => {
    if (!localStorage.getItem("token"))
      router.back()

    if (vaccineTypes)
      vaccineTypes.map(vaccineType => setData(prevData => [...prevData, []]))
  }, [])

  const modalBody = () => (
    <form className={style.form}>
      <div className={style.formWrapper}>
        <label className={style.label}>brand</label>
        <input type="text" className={style.input} onChange={e => setFormValues({ ...formValues, brand: e.target.value })} />
      </div>
      <div className={style.formWrapper}>
        <label className={style.label}>jabs required</label>
        <input type="number" className={style.input} onChange={e => setFormValues({ ...formValues, jabsRequired: e.target.value })} />
      </div>
      <div className={style.formWrapper}>
        <label className={style.label}>wait time</label>
        <input type="number" className={style.input} onChange={e => setFormValues({ ...formValues, waitTime: e.target.value })} />
      </div>
    </form>
  )

  const onAdd = () => {
    dispatch({ type: "ADD_VACCINETYPE", values: formValues })
    setShowModal(false)
  }

  return (
    <Layout>
      <div className={style.box}>
        <div className={style.toolbar}>
          <h2 className={style.h2}>Vaccine Types</h2>
          <button className={`${style.btn} ${style.blue}`} onClick={() => setShowModal(true)}>
            <i className="material-icons">add</i>
            Add
          </button>
        </div>
        <Table columns={["Brand", "Jabs Required", "Wait Time"]} rows={data} />
      </div>
      <Modal title="add vaccine types" show={showModal} onClose={() => setShowModal(false)} body={modalBody()} onAdd={onAdd} />
    </Layout>
  )
}

export async function getInitialProps() {
  const res = await getVaccineTypes()
  if (res) return {
    props: {
      vaccineTypes: res
    }
  }
  else return null
}

export default index
