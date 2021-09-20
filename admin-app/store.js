import { useMemo } from 'react'
import { createStore } from 'redux'

let store

const initialState = {
  appointment: {
    user: "",
    cluster: "",
    vaccineBatch: "",
    dateOfAppointment: ""
  },
  cluster: {
    name: "",
    location: "",
    pincodes: "",
    manager: "",
    populationDensity: 0
  },
  staff: {
    firstName: "",
    lastName: "",
    mobileNumber: "",
    email: "",
    cluster: "",
    type: "Clerk"
  },
  vaccineBatch: {
    vaccineType: "",
    cluster: "",
    ageGroup: "",
    quantity: 0
  },
  vaccineQuota: {
    vaccineType: "",
    cluster: "",
    quota: 0,
    ageGroup: ""
  },
  vaccineType: {
    brand: "",
    jabs: 0,
    waitTime: 0
  }
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_APPOINTMENT': {
      const { user, cluster, vaccineBatch } = action.values
      return {
        ...state,
        appointment: {
          user,
          cluster,
          vaccineBatch
        }
      }
    }
    case 'ADD_CLUSTER': {
      const { name, location, pincodes, manager, populationDensity } = action.values
      return {
        ...state,
        cluster: {
          name,
          location,
          pincodes,
          manager,
          populationDensity
        }
      }
    }
    case 'ADD_STAFF': {
      const { firstName, lastName, mobileNumber, email, cluster } = action.values
      return {
        ...state,
        staff: {
          firstName,
          lastName,
          mobileNumber,
          email,
          cluster
        }
      }
    }
    case 'ADD_VACCINEBATCH': {
      const { vaccineType, cluster, ageGroup, quantity } = action.values
      return {
        ...state,
        vaccineBatch: {
          vaccineType,
          cluster,
          ageGroup,
          quantity
        }
      }
    }
    case 'ADD_VACCINEQUOTA': {
      const { vaccineType, cluster, quota, ageGroup } = action.values
      return {
        ...state,
        vaccineQuota: {
          vaccineType,
          cluster,
          quota,
          ageGroup
        }
      }
    }
    case 'ADD_VACCINETYPE': {
      const { brand, jabs, waitTime } = action.values
      return {
        ...state,
        vaccineType: {
          brand,
          jabs,
          waitTime
        }
      }
    }
    default:
      return state
  }
}

function initStore(preloadedState = initialState) {
  return createStore(
    reducer,
    preloadedState
  )
}

export const initializeStore = (preloadedState) => {
  let _store = store ?? initStore(preloadedState)

  if (preloadedState && store) {
    _store = initStore({
      ...store.getState(),
      ...preloadedState,
    })
    // Reset the current store
    store = undefined
  }

  // For SSG and SSR always create a new store
  if (typeof window === 'undefined') return _store
  // Create the store once in the client
  if (!store) store = _store

  return _store
}

export function useStore(initialState) {
  const store = useMemo(() => initializeStore(initialState), [initialState])
  return store
}
