import {useState, useRef} from 'react';
import {Link} from "react-router-dom";
import {Col} from 'react-bootstrap';

import './BoardsItem.scss';

const BoardsItem = (props) => {

    const [title, setTitle] = useState(props.title)  

    const handleChange = (e) => {
        
        setTitle(title => e.target.value)
        props.changeItemTitle(props.id, title)

        console.log(title)
    };

    const handeleDeleteItem = () =>{
        props.deleteItem(props.id)
    } 
    

    return (
        <Col sm={3}>
            <div className='boards__item'>
                <input className='boards__item__name' value={title} onChange={handleChange} placeholder='Введіть назву'/>
                <button onClick={handeleDeleteItem} className='btn btn-danger boards__item__delete'>Delete</button>
                
            </div>
        </Col>
    );
}
  
export default BoardsItem;