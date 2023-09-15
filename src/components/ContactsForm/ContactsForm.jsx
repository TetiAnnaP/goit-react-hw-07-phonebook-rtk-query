import css from './ContactsForm.module.css';
import { useState } from 'react';
import { useAddContactsMutation, useGetContactsQuery } from 'redux/contactsApi';

const ContactsForm = () => {
  const [addContact] = useAddContactsMutation();
  const { data = [], error, isLoading } = useGetContactsQuery();

  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const handleChangeName = e => {
    setName(e.target.value);
  };

  const handleChangeNumber = e => {
    setNumber(e.target.value);
  };

  const handleNewContact = async value => {
    try {
      await addContact(value);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = e => {
    e.preventDefault();

    const nameExists = data.some(
      contact => contact.name.toLowerCase() === name.toLowerCase()
    );
    if (nameExists) {
      alert('This name already exists in the phonebook!');
      return;
    }

    const newContact = {
      name: name,
      phone: number,
    };
    handleNewContact(newContact);

    setName('');
    setNumber('');
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label className={css.label}>
          Name
          <input
            className={css.inputName}
            type="text"
            name="name"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            value={name}
            required
            onChange={handleChangeName}
          />{' '}
        </label>

        <label className={css.label}>
          Number
          <input
            className={css.inputName}
            type="tel"
            name="number"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            value={number}
            required
            onChange={handleChangeNumber}
          />
        </label>
        <button className={css.sbmBtn} type="submit">
          Add contact
        </button>
      </form>
    </>
  );
};

export default ContactsForm;
