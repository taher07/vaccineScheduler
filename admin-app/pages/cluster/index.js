import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { useDispatch } from 'react-redux'
import Layout from '../../components/Layout'
import style from "./index.module.css"

import Table from "../../components/Table"
import Modal from "../../components/Modal"
import { getClusters } from '../../api'

function index({ clusters }) {
  const dispatch = useDispatch()
  const router = useRouter()

  const [showModal, setShowModal] = useState(false)
  const [formValues, setFormValues] = useState({
    name: "",
    location: "",
    pincodes: "",
    manager: "",
    populationDensity: 0
  })
  const [data, setData] = useState([])

  useEffect(() => {
    if (!localStorage.getItem("token"))
      router.back()

    if (clusters)
      clusters.map(cluster => setData(prevData => [...prevData, []]))
  }, [])

  const modalBody = () => (
    <form className={style.form}>
      <div className={style.formWrapper}>
        <label className={style.label}>Name</label>
        <input type="text" className={style.input} onChange={e => setFormValues({ ...formValues, name: e.target.value })} />
      </div>
      <div className={style.formWrapper}>
        <label className={style.label}>Location</label>
        <input type="text" className={style.input} onChange={e => setFormValues({ ...formValues, location: e.target.value })} />
      </div>
      <div className={style.formWrapper}>
        <label className={style.label}>Pincodes covered (Separated by comma)</label>
        <input type="text" className={style.input} onChange={e => setFormValues({ ...formValues, pincodes: e.target.value })} />
      </div>
      <div className={style.formWrapper}>
        <label className={style.label}>Manager</label>
        <select className={style.input} onChange={e => setFormValues({ ...formValues, manager: e.target.value })}>
          <option value="">select a value</option>
        </select>
      </div>
      <div className={style.formWrapper}>
        <label className={style.label}>Population density</label>
        <input type="number" className={style.input} onChange={e => setFormValues({ ...formValues, populationDensity: e.target.value })} />
      </div>
    </form>
  )

  const onAdd = () => {
    dispatch({ type: "ADD_CLUSTER", values: formValues })
    setShowModal(false)
  }

  return (
    <Layout>
      <div className={style.box}>
        <div className={style.toolbar}>
          <h2 className={style.h2}>Clusters</h2>
          <button className={`${style.btn} ${style.blue}`} onClick={() => setShowModal(true)}>
            <i className="material-icons">add</i>
            Add
          </button>
        </div>
        <Table columns={["Name", "Location", "Pincodes", "Manager", "Population Density"]} rows={data} />
      </div>
      <Modal title="add cluster" show={showModal} onClose={() => setShowModal(false)} body={modalBody()} onAdd={onAdd} />
    </Layout>
  )
}

export async function getInitialProps() {
  const res = await getClusters()
  if (res) return {
    props: {
      clusters: res
    }
  }
  else return null
}

export default index
