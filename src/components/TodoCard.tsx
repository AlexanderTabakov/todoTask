import React from 'react';
import {Button, Card} from 'antd';
import useStore, {IData, IItem} from "store";


interface IProps extends IItem {
    id?:number,
    addToFav?:any,
    removeFromFav?:any,
    deleteTodo?:any,
}


const TodoCard:React.FC<IProps> = ({title, status, description, addToFav, removeFromFav,deleteTodo}) => {


    return (
        <div>
            <Card
                hoverable
                style={{ width: 240 }}
            >

                <Button type="primary" onClick={addToFav}>Add To Favorite</Button>
                <Button type="primary" onClick={removeFromFav}>Remove From Favorite</Button>
                <Button type="primary" onClick={deleteTodo}>Delete TODO</Button>




                <p>{title}</p>
                <p>{description}</p>
                <p>{status}</p>




            </Card>
        </div>
    );
};

export default TodoCard;
