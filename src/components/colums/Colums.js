import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable,} from "react-beautiful-dnd";
import nextId from "react-id-generator";
import CreateCol from "./CreateCol";
import Colum from "./Colum";
import { useLocalStorage } from 'react-use';

import './Colums.scss'

// приклад стейту
// const columns = [
//     {
//         columnName: 'group0',
//         id: '0',
//         items: [
//             {
//                 id: '0',
//                 name: 'Gary Goodspeed 0',
//                 statusActive: false, 
//             },
//             {
//                 id: '1',
//                 name: 'Gary Goodspeed 1',
//                 statusActive: false, 
//             },
//         ]
//     },
// ]

const Colums = () => {
    
    const [cols, updateCols] = useLocalStorage('columns', []);
    
    const columReorder = (result) =>{
        let columsState = Array.from(cols)
        
        const [reorderedItem] = columsState.splice(result.source.index, 1);
        columsState.splice(result.destination.index, 0, reorderedItem);
         
        updateCols(columsState)
    }

    const listReorder = (result) => {
        let columsState = Array.from(cols)
        const sourceId = result.source.droppableId
        const destinationId = result.destination.droppableId

        // в тій самій колонці
        if(sourceId === destinationId){
            columsState.filter((col)=>{
                if(col.id === result.source.droppableId){
                   
                    const [reorderedItem] = col.items.splice(result.source.index, 1);
                    col.items.splice(result.destination.index, 0, reorderedItem);

                    return col
                }
                return(col)
            })
        }else{
            let item;
            
            // видаляємо із старої колонки
            columsState.filter((col)=>{
                if(col.id === result.source.droppableId){
                    item = col.items[result.source.index]
                    const [reorderedItem] = col.items.splice(result.source.index, 1);

                    return col
                }
                return(col)
            })

            // додаємо в нову
            columsState.filter((col, index) => {
                if(col.id == destinationId){
                    col.items.splice(result.destination.index, 0, item);

                    return col
                }
                return(col)
            });
        }

        updateCols(columsState)
    }
    
    function onDragEnd(result) {
        
        if (!result.destination) return;

        switch (result.type){
            case "COLUMN": 
                columReorder(result)
                break;
            case "LIST": 
                listReorder(result)
                break;
            default: 
                console.log('default')
        }
            
    }

    const changeColName = (newColumnName, colId) =>{
        updateCols(
            cols.map(item => 
                item.id === colId 
                ? {...item, columnName : newColumnName} 
                : item 
        ))
    }

    const changeItemStatus = (colId, itemId) => {

        function editItem(items, itemId) {
            let newItems = items.map(item => {
                if(item.id === itemId){
                    return {...item, statusActive: !item.statusActive}
                }
                return item
            })

            return newItems;
        }

        updateCols(
            cols.map(
                item => 
                    item.id === colId 
                    ? {...item, items : editItem(item.items, itemId)} 
                    : item                 
        ))
    }

    const deleteCol = (id) => {
        updateCols(
            cols.filter(item => item.id != id)
        )
    }

    const deleteItem = (colId, itemId) => {
        updateCols(
            cols.map(
                item => 
                    item.id === colId 
                    ? {...item, items: item.items.filter(item => item.id != itemId)} 
                    : item                 
        ))
    }

    const createItem = (name, colId) => {
        const newItem = {
            id: nextId(),
            name: name,
            statusActive: false, 
        } 
        updateCols(
            cols.map(
                item => 
                    item.id === colId 
                    ? {...item, items: [...item.items, newItem]} 
                    : item                 
        ))
    }

    const createCol = (name) => {
        const newId = nextId()
        let newCol = {
            columnName: name,
            id: newId,
            items: []
        } 

        updateCols([...cols, newCol])
    }

    return(
        <>
        <CreateCol createCol={createCol}/>

        <div className="overlay">
            <DragDropContext onDragEnd={onDragEnd}>
                <Droppable
                    droppableId="board"
                    type="COLUMN"
                    direction="horizontal"
                >
                {provided => (
                    <div className="column__wrap" ref={provided.innerRef} {...provided.droppableProps}>
                        {
                            cols.map(({id, columnName, items}, index) => {
                                return(
                                    <Colum key={id} id={id} columnName={columnName} index={index} items={items} changeColName={changeColName} changeItemStatus={changeItemStatus} deleteCol={deleteCol} deleteItem={deleteItem} createItem={createItem}/>
                                )
                            })
                        }
                       
                        {provided.placeholder}
                    </div>
                )}
                </Droppable>
            </DragDropContext>
        </div>
        </>
    )
} 

export default Colums;
