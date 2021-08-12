import {useEffect, useState} from "react";
import {usePosts} from "../hooks/usePosts";
import {useFetching} from "../hooks/useFetching";
import PostService from "../API/PostService";
import {getPageCount} from "../utils/page";
import MyButton from "../component/UI/button/MyButton";
import MyModal from "../component/UI/myModal/MyModal";
import PostForm from "../component/PostForm";
import PostFilter from "../component/PostFilter";
import PostList from "../component/PostList";
import Pagination from "../component/UI/pagination/Pagination";
import Loader from "../component/UI/loader/Loader";


function Posts() {

    const [posts, setPosts] = useState([
        /* {id: 1, title: "Javascript", body: "Description"},
         {id: 2, title: "C", body: "Description"},
         {id: 3, title: "C++", body: "Description"},
         {id: 4, title: "C#", body: "Description"},
         {id: 5, title: "PHP", body: "Description"},
         {id: 6, title: "Python", body: "Description"},
         {id: 7, title: "GoLang", body: "Description"}*/
    ])
    const [filter, setFilter] = useState({sort: '', query: ''})
    const [modal, setModal] = useState(false)
    const sortedAndSearchedPosts = usePosts(posts, filter.sort, filter.query)
    const [totalPages, setTotalPage] = useState(0)
    const [limit, setLimit] = useState(10)
    const [page, setPage] = useState(1)




    const [fetchPosts, isPostLoading, postError] = useFetching(async () => {
        const response = await PostService.getAll(limit, page)
        setPosts(response.data)
        const totalCount = response.headers['x-total-count']
        setTotalPage(getPageCount(totalCount, limit))

    })


    useEffect(() => {
        fetchPosts()
    }, [page])


    const createPost = (newPost) => {
        setPosts([...posts, newPost])
        setModal(false)
    }

    const removePost = (post) => {
        setPosts(posts.filter(p => p.id !== post.id))
    }


    const changePage = (page) => {
        setPage(page)
    }



    return (
        <div className='App'>
            <MyButton style={{marginTop: '15px'}} onClick={() => setModal(true)}>
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
            {postError && <h1>Error ${postError}</h1>
            }
            {isPostLoading
                ? <div style={{display: 'flex', justifyContent: 'center'}}><Loader/></div>
                : <PostList remove={removePost} posts={sortedAndSearchedPosts} title={'Post List 1'}/>
            }
            <Pagination
                page={page}
                changePage={changePage}
                totalPages={totalPages}/>

            {/*<Counter/>
            <ClassCounter/>*/}
        </div>
    );
}

export default Posts;
