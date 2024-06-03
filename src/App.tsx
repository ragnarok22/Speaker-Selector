import { useEffect, useState } from 'react'
import Logo from './assets/icon.png'
import './App.css'
import PersonItem from './PersonItem'
import { Person } from './definitions'

function App() {
  const [persons, setPersons] = useState<Person[]>([])
  const [randomPerson, setRandomPerson] = useState<Person | null>(null)

  chrome.runtime.onMessage.addListener((request) => {
    console.log('received', request)
    if (request.persons) {
      // keep the state in sync with the storage
      const persons = request.persons.map((person: Person) => {
        const existingPerson = persons.find((p: Person) => p.id === person.id)
        if (existingPerson) {
          return existingPerson
        }
        return person
      })

      setPersons(persons);
    }
    return true;
  });

  const handleToggle = (checked: boolean, person: Person) => {
    setPersons((persons) =>
      persons.map((p) =>
        p.id === person.id ? { ...p, spoke: checked } : p
      )
    )
  }

  useEffect(() => {
    chrome.storage.local.get('persons', (data) => {
      console.log('data', data)
      if (data.persons) {
        setPersons(data.persons)
      }
    })
  }, [])


  return (
    <>
      <div>
        <img src={Logo} className="logo" alt="Vite logo" />
      </div>
      <h1>Select a random person to speak</h1>
      <button
        disabled={persons.filter((person) => !person.spoke).length === 0}
        onClick={() => {
          const unspoken = persons.filter((person) => !person.spoke)
          if (unspoken.length > 0) {
            const randomPerson =
              unspoken[Math.floor(Math.random() * unspoken.length)]
            setRandomPerson(randomPerson)
          }
        }}
      >
        Speak randomly
      </button>
      {randomPerson && (
        <p>
          {randomPerson.name} will speak next!
          <button
            onClick={() => {
              handleToggle(true, randomPerson)
              setRandomPerson(null)
            }}
          >
            Mark as spoken
          </button>
        </p>
      )}
      <h1>People left to speak</h1>
      <ul>
        {persons
          .filter((person) => !person.spoke)
          .map((person) => (
            <PersonItem
              key={person.id}
              person={person}
              onToggle={(checked) => handleToggle(checked, person)}
            />
          ))}
      </ul>

      <h1>Who spoke?</h1>
      <ul>
        {persons
          .filter((person) => person.spoke)
          .map((person) => (
            <PersonItem
              key={person.id}
              person={person}
              onToggle={(checked) => handleToggle(checked, person)}
            />
          ))}
      </ul>
    </>
  )
}

export default App
