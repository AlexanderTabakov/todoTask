import React from 'react';
import {Button, Card, Radio, Select} from 'antd';
import useStore, {IData, IItem} from "store";


interface IProps extends IItem {
    id?:number,
    addToFav?:any,
    removeFromFav?:any,
    deleteTodo?:any,
    changeStatus?:any,
}


const TodoCard:React.FC<IProps> = ({title, status, description, addToFav, removeFromFav,deleteTodo, changeStatus}) => {


    return (
        <div>
            <Card
                hoverable
                style={{ width: 240 }}
            >

                {/*<Button type="primary" onClick={addToFav}>Add To Favorite</Button>*/}
                {/*<Button type="primary" onClick={removeFromFav}>Remove From Favorite</Button>*/}
                <Button type="primary" onClick={deleteTodo}>Delete TODO</Button>
                <Radio.Group buttonStyle={'solid'} >
                    <Radio.Button value={'1'} onClick={addToFav}>Add To Favorite</Radio.Button>
                    <Radio.Button value={'2'} onClick={removeFromFav} >Remove From Favorite</Radio.Button>
                </Radio.Group>


                <p>{title}</p>
                <p>{description}</p>
                <p>{status}</p>
                <Select placeholder={status} onChange={changeStatus} options={[
                    { value: 'active', label: 'Active' },
                    { value: 'completed', label: 'Completed' },
                ]}></Select>


                {/*// TODO исправить функцию изменения статуса в том числе и в сторе*/}




            </Card>
        </div>
    );
};

export default TodoCard;
