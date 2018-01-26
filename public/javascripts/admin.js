var info;
var socket = io()

socket.on('Info', (Info) => {
  info = Info
  $('#teams').empty()
  $('#teamleft').html(`<img src="/images/icons/${info.active[0]}.png"/> ` + info.active[0])
  $('#teamright').html(info.active[1] + ` <img src="/images/icons/${info.active[1]}.png"/>`)

  Object.keys(info.teams).forEach((name) => {
    let teamInfo = info.teams[name]
    $('#teams').append($('<li>').attr('id', name))
    let liTeam = $('#'+ name)
    liTeam.append($('<p>').addClass('teamName').text(name))
    let teamPoints = $('<p>').addClass('teamPoints')
    liTeam.append(teamPoints)
    teamPoints.append($('<span>').addClass('removePoints').addClass('changePoints').text('-'))
    teamPoints.append($('<span>').addClass('Points').text(teamInfo.Points))
    teamPoints.append($('<span>').addClass('addPoints').addClass('changePoints').text('+'))

    $('.changePoints').on('click', (event) => {
      if ($(event.target).hasClass('addPoints')) {
        socket.emit('Change Points', {
          'ID': $(event.target).parent().parent().attr('id'),
          'value': 1
        })
        console.log('+1')
      } else if ($(event.target).hasClass('removePoints')) {
        if ($(event.target).parent().children('.Points').text() > 0) {
          socket.emit('Change Points', {
            ID: $(event.target).parent().parent().attr('id'),
            value: -1
          })
          console.log('-1')
        }
      }
    })
  })
})
