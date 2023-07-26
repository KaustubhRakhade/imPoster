import React, { useRef, useState } from 'react'
import '../styles/post.css';
import person from '../person.jpg';

export default function Post({post, editPost, isEditing, deletePost, ratePost}) {

    const [deleted, setDeleted] = useState(false)
    const handleEditButton = () => {
        editPost(post)
    }

    const handleDeleteButton = () => {
        setDeleted(true)
        setTimeout(() => {
            deletePost(post)
        }, 500)
        // deletePost(post)
    }

    const likeRef = useRef()
    const dislikeRef = useRef()

    const handleLike = () => {
        if (likeRef.current.checked) {
            dislikeRef.current.checked = false
            ratePost(post, 1)
        }
        else if (dislikeRef.current.checked) {
            ratePost(post, -1)
        }
        else {
            ratePost(post, 0)
        }
    }

    const handleDislike = () => {
        if (dislikeRef.current.checked) {
            likeRef.current.checked = false
            ratePost(post, -1)
        }
        else if (likeRef.current.checked) {
            ratePost(post, 1)
        }
        else {
            ratePost(post, 0)
        }
    }

    let timeGap = Date.now() - post.timeStamp;
    let descTimeGap = "just now";

    const timeUnits = [
        {
            time: 1000*3600*24*365,
            text: "year(s) ago"
        },
        {
            time: 1000*3600*24*30,
            text: "month(s) ago"
        },
        {
            time: 1000*3600*24*7,
            text: "week(s) ago"
        },
        {
            time: 1000*3600*24,
            text: "day(s) ago"
        },
        {
            time: 1000*3600,
            text: "hour(s) ago"
        },
        {
            time: 1000*60,
            text: "minute(s) ago"
        },
        {
            time: 1000*1,
            text: "second(s) ago"
        }
    ]

    for (let unit of timeUnits) {
        if (timeGap > unit.time) {
            descTimeGap = Math.round(timeGap / unit.time) + " " + unit.text;
            break;
        }
    }
 
  return (
    <div className={"post" + (isEditing ? " editing" : "") + (deleted ? " deleted" : "")}>
        <img id="user-image-pc" src={person} alt=""/>
        <div className="post-main">
            <div className="post-topbar">
                <img id="user-image-mob" src={person} alt=""/>
                <span className="post-user">
                    <b>@{post.user}</b>
                    <br />
                    {descTimeGap}
                </span>
                <input className='material-icons-round editBtn' type="button" value="edit" onClick={handleEditButton}/>
                <input className='material-icons-round deleteBtn' type="button" value="delete" onClick={handleDeleteButton}/>
            </div>
            <span className="post-content">{post.content}</span>
            <div className="post-bottombar">
                <input ref={likeRef} type="checkbox" id={"likeBtn" + post.timeStamp} onInput={handleLike}/>
                <input ref={dislikeRef} type="checkbox" id={"dislikeBtn" + post.timeStamp} onInput={handleDislike}/>
                <label htmlFor={"likeBtn" + post.timeStamp}>
                    <span className='material-icons-round'>thumb_up</span>
                    <span>{post.likeCount}</span>
                </label>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <label htmlFor={"dislikeBtn" + post.timeStamp}>
                    <span className='material-icons-round'>thumb_down</span>
                    <span>{post.dislikeCount}</span>
                </label>
            </div>
        </div>
        
    </div>
  )
}
