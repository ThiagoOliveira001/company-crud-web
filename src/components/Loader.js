import { Backdrop, CircularProgress } from '@material-ui/core';
import React from 'react';

export default function Loader (props) {
    return (
        <Backdrop open={props.loading} style={{ position: 'absolute', zIndex: '100000' }}>
            <CircularProgress color="primary" size="10rem" />
        </Backdrop>
    );
}