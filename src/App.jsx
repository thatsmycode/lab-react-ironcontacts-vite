import "./App.css";
import contactsJson from "./contacts.json";
import { useState } from "react";

function App() {
  const first5 = [contactsJson[0], contactsJson[1], contactsJson[2], contactsJson[3], contactsJson[4]];
  const [contacts, setContacts] = useState(first5);

  function addRandomActor() {
    let randomNum = Math.floor(Math.random() * contactsJson.length);
    let ok = false;
    const contactsCopy = [...contacts];
    while (!ok) {
      if (contactsCopy.includes(contactsJson[randomNum])) {
        randomNum = Math.floor(Math.random() * contactsJson.length);
      }
      else {
        contactsCopy.push(contactsJson[randomNum]);
        setContacts(contactsCopy);
        ok = true;
      }
    }



  }
  function sortList() {
    const sortedList = [...contacts]
    sortedList.sort((a, b) => {
      if (a.popularity < b.popularity) {
        return 1;
      }
      if (a.popularity > b.popularity) {
        return -1;
      }
      return 0;
    })
    setContacts(sortedList);
  }
  function removeFamous(id) {
    const contactsCopy = [...contacts];
    const updatedList = contactsCopy.filter((element) => {
      return element.id !== id
    })

    setContacts(updatedList)
  }
  function sortByAlphabet() {
    const contactsCopy = [...contacts];

    contactsCopy.sort((a, b) => {
      return a.name > b.name ? 1 : -1
    })
    setContacts(contactsCopy);
  }


  return (
    <div className="App">
      <button onClick={() => addRandomActor()}>add famous</button>
      <button onClick={() => sortList()}>sort by popularity</button>
      <button onClick={() => sortByAlphabet()}>sort by alphabet</button>
      <table>
        <tr>
          <th>Name</th>
          <th>Picture</th>
          <th>Popularity</th>
          <th>Oscars</th>
          <th>Emmys</th>
        </tr>
        {contacts.map((element, index) => {
          return (
            <tr key={index}>
              <img src={element.pictureUrl} />
              <td>{element.name}</td>
              <td>{element.popularity}</td>
              <td>{element.wonOscar && "🏆"}</td>
              <td>{element.wonEmmy && "🏆"}</td>
              <button onClick={() => removeFamous(element.id)}>remove</button>
            </tr>
          )
        })
        }
      </table>

    </div>
  );
}

export default App;
