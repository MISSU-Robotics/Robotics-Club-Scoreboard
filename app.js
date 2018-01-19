var express = require('express')
var app = express()
var http = require('http').Server(app)
var io = require('socket.io')(http)
var path = require('path')

var port = process.env.PORT || 3000

var joinInfo = {
  'active': ['Sensei', 'Cena'],
  'teams': ['Sensei', 'Cena', 'Harmons', 'Swagalicious']
}

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')
app.use(express.static(path.join(__dirname, 'public')))

app.get('/', (req, res) => {
  res.render('index')
})


// Socket IO Stuff

io.on('connection', (socket) => {
  console.log('a user connected')
  socket.emit('Join Info', joinInfo)
  socket.on('disconnect', () => {
    console.log('user disconnected')
  })
})

http.listen(port, () => {
  console.log(`listening on *:${port}`)
})