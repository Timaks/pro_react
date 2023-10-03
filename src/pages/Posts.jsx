import React, { useEffect, useRef, useState } from "react";
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
  const lastElement = useRef(); 
  const observer = useRef();

  const [fetchPosts, isPostsLoading, postError] = useFetching( async(limit, page) => {
    const response = await PostService.getAll(limit, page);
    setPosts([...posts, ...response.data])
    const totalCount =  response.headers['x-total-count']
    setTotalPages(getPageCount(totalCount, limit))
 })
 
  useEffect(()=> {
    if(isPostsLoading) return;
    if(observer.current) observer.current.disconnect();
    let callback = function(entries, observer){
      if(entries[0].isIntersecting && page < totalPages){
        console.log(page)
        // доходя до конца, увеличиваем страницу чтобы была бесконечная лента
        setPage(page + 1)
      }
     
    };
    observer.current = new IntersectionObserver(callback);
    // передаем за каким эл-ом будем наблюдать
    observer.current.observe(lastElement.current)
  }, [isPostsLoading])


  //следит за стадиями 
  useEffect( () => {
    fetchPosts(limit, page)
  }, [page])

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
       {/* передаем ref={lastElement} чтобы получить доступ к dom эл-ту */}
        <PostList remove={removePost} posts={sortedAndSearchedPosts} title="Список постов"/>
        <div ref={lastElement} style={{height: 20, background: 'red'}}/>
        
        {isPostsLoading &&
          <div style={{display: 'flex', justifyContent: 'center', marginTop: 50}}>
              <Loader/>
            </div>
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