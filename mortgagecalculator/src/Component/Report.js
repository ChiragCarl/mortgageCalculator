import React, { useEffect, useState,useRef } from 'react'
import { useReactToPrint } from "react-to-print";
import logo from '../Component/logo.png';

export default function Report() {

    const componentRef = useRef();
    const handlePrint = useReactToPrint({
      content: () => componentRef.current,
    });

    
    let report=[];
    const [reportData,setReportData]=useState();

    useEffect(() => {   
        getRecord();
    },[])

    const getRecord=()=>{
        report = JSON.parse(localStorage.getItem("reportData"));
        setReportData(report);
    }
   // return;
  return (
    <>
    <div className='container-fluid printBg'>
        <div className='row'>
            <div className='col-md-12'>
                <div className='container'>
                    <div className='row'>
                        <div className='col-md-12 text-end'>    
                            <br/><br/>            
                            <button onClick={handlePrint} className="btn btn-warning btn-lg" style={{margin:"30px"}}>  Print </button>
                        </div>
                        <div className='col-md-12 mx-3 my-3 print' ref={componentRef}>
                            <br/>
                            <img src={logo} className="img img-thumbnail" /><br/><br/>
                            <h2 style={{width:"90%",border:"1px solid",margin:"auto"}}>Installment Reports Genereted By APPWRK</h2>
                            <table className='table table-secondary' style={{width:"90%",border:"1px solid",margin:"auto"}}>
                                <thead>
                                    <td>S No</td>
                                    <td>Installment</td>
                                    <td>Payment</td>
                                </thead>
                                <tbody>
                                    {
                                        typeof reportData != 'undefined' ?
                                        reportData.map((item,index) =>{
                                            return <tr key={item.Id}>
                                                <td>{item.Id}</td>
                                                <td>{item.Installment}</td>
                                                <td>{item.Payment}</td>
                                                </tr>;
                                        })
                                        : 'undefined'
                                    }
                                </tbody>
                            </table>
                                    
                        </div>
                    </div>
                </div>
                
            </div>
        </div>
    </div>
    <div className='container-fluid footer'>
            <div className='row'>
                <div className='col-md-12'>
                      <p> Copyrights &copy; 2022 | Desgined by APPWRK IT Solutions Pvt. Ltd.</p>
                </div>
            </div>
      </div>      
   
    </>
  )
}
