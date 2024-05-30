import React, {useEffect} from 'react';
import useStore from "store";
import AddToDoModal from "components/AddToDoModal";
import TodoCard from "components/TodoCard";
import {Button} from "antd";

const MainPage = () => {
    const { sortByActive, sortByCompleted, copiedData, reset, addToFavorite, removeFromFavorite, sortByFav, deleteTodo, changeStatus} = useStore();


    // const changeStatusTest = (item:any, id:any) => {
    //     const {title, description, status} = item
    //     const test = {title, description, status}
    //     changeStatus(test)
    // }


    const handleScroll = () => {
        const { scrollTop, clientHeight, scrollHeight } = document.documentElement;
        if (scrollTop + clientHeight >= scrollHeight - 20) {
            useStore.getState().getData();
        }
    };

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return window.addEventListener("scroll", handleScroll);
    }, []);




    return (

        <>

            <AddToDoModal/>


            <Button onClick={sortByActive}>Sort by Active</Button>
            <Button onClick={sortByCompleted}>Sort By Completed</Button>
            <Button onClick={sortByFav}>Sort By Favorite</Button>
            <Button onClick={reset}> RESET </Button>






            <div>

                {copiedData?.map((item: { id: number; attributes: { title: string; description: string; status: string; }; }) => (
                    <TodoCard
                        key={item.id}
                        title={item.attributes.title}
                        description={item.attributes.description}
                        status={item.attributes.status}
                        addToFav={()=>addToFavorite(item)}
                        removeFromFav={()=>removeFromFavorite(item.id)}
                        deleteTodo={()=>deleteTodo(item.id)}
                        changeStatus={()=>changeStatus(item.id, item.attributes)}

                    />
                ))}
            </div>


        </>

    )
};

export default MainPage;
