/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";

interface NotificationFormProps {
  onSubmitSuccess: () => void;
}

export default function NotificationForm({ onSubmitSuccess }: NotificationFormProps) {
  const [forminput, setForminput] = useState({ email: "" });

  const handleChange = (event: any) => {
    const { name, value } = event.target;
    setForminput((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (event: any) => {
    event.preventDefault();

    try {
      await fetch(
        "https://script.google.com/macros/s/AKfycbxJuJ22vboON9uwByOqXOolTQMCDzmDnGZSRKmMMO-BppoEiXAP5tedBAy-xrvRM5ZeiQ/exec",
        {
          method: "POST",
          mode: "no-cors",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: new URLSearchParams({
            ...forminput,
            sheetName: "Sheet2",
          }).toString(),
        }
      );
      console.log("submitted:", forminput);
      onSubmitSuccess(); // notify parent
    } catch (err) {
      console.error("Submission error", err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="notiForm">
      <div className="formItem">
        <label htmlFor="email">get notifications when I post stuff, and some random emails:</label>
        <input
          className="mailinglist"
          type="email"
          id="email"
          name="email"
          value={forminput.email}
          onChange={handleChange}
          placeholder="Your email"
        />
      </div>
    </form>
  );
}
