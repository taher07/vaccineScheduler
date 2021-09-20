import React, { useEffect, useState } from "react";
import { CSSTransition } from "react-transition-group";
import { useSelector, connect } from 'react-redux'
import style from "./Modal.module.css";

import { addAppointment, updateAppointment, addCluster, updateCluster, addStaff, updateStaff, addVaccineBatch, updateVaccineBatch, addVaccineQuota, updateVaccineQuota, addVaccineType, updateVaccineType } from "../api"

const Modal = props => {
  const [error, setError] = useState(false)
  const closeOnEscapeKeyDown = e => {
    if ((e.charCode || e.keyCode) === 27) {
      props.onClose();
    }
  };

  useEffect(() => {
    document.body.addEventListener("keydown", closeOnEscapeKeyDown);
    return function cleanup() {
      document.body.removeEventListener("keydown", closeOnEscapeKeyDown);
    };
  }, []);

  const onAdd = async () => {
    if (props.title === "add appointment") {
      const res = await addAppointment(props.appointment)

      if (!res || res.err) setError("There seems to be a problem!")
      else props.onAdd()
    }
    else if (props.title === "update appointment") {
      const res = await updateAppointment(props.appointment)

      if (!res || res.err) setError("There seems to be a problem!")
      else props.onAdd()
    }
    else if (props.title === "add cluster") {
      const res = await addCluster(props.cluster)

      if (!res || res.err) setError("There seems to be a problem!")
      else props.onAdd()
    }
    else if (props.title === "update cluster") {
      const res = await updateCluster(props.cluster)

      if (!res || res.err) setError("There seems to be a problem!")
      else props.onAdd()
    }
    else if (props.title === "add staff") {
      const res = await addStaff(props.staff)

      if (!res || res.err) setError("There seems to be a problem!")
      else props.onAdd()
    }
    else if (props.title === "update staff") {
      const res = await updateStaff(props.staff)

      if (!res || res.err) setError("There seems to be a problem!")
      else props.onAdd()
    }
    else if (props.title === "add vaccine batch") {
      const res = await addVaccineBatch(props.vaccineBatch)

      if (!res || res.err) setError("There seems to be a problem!")
      else props.onAdd()
    }
    else if (props.title === "update vaccine batch") {
      const res = await updateVaccineBatch(props.vaccineBatch)

      if (!res || res.err) setError("There seems to be a problem!")
      else props.onAdd()
    }
    else if (props.title === "add vaccine quota") {
      const res = await addVaccineQuota(props.vaccineQuota)

      if (!res || res.err) setError("There seems to be a problem!")
      else props.onAdd()
    }
    else if (props.title === "update vaccine quota") {
      const res = await updateVaccineQuota(props.vaccineQuota)

      if (!res || res.err) setError("There seems to be a problem!")
      else props.onAdd()
    }
    else if (props.title === "add vaccine type") {
      const res = await addVaccineType(props.vaccineType)

      if (!res || res.err) setError("There seems to be a problem!")
      else props.onAdd()
    }
    else if (props.title === "update vaccine type") {
      const res = await updateVaccineType(props.vaccineType)

      if (!res || res.err) setError("There seems to be a problem!")
      else props.onAdd()
    }
  }

  return (
    <CSSTransition
      in={props.show}
      unmountOnExit
      timeout={{ enter: 300, exit: 300 }}
    >
      <div className={style.modal} onClick={props.onClose}>
        <div className={style.modalContent} onClick={e => e.stopPropagation()}>
          <div className={`${style.modalHeader} ${style.blue}`}>
            <h4 className={style.modalTitle}>{props.title}</h4>
          </div>
          <div className={style.modalBody}>
            {error ? <div className={`${style.modalError}`}></div> : props.body}
          </div>
          <div className={style.modalFooter}>
            <button onClick={props.onClose} className={`${style.btn} ${style.blue}`}>
              Close
            </button>
            {!error &&
              <button onClick={onAdd} className={`${style.btn} ${style.blue}`}>
                Add
              </button>
            }
          </div>
        </div>
      </div>
    </CSSTransition>
  );
};

const mapStateToProps = state => {
  const { appointment, cluster, staff, vaccineBatch, vaccineQuota, vaccineType } = state
  return {
    appointment, cluster, staff, vaccineBatch, vaccineQuota, vaccineType
  }
}

export default connect(mapStateToProps)(Modal);
