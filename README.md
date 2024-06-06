# Movie Seats Viewer

App for visualize seats while other system is booking and releasing the seats!

# Setup
1. First of all, install all dependencies. <br />
`npm i`
2. Then, start the Electron.js app. <br />
`npm start`

# Endpoints

## GET

> *Get status of all seats.*
> 
`http://localhost:3000/seats/`

> *Get status of all the available seats.*
> 
`http://localhost:3000/seats/available`

> *Get status of all the booked seats.*
> 
`http://localhost:3000/seats/booked`

> *Get status of all the reserved seats.*
> 
`http://localhost:3000/seats/reserved`

> *Get status of the seat related to the ID provided.*
> 
`http://localhost:3000/seats/:id`

## POST

> *Try to book the seat related to the ID provided.*
> 
`http://localhost:3000/seats/book/:id`

> *Try to reserve the seat related to the ID provided.*
>
`http://localhost:3000/seats/reserve/:id`

## DELETE

> *Try to release the seat related to the ID provided.*
> 
`http://localhost:3000/seats/release/:id`
