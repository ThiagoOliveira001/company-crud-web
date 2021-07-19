import React from 'react';
import axios from 'axios';
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
    Fab,
    Button
} from '@material-ui/core';
import { useEffect } from 'react';
import { Add, DeleteForever, Search, Visibility } from '@material-ui/icons';
import Environment from '../environment/desenv';
import styles from '../styles/Lista.module.css';
import { red } from '@material-ui/core/colors';
import {ToastsContainer, ToastsStore} from 'react-toasts';

export default function ListEmployee(props) {
    const { history, company } = props;

    const [page, setPage] = React.useState(1);
    const [quantity, setQuantity] = React.useState(5);
    const [name, setName] = React.useState('');
    const [loading, setLoading] = React.useState(false);
    const [records, setRecords] = React.useState({
        pages: 0,
        employees: [],
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
        axios.get(`${Environment.API}/employee/company/${company}?${queryString}`)
            .then(res => {
                setRecords(res.data);
                setLoading(false);
            })  
            .catch(ex => {
                setLoading(false);
                ToastsStore.error(ex.response?.data?.message);
            });
    }

    const handleSearchEmployee = (id) => {
        history.push(`/employee/${id}`);
        history.go();
    }

    const handleClickDelete = (id) => {
        setLoading(true);
        axios.delete(`${Environment.API}/employee/${id}`)
            .then(res => {
                setLoading(false);
                setPage(1);
                handleClickSearch();
            })
            .catch(ex => {
                setLoading(false);
                ToastsStore.error(ex.response?.data?.message);
            }); 
    }

    const handleClickNew = () => {
        history.push(`/new/employee/${company}`);
        history.go();
    }

    const handleClickDeleteAll = () => {
        setLoading(true);
        axios.delete(`${Environment.API}/employee/company/${company}`)
            .then(res => {
                setLoading(false);
                handleClickSearch();
            })
            .then(ex => {
                setLoading(false);
                ToastsStore.error(ex.response?.data?.message);
            });
    }

    useEffect(() => {
        setLoading(true);
        axios.get(`${Environment.API}/employee/company/${company}`)
            .then(res => {
                setRecords(res.data);
                setLoading(false);
            })
            .catch(ex => {
                setLoading(false);
                ToastsStore.error(ex.response?.data?.message);
            });
    }, []);

    return (
        <section>
            <Paper className={styles.cardLista}>
                <Fab color="primary" style={{ float: 'right' }} onClick={handleClickNew}>
                    <Add />
                </Fab>
                <Typography component="h4">
                    Funcionários
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
                                    Cargo
                                </TableCell>
                                <TableCell>

                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {records.employees.map((employee, index) => {
                                return (
                                    <TableRow key={index}>
                                        <TableCell>
                                            {employee.id}
                                        </TableCell>
                                        <TableCell>
                                            {employee.name}
                                        </TableCell>
                                        <TableCell>
                                            {employee.profession_name}
                                        </TableCell>
                                        <TableCell>
                                            <IconButton onClick={() => handleSearchEmployee(employee.id)}>
                                                <Visibility />
                                            </IconButton>
                                            <IconButton onClick={() => handleClickDelete(employee.id)}>
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
                <Button style={{ color: red[500] }} onClick={handleClickDeleteAll}>EXCLUIR FUNCIONÁRIOS</Button>
            </Paper>
            <ToastsContainer store={ToastsStore}/>
        </section>
    );
}