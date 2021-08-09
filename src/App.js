import {useRef, useState} from "react";
import Counter from "./component/Counter";
import ClassCounter from "./component/ClassCounter";
import "./styles/App.css"
import PostList from "./component/PostList";
import MyButton from "./component/UI/button/MyButton";
import MyInput from "./component/UI/input/MyInput";
import PostForm from "./component/PostForm";

function App() {

    const [posts, setPosts] = useState([
            {id: 1, title: "Javascript", body: "Description"},
            {id: 2, title: "C", body: "Description"},
            {id: 3, title: "C++", body: "Description"},
            {id: 4, title: "C#", body: "Description"},
            {id: 5, title: "PHP", body: "Description"},
            {id: 6, title: "Python", body: "Description"},
            {id: 7, title: "GoLang", body: "Description"}
        ]
    )


    const createPost = (newPost) => {
        setPosts([...posts, newPost])
    }

    const removePost = (post) => {
        setPosts(posts.filter(p => p.id !== post.id))
    }


    return (
        <div className='App'>
            <PostForm create={createPost}/>
            <PostList remove={removePost} posts={posts} title={'Post List 1'}/>
            <Counter/>
            <ClassCounter/>
        </div>
    );
}

export default App;
