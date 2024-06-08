'use strict';

import mongoose from 'mongoose';
import { log, error } from 'console';

const { set, connect, connection } = mongoose

const connectDB = () => {

    set('strictQuery', true)

    connect(process.env.CONNECT_DB, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })

    connection.on('connected', () => {
        log('DB connectioned')
    })

    connection.on('error', (err) => {
       error(err.message)
    })
    connection.on('disconnection', () => {
        log('DB disconnectioned')
    })

}


export default connectDB
