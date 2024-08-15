// InputText.js
import React, { useRef } from "react";
import { TextInputFormType } from "../quiz.type";
import Button from "~/components/button";
import { Input } from "~/components/input";

export default function GetResultForm() {
  let fetcher = useFetcher();
  let isSubmitting = fetcher.state !== "idle";
  
  const handleSubmit = (event: React.SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = document.getElementById(id) as HTMLFormElement;
    const formData = new FormData(form);
    
    // const formData = await request.formData();
    const formObject = formDataToObject(formData);
    
    let { firstname, lastname, email, subscribe } = formObject;
    
    
    fetcher.submit({ firstname, lastname, email, subscribe: subscribe||false});
  }
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <fetcher.Form
        onSubmit={handleSubmit}
        method="post"
        className="bg-white p-8 rounded shadow-md w-full max-w-md"
      >
        <h2 className="text-2xl font-semibold mb-4">Final Step</h2>
        <p className="mb-6">
          Enter your name, and email so we can save your
          result.
        </p>
        <div className="mb-4">
          <label className="block mb-1 font-medium" htmlFor="firstname">
            First Name
          </label>
          <Input
            type="text"
            id="firstname"
            name="firstname"
            value={formData.firstname}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1 font-medium" htmlFor="lastname">
            Last Name
          </label>
          <Input
            type="text"
            id="lastname"
            name="lastname"
            value={formData.lastname}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1 font-medium" htmlFor="email">
            Email
          </label>
          <Input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
            required
          />
        </div>
        <div className="mb-4 flex items-center">
          <Input
            type="checkbox"
            id="subscribe"
            name="subscribe"
            checked={formData.subscribe}
            onChange={handleChange}
            className="mr-2"
          />
          <label htmlFor="subscribe">Subscribe to newsletter</label>
        </div>
        <p className="mb-6 text-sm">
          By clicking "Get Result", you agree to have read and accepted our{" "}
          <a href="#" className="text-blue-500 underline">
            terms and conditions
          </a>{" "}
          and{" "}
          <a href="#" className="text-blue-500 underline">
            privacy policy
          </a>
          .
        </p>
        <Button
          type="submit"
          
          className="w-full py-2 bg-blue-500 text-white font-semibold rounded hover:bg-blue-600"
          disable={isSubmitting}
        >
          {isSubmitting? "Fetching...":"Get Result"}
        </Button>
      </fetcher.Form>
    </div>
  );
}
