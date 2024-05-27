import { Person } from '../src/definitions';

const peoples: Person[] = []

const getMeetPersons = () => {
  const selector = 'div[data-self-name]';
  const persons = Array.from(document.querySelectorAll(selector));
  return persons.map((person, index) => {
    return {
      id: index,
      name: person.getAttribute('data-self-name') || '',
      spoke: false
    }
  });
}

setInterval(() => {
  const persons = getMeetPersons();
  if (persons.length) {
    if (peoples.length !== persons.length) {
      peoples.push(...persons);
      // set to local storage
      chrome.storage.local.set({ persons });
      // set to background
      chrome.runtime.sendMessage({ persons });
    }
  }
}, 1000);
