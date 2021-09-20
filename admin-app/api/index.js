const axios = require('axios')

const CancelToken = axios.default.CancelToken;
const source = CancelToken.source();

const URL = process.env.URL || "http://localhost:3200/api/v1/staff"
// const id = localStorage.getItem("userID") || ""

exports.signIn = (username, password) => {
  return new Promise((resolve, reject) => resolve("token"))
}

// TASK: Appointment
exports.getAppointments = () => {
  const token = localStorage.getItem("token") || null

  if (!token) return false
  else return axios.get(`${URL}/ap/${id}`, {
    cancelToken: source.token
  })
}

exports.addAppointment = (payload) => {
  const token = localStorage.getItem("token") || null

  if (!token) return false
  else return axios.post(`${URL}/ap/${id}/add`, {
    userID: payload.user,
    clusterID: payload.cluster,
    vaccineBatchID: payload.vaccineBatch
  }, {
    cancelToken: source.token
  })
}

exports.updateAppointment = (payload) => {
  const token = localStorage.getItem("token") || null

  if (!token) return false
  else return axios.put(`${URL}/ap/${id}`, {
    userID: payload.user,
    clusterID: payload.cluster,
    vaccineBatchID: payload.vaccineBatch
  }, {
    cancelToken: source.token
  })
}

// TASK: Cluster
exports.getClusters = () => {
  const token = localStorage.getItem("token") || null

  if (!token) return false
  else return axios.get(`${URL}/cl/${id}`, {
    cancelToken: source.token
  })
}

exports.addCluster = (payload) => {
  const token = localStorage.getItem("token") || null

  if (!token) return false
  else return axios.post(`${URL}/cl/${id}/add`, {
    location: payload.location,
    name: payload.name,
    pinCodes: payload.pincodes,
    managerID: payload.manager,
    populationDensity: payload.populationDensity
  }, {
    cancelToken: source.token
  })
}

exports.updateCluster = (payload) => {
  const token = localStorage.getItem("token") || null

  if (!token) return false
  else return axios.put(`${URL}/cl/${id}`, {
    location: payload.location,
    name: payload.name,
    pinCodes: payload.pincodes,
    managerID: payload.manager,
    populationDensity: payload.populationDensity
  }, {
    cancelToken: source.token
  })
}

// TASK: Staff
exports.getStaff = () => {
  const token = localStorage.getItem("token") || null

  if (!token) return false
  else return axios.get(`${URL}/st/${id}`, {
    cancelToken: source.token
  })
}

exports.addStaff = (payload) => {
  const token = localStorage.getItem("token") || null

  if (!token) return false
  else return axios.post(`${URL}/st/${id}/add`, {
    firstName: payload.firstName,
    lastName: payload.lastName,
    mobileNumber: payload.mobileNumber,
    email: payload.email,
    password: "password",
    clusterID: payload.cluster,
    type: payload.type
  }, {
    cancelToken: source.token
  })
}

exports.updateStaff = (payload) => {
  const token = localStorage.getItem("token") || null

  if (!token) return false
  else return axios.put(`${URL}/st/${id}`, {
    firstName: payload.firstName,
    lastName: payload.lastName,
    mobileNumber: payload.mobileNumber,
    email: payload.email,
    password: "password",
    clusterID: payload.cluster,
    type: payload.type
  }, {
    cancelToken: source.token
  })
}

// TASK: User
exports.getUsers = () => {
  const token = localStorage.getItem("token") || null

  if (!token) return false
  else return axios.get(`${URL}/us/${id}`, {
    cancelToken: source.token
  })
}

// TASK: Vaccine Batch
exports.getVaccineBatches = () => {
  const token = localStorage.getItem("token") || null

  if (!token) return false
  else return axios.get(`${URL}/vb/${id}`, {
    cancelToken: source.token
  })
}

exports.addVaccineBatch = (payload) => {
  const token = localStorage.getItem("token") || null

  if (!token) return false
  else return axios.post(`${URL}/vb/${id}/add`, {
    vaccineTypeID: payload.vaccineType,
    clusterID: payload.cluster,
    ageGroup: payload.ageGroup,
    quantity: payload.quantity
  }, {
    cancelToken: source.token
  })
}

exports.updateVaccineBatch = (payload) => {
  const token = localStorage.getItem("token") || null

  if (!token) return false
  else return axios.put(`${URL}/vb/${id}`, {
    vaccineTypeID: payload.vaccineType,
    clusterID: payload.cluster,
    ageGroup: payload.ageGroup,
    quantity: payload.quantity
  }, {
    cancelToken: source.token
  })
}

// TASK: Vaccine Quota
exports.getVaccineQuota = () => {
  const token = localStorage.getItem("token") || null

  if (!token) return false
  else return axios.get(`${URL}/vq/${id}`, {
    cancelToken: source.token
  })
}

exports.addVaccineQuota = (payload) => {
  const token = localStorage.getItem("token") || null

  if (!token) return false
  else return axios.post(`${URL}/vq/${id}/add`, {
    vaccineTypeID: payload.vaccineType,
    clusterID: payload.cluster,
    ageGroup: payload.ageGroup,
    quota: payload.quota
  }, {
    cancelToken: source.token
  })
}

exports.updateVaccineQuota = (payload) => {
  const token = localStorage.getItem("token") || null

  if (!token) return false
  else return axios.put(`${URL}/vq/${id}`, {
    vaccineTypeID: payload.vaccineType,
    clusterID: payload.cluster,
    ageGroup: payload.ageGroup,
    quota: payload.quota
  }, {
    cancelToken: source.token
  })
}

// TASK: Vaccine Type
exports.getVaccineTypes = () => {
  const token = localStorage.getItem("token") || null

  if (!token) return false
  else return axios.get(`${URL}/vt/${id}`, {
    cancelToken: source.token
  })
}

exports.addVaccineType = (payload) => {
  const token = localStorage.getItem("token") || null

  if (!token) return false
  else return axios.post(`${URL}/vt/${id}/add`, {
    brand: payload.brand,
    jabsRequired: payload.jabs,
    waitTime: payload.waitTime
  }, {
    cancelToken: source.token
  })
}

exports.updateVaccineType = (payload) => {
  const token = localStorage.getItem("token") || null

  if (!token) return false
  else return axios.put(`${URL}/vt/${id}`, {
    brand: payload.brand,
    jabsRequired: payload.jabs,
    waitTime: payload.waitTime
  }, {
    cancelToken: source.token
  })
}
