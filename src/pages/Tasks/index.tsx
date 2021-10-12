import React, { useState, useEffect } from 'react';
import { Table, Button } from 'react-bootstrap';
import api from '../../services/api';
import moment from 'moment';
 
interface ITask{
    id: number;
    nome: string;
    ra: string;
    dataDeNascimento: string;
    endereco: string;
    matriculado: boolean;
    idade: number;
    finished: boolean;
    created_at: Date;
    updated_at: Date;
}
 
const Tasks: React.FC = () => {
 
    const [tasks, setTasks] = useState<ITask[]>([])
 
    useEffect(() => {
        loadTasks()
    }, [])
 
    async function loadTasks() {
        const response = await api.get('/tasks')
        console.log(response);
        setTasks(response.data)
    }
 
    function formatDate(date: Date){
        return moment(date).format('DD/MM/YYYY')
    }
 
    return (
        
        <div className="container">
            <br />
            <h1>Página de Tarefas</h1>
            <br />
            <Table striped bordered hover className="text-center">
                <thead>
                    <tr>
                    <th>ID</th>
                    <th>Nome</th>
                    <th>Ra</th>
                    <th>Data de Nascimento</th>
                    <th>Endereço</th>
                    <th>Matriculado(a)</th>
                    <th>Idade</th>
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
                                <td>{task.nome}</td>
                                <td>{task.ra}</td>
                                <td>{task.dataDeNascimento}</td>
                                <td>{task.endereco}</td>
                                <td>{task.finished ? "Matriculado(a)" : "Aluno não matriculado"}</td>
                                <td>{task.idade}</td>
                                <td>{formatDate(task.updated_at)}</td>
                                <td>{task.finished ? "Finalizado" : "Pendente"}</td>
                                <td>
                                    <Button size="sm" variant="primary">Editar</Button>{' '} <h1></h1>
                                    <Button size="sm" variant="success">Finalizar</Button>{' '}<h1></h1>
                                    <Button size="sm" variant="warning">Visualizar</Button>{' '}<h1></h1>
                                    <Button size="sm" variant="danger">Remover</Button>{' '}<h1></h1>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </Table>
        </div>
    );
}
 
export default Tasks;
