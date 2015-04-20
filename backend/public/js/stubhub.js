var _key = {
    authToken: 'dmtObElsall4TUxQa0xtaUo2NmVZbVlRTlJ3YTpKM2E5cWVtaHdMNVFEZWNPT3BwZVoya3Frd0Vh'
};
 
var results = [];
var connected = false;
 
 
function connect() {
    $.ajaxSetup({
        headers: { 
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'Basic ' + _key.authToken 
        }
    });
    $.post('https://api.stubhub.com/login?grant_type=password&username=rtribbia@gmail.com&password=128e3290&scope=PRODUCTION',function(data, status, xhr) {
        onConnection(data);
    });
}
 
function onConnection(data) {
    aToken = data.access_token;
    $.ajaxSetup({
    headers: { 
        'Authorization': 'Bearer ' + aToken,
         'Accept': 'application/json'
        }
    });
    connected = true;
}
 
 
function searchEvents() {
    $.get('https://api.stubhub.com/search/catalog/events/v2?point=45.536500,-122.648413&units=mi&radius=250&date=2015-04-07T00:00 TO 2015-10-07T23:59&sort=dateLocal asc&limit=500', function (res) {
            var parsed = [];
            res.events.forEach(function (e) {
                if (e.title.indexOf('PARKING') == -1)
                    parsed.push(simplifyResult(e));
            });
            console.log(parsed.length + ' events found');
            results = parsed;
        });
}
 
function getEventInfo(eventID) {
    $.get('https://api.stubhub.com/catalog/events/v2/' + eventID, function (res) {
        console.log(res);
    });
}
 
function simplifyResult(result) {
    var obj = {}
    obj.title = result.title;
    obj.attributes = [];
    obj.description = result.description;
    obj.eventId = result.id;
    obj.date = result.dateLocal.split('T')[0];
    obj.time = result.dateLocal.split('T')[1];
    obj.url = result.eventInfoUrl;
    obj.venue = {};
    obj.venue.name = result.venue.name;
    obj.venue.lng = result.venue.longitude;
    obj.venue.lat = result.venue.latitude;
    obj.venue.id = result.venue.id;
    obj.venue.address = result.venue.address1;
    obj.venue.city = result.venue.city;
    obj.venue.zip = result.venue.zipCode;
    obj.tickets = {};
    obj.categories = {};
 
    if (result.attributes) {
        result.attributes.forEach(function (a) {
            var o = {};
            for (var key in a)
                o[key] = a[key]
            obj.attributes.push(o);
        })
    }
 
    for (var key in result.ticketInfo)
        obj.tickets[key] = result.ticketInfo[key];
 
    for (var key in result.categories)
        obj.categories[key] = result.categories[key];
 
    return obj;
}