import React, { useState, useEffect, Fragment } from 'react';
import { nanoid } from "nanoid";
import infoData from '../data';
import './employeeExpense.css'
import EditProfile from '../../components/EditProfile/EditProfile'

const EmployeeExpense = ({image, name, job, location, department}) => {

  const [formInput, setFormInput] = useState({
    id:nanoid(),
    date: '',
    merchant: '',
    amount: '',
    status: '',
    comment: ''
  })

  const [data, setData] = useState (infoData);
  const [filteredData, setFilteredData] = useState ([]);
  function formInputChange (e) {
    const {name, value} = e.target;

        setFormInput(prevItem => ({...prevItem, [name] : value}))
  }

  function fillTable (e) {
    e.preventDefault();
    setData(prev => { 
      return [...prev, formInput]
    })

    setFormInput({
      id: '',
      date: '',
      merchant: '',
      amount: '',
      status: '',
      comment: ''
    })
  }

  const elements = data.map(va => {
    return (parseInt(va.amount))
  })

  const filteredElements = filteredData.map(va => {
    return (parseInt(va.amount))
  })

  const [total, setTotal] = useState(0)

  const [topDisplay, setTopDisplay] = useState('none')

  const [filterInput, setFilterInput] = useState({
    from: '',
    to: '',
    merchant: '',
    amountFrom: '',
    amountTo: '',
    status: ''
  })

  function filterInputChange (e) {
    const {name, value} = e.target;

    setFilterInput (prev => ({...prev, [name] : value})) 
  }
  
  function filterFunction (e) {
    const {value} = e.target;

    setTopDisplay(value);
    
    if (value === 'none'){
      setFilterInput({from: ' ', to: ' ', merchant: ' ', amountFrom: 0, amountTo: 0, status: ' '})
      setFilteredData([])
    }
    else if (value === 'date'){
      setFilterInput((prev)=> { return {...prev, merchant: ' ', amountFrom: 0, amountTo: 0, status: ' '}})
    }
    else if (value === 'merchant'){
      setFilterInput((prev)=> { return {...prev, from: ' ', to: ' ', amountFrom: 0, amountTo: 0, status:0}})
    }
    else if (value === 'amount') {
      setFilterInput((prev)=> { return {...prev,from: ' ', to: ' ', merchant: ' ', status: ' '}})
    }
    else if (value === 'status') {
      setFilterInput((prev)=> { return {...prev, from: ' ', to: ' ', merchant: ' ', amountFrom: 0, amountTo: 0}})
    }
  }

  const ele = data.map(val => {return val});

  function check (e) {
    e.preventDefault();

    let fil= [];
    

    if((topDisplay==='date') && filterInput.from && filterInput.to){
      fil = ele.filter(el=>{if (el.date>=filterInput.from && el.date<=filterInput.to){return el}});
    }
    else if(topDisplay==='merchant' && filterInput.merchant){
      fil = ele.filter(el=>{if (el.merchant === filterInput.merchant){return el}});
    }
    else if((topDisplay==='amount') && filterInput.amountFrom && filterInput.amountTo){
      fil = ele.filter(el=>{if (el.amount>=parseInt(filterInput.amountFrom) && el.amount<=parseInt(filterInput.amountTo)){return el}});  
    }
    else if (topDisplay==='status' && filterInput.status){
      fil = ele.filter(el=>{if (el.status === filterInput.status){return el}});
    }

    setFilteredData(fil)

  }
  

  useEffect(()=> {
    let sum = 0;
    let filteredSum = 0;

    if(topDisplay === 'none'){
    for (const value of elements) {
      sum += value;
    }

    } else {
      for (const value of filteredElements) {
        filteredSum += value;
      }
    }
    
    setTotal(topDisplay === 'none' ? sum : filteredSum)
  },[elements, data, filteredData])
const [editValId, setEditValId] = useState(null);

const [editFormData, setEditFormData] = useState({
  date: '',
  merchant: '',
  amount: '',
  status: '',
  comment: ''
})

const handleEditClick = (event, val) => {
  event.preventDefault();
  setEditValId(val.id);

  const formValues = {
    date: val.date,
    merchant: val.merchant,
    amount: val.amount,
    status: val.status,
    comment: val.comment
  }

  setEditFormData(formValues);
}
function handleEditFormChange (event) {
  event.preventDefault();

  const {name,value} = event.target

  const newFormData = {...editFormData}
  newFormData[name] = value;

  setEditFormData(newFormData);
}
function handleEditFormSubmit (event) {
  event.preventDefault();

  const editedContact = {
    id: editValId,
    date: editFormData.date,
    merchant: editFormData.merchant,
    amount: editFormData.amount,
    status: editFormData.status,
    comment: editFormData.comment
  }

  const newData = [...data];
  
  const index = data.findIndex((val)=> val.id === editValId)
  newData[index] = editedContact;

  if (topDisplay !== 'none') {
    const newFilteredData = [...filteredData];
  
    const Findex = filteredData.findIndex((val)=> val.id === editValId)
    newFilteredData[Findex] = editedContact;
  
    setFilteredData(newFilteredData);
    setEditValId(null);
  }

  setData(newData);
  setEditValId(null);
}

function handleCancelClick () {
  setEditValId(null);
}


function handleDeleteClick (valId) {
  const newDataInfo = [...data];
  const index = data.findIndex((val) => val.id === valId);

  newDataInfo.splice(index, 1);

  if (topDisplay !== 'none') {
    const newFilteredDataInfo = [...filteredData];
    const Findex = filteredData.findIndex((val) => val.id === valId);

    newFilteredDataInfo.splice(Findex, 1)

    setFilteredData(newFilteredDataInfo)
  }

  setData(newDataInfo);
}

  return (
    <div className='EmployeeExpense'>
        <form  name='form' className='EmployeeExpenseForm' onSubmit={fillTable}>
          <h3>Expense update</h3>
          
          <input type="date" name='date' value={formInput.date} onChange={formInputChange} required />
          <br />
          <label htmlFor="merchant">Merchant</label>
          <select name="merchant" id="merchant" placeholder='Merchant' onChange={formInputChange} value={formInput.merchant} required >
          <option value="software">software </option>
            <option value="hardware">hardware</option>
            <option value="books">books</option>
            <option value="windows">windows</option>
            <option value="system">system</option>
            <option value="shoes">shoes</option>
            <option value="video">video </option>
            <option value="music">music</option>
            <option value="Hlaptops">laptops</option>
            <option value="mobile Apps">Mobile Apps</option>
            <option value="App store">App store</option>
          </select>
          <br />
          <label htmlFor="amount">Amount</label>
          <input type="number" name="amount" id="amount" value={formInput.amount} onChange={formInputChange} required/>
          <br />
          <label htmlFor="status">Status</label>
          <select name="status" id="status" onChange={formInputChange} value={formInput.status} required> 
            <option value=""></option>
            <option value="New">New</option>
            <option value="In Progress">In Progress</option>
            <option value="Reimbursed">Busar</option>
          </select>
          <br />
          <label htmlFor="comment">Comment</label>
          <textarea name="comment" id="comment" value={formInput.comment} onChange={formInputChange} required/>
          <br />
          <button className='update'>Update</button>
        </form>

        <div className='EmployeeTable'>
            <div id='EmoloyeeFilter'>
              <label htmlFor="filter">FilterExpense: </label>
              <select name="filter" id="filter" onChange={filterFunction}>
                <option value="none">None</option>
                <option value="date">Date</option>
                <option value="merchant">Merchant</option>
                <option value="amount">Amount</option>
                <option value="status">Status</option>
              </select>
            </div>
            <form>
              {topDisplay === 'none'&& <div></div>}
              {topDisplay === 'date'&& <div className='appearingDiv'>
                <div>
                  <label htmlFor="from" style={{marginRight: '9px'}}>From:</label>
                  <input type="date" id='from' name='from' 
                  value={filterInput.from} 
                  onChange={filterInputChange} 
                  style={{ width:'115px',height:'30px', borderRadius:'5px', paddingLeft:'5px'}}/>
                </div>
                <div>
                  <label htmlFor="to" style={{marginRight: '9px'}}>To:</label>
                  <input type="date" id='to' name='to' value={filterInput.to} onChange={filterInputChange} style={{width:'115px', height:'30px', borderRadius:'7px', paddingLeft:'8px'}} />
                </div>
                <button onClick={check}>GO</button>
              </div>}
              {topDisplay === 'merchant'&& <div style={{display: 'flex', gap:'25px'}}>
                  <select name="merchant" id="merchant" 
                  value={filterInput.merchant} 
                  onChange={filterInputChange} 
                  style={{width:'180px', height:'35px',borderRadius:'5px', paddingLeft:'5px'}} >
                    <option value="">Option</option>
                    <option value="software">software </option>
            <option value="hardware">hardware</option>
            <option value="books">books</option>
            <option value="windows">windows</option>
            <option value="system">system</option>
            <option value="shoes">shoes</option>
            <option value="video">video </option>
            <option value="music">music</option>
            <option value="Hlaptops">laptops</option>
            <option value="mobile Apps">Mobile Apps</option>
            <option value="App store">App store</option>
                  </select>
                  <button onClick={check}>OK</button>
              </div>}
              {topDisplay === 'amount' && <div className='employee'>
                    <div>
                      <label htmlFor="amountFrom" style={{marginRight: '9px'}}>From:</label>
                      <input type="number" id='amountFrom' name='amountFrom' value={filterInput.amountFrom} onChange={filterInputChange} style={{ width:'112px',height:'28px', borderRadius:'5px', paddingLeft:'5px'}} />
                    </div>
                    <div>
                      <label htmlFor="amountTo" style={{marginRight: '9px'}}>To:</label>
                      <input type="number" id='amountTo'name='amountTo' value={filterInput.amountTo} onChange={filterInputChange} style={{width:'112px', height:'28px', borderRadius:'5px', paddingLeft:'5px'}} />
                    </div>
                    <button onClick={check}>OK</button>
              </div>}
              {topDisplay === 'status' && <div style={{display: 'flex', gap:'25px'}}>
                    <select name="status" id="status" onChange={filterInputChange} style={{width:'180px', height:'35px',borderRadius:'5px', paddingLeft:'5px'}}> 
                      <option value="">Choose</option>
                      <option value="New">Not Avaliable</option>
                      <option value="In Progress">Not Approved</option>
                      <option value="Reimbursed">Bursary</option>
                    </select>
                    <button onClick={check}>GO</button>
              </div>}
            </form>
            <div className='total'>TotalCost =  ₦{total.toLocaleString("en-US")} 
            </div>
          </div>

          <div className='table'>
            <form onSubmit={handleEditFormSubmit}>
              <table>
                <thead>
                <tr>
                  <th>Date</th>
                  <th>Merchant</th>
                  <th>Amount(₦)</th>
                  <th>Status</th>
                  <th>Comment</th>
                  <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                  {topDisplay === 'none'? 
                  data.map((val, id) => {
                    return (
                      <>
                        {editValId === val.id ?  (
                          <EditProfile editFormData={editFormData} handleEditFormChange={handleEditFormChange} handleCancelClick={handleCancelClick} />
                        ) : ( 
                          <tr key={id}>
                            <td>{val.date}</td>
                            <td>{val.merchant}</td>
                            <td>{parseInt(val.amount).toLocaleString("en-US")}</td>
                            <td>{val.status}</td>
                            <td>{val.comment}</td>
                            <td className='twoButtons'>
                              <button  type='button' onClick={(event)=> handleEditClick(event, val)}>Edit</button>
                              <button type='button' onClick={()=> handleDeleteClick(val.id)}>Delete</button>
                            </td>
                          </tr> 
                      )}
                      </>
                    )
                  }):
                  filteredData.map((val, id) => {
                    return (
                      <>
                        {editValId === val.id ?  (
                          <EditProfile editFormData={editFormData} handleEditFormChange={handleEditFormChange} handleCancelClick={handleCancelClick} />
                        ) : ( 
                          <tr key={id}>
                            <td>{val.date}</td>
                            <td>{val.merchant}</td>
                            <td>{parseInt(val.amount).toLocaleString("en-US")}</td>
                            <td>{val.status}</td>
                            <td>{val.comment}</td>
                            <td className='twoButtons'>
                              <button  type='button' onClick={(event)=> handleEditClick(event, val)}>Edit</button>
                              <button type='button' onClick={()=> handleDeleteClick(val.id)}>Delete</button>
                            </td>
                          </tr> 
                      )}
                      </>

                    )
                  })
                }
                </tbody>
              </table>
            </form>
          </div>

          <div className='employeeDetail'>
            <p className='employee'>Info</p>
            <img src={image} alt="Employee's Profile image" />
            <h2>{name}</h2>
            <h3>{job}</h3>
            
            <p className='dept'>{department}</p>
          </div>
    </div>
  )
}

export default EmployeeExpense




