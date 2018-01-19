var socket = io()

socket.on('Join Info', (info) => {
  $('#teamleft').text(info.active[0])
  $('#teamright').text(info.active[1])
  info.teams.forEach((name) => {
    $('#teams').append($('<li>').text(name))
  })
})
