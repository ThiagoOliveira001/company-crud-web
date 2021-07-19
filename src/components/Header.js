import React from 'react';
import { AppBar, Toolbar, IconButton, Tooltip } from "@material-ui/core";
import { Business, KeyboardBackspace } from '@material-ui/icons';
import styles from '../styles/Header.module.css';

export default function Header(props) {
    const { history } = props;
    
    const handleButtonClick = () => {
        history.back();
    }

    const handleButtonCompany = () => {
        history.push('/company');
        history.go();
    }

    return (
        <AppBar position="fixed" className={styles.toolbar}>
            <Toolbar className={styles.buttonBar}>
                <IconButton className={styles.barIcon} onClick={handleButtonClick}>
                    <KeyboardBackspace />
                </IconButton>
                <Tooltip title="Lista de empresas">
                    <IconButton className={styles.barIcon} onClick={handleButtonCompany}>
                        <Business />
                    </IconButton>
                </Tooltip>
            </Toolbar>
        </AppBar>
    );
}