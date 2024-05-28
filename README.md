# Movie Seats Viewer

App for visualize seats while other system is booking and releasing the seats!

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

> *Get status of the seat related to the ID provided.*
> 
`http://localhost:3000/seats/:id`

## POST

> *Try to book the rest seat related to the ID provided.*
> 
`http://localhost:3000/seats/:id`

## DELETE

> *Try to release the seat related to the ID provided.*
> 
`http://localhost:3000/seats/:id`
