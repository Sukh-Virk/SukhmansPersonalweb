import React from "react";
import { useForm, ValidationError } from "@formspree/react";
import "./App.css"; // Assuming your styles for light/dark mode are already there

function ContactForm({ theme }) {
  const [state, handleSubmit] = useForm("xqaelvpq");
  const darkMode = theme === "dark";

  if (state.succeeded) {
    return (
      <p className={`success-message ${darkMode ? "dark-mode-text" : ""}`}>
        Thank you for your message! 🎉
      </p>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={`contact-form ${darkMode ? "dark-form" : "light-form"}`}
    >
      <label htmlFor="email">Email Address</label>
      <input
        id="email"
        type="email"
        name="email"
        placeholder="Enter your email"
        required
        className={darkMode ? "dark-input" : "light-input"}
      />
      <ValidationError prefix="Email" field="email" errors={state.errors} />

      <label htmlFor="message">Message</label>
      <textarea
        id="message"
        name="message"
        placeholder="Write your message here..."
        rows="5"
        required
        className={darkMode ? "dark-input" : "light-input"}
      />
      <ValidationError prefix="Message" field="message" errors={state.errors} />

      <button
        type="submit"
        disabled={state.submitting}
        className={`form-button ${darkMode ? "dark-button" : "light-button"}`}
      >
        Send Message 🚀
      </button>
    </form>
  );
}

export default ContactForm;
