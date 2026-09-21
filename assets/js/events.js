// https://www.raymondcamden.com/2015/11/20/using-the-meetup-api-in-client-side-applications
// Vanilla JS JSONP loader (no jQuery dependency).
(function () {
    function fetchEvents(url, cb, data) {
        data = data || [];
        var callbackName = 'dcpythonEventsCallback' + Date.now() + Math.floor(Math.random() * 100000);
        window[callbackName] = function (result) {
            data.push.apply(data, result.data);
            if (result.meta && result.meta.next_link) {
                fetchEvents(result.meta.next_link, cb, data);
            } else {
                cb(data);
            }
            delete window[callbackName];
            script.parentNode.removeChild(script);
        };
        var separator = url.indexOf('?') === -1 ? '?' : '&';
        var script = document.createElement('script');
        script.src = url + separator + 'callback=' + callbackName;
        document.body.appendChild(script);
    }

    document.addEventListener('DOMContentLoaded', function () {
        var results = document.getElementById('events');
        if (!results) return;

        fetchEvents('https://api.meetup.com/dcpython/events?&sign=true&photo-host=public&page=20', function (res) {
            var s = '';
            for (var i = 0; i < 3 && i < res.length; i++) {
                var ev = res[i];
                s += "<div class='card border rounded my-5'> <div class='card-header bg-primary text-light'> <h1>" + ev.name + " </h1></div> <div class='card-body'> <h5 class='card-title'>" + ev.local_date + "</h5> <div class='text-left'><p class='card-text lead'>" + ev.description + "</p></div> <a target='_blank' href='" + ev.link + "' class='btn btn-primary'>Event details</a> </div> </div>";
            }
            results.innerHTML = s;
        });
    });
})();

