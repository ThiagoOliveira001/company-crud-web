import React from 'react';
import { AppBar, Toolbar, IconButton } from "@material-ui/core";
import { KeyboardBackspace } from '@material-ui/icons';
import styles from '../styles/Header.module.css';

export default function Header(props) {
    const { history } = props;
    
    const handleButtonClick = () => {
        history.back();
    }

    return (
        <AppBar position="fixed" className={styles.toolbar}>
            <Toolbar>
                <IconButton className={styles.barIcon} onClick={handleButtonClick}>
                    <KeyboardBackspace />
                </IconButton>
            </Toolbar>
        </AppBar>
    );
}