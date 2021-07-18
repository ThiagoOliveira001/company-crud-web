import { Paper, TextField, Grid, Button } from '@material-ui/core';
import { red } from '@material-ui/core/colors';
import axios from 'axios';
import { fitToMask } from 'react-masked'
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Environment from '../environment/desenv';
import styles from '../styles/Form.module.css';
import ListEmployee from './ListEmployee';

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
            .catch(ex => setLoading(false));
    }

    return (
        <section className={styles.container}>
            <Paper className={styles.cardForm}>
                <form>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
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
                                helperText={submit && !company.name ? 'Obrigatório' : ''}
                            />
                        </Grid>
                        <Grid item xs={2}>
                            <TextField 
                                label="CEP"
                                name="zipcode"
                                onChange={handleChangeZipcode}
                                value={fitToMask(company.zipcode, '99999-999')}
                                style={{ width: '100%' }}
                                error={submit && !company.zipcode}
                                helperText={submit && !company.zipcode ? 'Obrigatório' : ''}
                            />
                        </Grid>
                        <Grid item xs={5}>
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
                                helperText={submit && !company.address ? 'Obrigatório' : ''}
                            />
                        </Grid>
                        <Grid item xs={5}>
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
                                helperText={submit && !company.number ? 'Obrigatório' : ''}
                            />
                        </Grid>
                        <Grid item xs={3}>
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
                                helperText={submit && !company.neighborhood ? 'Obrigatório' : ''}
                            />
                        </Grid>
                        <Grid item xs={3}>
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
                        <Grid item xs={4}>
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
                                helperText={submit && !company.city ? 'Obrigatório' : ''}
                            />
                        </Grid>
                        <Grid item xs={2}>
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
                                helperText={submit && !company.uf ? 'Obrigatório' : ''}
                            />
                        </Grid>
                        <Grid item xs={3}>
                            <TextField 
                                label="Telefone ou celular"
                                name="phone"
                                onChange={handleChangePhone}
                                value={fitToMask(company.phone, (company.phone?.length > 10 ? '(99) 99999-9999' : '(99) 9999-9999'))}
                                style={{ width: '100%' }}
                                error={submit && !company.phone}
                                helperText={submit && !company.phone ? 'Obrigatório' : ''}
                            />
                        </Grid>
                    </Grid>
                    <div style={{ 
                            maxWidth: '100%', 
                            maxHeight: '500px', 
                            display: 'flex', 
                            justifyContent: 'center',
                            alignContent: 'center',
                            flexDirection: 'column',
                            padding: '20px' 
                        }}
                    >
                            <ListEmployee 
                                company={id}
                                history={history}
                            />  
                            <Button color="primary" onClick={handleNew}>SALVAR</Button>
                            <Button style={{ color: red[500] }} onClick={handleClickDelete}>EXCLUIR</Button>     
                    </div>
                </form>
            </Paper>
        </section>
    ); 
}