import { useEffect, useState } from "react";
import { Contact } from "../types";
import { AddContact } from "./AddContact";
import config from "../config";

export const Contacts = () => {
  const [contactList, setContactList] = useState<Contact[]>([]);
  const [isLoading, setLoading] = useState(false);

  const loadContactList = () => {
    setLoading(true);
    fetch(`${config.apiGateway.URL}/form`)
      .then((r) => r.json())
      .then((data) => {
        setContactList(data);
      })
      .finally(() => setLoading(false));
  };

  const deleteContact = (contact: Contact) => {
    fetch(`${config.apiGateway.URL}/form/${contact.id}`, {
      method: "DELETE",
      body: JSON.stringify({ name: contact.name }),
    }).then(() => loadContactList());
  };

  useEffect(() => {
    loadContactList();
  }, []);

  return (
    <div>
      <AddContact onContactAdd={loadContactList} />

      <div style={{ marginTop: 20 }}>
        {!isLoading ? (
          contactList.length ? (
            <table cellPadding={5} border={1} style={{ margin: "auto" }}>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Birth</th>
                  <th>Hobby</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {contactList.map((contact) => (
                  <tr key={contact.id}>
                    <td>{contact.name}</td>
                    <td>{contact.birth}</td>
                    <td>{contact.hobby}</td>
                    <td>
                      <button onClick={() => deleteContact(contact)}>
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            "No Contacts found"
          )
        ) : (
          "Loading..."
        )}
      </div>
    </div>
  );
};
