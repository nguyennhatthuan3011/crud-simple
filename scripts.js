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
var todosNum = 1;
var currentNumPageUser = 1;
var userLength = 0;
var todosLength = 0;

function initApplication() {
    getTodos(defaultUserId);
    numPage();
    showListUser(currentNumPageUser);
}


function showTitleUser() {
    document.getElementById("titleUser").innerHTML = 'Create User';
    document.getElementById("btnEditUser").style.display = 'none';
    document.getElementById("btnCreateUser").style.display = 'inline-block';
}

// CREATE USER
function addPost() {
    var name = document.getElementById("name").value;
    var username = document.getElementById("username").value;
    var email = document.getElementById("email").value;
    var phone = document.getElementById("phone").value;
    var website = document.getElementById("website").value;

    return callApi('users', 'GET')
        .then(function(response) {
            var filterCreate = _.filter(response.data, function(object) {
                return object.username === username || object.email === email;
            });
            if (filterCreate.length > 0) {
                return false;
            } else {
                return true;
            }
        })
        .then(function(bool) {
            if (bool === false) {
                alert('Username or Email has been exist')
            } else {
                data = { "name": name, "username": username, "email": email, "phone": phone, "website": website }
                callApi('user', 'POST', data)
                    .then(function(response) {
                        debugger;
                        currentNumPageUser = Math.ceil(response.data.id / 5);
                        afterActionNumPage(currentNumPageUser);
                        return showListUser(currentNumPageUser);
                    })
                    .then(function(_) {
                        document.getElementById("createUserForm").reset();
                    })
                    .then(function(_) {
                        $('#createuserModal').modal('hide')
                        alert('Create Success!');
                    })
            }
        })
}



// CANCEL CREATE USERS
cancelAdd = function() {
    document.getElementById("createUserForm").reset();
}

//EDIT USERS
editPost = function(id) {
    document.getElementById("titleUser").innerHTML = 'Edit User';
    document.getElementById("btnCreateUser").style.display = 'none';
    document.getElementById("btnEditUser").style.display = 'inline-block';
    // Code of function edit post
    callApi('user/' + id, 'GET')
        .then(function(response) {
            defaultUserId = response.data.id;
            document.getElementById("name").value = response.data.name;
            document.getElementById("username").value = response.data.username;
            document.getElementById("email").value = response.data.email;
            document.getElementById("phone").value = response.data.phone;
            document.getElementById("website").value = response.data.website;
        });
}

// SAVE EDIT POST
savePost = function() {
    var editName = document.getElementById("name").value;
    var editUsername = document.getElementById("username").value;
    var editEmail = document.getElementById("email").value;
    var editPhone = document.getElementById("phone").value;
    var editWebsite = document.getElementById("website").value;

    // FILTER USERNAME AND EMAIL

    return callApi('users', 'GET')
        .then(function(response) {
            _.remove(response.data, ['id', defaultUserId]);
            var filterEdit = _.filter(response.data, function(object) {
                return object.username === editUsername || object.email === editEmail;
            });
            if (filterEdit.length === 0) {
                return true;
            } else {
                return false;
            }
        })
        .then(function(bool) {
            if (bool === false) {
                alert("Username or Email exist!")
            } else {
                var data = { "name": editName, "username": editUsername, "email": editEmail, "phone": editPhone, "website": editWebsite };

                return callApi('user/' + defaultUserId, 'PUT', data)
                    .then(function(_) {
                        alert("Edit Success");
                        $('#createuserModal').modal('hide');
                    })
                    .then(function(_) {
                        return showListUser(currentNumPageUser);
                    });
            }
        });
};

//DELETE USERS
deletePost = function(id) {
    callApi('user/' + id, 'DELETE')
        .then(function() {
            return callApi('users' + '?page=' + currentNumPageUser + '&perPage=' + 5, 'GET')
                .then(function(response) {
                    userLength = response.data.length;
                    if (userLength === 0) {
                        currentNumPageUser--;
                    }
                    return showListUser(currentNumPageUser);
                })
                .then(function(_) {
                    if (userLength > 0) {
                        return;
                    } else {
                        var ulUser = document.getElementById("pageUser");
                        var liUser = ulUser.getElementsByClassName("numUser");
                        for (i = 0; i < liUser.length; i++) {
                            if (liUser[i].classList.contains('active')) {
                                liUser[i].parentNode.removeChild(liUser[i]);
                                if (liUser.length) {
                                    liUser[i - 1].classList.add("active");
                                }
                            }
                        }
                    }
                })
        })
        .then(function(_) {
            return getTodos(headUserId);
        })
        .then(function(_) {
            // alert('Delete Success!');
        })
}


// TODOS
// CREATE TODOS

function createTodos() {

    var userId = document.getElementById("userId").value;
    var title = document.getElementById("title").value;
    var radio = document.getElementsByName("completed");
    for (i = 0; i < radio.length; i++) {
        if (radio[i].checked) {
            var completed = JSON.parse(radio[i].value);
        }
    }

    // CODE FILTER TODOS

    callApi('todo/' + userId, 'GET')
        .then(function(response) {
            var filterTitle = _.filter(response.data, ['title', title]);
            if (filterTitle.length === 0) {
                return true;
            } else {
                return false;
            }
        })
        .then(function(bool) {
            if (bool === false) {
                alert("Title Exists");
                return false;
            } else {
                var data = {
                    "user_id": userId,
                    "title": title,
                    "complete": completed
                }

                callApi('todo', 'POST', data)
                    .then(function(_) {
                        return callApi('todo/' + userId, 'GET')
                            .then(function(response) {
                                defaultUserId = userId;
                                todosNum = Math.ceil(response.data.length / 4);
                                numPageTodos(defaultUserId);
                                alert("Create Todos Success");
                            })
                            .then(function(_) {
                                document.getElementById("createTodosForm").reset();
                                return getListTodos(todosNum);
                            })
                            .then(function(_) {
                                $('#createtodoModal').modal('hide')
                            });
                    })
            }
        })
}

// CANCEL CREATE TODOS

cancelAddTodos = function() {
    document.getElementById("createTodosForm").reset();
}

// EDIT TODOS

editTodos = function(id) {
    todosId = id;
    document.getElementById("titleTodos").innerHTML = 'Edit Todo';
    document.getElementById("btnCreateTodos").style.display = 'none';
    document.getElementById("btnEditTodos").style.display = 'inline-block';
    callApi('todos/' + id, 'GET')
        .then(function(response) {
            document.getElementById("userId").value = response.data.user_id;
            document.getElementById("title").value = response.data.title;
            var editRadio = document.getElementsByName("completed");
            for (let i = 0; i < editRadio.length; i++) {
                if (JSON.parse(editRadio[i].value) === response.data.complete) {
                    editRadio[i].checked = true;
                }
            }
        })
}

saveTodos = function() {

    var editUserId = document.getElementById("userId").value;
    var editTitle = document.getElementById("title").value;
    var editRadio = document.getElementsByName("completed");
    for (i = 0; i < editRadio.length; i++) {
        if (editRadio[i].checked) {
            var editCompleted = JSON.parse(editRadio[i].value);
        }
    }

    // CODE FILTER TODOS

    callApi('todo/' + editUserId, 'GET')
        .then(function(response) {
            _.remove(response.data, ['id', todosId])
            var filterTitle = _.filter(response.data, ['title', editTitle]);
            if (filterTitle.length === 0) {
                var data = {
                    "title": editTitle,
                    "complete": editCompleted
                }
                callApi('todo/' + todosId, 'PUT', data)
                    .then(function(response) {
                        return getListTodos(todosNum);
                    })
                    .then(function(response) {
                        alert("Edit Success!")
                    });
                $('#createtodoModal').modal('hide')
            } else {
                alert("Title exists");
                return false;
            }
        })
}

// DELETE TODOS

deleteTodos = function(id) {

    // Code of function delete todos
    callApi('todo/' + id, 'DELETE')
        .then(function() {
            return callApi('todo/' + defaultUserId + '?page=' + todosNum + '&perPage=' + 4, 'GET')
                .then(function(response) {
                    todosLength = response.data.length;
                    if (todosLength === 0) {
                        todosNum--;
                    }
                    return getListTodos(todosNum);
                })
                .then(function(_) {
                    if (todosLength > 0) {
                        return;
                    } else {
                        var ulTodo = document.getElementById("pageTodos");
                        var liTodo = ulTodo.getElementsByClassName("numTodos");
                        for (i = 0; i < liTodo.length; i++) {
                            if (liTodo[i].classList.contains('active')) {
                                liTodo[i].parentNode.removeChild(liTodo[i]);
                                if (liTodo.length) {
                                    liTodo[i - 1].classList.add("active");
                                }
                            }
                        }
                    }
                })
                .then(function(_) {
                    // alert("Delete Success!")
                })
        });
}