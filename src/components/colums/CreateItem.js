import { useState } from 'react';
import './Colums.scss'

const CreateItem = ({colId,createItem}) => {
    const [name, setName] = useState('')
    const handeleOnChange = (e) => {
        setName(e.target.value)
    }

    const handeSubmit = (e) => {
        e.preventDefault()
  
        if(name.length > 0){
            createItem(name, colId)
            setName('')
        }
    }

    return(
        <form onSubmit={handeSubmit} className="create__item">
            <input placeholder="enter name" value={name} onChange={handeleOnChange}/>
            <button type='submite' className="btn btn-success">ADD</button>
        </form>
    )
}

export default CreateItem;