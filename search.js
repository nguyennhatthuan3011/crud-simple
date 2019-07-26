// SEARCH POST
searchPost = function() {
    let $el = document.getElementById("posts")
    var username = document.getElementById("find").value;
    document.getElementById("form").reset();
    callApi('users?name=' + username, 'GET')
        .then(function(response) {
            document.getElementById("pageUser").style.display = 'none';
            return renderListPost(response, $el);

        })
};


// RESET POST

resetPost = function() {
    document.getElementById("pageUser").style.display = 'block';
    afterActionNumPage(1);
    return showListUser(1);
}