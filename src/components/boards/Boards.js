import {Container, Row, Col} from 'react-bootstrap';
import BoardsItem from './boardsItem/BoardsItem';
import { useLocalStorage } from 'react-use';

import './Boards.scss';

const Boards = () => {

    const [bList, setBlist] = useLocalStorage('board', [])

    const deleteItem = (id) => {
        let newArr = bList 
        
        newArr = newArr.filter(item => item.id != id)  
        setBlist(newArr)
    }

    const addItems = () => {
        let copy = [...bList];

        let maxId;
        if(bList.length > 0){
            maxId = bList[bList.length - 1].id
        }else{
            maxId = 0;
        }
        
        copy = [...bList, {title: '', id: maxId + 1}];

        setBlist(copy)
    }

    const changeItemTitle = (id, newTitle) => {
        setBlist(
            bList.map(item => 
                item.id === id 
                ? {...item, title : newTitle} 
                : item 
        ))
    }

    return (
        <div className='boards'>
            <Container>
                
                <Row>
                    
                    {
                        bList.map(({id, title}) => {
                            return <BoardsItem key={id} title={title} id={id} deleteItem={deleteItem} changeItemTitle={changeItemTitle}/>
                        })
                    }
                    
                    <Col sm={3}>
                        <div className='boards__item'>
                            <button onClick={addItems} className='board__add btn btn-outline-primary'>
                                add new board
                            </button>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    );

}
  
export default Boards;
  