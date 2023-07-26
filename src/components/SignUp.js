import React, { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import '../styles/signin-signup.css';

export default function SignUp({showPopup}) {

    const [nameCorrect, setNameCorrect] = useState(false);
    const [emailCorrect, setEmailCorrect] = useState(false);
    const [phoneCorrect, setPhoneCorrect] = useState(false);
    const [passwordCorrect, setPasswordCorrect] = useState(false);
    const [confirmCorrect, setConfirmCorrect] = useState(false);
    const nameRef = useRef();
    const emailRef = useRef();
    const phoneRef = useRef();
    const passwordRef = useRef();
    const confirmRef = useRef();
    const submitRef = useRef();

    const navigate = useNavigate()
    const handleSignUp = () => {
        if (nameCorrect &&
            emailCorrect &&
            phoneCorrect &&
            passwordCorrect &&
            confirmCorrect)
        {
            navigate("/home")
            showPopup("Signed Up!", "login", "#20da97")
        }
        else {
            showPopup("Invalid credentials!", "error", "#ff6a6a")
        }
    }

    const getVal = (elem) => {
        return elem.current.querySelector("input").value
    }

    const validateInput = () => {
        setNameCorrect(getVal(nameRef) !== "")
        setEmailCorrect(() => {
        let re = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g
            return re.test(getVal(emailRef))
        })
        setPhoneCorrect(getVal(phoneRef).length === 10);
        setPasswordCorrect(getVal(passwordRef).length >= 8);
        setConfirmCorrect(getVal(passwordRef) === getVal(confirmRef) && getVal(confirmRef).length >= 8)
    }

    useEffect(() => {
        if (nameCorrect &&
            emailCorrect &&
            phoneCorrect &&
            passwordCorrect &&
            confirmCorrect)
        {
            submitRef.current.classList.remove("disabled");
        }
        else {
            submitRef.current.classList.add("disabled");
        }
    }, [nameCorrect,
        emailCorrect,
        phoneCorrect,
        passwordCorrect,
        confirmCorrect])

  return (
    <div id='signin'>
        <h3>Sign Up</h3>

        <div ref={nameRef} id="input-name" className="input-field">
            <span className='inputIcon material-icons-round'>person</span>
            <input type="text" placeholder='Name' onInput={validateInput}/>
            <span className={`inputStatus material-icons-round ${nameCorrect ? "correct" : ""}`}>
                {nameCorrect ? "check_circle" : "error"}
            </span>
        </div>

        <div ref={emailRef} id="input-email" className="input-field">
            <span className='inputIcon material-icons-round'>alternate_email</span>
            <input type="email" placeholder='Email Address' onInput={validateInput}/>
            <span className={`inputStatus material-icons-round ${emailCorrect ? "correct" : ""}`}>
                {emailCorrect ? "check_circle" : "error"}
            </span>
        </div>

        <div ref={phoneRef} id="input-phone" className="input-field">
            <span className='inputIcon material-icons-round'>call</span>
            <input type="number" placeholder='Phone Number' onInput={validateInput}/>
            <span className={`inputStatus material-icons-round ${phoneCorrect ? "correct" : ""}`}>
                {phoneCorrect ? "check_circle" : "error"}
            </span>
        </div>

        <div ref={passwordRef} id="input-password" className="input-field">
            <span className='inputIcon material-icons-round'>key</span>
            <input type="password" placeholder='Password' onInput={validateInput}/>
            <span className={`inputStatus material-icons-round ${passwordCorrect ? "correct" : ""}`}>
                {passwordCorrect ? "check_circle" : "error"}
            </span>
        </div>

        <div ref={confirmRef} id="input-confirm" className="input-field">
            <span className='inputIcon material-icons-round'>key</span>
            <input type="password" placeholder='Confirm Password' onInput={validateInput}/>
            <span className={`inputStatus material-icons-round ${confirmCorrect ? "correct" : ""}`}>
                {confirmCorrect ? "check_circle" : "error"}
            </span>
        </div>

        <div id="input-bottom">
            <input type="checkbox" name="" id="rememberCheckbox" />
            <label htmlFor="rememberCheckbox">
                <span className='material-icons-round'>check_box_outline_blank</span>
                <span className='material-icons-round'>check_box</span>
                <span>Remember me</span>
            </label>

            <div onClick={handleSignUp} ref={submitRef} id="signInBtn">
                <span className='material-icons-round'>login</span>
                <span>Sign Up</span>
            </div>
        </div>

    </div>
  )
}
