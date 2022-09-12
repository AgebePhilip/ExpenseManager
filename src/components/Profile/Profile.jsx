import { useState } from "react";


export default function Profile ({image, changeImage}) {
    
    const [showUploadButton, setShowUploadButton] = useState(false);

    function mouseEnter () { 
        return (
            setShowUploadButton(prevValue => !prevValue)
        )
    };

    function mouseLeave () { 
        return (
            setShowUploadButton(prevValue => !prevValue)
        )
    };

    

    return (
        <div className="EmployeeProfile" onMouseEnter={mouseEnter} onMouseLeave= {mouseLeave}>
            <img src={image} alt="Profile image" id="photo"/>
            <input type='file' accept='Image/*' name="file" id="file" onChange={changeImage}/>
            {showUploadButton && <label htmlFor="file" id="uploadBtn">Upload Image</label> }
     
        </div>
    )
}