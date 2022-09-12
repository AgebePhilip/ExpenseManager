import React from 'react';
import Profile from '../../components/Profile/Profile'


const CreateProfile = ({onChange, inputValues, submit, image, changeImage}) => {

  return (
    <form className='form'>
        <div>
            <Profile  image={image} changeImage={changeImage}/>
        </div>
        <div className='formdata'> 
            <div>
                <input type="text" placeholder="Enter your FullName" name='name' className='input' onChange={onChange} value={inputValues.name} required/>
            </div>
            <div>
                
                <textarea type="text" placeholder="Enter job description" name='jobDescription' className='input textarea' onChange={onChange} value={inputValues.jobDescription} required/>
            </div>
            <div>
               
                <input type="text" placeholder=" location" name='location' className='input' onChange={onChange} value={inputValues.location} required/>
            </div>
            <div>
                
                <input type="text" placeholder="Type department" name='department' className='input' onChange={onChange} value={inputValues.department} required/>
            </div>
            <button className='SubmitBtn' onClick={submit}>Save Employee Profile</button>
        </div>
    </form>
  )
}

export default CreateProfile