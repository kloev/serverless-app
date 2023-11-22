import { useState } from "react";

interface AddContactProps {
  onContactAdd: () => void;
}

export const AddContact = ({ onContactAdd }: AddContactProps) => {
  const [values, setValues] = useState<Record<string, any>>({});

  const updateData: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    if (!values.name || !values.birth|| !values.hobby) return;
    const blka = await fetch(`${process.env.REACT_APP_API_URL}/form`, {
      method: "POST",
      body: JSON.stringify(values),
      headers: {
        'content-type': "application/json"
      }
    });
    onContactAdd();
    setValues(blka.json());
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          onChange={updateData}
          value={values.name || ""}
        />
        <input
          type="text"
          name="birth"
          onChange={updateData}
          value={values.birth || ""}
        />
        <input
          type="text"
          name="hobby"
          onChange={updateData}
          value={values.hobby || ""}
        />
        <button>Add Contact</button>
      </form>
    </div>
  );
};
