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
    return callApi('users', 'GET')
        .then(function(response) {
            renderNumPage(response, $el)
            var userPages = document.getElementsByClassName("numUser");
            _.each(userPages, function(page) {
                page.addEventListener('click', onUserClickPage, false);
            })
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

//HIGHLIGHT NEXT AND PREVIOUS PAGE USER
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



// PAGINATION TODO

// GET TODOS

function getTodos(id) {
    defaultUserId = id
    todosNum = 1;
    const $el = document.getElementById("todos");
    callApi('todos' + '?userId=' + id + '&_page=' + 1 + '&_limit=' + 4, 'GET')
        .then(function(response) {
            return renderListTodos(response, $el)
        })
        .then(function(_) {
            numPageTodos(id);
        })
    document.getElementById("titleTodosList").innerHTML = defaultUserId;

}

// GET NUMPAGE TODOS
function numPageTodos(numPageTodos) {
    const $el = document.getElementById("pageTodos")
    return callApi('todos?userId=' + numPageTodos, 'GET')
        .then(function(response) {
            renderNumPageTodos(response, $el);
        })
        .then(function() {
            setTodoHighLight();
            todosPage = document.getElementsByClassName("numTodos")
            _.each(todosPage, function(todosPage) {
                todosPage.addEventListener('click', onTodosClick, false)
            })
        });
}

var onTodosClick = function(elm) {
    var attribute = this.getAttribute("data-id");
    var ulUser = document.getElementById("pageTodos");
    var a = ulUser.getElementsByClassName("active");
    if (attribute === a[0].getAttribute("data-id")) {
        return;
    } else {
        a[0].classList.remove("active");
        this.classList.add("active");
        currentNumPageUser = attribute;
        return getListTodos(attribute);
    }
}

// HIGHLIGHT NUM PAGE TODOS DEFAULT
function setTodoHighLight() {
    var ulTodo = document.getElementById("pageTodos");
    var liTodo = ulTodo.getElementsByClassName("numTodos");
    for (i = 0; i < liTodo.length; i++) {
        liTodo[0].className += " active";
    }
}

// GET TODOS IN PAGE
function getListTodos(numTodos) {
    todosNum = numTodos;
    // console.log(defaultUserId);
    const $el = document.getElementById("todos");
    return callApi('todos' + '?userId=' + defaultUserId + '&_page=' + numTodos + '&_limit=' + 4, 'GET')
        .then(function(response) {
            // console.log(response);
            return renderListTodos(response, $el)
        })
    document.getElementById("titleTodosList").innerHTML = defaultUserId;
}

//HIGHLIGHT NEXT AND PREVIOUS PAGE USER
function clickHightLightTodo(currentPage) {
    var ulTodo = document.getElementById("pageTodos");
    var liTodo = ulTodo.getElementsByClassName("numTodos");
    for (i = 0; i < liTodo.length; i++) {
        if (liTodo[i].classList.contains('active')) {
            liTodo[i].classList.remove("active");
        }
        if (parseInt(liTodo[i].getAttribute("data-id")) === currentPage) {
            liTodo[i].classList.add("active");
        }
    }
}


// PREVIOUS PAGE USERS
function previousPageTodos() {
    if (todosNum === 1) {
        return;
    } else {
        todosNum--;
        clickHightLightTodo(todosNum);
        return getListTodos(todosNum);
    }
}

// NEXT PAGE USERS
function nextPageTodos() {
    if (parseInt(todosNum) === maxNumPageTodo) {
        return;
    } else {
        todosNum++;
        clickHightLightTodo(todosNum);
        return getListTodos(todosNum);
    }
}