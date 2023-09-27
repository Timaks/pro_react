import React, { useEffect, useMemo, useRef, useState } from "react";
import Counter from "./components/Counter";
import ClassCounter from "./components/ClassCounter";
import './styles/App.css';
import PostItem from "./components/PostItem";
import PostList from "./components/PostList";
import MyButton from "./components/UI/button/MyButton";
import MyInput from "./components/UI/input/MyInput";
import PostForm from "./components/PostForm";
import MySelect from "./components/UI/select/MySelect";
import PostFilter from "./components/PostFilter";
import MyModal from "./components/UI/MyModal/MyModal";
import { usePosts } from "./hooks/usePosts";
import axios from "axios";
import PostService from "./API/PostService";
import Loader from "./components/UI/Loader/Loader";
import useFetching from "./hooks/useFetching";

function App() {
  const [posts, setPosts] = useState([]);

  const [filter, setFilter] = useState({sort: '', query: ''})
  const [modal, setModal] = useState(false);
  const sortedAndSearchedPosts = usePosts(posts, filter.sort, filter.query);
  const [fetchPosts, isPostsLoading, postError] = useFetching( async() => {
    const posts = await PostService.getAll();
    setPosts(posts)
  })

  //следит за стадиями 
  useEffect( () => {
    fetchPosts()
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
        
      </div>
    );
}

export default App;
