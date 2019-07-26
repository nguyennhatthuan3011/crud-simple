var callApi = function(prefixUrl, method, data) {

    // var baseUrl = 'http://127.0.0.1:8000/api/v1';
    // var baseUrl = 'http://localhost:3000';
    var baseUrl = 'http://learnlaravel.local/api/v1'

    var settings = {
        method: method,
        headers: {
            'Content-Type': 'application/json'
        },
    };

    if (data) {
        settings.body = JSON.stringify(data);
    }

    var url = baseUrl + '/' + prefixUrl;

    var response = fetch(url, settings)
        .then(function(response) {
            if (response.length === 0) {
                return;
            }
            return response.json();
        })
        .catch(function(err) {
            console.log(err);
        });

    return response;
};