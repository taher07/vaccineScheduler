const expect = require('chai').expect
const { signIn, getToken, getAllVaccineTypes, getVaccineType, addVaccineType, updateVaccineType, deleteVaccineType, getAllVaccineBatches, getVaccineBatch, addVaccineBatch, updateVaccineBatch, deleteVaccineBatch, getAllVaccineQuota, getVaccineQuota, addVaccineQuota, updateVaccineQuota, deleteVaccineQuota, getAllClusters, getCluster, addCluster, updateCluster, deleteCluster, getAllUsers, getUser, addUser, updateUser, deleteUser, getAllStaff, getStaff, addStaff, updateStaff, deleteStaff, getAllAppointments, getAppointment, addAppointment, updateAppointment, deleteAppointment } = require("../services/staff")

describe("auth", () => {
  before(() => {
    const staff = [
      {
        firstName: "taher",
        lastName: "lunawadi",
        mobileNumber: "785621490",
        email: "taherlunawadi.mscit18@vnsgu.ac.in",
        password: "Tnode@123",
        clusterID: "1",
        type: "Administrator"
      },
      {
        firstName: "kusai",
        lastName: "lunawadi",
        mobileNumber: "665621490",
        email: "kusailunawadi.mscit18@vnsgu.ac.in",
        password: "Kusai@123",
        clusterID: "1",
        type: "Moderator"
      },
      {
        firstName: "Shlesha",
        lastName: "Shah",
        mobileNumber: "795621490",
        email: "shleshashah.mscit18@vnsgu.ac.in",
        password: "Shah@123",
        clusterID: "1",
        type: "Manager"
      },
      {
        firstName: "Khushi",
        lastName: "shah",
        mobileNumber: "985621490",
        email: "khushishah.mscit18@vnsgu.ac.in",
        password: "Khush!123",
        clusterID: "1",
        type: "Paramedic"
      },
    ]
    const manager = new (require("../database/staff"))()

    staff.map(user => manager.create(user))
  })

  after(() => {
    const manager = new (require("../database/staff"))()
    const staff = manager.fetchAll()

    staff.map(user => manager.delete(user._id))
  })

  it("should login successfully", () => {
    const data = [
      {
        email: "shleshashah.mscit18@vnsgu.ac.in",
        password: "shah@123"
      },
      {
        email: "taherlunawadi.mscit18@vnsgu.ac.in",
        password: "Tnode@123"
      }
    ]
    data.map(item => expect(signIn(item.email, item.password)).to.be.a("object"))
  })

  it("should not login", () => {
    const data = [
      {
        email: "manishashah.mscit18@vnsgu.ac.in",
        password: "shah@123"
      },
      {
        email: "burhanuddinlunawadi.mscit18@vnsgu.ac.in",
        password: "Tnode@123"
      }
    ]
    data.map(item => expect(signIn(item.email, item.password)).to.be.false)
  })

  it("should get a refresh token", () => {
    const data = []
    data.map(item => expect(getToken(item)).to.be.a("string"))
  })

  it("shouldn't get a refresh token", () => {
    const data = []
    data.map(item => expect(getToken(item)).to.be.false)
  })
})

describe("vaccine type", () => {
  let identities = []
  before(() => {
    const vaccineTypes = []
    const manager = new (require("../database/vaccineType"))()

    vaccineTypes.map(type => {
      manager.create(type)
      identities.push(type._id)
    })
  })

  after(() => {
    const manager = new (require("../database/vaccineType"))()
    const vaccineTypes = manager.fetchAll()

    vaccineTypes.map(type => manager.delete(type._id))
  })

  it("should get all of 'em", () => {
    expect(getAllVaccineTypes()).to.be.an("array")
  })

  it("should get one", () => {
    const data = [...identities]
    data.map(item => expect(getVaccineType(data._id)).to.be.a("object"))
  })

  it("shouldn't get one", () => {
    const data = []
    data.map(item => expect(getVaccineType(data._id)).to.be.false)
  })

  it("should add one", () => {
    const data = []
    data.map(item => expect(addVaccineType(item)).to.be.true)
  })

  it("shouldn't add one", () => {
    const data = []
    data.map(item => expect(addVaccineType(item)).to.be.false)
  })

  it("should update one", () => {
    const data = []
    data.map(item => expect(updateVaccineType(item.id, item.payload)).to.be.true)
  })

  it("shouldn't update one", () => {
    const data = []
    data.map(item => expect(updateVaccineType(item.id, item.payload)).to.be.false)
  })

  it("should delete one", () => {
    const data = [...identities]
    data.map(item => expect(deleteVaccineType(item)).to.be.true)
  })

  it("shouldn't delete one", () => {
    const data = []
    data.map(item => expect(deleteVaccineType(item)).to.be.false)
  })
})

describe("vaccine batch", () => {
  let identities = []
  before(() => {
    const vaccineBatches = []
    const manager = new (require("../database/vaccineBatch"))()

    vaccineBatches.map(batch => manager.create(batch))
  })

  after(() => {
    const manager = new (require("../database/vaccineBatch"))()
    const vaccineBatches = manager.fetchAll()

    vaccineBatches.map(batch => manager.delete(batch._id))
  })

  it("should get all of 'em", () => {
    expect(getAllVaccineBatches()).to.be.an("array")
  })

  it("should get one", () => {
    const data = [...identities]
    data.map(item => expect(getVaccineBatch(data._id)).to.be.a("object"))
  })

  it("shouldn't get one", () => {
    const data = []
    data.map(item => expect(getVaccineBatch(data._id)).to.be.false)
  })

  it("should add one", () => {
    const data = []
    data.map(item => expect(addVaccineBatch(item)).to.be.true)
  })

  it("shouldn't add one", () => {
    const data = []
    data.map(item => expect(addVaccineBatch(item)).to.be.false)
  })

  it("should update one", () => {
    const data = []
    data.map(item => expect(updateVaccineBatch(item.id, item.payload)).to.be.true)
  })

  it("shouldn't update one", () => {
    const data = []
    data.map(item => expect(updateVaccineBatch(item.id, item.payload)).to.be.false)
  })

  it("should delete one", () => {
    const data = [...identities]
    data.map(item => expect(deleteVaccineBatch(item)).to.be.true)
  })

  it("shouldn't delete one", () => {
    const data = []
    data.map(item => expect(deleteVaccineBatch(item)).to.be.false)
  })
})

describe("vaccine quota", () => {
  let identities = []
  before(() => {
    const vaccineQuota = []
    const manager = new (require("../database/vaccineQuota"))()

    vaccineQuota.map(quota => manager.create(quota))
  })

  after(() => {
    const manager = new (require("../database/vaccineQuota"))()
    const vaccineQuota = manager.fetchAll()

    vaccineQuota.map(quota => manager.delete(quota._id))
  })

  it("should get all of 'em", () => {
    expect(getAllVaccineQuota()).to.be.an("array")
  })

  it("should get one", () => {
    const data = [...identities]
    data.map(item => expect(getVaccineQuota(data._id)).to.be.a("object"))
  })

  it("shouldn't get one", () => {
    const data = []
    data.map(item => expect(getVaccineQuota(data._id)).to.be.false)
  })

  it("should add one", () => {
    const data = []
    data.map(item => expect(addVaccineQuota(item)).to.be.true)
  })

  it("shouldn't add one", () => {
    const data = []
    data.map(item => expect(addVaccineQuota(item)).to.be.false)
  })

  it("should update one", () => {
    const data = []
    data.map(item => expect(updateVaccineQuota(item.id, item.payload)).to.be.true)
  })

  it("shouldn't update one", () => {
    const data = []
    data.map(item => expect(updateVaccineQuota(item.id, item.payload)).to.be.false)
  })

  it("should delete one", () => {
    const data = [...identities]
    data.map(item => expect(deleteVaccineQuota(item)).to.be.true)
  })

  it("shouldn't delete one", () => {
    const data = []
    data.map(item => expect(deleteVaccineQuota(item)).to.be.false)
  })
})

describe("cluster", () => {
  let identities = []
  before(() => {
    const clusters = []
    const manager = new (require("../database/cluster"))()

    clusters.map(cluster => manager.create(cluster))
  })

  after(() => {
    const manager = new (require("../database/cluster"))()
    const clustrs = manager.fetchAll()

    clustrs.map(cluster => manager.delete(cluster._id))
  })

  it("should get all of 'em", () => {
    expect(getAllClusters()).to.be.an("array")
  })

  it("should get one", () => {
    const data = [...identities]
    data.map(item => expect(getCluster(data._id)).to.be.a("object"))
  })

  it("shouldn't get one", () => {
    const data = []
    data.map(item => expect(getCluster(data._id)).to.be.false)
  })

  it("should add one", () => {
    const data = []
    data.map(item => expect(addCluster(item)).to.be.true)
  })

  it("shouldn't add one", () => {
    const data = []
    data.map(item => expect(addCluster(item)).to.be.false)
  })

  it("should update one", () => {
    const data = []
    data.map(item => expect(updateCluster(item.id, item.payload)).to.be.true)
  })

  it("shouldn't update one", () => {
    const data = []
    data.map(item => expect(updateCluster(item.id, item.payload)).to.be.false)
  })

  it("should delete one", () => {
    const data = [...identities]
    data.map(item => expect(deleteCluster(item)).to.be.true)
  })

  it("shouldn't delete one", () => {
    const data = []
    data.map(item => expect(deleteCluster(item)).to.be.false)
  })
})

describe("user", () => {
  let identities = []
  before(() => {
    const users = []
    const manager = new (require("../database/user"))()

    users.map(user => manager.create(user))
  })

  after(() => {
    const manager = new (require("../database/user"))()
    const users = manager.fetchAll()

    users.map(user => manager.delete(user._id))
  })

  it("should get all of 'em", () => {
    expect(getAllUsers()).to.be.an("array")
  })

  it("should get one", () => {
    const data = [...identities]
    data.map(item => expect(getUser(data._id)).to.be.a("object"))
  })

  it("shouldn't get one", () => {
    const data = []
    data.map(item => expect(getUser(data._id)).to.be.false)
  })

  it("should add one", () => {
    const data = []
    data.map(item => expect(addUser(item)).to.be.true)
  })

  it("shouldn't add one", () => {
    const data = []
    data.map(item => expect(addUser(item)).to.be.false)
  })

  it("should update one", () => {
    const data = []
    data.map(item => expect(updateUser(item.id, item.payload)).to.be.true)
  })

  it("shouldn't update one", () => {
    const data = []
    data.map(item => expect(updateUser(item.id, item.payload)).to.be.false)
  })

  it("should delete one", () => {
    const data = [...identities]
    data.map(item => expect(deleteUser(item)).to.be.true)
  })

  it("shouldn't delete one", () => {
    const data = []
    data.map(item => expect(deleteUser(item)).to.be.false)
  })
})

describe("staff", () => {
  let identities = []
  before(() => {
    const staff = []
    const manager = new (require("../database/staff"))()

    staff.map(user => manager.create(user))
  })

  after(() => {
    const manager = new (require("../database/staff"))()
    const staff = manager.fetchAll()

    staff.map(user => manager.delete(user._id))
  })

  it("should get all of 'em", () => {
    expect(getAllStaff()).to.be.an("array")
  })

  it("should get one", () => {
    const data = [...identities]
    data.map(item => expect(getStaff(data._id)).to.be.a("object"))
  })

  it("shouldn't get one", () => {
    const data = []
    data.map(item => expect(getStaff(data._id)).to.be.false)
  })

  it("should add one", () => {
    const data = []
    data.map(item => expect(addStaff(item)).to.be.true)
  })

  it("shouldn't add one", () => {
    const data = []
    data.map(item => expect(addStaff(item)).to.be.false)
  })

  it("should update one", () => {
    const data = []
    data.map(item => expect(updateStaff(item.id, item.payload)).to.be.true)
  })

  it("shouldn't update one", () => {
    const data = []
    data.map(item => expect(updateStaff(item.id, item.payload)).to.be.false)
  })

  it("should delete one", () => {
    const data = [...identities]
    data.map(item => expect(deleteStaff(item)).to.be.true)
  })

  it("shouldn't delete one", () => {
    const data = []
    data.map(item => expect(deleteStaff(item)).to.be.false)
  })
})

describe("appointment", () => {
  let identities = []
  before(() => {
    const appointments = []
    const manager = new (require("../database/appointment"))()

    appointments.map(appointment => manager.create(appointment))
  })

  after(() => {
    const manager = new (require("../database/appointment"))()
    const appointments = manager.fetchAll()

    appointments.map(appointment => manager.delete(appointment._id))
  })

  it("should get all of 'em", () => {
    expect(getAllAppointments()).to.be.an("array")
  })

  it("should get one", () => {
    const data = [...identities]
    data.map(item => expect(getAppointment(data._id)).to.be.a("object"))
  })

  it("shouldn't get one", () => {
    const data = []
    data.map(item => expect(getAppointment(data._id)).to.be.false)
  })

  it("should add one", () => {
    const data = []
    data.map(item => expect(addAppointment(item)).to.be.true)
  })

  it("shouldn't add one", () => {
    const data = []
    data.map(item => expect(addAppointment(item)).to.be.false)
  })

  it("should update one", () => {
    const data = []
    data.map(item => expect(updateAppointment(item.id, item.payload)).to.be.true)
  })

  it("shouldn't update one", () => {
    const data = []
    data.map(item => expect(updateAppointment(item.id, item.payload)).to.be.false)
  })

  it("should delete one", () => {
    const data = [...identities]
    data.map(item => expect(deleteAppointment(item)).to.be.true)
  })

  it("shouldn't delete one", () => {
    const data = []
    data.map(item => expect(deleteAppointment(item)).to.be.false)
  })
})
