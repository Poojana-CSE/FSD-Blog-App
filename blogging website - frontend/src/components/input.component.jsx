import { useState } from "react";

const InputBox = ({ name, type, id, value, placeholder, icon }) => {

    const [ passwordVisible, setPasswordVisible] = useState(false);

    return (
        <div className="relative w-[100%] mb-4">
            <input
                name={name}
                type={type == "password" ? passwordVisible ? "text" :  "password" : type }
                placeholder={placeholder}
                id={id}
                defaultValue={value}
                className="input-box"
            />
            
            <i className={"fi " + icon + " input-icon"}></i>

            {
                type == "password" ?
                <i className={"fi fi-rr-eye" + (!passwordVisible ? "-crossed" : "") + " input-icon left-[auto] right-4 cursor pointer"}
                onClick={()=>{
                    setPasswordVisible(currentval => !currentval)
                }}
                >
                </i>
                : ""
            }

        </div>
    )
}
export default InputBox;