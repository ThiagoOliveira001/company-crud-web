import React from 'react';
import { 
    IconButton, 
    Paper, 
    Table, 
    TableBody, 
    TableCell, 
    TableContainer, 
    TableHead, 
    TablePagination, 
    TableRow, 
    TextField, 
    Typography,
    Fab
} from '@material-ui/core';
import { useEffect } from 'react';
import axios from 'axios';
import Environment from '../environment/desenv';
import { Add, DeleteForever, Search, Visibility } from '@material-ui/icons';
import styles from '../styles/Lista.module.css';
import {ToastsContainer, ToastsStore} from 'react-toasts';
import Loader from './Loader';

export default function ListCompany(props) {
    const { history } = props;

    const [page, setPage] = React.useState(1);
    const [quantity, setQuantity] = React.useState(5);
    const [name, setName] = React.useState('');
    const [loading, setLoading] = React.useState(false);
    const [records, setRecords] = React.useState({
        pages: 0,
        companies: [],
        total: 0,
    });

    const handleChangePage = (event, newPage) => {
        const pageNow = newPage + 1;
        setPage(pageNow);
        handleClickSearch(pageNow);
    };

    const handleChangeRowsPerPage = (event) => {
        setQuantity(event.target.value);
        handleClickSearch(null, event.target.value);
    }

    const handleChangeName = (event) => {
        setName(event.target.value);
    }

    const handleClickSearch = (newPage, newQtd) => {
        const query = {
            name: name || '',
            page: newPage || page,
            quantity: newQtd || quantity,
        };
        const queryString = Object.keys(query)
            .map(key => `${key}=${query[key]}`)
            .join('&');

        setLoading(true);
        axios.get(`${Environment.API}/company?${queryString}`)
            .then(res => {
                setRecords(res.data);
                setLoading(false);
            })  
            .catch(ex => {
                setLoading(false);
                if (ex.response) {
                    ToastsStore.error(ex.response?.data?.message);
                }
            });
    }

    const handleSearchCompany = (id) => {
        history.push(`/company-edit/${id}`);
        history.go();
    }

    const handleClickDelete = (id) => {
        setLoading(true);
        axios.delete(`${Environment.API}/company/${id}`)
            .then(res => {
                setLoading(false);
                setPage(1);
                handleClickSearch();
            })
            .catch(ex => {
                setLoading(false);
                if (ex.response) {
                    ToastsStore.error(ex.response?.data?.message);
                }
            }); 
    }

    const handleOpenNewCompany = () => {
        history.push('/new/company');
        history.go();
    }

    useEffect(() => {
        setLoading(true);
        axios.get(`${Environment.API}/company`)
            .then(res => {
                setRecords(res.data);
                setLoading(false);
            })
            .catch(ex => {
                setLoading(false);
                if (ex.response) {
                    ToastsStore.error(ex.response?.data?.message);
                }
            });
    }, []);

    return (
        <section className={styles.container}>
            <Loader loading={loading} />
            <Paper className={styles.cardLista}>
                <Fab color="primary" style={{ float: 'right' }} onClick={handleOpenNewCompany}>
                    <Add />
                </Fab>
                <Typography component="h4">
                    Empresas
                </Typography>
                <div>
                    <TextField 
                        label="Nome"
                        value={name}
                        onChange={handleChangeName}
                    />
                    <IconButton onClick={handleClickSearch}>
                        <Search />
                    </IconButton>
                </div>
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>
                                    Código
                                </TableCell>
                                <TableCell>
                                    Nome
                                </TableCell>
                                <TableCell>
                                    Cidade
                                </TableCell>
                                <TableCell>

                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {records.companies.map((company, index) => {
                                return (
                                    <TableRow key={index}>
                                        <TableCell>
                                            {company.id}
                                        </TableCell>
                                        <TableCell>
                                            {company.name}
                                        </TableCell>
                                        <TableCell>
                                            {company.city}
                                        </TableCell>
                                        <TableCell>
                                            <IconButton onClick={() => handleSearchCompany(company.id)}>
                                                <Visibility />
                                            </IconButton>
                                            <IconButton onClick={() => handleClickDelete(company.id)}>
                                                <DeleteForever />
                                            </IconButton>
                                        </TableCell>
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination 
                    rowsPerPageOptions={[5,10,20]}
                    component="div"
                    count={records.total}
                    rowsPerPage={quantity}
                    page={page - 1}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                    labelDisplayedRows={() => `Página ${page} de ${records.pages}`}
                    labelRowsPerPage="Linhas por página"
                />
            </Paper>
            <ToastsContainer store={ToastsStore}/>
        </section>
    );
}