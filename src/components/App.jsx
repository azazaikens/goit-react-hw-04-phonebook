import { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import { FormContacts } from './Formcontacts/Formcontacts';
import { ListContacts } from './Listcontacts/Listcontacts';
import { Filter } from './Filter/Filter';

export const App = () => {
  const [filter, setFilter] = useState('');
  const [contacts, setContacts] = useState(
    () => JSON.parse(localStorage.getItem('key')) ?? []
  );
  // state = {
  //   contacts: [
  //     { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
  //     { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
  //     { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
  //     { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
  //   ],
  //   filter: '',
  // };

  // componentDidMount() {
  //   const contacts = JSON.parse(localStorage.getItem('contacts'));
  //   if (contacts) {
  //     this.setState({contacts})
  //   }
  // }

  // componentDidUpdate() {
  //   localStorage.setItem('contacts', JSON.stringify(contacts));
  // };
  useEffect(() => {
    const stringifiedContacts = JSON.stringify(contacts);
    localStorage.setItem('key', stringifiedContacts);
  }, [contacts]);

  const handleAddContact = data => {
    const { name, number } = data;

    if (
      contacts.find(
        contact => contact.name === name && contact.number === number
      )
    ) {
      alert(`${name} is already in contacts.`);
      return;
    }

    setContacts(prevContacts => 
      [...prevContacts, { ...data, id: nanoid() }],
    );
  };

  const handleFilterChange = event => {
    const inputFilter = event.target.value;
    setFilter(inputFilter);
  };

  const deleteContact = contactId => {
    setContacts(prevContacts => 
      prevContacts.filter(contact => contact.id !== contactId),
    );
  };


  const filterContacts = contacts.filter(contact => {
    return (
      contact.name.toLowerCase().includes(filter.trim().toLowerCase()) ||
      contact.number.includes(filter)
    );
  });
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '10px',
      }}
    >
      <h1>Phonebook</h1>
      <FormContacts handleAddContact={handleAddContact} />
      <h2>Contacts</h2>
      <Filter onChange={handleFilterChange} filter={filter} />
      <ListContacts
        contacts={filterContacts}
        deleteContact={deleteContact}
      />
    </div>
  );
};
