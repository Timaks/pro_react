import React, { useEffect, useState } from "react";
import { usePosts } from "../hooks/usePosts";
import useFetching from "../hooks/useFetching";
import PostService from "../API/PostService";
import { getPageCount } from "../utils/pages";
import PostForm from "../components/PostForm";
import MyModal from "../components/UI/MyModal/MyModal";
import MyButton from "../components/UI/button/MyButton";
import PostFilter from "../components/PostFilter";
import Loader from "../components/UI/Loader/Loader";
import PostList from "../components/PostList";
import Pagination from "../components/UI/pagination/Pagination";

function Posts() {
  const [posts, setPosts] = useState([]);

  const [filter, setFilter] = useState({sort: '', query: ''})
  const [modal, setModal] = useState(false);
  //общее кол-во постов
  const [totalPages, setTotalPages] = useState(0);
  //общее кол-во страниц
  const [limit, setLimit] = useState(10);
  //номер текущей страницы
  const [page, setPage] = useState(1);

  const sortedAndSearchedPosts = usePosts(posts, filter.sort, filter.query);
  
  const [fetchPosts, isPostsLoading, postError] = useFetching( async(limit, page) => {
    const response = await PostService.getAll(limit, page);
    setPosts(response.data)
    const totalCount =  response.headers['x-total-count']
    setTotalPages(getPageCount(totalCount, limit))
 })
 console.log(totalPages)
 
  //следит за стадиями 
  useEffect( () => {
    fetchPosts(limit, page)
  }, [])

  const createPost = (newPost) => {
    // изменяем состояние, к постам добавляем новый пост
    setPosts([...posts, newPost])
    setModal(false)
  }  


  // получаем post из дочернего компонента
  const removePost = (post) => {
    setPosts(posts.filter(p => p.id !== post.id))
  }

  const changePage = (page) => {
    setPage(page)
    fetchPosts(limit, page)
  }

    return (
      <div className="App">
        <MyButton style={{marginTop: 30}} onClick={() => setModal(true)}>
          Создать пользователя
        </MyButton>
        <MyModal visible={modal} setVisible={setModal}>
          <PostForm create={createPost}/>
        </MyModal>

        {/* передаем ф-ию обратного вызова */}
        
        <hr style={{margin: '15px 0'}}/>
        <PostFilter 
          filter={filter} 
          setFilter={setFilter}
        />
        {postError && <h1>Произошла ошибка $postError</h1>}
        {isPostsLoading
          ? <div style={{display: 'flex', justifyContent: 'center', marginTop: 50}}>
              <Loader/>
            </div>
          
          : <PostList remove={removePost} posts={sortedAndSearchedPosts} title="Список постов 1"/>
        } 
        <Pagination
          page={page} 
          changePage={changePage} 
          totalPages={totalPages}
        />
      </div>
    );
}


export default Posts;