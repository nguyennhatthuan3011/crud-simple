var callApi = function(prefixUrl, method, data) {

    var baseUrl = 'http://localhost:3000';

    var settings = {
        async: true,
        crossDomain: true,
        method: method,
        headers: {
            "Content-Type": "application/json",
        }
    };

    if (data) {
        settings.body = JSON.stringify(data);
    }

    var url = baseUrl + '/' + prefixUrl;

    var response = fetch(url, settings)
        .then(function(response) {
            return response.json();
        })
        .catch(function(err) {
            console.log(err);
        });

    return response;
};