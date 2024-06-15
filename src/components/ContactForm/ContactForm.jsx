import React, { useState } from "react";
import PropTypes from "prop-types";
import styles from "./ContactForm.module.scss";

const ContactForm = ({ onAddContact }) => {
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const [numberError, setNumberError] = useState("");

  const handleChange = (ev) => {
    const { name, value } = ev.currentTarget;
    if (name === "number") {
      setNumber(formatPhoneNumber(value));
      validateNumber(value);
    } else {
      setName(value);
    }
  };

  const formatPhoneNumber = (value) => {
    const cleaned = ("" + value).replace(/\D/g, "");

    const match = cleaned.match(/^(\d{0,3})(\d{0,3})(\d{0,4})$/);

    if (match) {
      return [match[1], match[2], match[3]].filter(Boolean).join("-");
    }

    return value;
  };

  const validateNumber = (number) => {
    const phonePattern = /^[+]?[(]?[0-9]{1,4}[)]?[-\s./0-9]*$/;
    if (!phonePattern.test(number)) {
      setNumberError("Invalid phone number format");
    } else {
      setNumberError("");
    }
  };

  const handleSubmit = (ev) => {
    ev.preventDefault();
    if (numberError) {
      alert("Please fix the errors before submitting");
      return;
    }

    onAddContact(name, number);
    setName("");
    setNumber("");
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <label htmlFor="name">Name</label>
      <input
        id="name"
        type="text"
        name="name"
        required
        value={name}
        onChange={handleChange}
      />
      <label htmlFor="number">Phone number</label>
      <input
        id="number"
        type="tel"
        name="number"
        required
        value={number}
        onChange={handleChange}
      />
      {numberError && <span className={styles.error}>{numberError}</span>}
      <button type="submit">Add contact</button>
    </form>
  );
};

ContactForm.propTypes = {
  onAddContact: PropTypes.func.isRequired,
};

export default ContactForm;
