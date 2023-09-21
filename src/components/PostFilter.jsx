import React from "react";
import MyInput from "./UI/input/MyInput";
import MySelect from "./UI/select/MySelect";

const PostFilter = ({filter, setFilter}) => {
    return (
        <div>
            <MyInput
                value={filter.query}
                // возвращаем поля ...filter, query и заменяем нужными
                onChange={e => setFilter({...filter, query:  e.target.value})}
                placeholder="Поиск..."
                />
            <MySelect
                value={filter.sort}
                // опция что выбрал пользователь
                onChange={selectedSort => setFilter({...filter, sort: selectedSort})}
                defaultValue="Сортировка"
                options={[
                    {value: 'title', name: 'По названию'},
                    {value: 'body', name: 'По описанию'},
                ]}
            />
           </div>
        
    );
};

export default PostFilter;