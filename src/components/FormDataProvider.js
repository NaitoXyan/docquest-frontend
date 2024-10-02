import React from 'react';
import FormDataContext from './FormDataContext';

function FormDataProvider({ children }) {
  const [formData, setFormData] = useState({});

  return (
    <FormDataContext.Provider value={{ formData, setFormData }}>
      {children}
    </FormDataContext.Provider>   

  );
}