document.onreadystatechange = function() {
    if (document.readyState === 'complete') {
        initApplication();
    }
};


var userId = 1;
var defaultUserId = 1;
var headUserId = '';
var headTodosId = '';
var todosId = '';
var num = 1;
var numberTodos = 1;
var todosNum = '';
var currentNumPageUser = 1;

function initApplication() {
    getTodos(defaultUserId);
    numPage();
    showListUser(currentNumPageUser);
}


//SET HiGHLIGHT

function setHighLight() {
    var ulUser = document.getElementById("pageUser");
    var liUser = ulUser.getElementsByClassName("numUser");
    for (i = 0; i < liUser.length; i++) {
        liUser[0].className += " active";
    }
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
    // console.log(attribute);
    currentNumPageUser = attribute;
    return showListUser(attribute);
};


// SHOW LIST USERPAGE

function showListUser(attr) {
    const $el = document.getElementById("posts");
    return callApi('users' + '?_page=' + attr + '&_limit=' + 5, 'GET')
        .then(function(response) {
            return renderListPost(response, $el);
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



// CREATE USER
addPost = function() {

    var fName = document.forms["createUserForm"]["name"].value;
    var fUsername = document.forms["createUserForm"]["username"].value;
    var fEmail = document.forms["createUserForm"]["email"].value;
    var fPhone = document.forms["createUserForm"]["phone"].value;
    var fWebsite = document.forms["createUserForm"]["website"].value;
    if (fName == "" || fUsername == "" || fEmail == "" || fPhone == "" || fWebsite == "") {
        alert("All Field Must Be Filled!")
        return false;
    } else {
        var name = document.getElementById("name").value;
        var username = document.getElementById("username").value;
        var email = document.getElementById("email").value;
        var phone = document.getElementById("phone").value;
        var website = document.getElementById("website").value;

        callApi('users', 'GET')
            .then(function(response) {
                var filterCreate = _.filter(response, function(object) {
                    return object.username === username || object.email === email;
                });
                if (filterCreate.length === 0) {
                    var data = { "name": name, "username": username, "email": email, "phone": phone, "website": website }
                    callApi('users', 'POST', data)
                        .then(function(response) {
                            currentNumPageUser = Math.ceil(response.id / 5);
                            clickHightLight(currentNumPageUser);
                            return showListUser(currentNumPageUser);
                        })
                        .then(function(_) {
                            document.getElementById("createUserForm").reset();
                            alert("Add User Success");
                        })
                    $('#createuserModal').modal('hide')
                } else {
                    alert("Username or Email exists!")
                    return false;
                }
            })
    }
}


// CANCEL CREATE USERS

cancelAdd = function() {
    document.getElementById("createUserForm").reset();
}

//EDIT USERS
editPost = function(id) {
    // Code of function edit post
    callApi('users/' + id, 'GET')
        .then(function(response) {
            defaultUserId = response.id;
            document.getElementById("editName").value = response.name;
            document.getElementById("editUsername").value = response.username;
            document.getElementById("editEmail").value = response.email;
            document.getElementById("editPhone").value = response.phone;
            document.getElementById("editWebsite").value = response.website;
        });
}

// SAVE EDIT POST

savePost = function() {

    var fEditName = document.forms["editUserForm"]["editName"].value;
    var fEditUsername = document.forms["editUserForm"]["editUsername"].value;
    var fEditEmail = document.forms["editUserForm"]["editEmail"].value;
    var fEditPhone = document.forms["editUserForm"]["editPhone"].value;
    var fEditWebsite = document.forms["editUserForm"]["editWebsite"].value;
    if (fEditName == "" || fEditUsername == "" || fEditEmail == "" || fEditPhone == "" || fEditWebsite == "") {
        alert("All Field Must Be Filled!")
        return false;
    } else {
        var editName = document.getElementById("editName").value;
        var editUsername = document.getElementById("editUsername").value;
        var editEmail = document.getElementById("editEmail").value;
        var editPhone = document.getElementById("editPhone").value;
        var editWebsite = document.getElementById("editWebsite").value;

        // FILTER USERNAME AND EMAIL

        callApi('users', 'GET')
            .then(function(response) {
                _.remove(response, ['id', defaultUserId]);
                var filterEdit = _.filter(response, function(object) {
                    return object.username === editUsername || object.email === editEmail;
                });
                if (filterEdit.length === 0) {
                    var data = { "name": editName, "username": editUsername, "email": editEmail, "phone": editPhone, "website": editWebsite };

                    callApi('users/' + defaultUserId, 'PUT', data)
                        .then(function(response) {
                            return showListUser(currentNumPageUser);
                        })
                        .then(function(_) {
                            alert("Edit Success");
                        });
                    $('#edituserModal').modal('hide')
                } else {
                    alert("Username or Email exists!")
                    return false;
                }
            })
    }
};

//DELETE USERS
deletePost = function(id) {
    callApi('users/' + id, 'DELETE')
        .then(function() {;
            return callApi('users' + '?_page=' + currentNumPageUser + '&_limit=' + 5, 'GET')
                .then(function(response) {
                    var userLength = response.length;
                    if (userLength > 0) {
                        return;
                    } else {
                        if (currentNumPageUser === 1) {
                            return;
                        } else {
                            var ulUser = document.getElementById("pageUser");
                            var liUser = ulUser.getElementsByClassName("numUser");
                            for (i = 0; i < liUser.length; i++) {
                                if (liUser[i].classList.contains('active')) {
                                    liUser[i].parentNode.removeChild(liUser[i]);
                                    liUser[i - 1].classList.add("active");
                                }
                            }
                            currentNumPageUser--;
                        }
                    }
                })
        })
        .then(function(_) {
            return showListUser(currentNumPageUser);
        })
        .then(function(_) {
            return getTodos(headUserId);
        })
        .then(function(_) {
            alert('Delete Success!');
        })
}


// TODOS


// GET NUMPAGE TODOS

function numPageTodos(numPageTodos) {

    const $el = document.getElementById("pageTodos")
    return callApi('todos?userId=' + numPageTodos, 'GET')
        .then(function(response) {
            renderNumPageTodos(response, $el);
        })
        .then(function(_) {
            getListTodos(1);

        });
}

// GET TODOS

function getTodos(id) {
    defaultUserId = id
    const $el = document.getElementById("todos");
    callApi('todos' + '?userId=' + id + '&_page=' + 1 + '&_limit=' + 4, 'GET')
        .then(function(response) {
            return renderListTodos(response, $el)
        })
        .then(function(_) {
            return numPageTodos(id);
        })
    document.getElementById("titleTodosList").innerHTML = defaultUserId;

}

// GET TODOS IN PAGE
function getListTodos(numTodos) {
    var ulTodo = document.getElementById("pageTodos");
    var liTodo = ulTodo.getElementsByClassName("numTodo");
    for (i = 0; i < liTodo.length; i++) {
        liTodo[0].className += " active";
        liTodo[i].addEventListener("click", function() {
            liTodo[0].classList.remove("active");
            var a = ulTodo.getElementsByClassName("active");
            if (a.length > 0) {
                a[0].className = a[0].className.replace("active", "");
            }
            this.className += " active";
        });
    }
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

// CREATE TODOS

createTodos = function() {

    var fUserID = document.forms["createTodosForm"]["userId"].value;
    var fTitle = document.forms["createTodosForm"]["title"].value;
    var fComplete = document.forms["createTodosForm"]["completed"].value;
    if (fUserID == "" || fTitle == "" || fComplete == "") {
        alert("All Field Must Be Filled!")
        return false;
    } else {
        var userId = document.getElementById("userId").value;
        var title = document.getElementById("title").value;
        var radio = document.getElementsByName("completed");
        for (i = 0; i < radio.length; i++) {
            if (radio[i].checked) {
                var completed = JSON.parse(radio[i].value);
            }
        }

        // CODE FILTER TODOS

        callApi('todos?userId=' + userId, 'GET')
            .then(function(response) {
                var filterTitle = _.filter(response, ['title', title]);
                if (filterTitle.length === 0) {
                    var data = {
                        "userId": userId,
                        "title": title,
                        "completed": completed
                    }

                    callApi('todos', 'POST', data)
                        .then(function(response) {
                            return callApi('todos?userId=' + userId, 'GET')
                                .then(function(response) {
                                    defaultUserId = userId;
                                    // console.log(response);
                                    if ((response.length % 4) != 0) {
                                        var numberTodos = (response.length / 4) + 1;
                                    } else {
                                        var numberTodos = response.length / 4;
                                    }
                                    return getListTodos(numberTodos);
                                });
                        })
                        .then(function(response) {
                            // getTodos(userId);
                            document.getElementById("createTodosForm").reset();
                        })
                        .then(function(_) {
                            // console.log(defaultUserId);
                            return numPageTodos(defaultUserId);
                        })
                        .then(function() {
                            alert("Create Todos Success");
                        })
                    $('#createtodoModal').modal('hide')
                } else {
                    alert("Title exists");
                    return false;
                }
            })
    }
}

// CANCEL CREATE TODOS

cancelAddTodos = function() {
    document.getElementById("createTodosForm").reset();
}

// DELETE TODOS

deleteTodos = function(id) {

    // Code of function delete todos
    callApi('todos/' + id, 'DELETE')
        .then(function() {
            // var userid = document.getElementById("userTodos").value;
            console.log(todosNum);
            getListTodos(todosNum);
        })
        .then(function(_) {
            // console.log(defaultUserId);
            return numPageTodos(defaultUserId);
        })
        .then(function(_) {
            alert("Delete Success!")
        });


}

// EDIT TODOS

editTodos = function(id) {
    todosId = id;
    callApi('todos/' + id, 'GET')
        .then(function(response) {
            document.getElementById("editUserId").value = response.userId;
            document.getElementById("editTitle").value = response.title;
            var editRadio = document.getElementsByName("editCompleted");
            for (let i = 0; i < editRadio.length; i++) {
                if (JSON.parse(editRadio[i].value) === response.completed) {
                    editRadio[i].checked = true;
                }
            }
        })
}

saveTodos = function() {

    var fEditTitle = document.forms["edittodoModal"]["editTitle"].value;
    if (fEditTitle == "") {
        alert("Title Must Be Filled");
        return false;
    } else {
        var editUserId = document.getElementById("editUserId").value;
        var editTitle = document.getElementById("editTitle").value;
        var editRadio = document.getElementsByName("editCompleted");
        for (i = 0; i < editRadio.length; i++) {
            if (editRadio[i].checked) {
                var editCompleted = editRadio[i].value
            }
        }

        // CODE FILTER TODOS

        callApi('todos?userId=' + editUserId, 'GET')
            .then(function(response) {
                _.remove(response, ['id', todosId])
                var filterTitle = _.filter(response, ['title', editTitle]);
                console.log(filterTitle);
                if (filterTitle.length === 0) {
                    var data = {
                        "userId": editUserId,
                        "title": editTitle,
                        "completed": editCompleted
                    }
                    callApi('todos/' + todosId, 'PUT', data)
                        .then(function(response) {
                            return getListTodos(todosNum);
                        })
                        .then(function(response) {
                            alert("Edit Success!")
                        });
                    $('#edittodoModal').modal('hide')
                } else {
                    alert("Title exists");
                    return false;
                }
            })

    }
}

// // SEARCH POST
searchPost = function() {

    let $el = document.getElementById("posts")
    var username = document.getElementById("find").value;
    document.getElementById("form").reset();
    callApi('users?name=' + username, 'GET')
        .then(function(response) {
            // console.log(response)
            if (response.length > 0) {
                let template = '';
                for (i = 0; i < response.length; i++) {
                    template += '<tr>';
                    template += '<td>' + response[i].id + '</td>';
                    template += '<td>' + response[i].name + '</td>';
                    template += '<td>' + response[i].username + '</td>';
                    template += '<td>' + response[i].email + '</td>';
                    template += '<td>' + response[i].phone + '</td>';
                    template += '<td>' + response[i].website + '</td>';
                    template += '<td class="colEdit"><button class="btn btn-warning" onclick="editPost(' + response[i].id + ')" data-toggle="modal" data-target="#edituserModal">Edit</button></td>';
                    template += `<td class="colDel"><button class="btn btn-danger" onclick="deletePost('${response[i].id}')">Delete</button></td>`;
                    template += '<td class="colEdit"><button class="btn btn-success" onclick="getTodos(' + response[i].id + ')">Detail</button></td>';
                    template += '</tr>'
                }
                $el.innerHTML = template;
            }
            document.getElementById("pageUser").style.display = 'none';
        })
};


// RESET POST

resetPost = function() {
    document.getElementById("pageUser").style.display = 'block';
    return showListUser(currentNumPageUser);
}