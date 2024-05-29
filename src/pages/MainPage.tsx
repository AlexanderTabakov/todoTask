import React from 'react';
import useStore from "store";
import AddToDoModal from "components/AddToDoModal";
import TodoCard from "components/TodoCard";
import {Button} from "antd";

const MainPage = () => {
    const { sortByActive, sortByCompleted, copiedData, reset, addToFavorite, removeFromFavorite, sortByFav, deleteTodo, changeStatus} = useStore();


    return (

        <>

            <AddToDoModal/>


            <Button onClick={sortByActive}>Sort by Active</Button>
            <Button onClick={sortByCompleted}>Sort By Completed</Button>
            <Button onClick={sortByFav}>Sort By Favorite</Button>
            <Button onClick={reset}> RESET </Button>




            <div>

                {copiedData?.map((item: { id: React.Key; attributes: { title: string; description: string; status: string; createdAt: string; updatedAt: string; publishedAt: string; }; }) => (
                    <TodoCard
                        key={item.id}
                        title={item.attributes.title}
                        description={item.attributes.description}
                        status={item.attributes.status}
                        createdAt={item.attributes.createdAt}
                        updatedAt={item.attributes.updatedAt}
                        publishedAt={item.attributes.publishedAt}
                        addToFav={()=>addToFavorite(item)}
                        removeFromFav={()=>removeFromFavorite(item.id)}
                        deleteTodo={()=>deleteTodo(item.id)}
                        changeStatus={()=>changeStatus(item.id, item)}
                    />
                ))}
            </div>


        </>

    )
};

export default MainPage;
