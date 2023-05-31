import React, { useEffect, useState } from "react";
import {addDoc, collection} from 'firebase/firestore';
import {db,auth} from "../firebase-config";
import { useNavigate } from "react-router-dom";
function CreatePost({isAuth}){
    const[title,setTitle]=useState("");
    const[postText,setPostText]=useState("");
    const postsCollectionRef= collection(db,"posts");
    let navigate=useNavigate();
    const createPost=async()=>{
        await addDoc(postsCollectionRef,{
            title,
            postText,
            author:{name:auth.currentUser.displayName,id:auth.currentUser.uid},
        });
        navigate("/");
    };
    useEffect(()=>{
        if(!isAuth){
            navigate("/login");
        }
    },[]);
    return (
    <div className="createPostPage">
       <div className="cpContainer">
        <h1>Add Food </h1>
        <div className="inputGp">
        <label>Food Name</label>
        <input placeholder="Title..."
         onChange={(event)=>
         {setTitle(event.target.value);
         }}
         />
        </div>
        <div className="inputGp">
        <label>Details About food</label>
        <textarea placeholder="Post..."
        onChange={(event)=>
            {setPostText(event.target.value);
            }}
        />
        </div>
        <h3>Contact for further Details</h3>
        <button onClick={createPost}>Submit</button>
       </div>
    </div>
    )
}
export default CreatePost;