import React, { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import '../styles/signin-signup.css';

export default function SignIn({showPopup}) {

    const [emailCorrect, setEmailCorrect] = useState(null);
    const [passwordCorrect, setPasswordCorrect] = useState(null);
    const emailRef = useRef();
    const passwordRef = useRef();
    const submitRef = useRef();
    const navigate = useNavigate();

    const handleSignIn = () => {
        if (emailCorrect && passwordCorrect) {
            navigate("/home")
            showPopup("Signed In!", "login", "#20da97")
        }
        else {
            showPopup("Invalid credentials!", "error", "#ff6a6a")
        }
    }

    const getVal = (elem) => {
        return elem.current.querySelector("input").value
    }

    const validateInput = () => {
        setEmailCorrect(() => {
        let re = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g
            return re.test(getVal(emailRef))
        })
        setPasswordCorrect(getVal(passwordRef).length >= 8);
    }

    useEffect(() => {
        if (emailCorrect && passwordCorrect) {
            submitRef.current.classList.remove("disabled");
        }
        else {
            submitRef.current.classList.add("disabled");
        }
    }, [emailCorrect, passwordCorrect])

  return (
    <div id='signin'>
        <h3>Sign In</h3>

        <div ref={emailRef} id="input-email" className="input-field">
            <span className='inputIcon material-icons-round'>alternate_email</span>
            <input type="email" placeholder='Email Address' onInput={validateInput}/>
            <span className={`inputStatus material-icons-round ${emailCorrect ? "correct" : ""}`}>
                {emailCorrect ? "check_circle" : "error"}
            </span>
        </div>

        <div ref={passwordRef} id="input-password" className="input-field">
            <span className='inputIcon material-icons-round'>key</span>
            <input type="password" placeholder='Password' onInput={validateInput}/>
            <span className={`inputStatus material-icons-round ${passwordCorrect ? "correct" : ""}`}>
                {passwordCorrect ? "check_circle" : "error"}
            </span>
        </div>

        <div id="input-bottom">
            <input type="checkbox" name="" id="rememberCheckbox" />
            <label htmlFor="rememberCheckbox">
                <span className='material-icons-round'>check_box_outline_blank</span>
                <span className='material-icons-round'>check_box</span>
                <span>Remember me</span>
            </label>

            <div onClick={handleSignIn} ref={submitRef} id="signInBtn">
                <span className='material-icons-round'>login</span>
                <span>Sign In</span>
            </div>
        </div>

    </div>
  )
}
