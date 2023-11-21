import React, {useState} from 'react';

const TestInputPage = () => {

    const [title, setTitle] = useState('SomeText')
    const [text, setText] = useState('')

    const inputTextHandler = (event:any) => {
        event.preventDefault
        setTitle(event.target.value)


    }

    return (
        <div>
            <div>{title}</div>
            <input type="text" onChange={e=>setTitle(e.target.value)}/>
            <input type="text" onChange={inputTextHandler}/>
        </div>
    );
};

export default TestInputPage;
