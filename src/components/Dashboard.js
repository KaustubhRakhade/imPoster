import { useState, useRef } from "react";
import Editor from "./Editor";
import Post from "./Post";
import useAddPost from "../hooks/useAddPost";
import useDeletePost from "../hooks/useDeletePost";
import useRatePost from "../hooks/useRatePost";

export default function Dashboard({showPopup}) {
  const [posts, setPosts] = useState([]);
  const userName = "KostyR13";

  const [textInEditor, setTextInEditor] = useState("");
  const textfieldRef = useRef();

  //keeps track of which post is being edited
  const [isEditing, setIsEditing] = useState(-1);

  //essential functions
  const addPost = useAddPost(setPosts, userName);
  const deletePost = useDeletePost(setPosts);
  const ratePost = useRatePost(setPosts);

  const handleEdit = (post) => {
    setTextInEditor(post.content);
    document.body.scrollTop = 0;            //Safari
    document.documentElement.scrollTop = 0; //Chrome, Firefox
    textfieldRef.current.focus();
    setIsEditing(post.timeStamp);
  };

  const handleAddPost = () => {
    addPost(textInEditor, isEditing);
    if (isEditing === -1) {
      showPopup("Posted sucessfully!", "bolt", "#4b93ff;")
    }
    else {
      showPopup("Edited sucessfully!", "edit_note", "#f9c052")
    }
    setIsEditing(-1);
  };

  const handleDeletePost = (post) => {
    deletePost(post.timeStamp);
    showPopup("Deleted sucessfully!", "delete", "#ff6a6a")
  };

  const handleRate = (post, rating) => {
    ratePost(post.timeStamp, rating);
  };

  return (
    <>
      <Editor
        textInEditor={textInEditor}
        setTextInEditor={setTextInEditor}
        addPost={handleAddPost}
        isEditing={isEditing !== -1}
        textfieldRef={textfieldRef}
      />

      {posts.map((post) => (
        <Post
          post={post}
          key={post.timeStamp}
          isEditing={post.timeStamp === isEditing}
          deletePost={handleDeletePost}
          editPost={handleEdit}
          ratePost={handleRate}
        />
      ))}
    </>
  );
}
