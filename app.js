var express = require('express')
var app = express()
var http = require('http').Server(app)
var io = require('socket.io')(http)
var path = require('path')

var port = process.env.PORT || 3000

var Info = require('./teamInfo.json')

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')
app.use(express.static(path.join(__dirname, 'public')))

app.get('/', (req, res) => {
  res.render('index')
})
app.get('/admin', (req, res) => {
  res.render('admin')
})


// Socket IO Stuff

io.on('connection', (socket) => {
  console.log('a user connected')
  socket.emit('Info', Info)
  socket.on('disconnect', () => {
    console.log('user disconnected')
  })
  socket.on('Change Points', (info) => {
    Info.teams[info.ID].Points += info.value
    io.emit('Info', Info)
  })
})

http.listen(port, () => {
  console.log(`listening on *:${port}`)
})
