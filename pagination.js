//HIGHLIGHT NEXT AND PREVIOUS PAGE
function clickHightLight(currentPage) {
    var ulUser = document.getElementById("pageUser");
    var liUser = ulUser.getElementsByClassName("numUser");
    for (i = 0; i < liUser.length; i++) {
        if (liUser[i].classList.contains('active')) {
            liUser[i].classList.remove("active");
        }
        if (parseInt(liUser[i].getAttribute("data-id")) === currentPage) {
            liUser[i].classList.add("active");
        }
    }
}

// PAGINATION USER

//SET HiGHLIGHT DEFAULT USER NUM PAGE
function setHighLight() {
    var ulUser = document.getElementById("pageUser");
    var liUser = ulUser.getElementsByClassName("numUser");
    for (i = 0; i < liUser.length; i++) {
        liUser[0].className += " active";
    }
}

// SHOW LIST USERPAGE
function showListUser(attr) {
    const $el = document.getElementById("posts");
    return callApi('users' + '?_page=' + attr + '&_limit=' + 5, 'GET')
        .then(function(response) {
            return renderListPost(response, $el);
        });
}

//SHOW NUMPAGE AFTER ACTION
function afterActionNumPage(currentNumPageUser) {
    const $el = document.getElementById("pageUser")
    callApi('users', 'GET')
        .then(function(response) {
            return renderNumPage(response, $el)
        })
        .then(function(_) {
            return clickHightLight(currentNumPageUser);
        });
}

// CREATE NUMPAGE USER
function numPage() {
    const $el = document.getElementById("pageUser")
    callApi('users', 'GET')
        .then(function(response) {
            return renderNumPage(response, $el)
        })
        .then(function() {
            setHighLight();

            var userPages = document.getElementsByClassName("numUser");
            _.each(userPages, function(page) {
                page.addEventListener('click', onUserClickPage, false);
            })
        });
}

var onUserClickPage = function(elm) {
    var attribute = this.getAttribute("data-id");
    var ulUser = document.getElementById("pageUser");
    var a = ulUser.getElementsByClassName("active");
    if (attribute === a[0].getAttribute("data-id")) {
        return;
    } else {
        a[0].classList.remove("active");
        this.classList.add("active");
    }
    currentNumPageUser = attribute;
    return showListUser(attribute);
};

// PREVIOUS PAGE USERS
function previousPageUser() {
    if (currentNumPageUser === 1) {
        return;
    } else {

        currentNumPageUser = currentNumPageUser - 1;

        clickHightLight(currentNumPageUser);
        return showListUser(currentNumPageUser);
    }
}

// NEXT PAGE USERS
function nextPageUser() {
    if (parseInt(currentNumPageUser) === maxNumPage) {
        return;
    } else {
        currentNumPageUser++;
        clickHightLight(currentNumPageUser);
        return showListUser(currentNumPageUser);
    }
}