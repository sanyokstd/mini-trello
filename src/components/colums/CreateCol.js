import { useState } from 'react';
import {useAddColumnsMutation} from '../../api/apiSlice'
import nextId from "react-id-generator";
import './Colums.scss'


const CreateCol = ({maxSortVal}) => {
    const [name, setName] = useState('')
    const [createCol] = useAddColumnsMutation()

    const handeleOnChange = (e) => {
        setName(e.target.value)
    }

    const handeSubmit = (e) => {
        e.preventDefault()
        let newCol = {
            columnName: name,
            items: [],
            sort: maxSortVal+1
        } 
        if(name.length > 0){
            createCol(newCol)
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