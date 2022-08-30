import React, { useState,useEffect } from 'react'
import { Link,useNavigate} from "react-router-dom"; 
import axios from "axios";
import reg from '../Component/reg2.png';

export default function Register() {

  const navigate = useNavigate();

  //delcare the gloabl variable to access the data 
  const[name,setName]=useState("");
  const[email,setEmail]=useState("");
  const[mobile,setMobile]=useState("");


    //here is the json array which is used to get the whole transaction from the array
  const [allusers, setAllUsers] = useState([]);

    //i have used the useEffect to call the api which is used to fetch the data from the api and map over
    //front-end
  useEffect(() => {
        //here i am calling the method in which i have done the task of fetching the data from the API 
        getAllUsers();
        console.log(reg);
    }, []);

    //calling get API to read the data from the collection 
    const getAllUsers=async ()=>{
        //here i have used the code to get the data from the API 
        const response = await axios.get('http://localhost:5000/users');
        //after getting the reponse i need to get the data from the User collections from Mongo in State 
        setAllUsers(response.data);
        console.log(response.data);
        console.log(typeof response.data);
    }

    //this method is used to store the data into the data and then pass to the Post API 
  const handleSubmit=async(e)=>{
    e.preventDefault();
    let data = {
      name:name,
      email:email,
      mobile:mobile,  
    };
  // post Api to pass the data for inserting 
  const response=await axios.post('http://localhost:5000/users',data);
      console.log(response);
      navigate('/Calculator');
  }

  //delete APi to delete the Specific one Record 
  const deleteUser= async (id) => {
    await axios.delete(`http://localhost:5000/users/${id}`);
    getAllUsers();
}
  return (<>
    <div className='container-fluid menuBg'>
        <div className='row'>
            <div className='col-md-7'>
               
            </div>   
            <div className='col-md-5 reg'>
               {/*<h2>User Record </h2> */ }
                <br/>
                <img src={reg}/>
                  <h1 style={{height:"40px"}}></h1>
                    <div className='form-group heading'>
                        <input type="text" 
                            placeholder='Enter Your Name '
                            className='form-control txt-box'
                            value={name}
                            onChange={(e)=>setName(e.target.value)} 
                            required />
                    </div><br/>
                    <div className='form-group heading'>
                        
                        <input type="Email"
                              placeholder='Enter Email-Id'
                              className='form-control txt-box'
                              value={email}
                              onChange={(e)=>setEmail(e.target.value)}
                              required />
                    </div><br/>
                    <div className='form-group heading'>
                        
                        <input type="Number"
                              placeholder='Enter Mobile Number'
                              className='form-control txt-box'
                              value={mobile}
                              onChange={(e)=>setMobile(e.target.value)}
                              required />
                    </div>
                    <br/><br/>
                    <button  path = '/Calculator' className='btn btn-success form-control btn-lg'  onClick={handleSubmit}> Submit </button>     
              <h1></h1>
            </div>
        </div>
    </div>
    <br/><br/><br/><br/><br/>
    <div className='container-fluid view-details'>
         <div className='row'>
              <div className='col-md-12'>
              <h2>All Users </h2>
                <table className='table table-success  table-hover'>
                      <thead>
                          <tr>
                            <th>Name</th>
                            <th>Email-ID</th>
                            <th>Mobile No.</th>
                            <th>Delete</th>
                          </tr>
                      </thead>
                      <tbody>
                          {   
                            typeof allusers != 'undefined' ?
                              allusers.map((item,index) =>{
                                  return <tr key={item._id}>
                                      <td>{item.name}</td>
                                      <td>{item.email}</td>
                                      <td>{item.mobile}</td>
                                      <td>
                                        <Link to={`/EditUser/${item._id}`} className="btn btn-success mx-3">Edit</Link>
                                        <button onClick={ () => deleteUser(item._id) } className="btn btn-warning">Delete</button>
                                      </td>
                                      </tr>;
                            })
                            : 'undefined'
                          }
                      </tbody>
                </table>
              </div>
          </div>                 
    </div>
  </>)
}
