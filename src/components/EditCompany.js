import { Paper, TextField, Grid, Button } from '@material-ui/core';
import { red } from '@material-ui/core/colors';
import axios from 'axios';
import { fitToMask } from 'react-masked'
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Environment from '../environment/desenv';
import styles from '../styles/Form.module.css';
import ListEmployee from './ListEmployee';
import {ToastsContainer, ToastsStore} from 'react-toasts';
import Loader from './Loader';

export default function EditCompany(props) {
    const { history } = props;
    const { id } = useParams();
    const [loading, setLoading] = React.useState(false);
    const [submit, setSubmit] = React.useState(false);
    const [company, setCompany] = React.useState({
        name: '',
        address: '',
        zipcode: '',
        neighborhood: '',
        number: '',
        complement: '',
        city: '',
        uf: '',
        phone: ''
    });

    useEffect(() => {
        setLoading(true);
        axios.get(`${Environment.API}/company/${id}`)
            .then(res => {
                setLoading(false);
                setCompany(res.data);
            })
            .catch(ex => {
                if (ex.response) {
                    ToastsStore.error(ex.response?.data?.message);
                }
                setLoading(false);
            });
    }, []);

    const handleChangeField = (event) => {
        const newCompany = {
            [event.target.name]: event.target.value,
        };

        setCompany({ ...company, ...newCompany });
    }

    const handleChangeZipcode = (event) => {
        const zipcode = event.target.value.replace(/[^\d]/g, '');
        if (!zipcode) return false;

        setCompany({ ...company, zipcode });

        if (zipcode?.length !== 8) return false;


        axios.get(`${Environment.API}/zipcode/${zipcode}`)
            .then(res => {
                const location = res.data;
                
                setCompany({ ...company, ...location, zipcode });
            })
            .catch(ex => {
                if (ex.response) {
                    ToastsStore.error(ex.response?.data?.message);
                }
            });
    }

    const handleNew = () => {
        setLoading(true);
        setSubmit(true);

        axios.put(`${Environment.API}/company/${id}`, company)
            .then(res => {
                setLoading(false);
                setSubmit(false);

                history.push(`/company`);
                history.go();
            })
            .catch(ex => {
                setLoading(false);
                if (ex.response) {
                    ToastsStore.error(ex.response?.data?.message);
                }
            });
    }

    const handleChangePhone = (event) => {
        const phone = event.target.value.replace(/[^\d]/g, '');
        setCompany({ ...company, phone });
    }

    const handleClickDelete = () => {
        setLoading(true);
        axios.delete(`${Environment.API}/company/${id}`)
            .then(res => {
                history.push('/company');
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
                <form>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={12} md={12} xl={12} lg={12}>
                            <TextField 
                                label="Nome"
                                name="name"
                                onChange={handleChangeField}
                                inputProps={{
                                    maxLength: 200
                                }}
                                value={company.name}
                                style={{ width: '100%' }}
                                error={submit && !company.name}
                                helperText={submit && !company.name ? 'Obrigat??rio' : ''}
                            />
                        </Grid>
                        <Grid item xs={12} sm={2} md={2} xl={2} lg={2}>
                            <TextField 
                                label="CEP"
                                name="zipcode"
                                onChange={handleChangeZipcode}
                                value={fitToMask(company.zipcode, '99999-999')}
                                style={{ width: '100%' }}
                                error={submit && !company.zipcode}
                                helperText={submit && !company.zipcode ? 'Obrigat??rio' : ''}
                            />
                        </Grid>
                        <Grid item xs={12} sm={5} md={5} xl={5} lg={5}>
                            <TextField 
                                label="Logradouro"
                                name="address"
                                onChange={handleChangeField}
                                inputProps={{
                                    maxLength: 150
                                }}
                                value={company.address}
                                style={{ width: '100%' }}
                                error={submit && !company.address}
                                helperText={submit && !company.address ? 'Obrigat??rio' : ''}
                            />
                        </Grid>
                        <Grid item xs={12} sm={5} md={5} xl={5} lg={5}>
                            <TextField 
                                label="Numero"
                                name="number"
                                onChange={handleChangeField}
                                inputProps={{
                                    maxLength: 20
                                }}
                                value={company.number}
                                style={{ width: '100%' }}
                                error={submit && !company.number}
                                helperText={submit && !company.number ? 'Obrigat??rio' : ''}
                            />
                        </Grid>
                        <Grid item xs={12} sm={3} md={3} xl={3} lg={3}>
                            <TextField 
                                label="Bairro"
                                name="neighborhood"
                                onChange={handleChangeField}
                                value={company.neighborhood}
                                inputProps={{
                                    maxLength: 100
                                }}
                                style={{ width: '100%' }}
                                error={submit && !company.neighborhood}
                                helperText={submit && !company.neighborhood ? 'Obrigat??rio' : ''}
                            />
                        </Grid>
                        <Grid item xs={12} sm={3} md={3} xl={3} lg={3}>
                            <TextField 
                                label="Complemento"
                                name="complement"
                                onChange={handleChangeField}
                                inputProps={{
                                    maxLength: 50
                                }}
                                value={company.complement}
                                style={{ width: '100%' }}
                            />
                        </Grid>
                        <Grid item xs={12} sm={4} md={4} xl={4} lg={4}>
                            <TextField 
                                label="Cidade"
                                name="city"
                                onChange={handleChangeField}
                                inputProps={{
                                    maxLength: 50
                                }}
                                value={company.city}
                                style={{ width: '100%' }}
                                error={submit && !company.city}
                                helperText={submit && !company.city ? 'Obrigat??rio' : ''}
                            />
                        </Grid>
                        <Grid item xs={12} sm={2} md={2} xl={2} lg={2}>
                            <TextField 
                                label="UF"
                                name="uf"
                                onChange={handleChangeField}
                                inputProps={{
                                    maxLength: 2
                                }}
                                value={company.uf}
                                style={{ width: '100%' }}
                                error={submit && !company.uf}
                                helperText={submit && !company.uf ? 'Obrigat??rio' : ''}
                            />
                        </Grid>
                        <Grid item xs={12} sm={3} md={3} xl={3} lg={3}>
                            <TextField 
                                label="Telefone ou celular"
                                name="phone"
                                onChange={handleChangePhone}
                                value={fitToMask(company.phone, (company.phone?.length > 10 ? '(99) 99999-9999' : '(99) 9999-9999'))}
                                style={{ width: '100%' }}
                                error={submit && !company.phone}
                                helperText={submit && !company.phone ? 'Obrigat??rio' : ''}
                            />
                        </Grid>
                    </Grid>
                    <Grid item xs={12} sm={12} md={12} xl={12} lg={12}>
                        <div className={styles.listForm}>
                            <ListEmployee 
                                company={id}
                                history={history}
                            />  
                            <Button color="primary" onClick={handleNew}>SALVAR</Button>
                            <Button style={{ color: red[500] }} onClick={handleClickDelete}>EXCLUIR</Button>     
                        </div>
                    </Grid>
                </form>
            </Paper>
            <ToastsContainer store={ToastsStore}/>
        </section>
    ); 
}