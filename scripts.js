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
var userLength = 0;
var todosLength = 0;

function initApplication() {
    getTodos(defaultUserId);
    numPage();
    showListUser(currentNumPageUser);
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
            var filterCreate = _.filter(response, function(object) {
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
                callApi('users', 'POST', data)
                    .then(function(response) {
                        currentNumPageUser = Math.ceil(response.id / 5);
                        afterActionNumPage(currentNumPageUser);
                        return showListUser(currentNumPageUser);
                    })
                    .then(function(_) {
                        $('#createuserModal').modal('hide')
                        alert('Create Success!')
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

    // var fEditName = document.forms["editUserForm"]["editName"].value;
    // var fEditUsername = document.forms["editUserForm"]["editUsername"].value;
    // var fEditEmail = document.forms["editUserForm"]["editEmail"].value;
    // var fEditPhone = document.forms["editUserForm"]["editPhone"].value;
    // var fEditWebsite = document.forms["editUserForm"]["editWebsite"].value;
    // if (fEditName == "" || fEditUsername == "" || fEditEmail == "" || fEditPhone == "" || fEditWebsite == "") {
    //     alert("All Field Must Be Filled!")
    //     return false;
    // } else {
    var editName = document.getElementById("editName").value;
    var editUsername = document.getElementById("editUsername").value;
    var editEmail = document.getElementById("editEmail").value;
    var editPhone = document.getElementById("editPhone").value;
    var editWebsite = document.getElementById("editWebsite").value;

    // FILTER USERNAME AND EMAIL

    return callApi('users', 'GET')
        .then(function(response) {
            _.remove(response, ['id', defaultUserId]);
            var filterEdit = _.filter(response, function(object) {
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

                callApi('users/' + defaultUserId, 'PUT', data)
                    .then(function(response) {
                        return showListUser(currentNumPageUser);
                    })
                    .then(function(_) {
                        alert("Edit Success");
                        $('#edituserModal').modal('hide')
                    });
            }
        });
    // if (filterEdit.length === 0) {
    //     var data = { "name": editName, "username": editUsername, "email": editEmail, "phone": editPhone, "website": editWebsite };

    //     callApi('users/' + defaultUserId, 'PUT', data)
    //         .then(function(response) {
    //             return showListUser(currentNumPageUser);
    //         })
    //         .then(function(_) {
    //             alert("Edit Success");
    //         });
    //     $('#edituserModal').modal('hide')
    // } else {
    //     alert("Username or Email exists!")
    //     return false;
    // }
    // })
    // }
};

//DELETE USERS
deletePost = function(id) {
    callApi('users/' + id, 'DELETE')
        .then(function() {
            console.log(maxNumPage);
            return callApi('users' + '?_page=' + currentNumPageUser + '&_limit=' + 5, 'GET')
                .then(function(response) {
                    userLength = response.length;
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

// DELETE TODOS

deleteTodos = function(id) {

    // Code of function delete todos
    callApi('todos/' + id, 'DELETE')
        .then(function() {
            return callApi('todos' + '?userId=' + defaultUserId + '&_page=' + todosNum + '&_limit=' + 4, 'GET')
                .then(function(response) {
                    todosLength = response.length;
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