import './App.css';
import { useEffect, useState } from "react"
import Navbar from './component/Navbar';

function App() {
  const [form, setForm] = useState({})
  const [showDetails, setShowDetails] = useState([])
  const handleOnChange = (e) => {
    // console.log(e.target.name , e.target.value);
    setForm({
      ...form,
      [e.target.name]: e.target.value
    })
  }
  const handleSubmit = async (e) => {
    e.preventDefault()
    const response = await fetch("http://localhost:8080/demo", {
      method: "POST",
      body: JSON.stringify(form),
      headers: {
        "Content-Type": "application/json"
      }
    })
    const data = await response.json()
    console.log(data);
    getAllDetails()
  }

  const getAllDetails = async () => {
    const response = await fetch("http://localhost:8080/demo", {
      method: "GET"
    })
    const data = await response.json()
    setShowDetails(data)
    console.log(data);
  }

  useEffect(() => {
    getAllDetails()
  }, [])

  return (
    <div>
      <Navbar/>
      <div className="App">
        {/* You can use the below statement for debugging */}
        {/* <p>{JSON.stringify(form)}</p> */}
        <form className="form-group" onSubmit={handleSubmit}>
          {/* <form className="form-group" > */}
          <span>Name:</span>
          <input name="username" onChange={handleOnChange} type="text" />
          <span>Phone no:</span>
          <input name="phoneNumber" onChange={handleOnChange} type="number" />
          <span>Email:</span>
          <input name="email" onChange={handleOnChange} type="email" />
          <span>Password:</span>
          <input name="password" onChange={handleOnChange} type="password" />
          <button >Submit</button>
        </form>
        <div className="table">
          <table >
            <thead>
              <tr>
                <th>Username</th>
                <th>Phone Number</th>
                <th>Email Id</th>
                <th>Password</th>
              </tr>
            </thead>
            {showDetails.map((item, key) => {
              return (
                <tbody key={key}>
                  <tr>
                    <td>{item.username}</td>
                    <td>{item.phoneNumber}</td>
                    <td>{item.email}</td>
                    <td>{item.password}</td>
                  </tr>
                </tbody>
              )
            })}
          </table>


        </div>
      </div>
    </div>
  );
}

export default App;
