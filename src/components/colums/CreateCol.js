import { useState } from 'react';
import './Colums.scss'

const CreateCol = ({colId, createCol}) => {
    const [name, setName] = useState('')

    const handeleOnChange = (e) => {
        setName(e.target.value)
    }

    const handeSubmit = (e) => {
        e.preventDefault()
        if(name.length > 0){
            createCol(name)
            setName('')  
        }
        
    }

    return(
        <div>
            <div className='create__col__title'>Create column</div>
            <form onSubmit={handeSubmit} className="create__col">
                <input placeholder="enter name" value={name} onChange={handeleOnChange}/>
                <button type='submite' className="btn btn-success">ADD</button>
            </form>
        </div>
        
    )
}

export default CreateCol;