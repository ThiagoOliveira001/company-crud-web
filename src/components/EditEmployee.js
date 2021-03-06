import axios from 'axios';
import { 
    Button, 
    Grid, 
    Paper, 
    TextField, 
    Typography
} from '@material-ui/core';
import React, { useEffect } from 'react';
import Environment from '../environment/desenv';
import styles from '../styles/Form.module.css';
import { useParams } from 'react-router-dom';
import {ToastsContainer, ToastsStore} from 'react-toasts';
import Loader from './Loader';

export default function EditEmployee(props) {
    const { history } = props;
    const { id } = useParams();
    const [submit, setSubmit] = React.useState(false);
    const [professions, setProfessions] = React.useState([]);
    const [loading, setLoading] = React.useState(false);
    const [employee, setEmployee] = React.useState({
        name: '',
        profession_id: '',
        company_id: '',
        salary: '',
    });

    useEffect(() => {
        setLoading(true);
        axios.get(`${Environment.API}/profession`)
            .then(res => {
                setProfessions(res.data);

                axios.get(`${Environment.API}/employee/${id}`)
                    .then(res => {
                        setEmployee(res.data);
                        setLoading(false);
                    })
                    .catch(ex => {
                        setLoading(false);
                        if (ex.response) {
                            ToastsStore.error(ex.response?.data?.message);
                        }
                    });
            })
            .catch(ex => {
                setLoading(false);
                if (ex.response) {
                    ToastsStore.error(ex.response?.data?.message);
                }
            });
    }, []);

    const handleChangeField = (event) => {
        const newEmployee = {
            [event.target.name]: event.target.value,
        };

        setEmployee({ ...employee, ...newEmployee });
    }

    const handleSave = () => {
        setLoading(true);
        axios.put(`${Environment.API}/employee/${id}`, employee)
            .then(res => {
                setLoading(false);
                history.push(`/company-edit/${employee.company_id}`);
                history.go();
            })
            .catch(ex => {
                setLoading(false);
                if (ex.response) {
                    ToastsStore.error(ex.response?.data?.message);
                }
            });
    }

    return (
        <section className={styles.container}>
            <Loader loading={loading} />
            <Paper className={styles.cardForm}>
                <Typography component="h4">
                    Editar funcion??rio 
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
                                helperText={submit && !employee.name ? 'Obrigat??rio' : ''}
                           /> 
                        </Grid>
                        <Grid item xs={12} sm={12} md={12} xl={12} lg={12}>
                            <TextField 
                                label="Sal??rio"
                                name="salary"
                                value={employee.salary}
                                onChange={handleChangeField}
                                style={{ width: '100%' }}
                                error={submit && !employee.salary}
                                helperText={submit && !employee.salary ? 'Obrigat??rio' : ''}
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
                                helperText={submit && !employee.profession_id ? 'Obrigat??rio' : ''}
                            >
                                {professions.map((profession, index) => {
                                    return(
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
                    <Button color="primary" onClick={handleSave}>
                        Salvar
                    </Button>
                </form>
            </Paper>
            <ToastsContainer store={ToastsStore}/>
        </section>
    );
}