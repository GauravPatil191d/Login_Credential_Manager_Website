// To change this app.jsx file into tsx file u can do changes that are given below
import './App.css';
import { useEffect, useState, ChangeEvent, FormEvent } from "react";
import Navbar from './src/component/Navbar';
import React from 'react';

// Define the structure of the form state
interface FormState {
  username?: string;
  phoneNumber?: string;
  email?: string;
  password?: string;
}

// Define the structure of user details
interface UserDetails {
  username: string;
  phoneNumber: string;
  email: string;
  password: string;
}

function App() {
  // Initialize form state with type annotation
  const [form, setForm] = useState<FormState>({}); // <-- Change: Added type annotation for form state

  // Initialize showDetails state with type annotation
  const [showDetails, setShowDetails] = useState<UserDetails[]>([]); // <-- Change: Added type annotation for showDetails state

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => { // <-- Change: Specified event type
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => { // <-- Change: Specified event type
    e.preventDefault();
    const response = await fetch("http://localhost:8080/demo", {
      method: "POST",
      body: JSON.stringify(form),
      headers: {
        "Content-Type": "application/json"
      }
    });
    const data = await response.json();
    console.log(data);
    getAllDetails();
  };

  const getAllDetails = async () => {
    const response = await fetch("http://localhost:8080/demo", {
      method: "GET"
    });
    const data: UserDetails[] = await response.json(); // <-- Change: Added type annotation for fetched data
    setShowDetails(data);
    console.log(data);
  };

  useEffect(() => {
    getAllDetails();
  }, []);

  return (
    <div>
      <Navbar />
      <div className="App">
        <form className="form-group" onSubmit={handleSubmit}>
          <span>Name:</span>
          <input name="username" onChange={handleOnChange} type="text" />
          <span>Phone no:</span>
          <input name="phoneNumber" onChange={handleOnChange} type="number" />
          <span>Email:</span>
          <input name="email" onChange={handleOnChange} type="email" />
          <span>Password:</span>
          <input name="password" onChange={handleOnChange} type="password" />
          <button>Submit</button>
        </form>
        <div className="table">
          <table>
            <thead>
              <tr>
                <th>Username</th>
                <th>Phone Number</th>
                <th>Email Id</th>
                <th>Password</th>
              </tr>
            </thead>
            <tbody>
              {showDetails.map((item, key) => (
                <tr key={key}>
                  <td>{item.username}</td>
                  <td>{item.phoneNumber}</td>
                  <td>{item.email}</td>
                  <td>{item.password}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default App;
