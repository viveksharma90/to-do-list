import React, { useState } from 'react';
import "./App.css";
import { nanoid } from 'nanoid';
import data from "./data.json";
import ActionItem from "./comp/ActionItem";
import Editable from "./comp/Editable";

const App = () => {
  const [contacts, setContacts] = useState(data);
  const [addFormData, setAddFormData] = useState({
    Name: "",
    creationDate: "",
    age: "",
  });

  const [editFormData, setEditFormData] = useState({
    Name: "",
    creationDate: "",
    age: "",
  });

  const [editContactId, setEditContactId] = useState(null);

  const handleAddFormChange = (event) => {
    event.preventDefault();

    const fieldName = event.target.getAttribute("name");
    const fieldValue = event.target.value;

    const newFormData = { ...addFormData };
    newFormData[fieldName] = fieldValue;

    setAddFormData(newFormData);
  };

  const handleEditFormChange = (event) => {
    event.preventDefault();

    const fieldName = event.target.getAttribute("name");
    const fieldValue = event.target.value;

    const newFormData = { ...editFormData };
    newFormData[fieldName] = fieldValue;

    setEditFormData(newFormData);
  };

  const handleAddFormSubmit = (event) => {
    event.preventDefault();

    const newContact = {
      id: nanoid(),
      name: addFormData.name,
      date: addFormData.date,
      age: addFormData.age,
    };

    const newContacts = [...contacts, newContact];
    setContacts(newContacts);
  };

  const handleEditFormSubmit = (event) => {
    event.preventDefault();

    const editedContact = {
      id: editContactId,
      name: editFormData.name,
      date: editFormData.date,
      age: editFormData.age,
    };

    const newContacts = [...contacts];

    const index = contacts.findIndex((contact) => contact.id === editContactId);

    newContacts[index] = editedContact;

    setContacts(newContacts);
    setEditContactId(null);
  };

  const handleEditClick = (event, contact) => {
    event.preventDefault();
    setEditContactId(contact.id);

    const formValues = {
      name: contact.name,
      date: contact.date,
      age: contact.age,
    };

    setEditFormData(formValues);
  };

  const handleCancelClick = () => {
    setEditContactId(null);
  };

  const handleDeleteClick = (contactId) => {
    const newContacts = [...contacts];

    const index = contacts.findIndex((contact) => contact.id === contactId);

    newContacts.splice(index, 1);

    setContacts(newContacts);
  };

  return (
    <div className="app-container">
      <h2>To do list table</h2>
      <form onSubmit={handleAddFormSubmit}>
        <label>Name</label>
        <input
          type="text"
          name="name"
          required="required"
          onChange={handleAddFormChange}
        />
        <label>Date</label>
        <input
          type="text"
          name="date"
          required="required"
          onChange={handleAddFormChange}
        />
        <label>Age</label>
        <input
          type="text"
          name="age"
          required="required"
          onChange={handleAddFormChange}
        />
        <button type="submit">Add</button>
      </form>

      <form onSubmit={handleEditFormSubmit}>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Creation Date</th>
              <th>Age</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {contacts.map((contact) => (
              editContactId === contact.id ? (
                <Editable
                  editFormData={editFormData}
                  handleEditFormChange={handleEditFormChange}
                  handleCancelClick={handleCancelClick}
                />
              ) : (
                <ActionItem
                  contact={contact}
                  handleEditClick={handleEditClick}
                  handleDeleteClick={handleDeleteClick}
                />
              )
            ))}
          </tbody>
        </table>
      </form>
    </div>
  );
};

export default App;
