import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import IconBotton from '../template/iconButton'
import { remove, markAsDone, markAsPendding } from '../main/redux/todoActions'

const TodoList =  props =>{

    const renderRows = () => {
        const list = props.list || []
        return(
            list.map(todo => (
                <tr key={todo._id}>
                    <td className={todo.done ? 'markedAsDone' : ''}>{todo.description}</td>
                    <td>
                        <IconBotton
                            hide={!todo.done}
                            style='danger' 
                            icon='trash-o' 
                            onClick={()=>props.remove(todo)}>
                        </IconBotton>

                        <IconBotton
                            hide={todo.done} 
                            style='success' 
                            icon='check' 
                            onClick={()=>props.markAsDone(todo)}>
                        </IconBotton>

                        <IconBotton 
                            hide={!todo.done}
                            style='warning' 
                            icon='undo' 
                            onClick={()=>props.markAsPendding(todo)}>
                        </IconBotton>
                    </td>
                </tr>
            ))
        )
    }

    return (
        <table className='table'>
            <thead>
                <tr>
                    <th>Descrição</th>
                    <th className='tableActions'>Ações</th>
                </tr>
            </thead>
            <tbody>
                {renderRows()}
            </tbody>
        </table>
    )
}



const mapStateToProps = state => ({list: state.todo.list})
const mapDispatchToProps = dispatch => bindActionCreators({ remove, markAsDone, markAsPendding }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(TodoList)