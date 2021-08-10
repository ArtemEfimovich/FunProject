import {useMemo, useState} from "react";
import Counter from "./component/Counter";
import ClassCounter from "./component/ClassCounter";
import "./styles/App.css"
import PostList from "./component/PostList";
import MyInput from "./component/UI/input/MyInput";
import PostForm from "./component/PostForm";
import MySelect from "./component/UI/select/MySelect";
import PostFilter from "./component/PostFilter";
import MyModal from "./component/UI/myModal/MyModal";
import MyButton from "./component/UI/button/MyButton";

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


    const [filter, setFilter] = useState({sort: '', query: ''})
    const [modal,setModal]=useState(false)


    const sortedPosts = useMemo(() => {
        if (filter.sort) {
            return [...posts].sort((a, b) => a[filter.sort].localeCompare(b[filter.sort]))
        }
        return posts
    }, [filter.sort, posts])

    const sortedAndSearchedPosts = useMemo(() => {
        return sortedPosts.filter(post => post.title.toLowerCase().includes(filter.query))
    }, [filter.query, sortedPosts])

    const createPost = (newPost) => {
        setPosts([...posts, newPost])
        setModal(false)
    }

    const removePost = (post) => {
        setPosts(posts.filter(p => p.id !== post.id))
    }


    return (
        <div className='App'>
            <MyButton style={{marginTop:'15px'}} onClick={() =>setModal(true)}>
                Create user
            </MyButton>
            <MyModal
                visible={modal}
                setVisible={setModal}
            >
                <PostForm create={createPost}/>
            </MyModal>

            <hr style={{margin: '15px 0'}}/>
            <PostFilter
                filter={filter}
                setFilter={setFilter}
            />
            <PostList remove={removePost} posts={sortedAndSearchedPosts} title={'Post List 1'}/>
            <Counter/>
            <ClassCounter/>
        </div>
    );
}

export default App;
