document.onreadystatechange = function() {
    if (document.readyState === 'complete') {
        initApplication();
    }
};

var defaultUserId = 1;
var headUserId = 0;
var todosId = '';

function initApplication() {
    // const defaultUserId = 1;
    showListPosts();
    getTodos(defaultUserId);
}


// (function() {
//     showListPosts();
//     getTodos(defaultUserId);

// })();

// SHOW LIST USERS
function showListPosts() {
    // Code of function show list post

    const $el = document.getElementById('posts');

    return callApi('users', 'GET')
        .then(function(response) {
            renderListPost(response, $el);
            // defaultUserId = headIdUser;
        });
};


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
                var filterUsernam = _.filter(response, ['username', username]);
                var filterEmail = _.filter(response, ['email', editEmail]);
                if (filterUsernam.length === 0) {
                    var data = { "name": name, "username": username, "email": email, "phone": phone, "website": website }
                    callApi('users', 'POST', data)
                        .then(function(response) {
                            document.getElementById("createUserForm").reset();
                        })
                        .then(function(_) {
                            alert("Add User Success");
                        })
                        .then(function(_) {
                            return showListPosts();
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
                var filterUsernam = _.filter(response, ['username', editUsername]);
                var filterEmail = _.filter(response, ['email', editEmail]);
                if (filterUsernam.length === 0) {
                    var data = { "name": editName, "username": editUsername, "email": editEmail, "phone": editPhone, "website": editWebsite };

                    callApi('users/' + defaultUserId, 'PUT', data)
                        .then(function(_) {
                            showListPosts();
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
        // Code of function delete post
        callApi('users/' + id, 'DELETE')
            .then(function(response) {
                console.log(response);
                return showListPosts();
                // getTodos(headUserId);
            })
            .then(() => {
                getTodos(headUserId);
            });
    }
    // GET TODOS

function getTodos(id) {
    defaultUserId = id
    const $el = document.getElementById("todos");
    callApi('todos?userId=' + id, 'GET')
        .then(function(response) {
            renderListTodos(response, $el)
        });
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
                var completed = radio[i].value
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
                            getTodos(userId);
                            document.getElementById("createTodosForm").reset();
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
            var userid = document.getElementById("userTodos").value;
            alert("Delete Success!")
            getTodos(defaultUserId);
        });

}

// EDIT TODOS

editTodos = function(id) {
    todosId = id
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
                var filterTitle = _.filter(response, ['title', editTitle]);
                if (filterTitle.length === 0) {
                    var data = {
                        "userId": editUserId,
                        "title": editTitle,
                        "completed": editCompleted
                    }

                    callApi('todos/' + todosId, 'PUT', data)
                        .then(function(response) {
                            getTodos(defaultUserId);
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
            console.log(response)
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
        })
};


// RESET POST

resetPost = function() {
    showListPosts();
}