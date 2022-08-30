import React, { useState,useEffect } from 'react'
import Report from './Report';
import { Link } from "react-router-dom"; 

import Chart from 'react-google-charts'

import {
    LineChart,
    ResponsiveContainer,
    Legend, Tooltip,
    Line,
    XAxis,
    YAxis,
    CartesianGrid
} from 'recharts';


export default function Calculator() {
   

    
    //props to store the data 
    let report = [];
    
    //global constant which can be used to store the values into the local storage 
    const[principal,setPrincipal]=useState(0);
    const[downpayment,setDownpayment]=useState(0);
    
    const[pendingamount,setPendingAmount]=useState(0);
    
    const[interest,setInterest]=useState(0);

    const[duration,setDuration]=useState(0);

    const[res,setRes]=useState("");

    const[totalInstallment,setTotalInstallment]=useState(0);
    
    const[EMIInstallment,setEMIInstallment]=useState(0);

    const[totalPayment,setTotalPayment]=useState(0);

    const[totalInterest,setTotalInterest]=useState(0);

   const [genGraph,setGenerateGraph]=useState([]);


   const MyContext = React.createContext(report);

    
    //this method is used to set the pending payment after giving the loan payment
    const getPendingLoan=()=>{
         const restPayment=principal-downpayment
          setPendingAmount(""+restPayment);
    }


    //this method used to calaulcate the working process of the mortgage calculator 
   const handleSubmit=async(e)=>{
         e.preventDefault();
        //first of all we need to find the total number of installments 
      //  setTotalInstallment(parseInt(duration)*12);
        let installment=parseInt(duration)*12;
        setTotalInstallment(""+installment);
        setRes(""+installment);
        

        /* here i have set the rate of interest for the working process */
		const rateInterest=(interest/100);
        //setRes(""+rateInterest);

        const upper=(pendingamount*rateInterest/12)*(Math.pow(1+rateInterest/12,installment));


        const lower=((Math.pow(1+rateInterest/12,installment))-1)

        const emi=(upper/lower).toFixed(2);

        setEMIInstallment(""+emi);

        const grandTotal=(emi*installment).toFixed(2);

        setTotalPayment(""+grandTotal);

        setRes(""+emi);
        let total_Interest=(grandTotal-pendingamount).toFixed(2);
        setTotalInterest(""+total_Interest);

        //calling the method to store the data into the states in JSON format 
        generateReport("Year",totalInstallment);
    }

//this is common method when the users click on MOnth or Year call the Same Function 
    const generateReport=(Type,installment)=>{
       
        if(Type==="Month"){
                for (let i = 1; i <=(installment); i++) {
                        let install=EMIInstallment;
                        let data = {
                            "Id":i,
                            "Installment":install,
                            "Payment":((EMIInstallment)*i).toFixed(2)
                        }                    
                        report.push(data);
                }
                    
            }else{
                //console.log("Year");
                for (let i = 1; i <=(installment/12); i++) {
                    let data = {
                        "Id":i,
                        "Installment":(EMIInstallment*12).toFixed(2),
                        "Payment":((EMIInstallment*12)*i).toFixed(2)
                    }
                    report.push(data);
                }
                    
            }
            console.log(report);
            setGenerateGraph(report);
            //store the data into the Local Storage to Genreate the Report 
            localStorage.setItem('reportData',JSON.stringify(genGraph));   
          
    }

    return (<>
   
    <div className='container-fluid menuBg calculatorBg'>
        <div className='row'>
            <div className='col-md-12' style={{height:"10px"}}>
                <h1></h1>
            </div>
            <div className='col-md-12'>
                   {/* <img src="https://www.mortgagecalculators.info/images/icon.png" style={{height:"100px"}} alt="appwrk.com"/>*/}
               <h1> APPWRK Mortgage Calculator</h1>
             </div>

            <div className='col-md-12' style={{height:"30px"}}>
                
            </div>
            <div className='col-md-1'></div>
        <div className='col-md-4 calculator'>
            <h2>View Loan Breakdown </h2>
           
                <div className='form-group'>
                    <label>Home Loan</label>
                    <input type="Number" 
                        placeholder='Enter Home Loan Amount'
                        className='form-control'
                        value={principal}
                        onChange={(e)=>setPrincipal(e.target.value)} 
                        required />
                </div>
                <div className='form-group'>
                    <label>Down payment</label>
                    <input type="Number"
                         placeholder='Enter Down payment Amount'
                         className='form-control'
                         value={downpayment}
                         onChange={(e)=>setDownpayment(e.target.value)}
                         onBlur={getPendingLoan}
                         required />
                </div>
                <div className='form-group'>
                    <label>Pending Loan Payment </label>
                    <input type="Number" 
                        placeholder='Pending Loan Amount'
                        className='form-control'
                        readOnly
                        value={pendingamount}
                        required />
                </div>
                <div className='form-group'>
                    <label>Interest Rate (%)</label>
                    <input type="Number" 
                        placeholder='Enter Interest Rate'
                        className='form-control'
                        value={interest}
                        setp="0.01"
                        onChange={(e)=>setInterest(e.target.value)}
                        required />
                </div>
                <div className='form-group'>
                    <label style={{textAlign:"left"}}>Enter Time Duration in Year</label>
                    <input type="Number" 
                        placeholder='Time Duration'
                        className='form-control'
                        value={duration}   
                        onChange={(e)=>setDuration(e.target.value)}
                        required />
                </div>
                <br/>
                <button className='btn btn-primary form-control' onClick={handleSubmit} > Submit </button>
        </div>
        <div className='col-md-2'>

        </div>
        <div className='col-md-4 report'>
             <h2>View Detailed Report</h2>
            <table className='table table-hover table-bordered' style={{border:"1px dashed grey"}}>
                <tbody>
                    <tr>
                        <td>Total Loan Amount</td>
                        <td>{principal}</td>
                    </tr>
                    <tr>
                        <td>Down Payment</td>
                        <td>{downpayment}</td>
                    </tr>
                    <tr>
                        <td>Total No of Installment's</td>
                        <td> {totalInstallment}</td>
                    </tr>
                    <tr>
                        <td>EMI</td>
                        <td>{EMIInstallment}</td>
                    </tr>
                    <tr>
                        <td>Total Payment </td>
                        <td>{totalPayment}</td>
                    </tr>
                    <tr>
                        <td>Total Interest Paid </td>
                        <td>{totalInterest}</td>
                    </tr>
                </tbody>
            </table>
            <br/>
        <button className='btn btn-warning' style={{margin:"10px"}} onClick={()=>generateReport("Year",totalInstallment)}>Generate Yearly Grpah  </button>
		
        <Link to="/Report" className='btn btn-danger' style={{margin:"10px"}} data={report} onClick={()=>generateReport("Year",totalInstallment)}>Generate Yearly Report </Link>
           
     
           <br/>
        <button className='btn btn-primary' style={{margin:"10px"}} onClick={()=>generateReport("Month",totalInstallment)}>Generate Monthly Grpah  </button>
        <Link to="/Report" className='btn btn-success' style={{margin:"10px"}} data={report} onClick={()=>generateReport("Month",totalInstallment)}>Generate Monthly Report </Link>

      
        </div>
        <div className='col-md-1'></div>
        <div className='col-md-12'>
            <div className='row'>
                <div className='container'>
                    <div className='row'>
                        <h1 style={{height:"100px"}}></h1>
                        <div className='col-md-12' >
                          <h2>Graph presentation of the Mortgage Calculator </h2>
                        <br/>
                            <ResponsiveContainer width="100%" aspect={3}>
                            <LineChart data={genGraph} style={{marginRight:"300px" }}>
                                <CartesianGrid />
                                <XAxis dataKey="Id" 
                                    interval={'preserveStartEnd'} />
                                <YAxis></YAxis>
                                <Legend />
                                <Tooltip />
                                <Line dataKey="Installment"
                                    stroke="green" activeDot={{ r: 8 }} />
                        </LineChart>
                    </ResponsiveContainer>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
    </>  
)
}
