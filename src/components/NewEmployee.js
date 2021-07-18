import { Button, Grid, Paper, TextField, Typography } from '@material-ui/core';
import axios from 'axios';
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Environment from '../environment/desenv';
import styles from '../styles/Form.module.css';

export default function NewEmployee(props) {
    const { history } = props;
    const { id: company } = useParams();
    const [loading, setLoading] = React.useState(false);
    const [submit, setSubmit] = React.useState(false);
    const [professions, setProfessions] = React.useState([]);
    const [employee, setEmployee] = React.useState({
        name: '',
        profession_id: '',
        company_id: company,
        salary: '',
        salaryText: '',
    });
    
    const handleChangeField = (event) => {
        const newEmployee = {
            [event.target.name]: event.target.value,
        };

        setEmployee({ ...employee, ...newEmployee });
    }

    useEffect(() => {
        axios.get(`${Environment.API}/profession`)
            .then(res => {
                setProfessions(res.data);
            })
            .catch(ex => console.log(ex));
    }, [])

    const handleNew = () => {
        setLoading(true); 
        setSubmit(true);

        axios.post(`${Environment.API}/employee`, employee)
            .then(res => {
                setLoading(false);
                setSubmit(false);

                history.push(`/company-edit/${company}`);
                history.go();
            })
            .catch(ex => {
                setLoading(false);
            });
    }

    const handleChangeSalary = (event) => {
        const value = String(event.target.value).replace(/[^\d,]/g, '').replace(',', '.');
        const salary = +value;

        setEmployee({ ...employee, salary, salaryText: event.target.value });
    }

    return (
        <section className={styles.container}>
            <Paper className={styles.cardForm}>
                <Typography component="h4">
                    Novo funcionário 
                </Typography>
                <form>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                           <TextField 
                                label="Nome"
                                name="name"
                                value={employee.name}
                                onChange={handleChangeField}
                                style={{ width: '100%' }}
                                error={submit && !employee.name}
                                helperText={submit && !employee.name ? 'Obrigatório' : ''}
                           /> 
                        </Grid>
                        <Grid item xs={12}>
                            <TextField 
                                label="Salário"
                                name="salary"
                                value={employee.salaryText}
                                onChange={handleChangeSalary}
                                style={{ width: '100%' }}
                                error={submit && !employee.salary}
                                helperText={submit && !employee.salary ? 'Obrigatório' : ''}
                            /> 
                        </Grid>
                        <Grid item xs={12}>
                            <TextField 
                                label="Cargo"
                                name="profession_id"
                                select
                                value={employee.profession_id}
                                onChange={handleChangeField}
                                style={{ width: '100%' }}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                SelectProps={{
                                    native: true
                                }}
                                error={submit && !employee.profession_id}
                                helperText={submit && !employee.profession_id ? 'Obrigatório' : ''}
                            >   
                                <option value="''">
                                    Selecione
                                </option>
                                {professions.map((profession, index) => {
                                    return (
                                        <option
                                            key={index}
                                            value={profession.id}
                                        >
                                            {profession.name}
                                        </option>
                                    );
                                })}
                            </TextField> 
                        </Grid>
                    </Grid>
                    <Button color="primary" onClick={handleNew}>
                        Salvar
                    </Button>
                </form>
            </Paper>
        </section>
    );
}