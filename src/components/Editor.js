import React, { useEffect } from 'react'
import '../styles/editor.css';
import person from '../person.jpg';


export default function Editor({addPost, textInEditor, setTextInEditor, isEditing, textfieldRef}) {

    const handleClick = () => {
        addPost()
        handleDiscard()
    }

    const handleDiscard = () => {
      setTextInEditor("")
    }

    //auto-resize textfield
    useEffect(() => {
      textfieldRef.current.style.height = "inherit"
      textfieldRef.current.style.height = `${textfieldRef.current.scrollHeight}px`
    }, [textInEditor, textfieldRef])

  return (
    <div id='editor'>
      <img id="user-image-pc" src={person} alt=""/>
      <div id="editor-main">
        <textarea
            onChange={(e) => {
              setTextInEditor(e.target.value)
            }}
            ref={textfieldRef}
            placeholder='Write your thoughts...'
            value={textInEditor}
          />

          <div id="editor-controls">

            {//add image button
             //did not add due to time constraint
            
            /* <div id='add-image'>
              <span className="material-icons-round">add_photo_alternate</span>
              <span>Image</span>
            </div> */}

            <img id="user-image-mob" src={person} alt=""/>

            <div id='shareBtn' className={textInEditor === "" ? "disabled" : ""} onClick={handleClick}>
              <span className="material-icons-round">{isEditing ? "save" : "send"}</span>
              <span>{isEditing ? "Save Edit" : "Share"}</span>
            </div>

            <div id='discardBtn' className={textInEditor === "" ? "disabled" : ""} onClick={handleDiscard}>
              <span className="material-icons-round">backspace</span>
              <span>{isEditing ? "Clear" : "Discard"}</span>
            </div>

          </div>
      </div>


    </div>
  )
}
