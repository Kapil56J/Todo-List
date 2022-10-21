import React from 'react'
import {Icon} from 'react-icons-kit'
import {trash} from 'react-icons-kit/feather/trash'

export const View = ({tasks,deleteBook}) => {
    
    return tasks.map(task=>(

        <tr key={task.item}>
            <td>{task.item}</td>
            <td>{task.quantity}</td>
            <td>{task.price}</td>
            <td className='delete-btn' onClick={()=>deleteBook(task.item)}>
                <Icon icon={trash}/>
            </td>           
        </tr>       
           
    
))
}