import React, { useEffect, useState } from "react";
// параметр получение поста по id
import { useParams } from "react-router-dom";
import useFetching from "../hooks/useFetching";
import PostService from "../API/PostService";
import Loader from "../components/UI/Loader/Loader";

const PostIdPage = () => {
    const params = useParams()
    //состояние поста
    const [post, setPost] = useState({});
    const [comments, setComments] = useState([]);
    //отправка запроса(функция, загрузка, ошибки)
    const [fetchPostById, isLoading, error] = useFetching( async(id) => {
        const response = await PostService.getById(params.id)
        setPost(response.data);
    })
    const [fetchComments, isComLoading, comError] = useFetching( async(id) => {
        const response = await PostService.getCommentsByPostId(id)
        setComments(response.data);
    })
    // С первой отрисовкой документа получаем данные с сервера
    useEffect(() => {
        fetchPostById(params.id)
        fetchComments(params.id)
    }, [])
    return (
        <div>
            <h1>Вы открыли страницу поста с ID = {params.id}</h1>
            {isLoading
                ? <Loader/>
                :<div>{post.id}.{post.title}</div>
            }
            <h1>
                Комментарии
            </h1>
            {isComLoading
            ? <Loader/>
            : <div>
                {comments.map(comm => 
                    <div style={{marginTop: 15}}> 
                        <h5>{comm.email}</h5>
                        <div>{comm.body}</div>
                    </div>
                )}
            </div>
            }
            
        </div>
    )
}

export default PostIdPage;