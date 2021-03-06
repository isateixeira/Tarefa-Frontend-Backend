/* eslint-disable no-restricted-globals */
import React, { useState, useEffect } from 'react';
import { Table, Button } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import api from '../../services/api';
import moment from 'moment';
// import './index.css';
 
interface ITask{
    id: number;
    title: string;
    description: string;
    finished: boolean;
    created_at: Date;
    updated_at: Date;
}
 
const Tasks: React.FC = () => {
 
    const [tasks, setTasks] = useState<ITask[]>([])
    const history = useHistory()
 
    useEffect(() => {
        loadTasks()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
 
    async function loadTasks() {
        const response = await api.get('/tasks')
        newFunction(response);
    
    }
    function formatDate(date: Date){
        return moment(date).format('DD/MM/YYYY')
    }
   
    function newTask(){
        history.push ('./tarefas_cadastro')
            
    }
    function editTask(id: number){
        history.push(`/tarefas_cadastro/${id}`)
    }


 
    return (
        
        <div className="container">
            <br />
            <div className="task-header">
                <h1>Tarefas</h1>
                <Button variant="dark" size="sm" onClick={newTask}>Nova Tarefa</Button>
            </div>
            <br />
            <Table striped bordered hover className="text-center">
                <thead>
                    <tr>
                    <th>ID</th>
                    <th>Título</th>
                    <th>Data de Atualização</th>
                    <th>Status</th>
                    <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        tasks.map(task => (
                            <tr key={task.id}>
                                <td>{task.id}</td>
                                <td>{task.title}</td>
                                <td>{formatDate(task.updated_at)}</td>
                                <td>{task.finished ? "Finalizado" : "Pendente"}</td>
                                <td>
                                    <Button size="sm" variant="primary" onClick={() => editTask(task.id)}>Editar</Button>{' '}
                                    <Button size="sm" variant="success">Finalizar</Button>{' '}
                                    <Button size="sm" variant="warning">Visualizar</Button>{' '}
                                    <Button size="sm" variant="danger">Remover</Button>{' '}
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </Table>
        </div>
    );







    function newFunction(response:any) {
        setTasks(response.data);
    }
}
 
export default Tasks;