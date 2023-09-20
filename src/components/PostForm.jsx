import React, { useState } from "react";
import MyInput from "./UI/input/MyInput";
import MyButton from "./UI/button/MyButton";

// вызываем ф-цию пропс
const PostForm = ({create}) => {
    const [post, setPost] = useState({title: '', body: ''})

    const addNewPost = (e) => {
        e.preventDefault()
     
        const newPost = {
            ...post, id: Date.now()
        }
        //вызываем ф-цию и передаем ей новый пост
        create(newPost)
        setPost({title: '', body: ''})
      }

    return (
        <form>
        {/* управляемый компонент */}
          <MyInput 
            value={post.title}
            // отслеживаем что вводится в инпут, двусторонее связывыние/ передаем объект
            onChange={e => setPost({...post, title: e.target.value})}
            type="text" 
            placeholder="Название поста"
            />
            {/* Неуправляемый\ Неконтролируемый компонент */}
          <MyInput 
            value={post.body}
            onChange={e => setPost({...post, body: e.target.value})}
            type="text" 
            placeholder="Описание поста"
            />
          <MyButton onClick={addNewPost}>Создать пост</MyButton>
      </form>
    )
}

export default PostForm;