import { Link, Navigate } from "react-router-dom";
import InputBox from "../components/input.component";
import googleIcon from "../imgs/Google.png"
import AnimationWrapper from "../common/page-animation";
import { useRef } from "react";
import { Toaster, toast} from "react-hot-toast";
import axios from 'axios';
import { storeInSession } from "../common/session";
import { useContext } from "react";
import { UserContext } from "../App";

const UserAuthForm = ({ type }) => {
    
    let { userAuth: { access_token }, setUserAuth } = useContext(UserContext);


    const userAuthThroughServer = (serverRoute, formData) =>{
        axios.post(import.meta.env.VITE_SERVER_DOMAIN + serverRoute, formData)
        .then(({ data }) => {
            storeInSession("user", JSON.stringify(data));
            setUserAuth(data);
        })
        .catch(({ response }) => {
            toast.error(response.data.error)
        })
    }

        const handleSubmit = (e) => {
            e.preventDefault();
            let serverRoute = type == "sign-in" ? "/signin" : "/signup";
            let emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/; // regex for email
            let passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/; // regex for password
            let form = new FormData(formElement);

            let formData = {};
            for(let [key, value] of form.entries()){
                formData[key]=value;
            }
         
        let { fullname, email, password } = formData;
        
        // validation
        if(fullname){
            if(fullname.length < 3){
                return toast.error("Fullname Must Be Atleast 3 Letters long!")
            }
        }

        if(!email.length){
            return toast.error("Enter Email");
        }

        if(!emailRegex.test(email)){
            return toast.error("Email is invalid");
        }

        if(!passwordRegex.test(password)){
            return toast.error("Password Should be 6 to 20 characters long with a numeric, 1 lowercase and 1 uppercase letter");
        }

        userAuthThroughServer(serverRoute, formData);
    }

    return (
        <AnimationWrapper keyValue={ type }>
            <section className="h-cover flex items-center justify-center">
            <Toaster/>
            <form id="formElement" onSubmit={handleSubmit} className="w-[80%] max-w-[400px]">
                <h1 className="text-4xl font-gelasio capitalize text-center mb-24">
                    { type  == "sign-in" ? "Welcome Back!" : "Join Us Today!"}
                </h1>

                {
                    type != "sign-in" ? 
                    <InputBox
                        name="fullname"
                        type="text"
                        placeholder="Full Name"
                        icon="fi-rr-user"
                    />
                    : ""
                }
                <InputBox
                    name="email"
                    type="email"
                    placeholder="Email"
                    icon="fi-rr-envelope"
                />
                <InputBox
                    name="password"
                    type="password"
                    placeholder="Password"
                    icon="fi-rr-key"
                />
                <button className="btn-dark center mt-14" type="submit">
                    { type.replace("-", " ") }
                </button>

                <div className="relative w-full flex items-center gap-2 my-10 opacity-10 uppercase text-black font-bold">
                    <hr className="w-1/2 border-black"/>
                    <p>Or</p>
                    <hr className="w-1/2 border-black"/>
                </div>

                <button className="btn-dark flex items-center justify-center gap-4 w-[90%] center">
                    <img src={googleIcon} className="w-5"/>
                    Continue With Google
                </button>

                {
                    type == "sign-in" ?
                    <p className="mt-6 text-dark-grey text-xl text-center">
                        Don't Have An Account ?
                        <Link to="/signup" className="underline text-black text-xl ml-1">
                        Join Here!
                        </Link>
                    </p>
                    :
                    <p className="mt-6 text-dark-grey text-xl text-center">
                        Already A Member ?
                        <Link to="/signin" className="underline text-black text-xl ml-1">
                        Sign In Here!
                        </Link>
                    </p>
                }

            </form>
            </section>
        </AnimationWrapper>
    )
}

export default UserAuthForm;