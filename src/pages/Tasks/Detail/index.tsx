import React, { useState, useEffect } from 'react';
import { Button, Card } from 'react-bootstrap';
import { useHistory, useParams } from 'react-router-dom'
import './index.css';
import api from '../../../services/api';
import moment from 'moment';
 
interface ITask{
    id: number;
    nome: string;
    ra: string;
    data: string;
    endereco: string;
    idade: string;
    finished: boolean;
    created_at: Date;
    updated_at: Date;
}
 
const Detail: React.FC = () => {
 
    const history = useHistory()
    const { id } = useParams<{ id: string }>()
    const [task, setTask] = useState<ITask>()
 
    function back(){
        history.goBack()
    }
 
    async function findTask(){
        const response = await api.get<ITask>(`/tasks/${id}`)
        console.log(response)
        setTask(response.data)
    }
 
    // Quando o param "id" mudar/receber um novo valor, o useEffect será executado chamando o findTask
    useEffect(() => {
        findTask()
    }, [id])
 
    return (
        <div className="container">
            <br />
            <div className="task-header">
                <h1>Detalhes do Aluno</h1>
                <Button variant="dark" size="sm" onClick={back}>Voltar</Button>
            </div>
            <br />
 
            <Card style={{ width: '18rem' }}>
                <Card.Body>
                    <Card.Title>{task?.nome}</Card.Title>
                    
                    <Card.Text>
                    <p>RA:{task?.ra}</p>
                    <p>Data de Nascimento:{task?.data}</p>
                    <p>Endereço: {task?.endereco}</p>
                    <p>Idade: {task?.idade}</p>
                    {task?.finished ? "Finalizado" : "Pendente"}
                    <br />
                    <strong>Data de Cadastro: </strong>
                    {moment(task?.created_at).format('DD/MM/YYYY')}
                    <br />
                    <strong>Data de Atualização: </strong>
                    {moment(task?.updated_at).format('DD/MM/YYYY')}
                    </Card.Text>
                </Card.Body>
            </Card>
 
        </div>
    );
}
 
export default Detail;
 
