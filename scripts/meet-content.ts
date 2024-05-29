import { Person } from '../src/definitions'

const global_people: Person[] = []

const parsePerson = (id: number, name) => {
  let parsedName = name
  if (name && name.includes('\n')) {
    parsedName = name.split('\n')[0]
  }
  return {
    id,
    name: parsedName || '',
    spoke: false
  }
}

const getMeetPersons = () => {
  const selector = 'div[data-self-name]'
  const people = Array.from(document.querySelectorAll(selector))
  return people.map((person, index) => {
    return parsePerson(index, person.innerText)
  })
}

setInterval(() => {
  const persons = getMeetPersons()
  if (persons.length) {
    if (global_people.length !== persons.length) {
      global_people.push(...persons)
      // set to local storage
      chrome.storage.local.set({ persons })
      // set to background
      chrome.runtime.sendMessage({ persons })
    }
  }
}, 1000)
