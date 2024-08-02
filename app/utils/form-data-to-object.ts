const formDataToObject = (formData: FormData)=>{
  const formDataObj: any = {};

  formData.forEach((value, key) => {
    // If the key already exists, it means it's an array
    if (formDataObj[key]) {
      if (!Array.isArray(formDataObj[key])) {
        formDataObj[key] = [formDataObj[key]]; // Convert to array if it's not already
      }
      formDataObj[key].push(value);
    } else {
      formDataObj[key] = value;
    }
  });
  
  return formDataObj;
}

export default formDataToObject;