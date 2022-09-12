import React from 'react'

const EditProfile = ({editFormData, handleEditFormChange, handleCancelClick}) => {
  return (
    <tr>
        <td>
            <input className='editDate' type="date" name='date' onChange={handleEditFormChange} value={editFormData.date} required />
        </td>
        <td>
            <select name="merchant" value={editFormData.merchant} onChange={handleEditFormChange} required >
                
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
        </td>
        <td>
            <input className='editAmount' type="number" name="amount" value={editFormData.amount} onChange={handleEditFormChange}required/>
        </td>
        <td>
            <select name="status" value={editFormData.status} onChange={handleEditFormChange} required> 
                <option value=""></option>
                <option value="New">New</option>
                <option value="In Progress">Not Approve</option>
                <option value="Reimbursed">bursary</option>
            </select>
        </td>
        <td>
            <textarea className='editComment' name="comment" onChange={handleEditFormChange} value={editFormData.comment} required/>
        </td>
        <td className='twoButtons'>
            <button type='submit'>Save</button>
            <button type='button' onClick={handleCancelClick}>Cancel</button>
        </td>
    </tr>
  )
}

export default EditProfile