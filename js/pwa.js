$(document).ready(function () {
    findEventsByArtist('angerfist');
    $('.headline-artist').html("angerfist");
})

//search and replace spaces with dashes and tolowercase, put name in headline
$('#searchbutton').click(function () {
    var artisttext = $('#searchartist').val();
    $('.headline-artist').html(artisttext);
    artistModified = artisttext.replace(/\s+/g, '-').toLowerCase(); //not recessarily, but useful for the worst case
    console.log("text: ", artistModified);
    findEventsByArtist(artistModified);
})

//fetch to get the events
var findEventsByArtist = function (artistname) {
    var artist = artistname;
    var getEvents = fetch('https://api.songkick.com/api/3.0/search/artists.json?apikey=AmrQIBJ7cwOMJaLm&query=' + artist + '', {
        method: 'get',
    }).then(function (response) {
        return response.json();
    }).then(function (data) {
        var artistId = data.resultsPage.results.artist[0].id;

        console.log("id: ", artistId);

        return fetch('https://api.songkick.com/api/3.0/artists/' + artistId + '/calendar.json?apikey=AmrQIBJ7cwOMJaLm');

    }).then(function (response) {
        return response.json();

    }).catch(function (err) {
        console.log("request failed", err);
    })

    getEvents.then(function (result) {
        console.log("result: ", result.resultsPage.results.event);
        var event = result.resultsPage.results.event;
        var eventArray = [];
        var eventlist = $('.events');
        $('.events').empty();
        for (i = 0; i < event.length; i++) {
            eventArray.push(event[i]);
            var eventName = eventArray[i].displayName;
            var eventLocation = eventArray[i].location.city;
            var eventUri = eventArray[i].uri;
            var eventType = eventArray[i].type;
            var eventDate = eventArray[i].start.date;

            //change date format
            var startDate = new Date(eventDate);
            var startEvent = (startDate.getDate() + "." + (startDate.getMonth() + 1) + "." + startDate.getFullYear());

            //appends list with the events
            var list = $('<li>').addClass('single-event').html('<p class="name">' + eventName + '<br> ' + startEvent + '</p>' + eventLocation + '<br>' + "Type: " + eventType + '<br>' + '<a class="link" href=' + eventUri + ' target="_blank">more infos');
            eventlist.append(list);
        }
    })
}

if ('serviceWorker' in navigator){
    navigator.serviceWorker.register('js/sw.js', {scope: 'js/sw.js'}).then(function(reg){
        //registration successfull
        console.log('SW registered! Scope is ', reg.scope);
    }).catch(function(err){
        //registration failed
        console.log('registration failed with ', +err);
    })
}

