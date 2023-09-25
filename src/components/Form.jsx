
import React, { useState, useEffect } from 'react';

function Form() {
      const initialValues = {fullname: '', email: ''};
      const [formValues, setFormValues] = useState(initialValues);
      const [formErrors, setFormErrors] = useState({});
      const [isSubmit, setIsSubmit] = useState(false);
      const [file, setFile] = useState(null);
      const [jsonData, setJsonData] = useState(null);

      const handleChange = (e) => {
        const {name, value} = e.target;
        console.log('name', name, 'value', value);
        setFormValues({...formValues, [name]: value});
        console.log(formValues);
      };
      const handleSubmit = (e) => {
           e.preventDefault();
           setFormErrors(validate(formValues));
           setIsSubmit(true);
      };

      const handleFileChange = (e) => {
        const file = e.target.files[0];
        setFile(file);
        if (file.type !== "application/json") {
            alert("Please upload a JSON file.");
            return;
          }
          const reader = new FileReader();
             reader.onload = () => {
          const jsonData = JSON.parse(reader.result);
              setJsonData(jsonData);
        
    };
    reader.readAsText(file);
      }
      useEffect(() => {
        console.log(formErrors);
        if(Object.keys(formErrors).length === 0 && isSubmit) {
            console.log(formValues);
        }
      }, [formErrors, formValues, isSubmit]);
      const validate = (values) => {
      const errors = {};
      const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
      const regexp = /^[a-z,',-]+(\s)[a-z,',-]+$/i;
      if(!values.fullname) {
        errors.fullname = 'Field is required!';
      } else if(!regexp.test(values.fullname)) {
        errors.fullname = 'Full Name is required!';
      }
      if(!values.email) {
        errors.email = 'Field is required!';
      }  else if(!regex.test(values.email)) {
        errors.email = "This is not a valid email format!";
      }
      return errors;
      }

      const isSubmitButtonDisabled = !jsonData;
  return (

    <div>
                {Object.keys(formErrors).length === 0 && isSubmit ? (<div className='success'>Your form has been submitted successfully</div>) : (<pre>{JSON.stringify(formValues, undefined, 2)}</pre>)}

        <form action="/upload" method="post" onSubmit={handleSubmit}>
            <h1>Submit form</h1>
        <label>Full Name</label>
            <input type="text" name="fullname" placeholder='  Full Name' id="" value={formValues.name} onChange={handleChange} />
            <p>{formErrors.fullname}</p>
        <label>Email</label>
            <input type="email" name="email" placeholder='  Email' id="" value={formValues.email} onChange={handleChange} />
             <p>{formErrors.email}</p>
        <label>Upload JSON File</label>
            <input type="file" onChange={handleFileChange} />
    
            <input type="submit" value="Upload"/><br />
        <label>File Contents</label>
            <textarea name="text" id="" cols="30" rows="10" value={jsonData ? JSON.stringify(jsonData, null, 4) : ""}
        readOnly={true}></textarea><br /><br />
            <button type="submit" disabled={isSubmitButtonDisabled}>Submit</button> 
        </form>
    </div>
    
  )
}
export default Form;