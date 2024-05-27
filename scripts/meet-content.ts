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

const timer = setInterval(() => {
  const persons = getMeetPersons();
  if (persons.length) {
    clearInterval(timer);
    console.log(persons);
    // set to background
    chrome.runtime.sendMessage({ persons });
  }
}, 1000);
