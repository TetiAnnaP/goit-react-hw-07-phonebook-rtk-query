import css from './ContactList.module.css';
import {
  useGetContactsQuery,
  useDeleteContactMutation,
} from 'redux/contactsApi';

import { useSelector } from 'react-redux';
import { selectFilter } from 'redux/filterReducer';

const ContactList = () => {
  const { data = [] } = useGetContactsQuery();
  const [deleteContact] = useDeleteContactMutation();

  const filter = useSelector(selectFilter);

  const filteredContacts = data.filter(contact =>
    contact.name.toLowerCase().includes(filter)
  );

  return (
    <ul className={css.ul}>
      {filteredContacts.map(contact => {
        return (
          <li className={css.li} key={contact.id}>
            <p className={css.text}>
              {contact.name}: {contact.phone}
            </p>
            <button
              className={css.sbmBtn}
              type="button"
              id={contact.id}
              onClick={() => deleteContact(contact.id)}
            >
              Delete
            </button>
          </li>
        );
      })}
    </ul>
  );
};

export default ContactList;
