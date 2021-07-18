import { Paper, TextField, Grid } from '@material-ui/core';
import axios from 'axios';
import React from 'react';
import Environment from '../environment/desenv';

export default function NewCompany(props) {
    const { history } = props;
    const [loading, setLoading] = React
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

    const handleChangeField = (event) => {
        const newCompany = {
            [event.target.name]: event.target.value,
        };

        setCompany({ ...company, ...newCompany });
    }

    const handleChangeZipcode = (event) => {
        setCompany({ ...company, zipcode: event.target.value });

        axios.get(`${Environment.API}/zipcode/${event.target.value}`)
            .then(res => {
                const location = res.data;

                setCompany({ ...company, ...location });
            })
            .catch(ex => {

            });
    }

    return (
        <section>
            <Paper>
                <form>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField 
                                label="Nome"
                                name="name"
                                onChange={handleChangeField}
                                value={company.name}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField 
                                label="CEP"
                                name="zipcode"
                                onChange={handleChangeZipcode}
                                value={company.zipcode}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField 
                                label="Logradouro"
                                name="address"
                                onChange={handleChangeField}
                                value={company.address}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField 
                                label="Bairro"
                                name="neighborhood"
                                onChange={handleChangeField}
                                value={company.neighborhood}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField 
                                label="Numero"
                                name="number"
                                onChange={handleChangeField}
                                value={company.number}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField 
                                label="Complemento"
                                name="complement"
                                onChange={handleChangeField}
                                value={company.complement}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField 
                                label="Cidade"
                                name="city"
                                onChange={handleChangeField}
                                value={company.city}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField 
                                label="UF"
                                name="uf"
                                onChange={handleChangeField}
                                value={company.uf}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField 
                                label="Telefone ou celular"
                                name="phone"
                                onChange={handleChangeField}
                                value={company.phone}
                            />
                        </Grid> 
                    </Grid>
                </form>
            </Paper>
        </section>
    ); 
}