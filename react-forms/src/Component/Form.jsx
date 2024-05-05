import { useState } from "react";

function Form() {
  const [formSubmit, setFormSubmit] = useState(false);
  const [formErr, setFormErr] = useState({});

  const [formData, setFormData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    phone: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validation = (values) => {
    const errors = {};

    if (values.firstName.trim() === "") {
      errors.firstName = "Please enter your first name";
    }
    if (values.lastName.trim() === "") {
      errors.lastName = "Please enter your last name";
    }
    if (values.email.trim() === "") {
      errors.email = "Please enter your email";
    }
    if (values.phone.trim() === "") {
      errors.phone = "Please enter your phone number";
    } else if (!/^\d{10}$/.test(values.phone)) {
      errors.phone = "Please enter a valid 10-digit number";
    }

    return errors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let errors = validation(formData);
    setFormErr(errors);

    if (Object.keys(errors).length === 0) {
      console.log("Form data submitted:", formData);
      setFormSubmit(true);
    } else {
      setFormSubmit(false);
    }
  };

  return (
    <div id="form-container">
      <form id="form" onSubmit={handleSubmit}>
        {formSubmit && (
          <div id="successful">
            <p>Registration Successful</p>
          </div>
        )}

        <label>First Name:</label>
        <input
          type="text"
          name="firstName"
          value={formData.firstName}
          onChange={handleInputChange}
        />
        {formErr.firstName && <p className="error">{formErr.firstName}</p>}

        <label>Last Name:</label>
        <input
          type="text"
          name="lastName"
          value={formData.lastName}
          onChange={handleInputChange}
        />
        {formErr.lastName && <p className="error">{formErr.lastName}</p>}

        <label>Email:</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
        />
        {formErr.email && <p className="error">{formErr.email}</p>}

        <label>Phone:</label>
        <input
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={handleInputChange}
        />
        {formErr.phone && <p className="error">{formErr.phone}</p>}

        <input id="submit" type="submit" value="Submit" />
      </form>
    </div>
  );
}

export default Form;