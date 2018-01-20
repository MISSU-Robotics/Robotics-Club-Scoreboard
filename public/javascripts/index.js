var info;
var socket = io()

socket.on('Info', (Info) => {
  info = Info
  $('#teams').empty()
  $('#teamleft').html(`<img href="/images/icons/${info.active[0]}.png"/> ` + info.active[0])
  $('#teamright').html(info.active[1] + ` <img href="/images/icons/${info.active[1]}.png"/>`)

  Object.keys(info.teams).forEach((name) => {
    let teamInfo = info.teams[name]
    $('#teams').append($('<li>').attr('id', name))
    let liTeam = $('#'+ name)
    liTeam.append($('<p>').addClass('teamName').text(name))
    liTeam.append($('<p>').addClass('teamPoints').text(teamInfo.Points))
  })

  adjustItems('#teams', SortList('#teams'))
})

function SortList(sel) {
  let listItems = $(sel).children('li').get()
  listItems.sort((a,b) => {
      var keyA = $(a).children('.teamPoints').text() + $(a).children('.teamName').text()
      var keyB = $(b).children('.teamPoints').text() + $(b).children('.teamName').text()

      if (keyA < keyB) return 1
      if (keyA > keyB) return -1
      return 0
  })

  return listItems
}

function adjustItems(sel, items) {
    var ul = $(sel);
    $.each(items, (i, li) => {
      ul.append(li);
    });
}
