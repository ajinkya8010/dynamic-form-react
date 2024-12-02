export const fetchFormFields = (formType) => {
    const forms = {
      "User Information": {
        fields: [
          { name: "firstName", type: "text", label: "First Name", required: true },
          { name: "lastName", type: "text", label: "Last Name", required: true },
          { name: "age", type: "number", label: "Age", required: false },
        ],
      },
      "Address Information": {
        fields: [
          { name: "street", type: "text", label: "Street", required: true },
          { name: "city", type: "text", label: "City", required: true },
          {
            name: "state",
            type: "dropdown",
            label: "State",
            options: ["California", "Texas", "New York"],
            required: true,
          },
          { name: "zipCode", type: "text", label: "Zip Code", required: false },
        ],
      },
      "Payment Information": {
        fields: [
          { name: "cardNumber", type: "text", label: "Card Number", required: true },
          { name: "expiryDate", type: "date", label: "Expiry Date", required: true },
          { name: "cvv", type: "password", label: "CVV", required: true },
          { name: "cardholderName", type: "text", label: "Cardholder Name", required: true },
        ],
      },
    };
    return Promise.resolve(forms[formType] || { fields: [] });
  };
  