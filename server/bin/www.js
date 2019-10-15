const http = require('http')
let app = require('../app')

let server = http.createServer(app)


if(!process.env.PORT) process.env.PORT = 7000

server.listen(process.env.PORT, ()=>{
    console.log(`Listening on localhost ${process.env.PORT}`)
})