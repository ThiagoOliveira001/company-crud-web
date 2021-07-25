import { Button, Grid, Paper, TextField, Typography } from '@material-ui/core';
import axios from 'axios';
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Environment from '../environment/desenv';
import styles from '../styles/Form.module.css';
import {ToastsContainer, ToastsStore} from 'react-toasts';
import Loader from './Loader';

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
            .catch(ex => {
                if (ex.response) {
                    ToastsStore.error(ex.response?.data?.message);
                }
            });
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
                if (ex.response) {
                    ToastsStore.error(ex.response?.data?.message);
                }
            });
    }

    const handleChangeSalary = (event) => {
        const value = String(event.target.value).replace(/[^\d,]/g, '').replace(',', '.');
        const salary = +value;

        setEmployee({ ...employee, salary, salaryText: event.target.value });
    }

    return (
        <section className={styles.container}>
            <Loader loading={loading} />
            <Paper className={styles.cardForm}>
                <Typography component="h4">
                    Novo funcionário 
                </Typography>
                <form>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={12} md={12} xl={12} lg={12}>
                           <TextField 
                                label="Nome"
                                name="name"
                                value={employee.name}
                                onChange={handleChangeField}
                                inputProps={{
                                    maxLength: 200
                                }}
                                style={{ width: '100%' }}
                                error={submit && !employee.name}
                                helperText={submit && !employee.name ? 'Obrigatório' : ''}
                           /> 
                        </Grid>
                        <Grid item xs={12} sm={12} md={12} xl={12} lg={12}>
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
                        <Grid item xs={12} sm={12} md={12} xl={12} lg={12}>
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
            <ToastsContainer store={ToastsStore}/>
        </section>
    );
}