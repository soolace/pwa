$(document).ready(function(){


})

/*$.ajax({
    type: 'GET',
    url: 'https://api.songkick.com/api/3.0/artists/144843/calendar.json?apikey=AmrQIBJ7cwOMJaLm',
    dataType: 'json',
}).done(function(result){
  console.log("result ", result.resultsPage.results.event);
  var event = result.resultsPage.results.event;
  var eventArray = [];
  var eventlist = $('.events');
  for (i = 0; i < event.length; i++){
      eventArray.push(event[i]);
      var eventName = eventArray[i].displayName;
      var eventLocation = eventArray[i].location.city;
      var eventUri = eventArray[i].uri;
      var eventType = eventArray[i].type;
      var eventDate = eventArray[i].start.date;
      var list = $('<li>').addClass('bar').html('<p class="name">'+eventName +', ' +eventDate+'</p>'+eventLocation+'<br>'+ "Type: "+ eventType+'<br>'+'<a href='+eventUri+' target="_blank">more infos');
      eventlist.append(list);
  }


}).fail(function(err){
    console.log("error", err);
})*/

fetch('https://api.songkick.com/api/3.0/artists/144843/calendar.json?apikey=AmrQIBJ7cwOMJaLm')
.then(function(response){
    return response.json();
})
.then(function(result){
    console.log("result: ", result.resultsPage.results.event);
    var event = result.resultsPage.results.event;
    var eventArray = [];
    var eventlist = $('.events');
    for (i = 0; i < event.length; i++){
        eventArray.push(event[i]);
        var eventName = eventArray[i].displayName;
        var eventLocation = eventArray[i].location.city;
        var eventUri = eventArray[i].uri;
        var eventType = eventArray[i].type;
        var eventDate = eventArray[i].start.date;
        var list = $('<li>').addClass('bar').html('<p class="name">'+eventName +', ' +eventDate+'</p>'+eventLocation+'<br>'+ "Type: "+ eventType+'<br>'+'<a href='+eventUri+' target="_blank">more infos');
        eventlist.append(list);
    }  
   
})
.catch(function(){

});

    