class VaccinationQueue {
  people = []
  front = 0
  end = 0
  name = ""

  // constructor(name) {
  //   this.name = name
  // }

  constructor({ name, people, first, end }) {
    this.name = name
    this.people = people
    this.first = first
    this.end = end
  }

  add = (person) => {
    this.people.push({ person, timestamp: new Date().toString() })
    this.end++
  }

  remove = () => {
    if (this.front === this.end) {
      this.people = []
      this.front = 0
      this.end = 0
      return false
    }
    else return this.people[this.front--]
  }
}

module.exports = VaccinationQueue