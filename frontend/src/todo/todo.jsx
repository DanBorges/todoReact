import React, { Component } from 'react'
import axios from 'axios'

import PageHeader from '../template/pageHeader'
import TodoForm from './todoForm'
import TodoList from './todoList'


const URL = 'http://localhost:3003/api/todos'

export default class Todo extends Component {


    constructor(props) {
        super(props)
        this.state = { description: '', list: [] }
        this.handleAdd = this.handleAdd.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.handleRemove = this.handleRemove.bind(this)

        this.handleMarkAsPending = this.handleMarkAsPending.bind(this)
        this.handleMarkAsDone = this.handleMarkAsDone.bind(this)

        this.refresh()
    }

    refresh() {
        axios.get(`${URL}?sort=-createdAt`)
        .then(resp=> this.setState({...this.state, description: '', list: resp.data}))
    }
    handleRemove(todo) {
        axios.delete(`${URL}/${todo._id}`)
        .then(res => this.refresh())
    }

    handleChange(e) {
        this.setState({ ...this.setState, description: e.target.value })
        // console.log(this.state.description)
    }

    handleAdd() {
        const description = this.state.description
        axios.post(URL, {description})
            .then(resp => this.refresh())
    }

    handleMarkAsPending(todo) {
        axios.put(`${URL}/${todo._id}`, {...todo, done: false})
        .then(res => this.refresh())
    }

    handleMarkAsDone(todo) {
        axios.put(`${URL}/${todo._id}`, {...todo, done: true})
        .then(res => this.refresh())
    }
    render() {
        return (
            <div>
                <PageHeader name='Tarefas' small='Cadastro'></PageHeader>
                <TodoForm description={this.state.description}
                          handleAdd={this.handleAdd} 
                          handleChange={this.handleChange}/>
                <TodoList list = {this.state.list} 
                            handleRemove={this.handleRemove}
                            handleMarkAsPending={this.handleMarkAsPending}
                            handleMarkAsDone={this.handleMarkAsDone}
                            />
            </div>
        )
    }
} 