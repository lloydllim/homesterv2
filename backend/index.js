const mysql = require( 'mysql2' )
const express = require('express')
const categoriesApi = require('./apis/categories')
const bodyParser = require('body-parser')

const app = express()

const APP_PORT = 3309
const MYSQL_PORT = 3307
const DATABASE_NAME = 'homester'

const conn = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    port: MYSQL_PORT
})


conn.connect( ( err ) => {
    if ( err ) throw err;

    // create database if it doesnt exist 
    const createDb = `CREATE DATABASE IF NOT EXISTS ${DATABASE_NAME}`
    const useDB = `USE ${DATABASE_NAME}`

    conn.query(createDb, ( err, result ) => {
        if ( err ) throw err
        console.info('database created')
        conn.changeUser({ database: DATABASE_NAME })
    } )

    conn.query( useDB, ( err, result ) => {
        if ( err ) throw err
        console.info(`using ${DATABASE_NAME} database`)
    } )

    const createCategoryTable = `CREATE TABLE IF NOT EXISTS tbl_categories 
    (id int AUTO_INCREMENT, name VARCHAR(255), PRIMARY KEY(id))`

    conn.query( createCategoryTable, ( err, result ) => {
        if ( err ) throw err
        console.info("category table created!")
    } )

    console.info( 'Connected! ' )
})


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true})); 

// apis 
categoriesApi( conn, app )

app.listen(APP_PORT, () => {
    console.info(`Listening on port ${APP_PORT}`)
})