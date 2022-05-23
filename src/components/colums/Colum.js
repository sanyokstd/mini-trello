import React, { useState, useEffect } from "react";
import {Draggable} from "react-beautiful-dnd";
import ColumItems from "./ColumItems";
import CreateItem from './CreateItem';
import {useDeleteColMutation} from '../../api/apiSlice'
import './Colums.scss'

const Colum = ({columnName, id, index, items, changeColName, changeItemStatus, deleteItem, createItem}) => {
    const [showEdit, updateShowEdit] = useState(false)
    const [title, updateTitle] = useState(columnName)
    const [deleteCol] = useDeleteColMutation()

    useEffect(() => {
        changeColName(title, id)
    }, [title]);

    const handleChange = (e) => {
        updateTitle(title => e.target.value)
    }

    const showTitleBlock = (
        <div className="column__show">
            <div className="column__show__title">
                {title}
            </div>
            
            <button onClick={() => updateShowEdit(true)} className="btn btn-primary">edit</button>
            <button onClick={() => deleteCol(id)} className="btn btn-danger">delete col</button>
        </div>
    )

    const  showEditBlock = (
        <div className="column__edit">
            <input value={title} onChange={handleChange} placeholder='Введіть назву'/>
            <button onClick={() => updateShowEdit(false)} className="btn btn-primary">save</button>
        </div>
    )

    return(
        <Draggable draggableId={id.toString()} index={index}>
            {(provided, snapshot) => (
            <div className="column" ref={provided.innerRef} {...provided.draggableProps}>
                <div className="column__title" {...provided.dragHandleProps}>
                    {
                        showEdit ? showEditBlock  : showTitleBlock
                    }
                </div>
                <ColumItems colId={id} columnName={columnName} items={items} changeItemStatus={changeItemStatus} deleteItem={deleteItem}/>
                <CreateItem colId={id} createItem={createItem}/>
            </div>
            )}
        </Draggable>
    )
}

export default Colum;