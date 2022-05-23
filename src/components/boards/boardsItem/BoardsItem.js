import {useState} from 'react';
import {Col} from 'react-bootstrap';

import './BoardsItem.scss';

const BoardsItem = (props) => {

    const [title, setTitle] = useState(props.title)  
    const {changeItemTitle, deleteItem, id} = props;

    const handleChange = (e) => {
        setTitle(title => e.target.value)
        changeItemTitle(id, title)
    };

    const handeleDeleteItem = () =>{
        deleteItem(id)
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