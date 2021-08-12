import React, {useState} from 'react';
import MyInput from "./UI/input/MyInput";
import MyButton from "./UI/button/MyButton";

const PostForm = ({create}) => {

    const [post, setPost] = useState({title: '', body: '',})

    const addNewPost = (e) => {
        e.preventDefault()
       create(post)
        setPost({title: '', body: ''})
    }

    return (
        <form>
            <MyInput
                type="text"
                placeholder="Post title"
                value={post.title}
                onChange={e => setPost({...post, title: e.target.value})}
            />
            <MyInput
                value={post.body}
                onChange={e => setPost({...post, body: e.target.value})}
                type="text"
                placeholder="Description post"
            />
            <MyButton onClick={addNewPost}>Add Post</MyButton>
        </form>
    );
};

export default PostForm;