document.onreadystatechange = function() {
    if (document.readyState === 'complete') {
        initApplication();
    }
};


function initApplication() {
    const defaultUserId = 1;
    showListPosts();
    getTodos(defaultUserId);
}



var usrId = 1;

var todosId = '';

// (function() {
//     showListPosts();
//     getTodos(usrId);

// })();

// SHOW LIST USERS
function showListPosts() {
    // Code of function show list post

    const $el = document.getElementById('posts');

    return callApi('users', 'GET')
        .then(function(response) {
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
                    template += '</tr>';
                }
                // console.log($el)

                $el.innerHTML = template;
            } else {
                $el.innerHTML = `
                <tr>
                    <td colspan="7"> Data not found </td>
                </tr>
                `;
            }
        })
}


// POST USERS
addPost = function() {
    var name = document.getElementById("name").value;
    var username = document.getElementById("username").value;
    var email = document.getElementById("email").value;
    var phone = document.getElementById("phone").value;
    var website = document.getElementById("website").value;
    var data = { "name": name, "username": username, "email": email, "phone": phone, "website": website }

    callApi('users', 'POST', data)
        // .then(response => console.log('Success: ', JSON.stringify(response)))
        // .catch(error => console.error('Error:', error));
        .then(function(response) {

            document.getElementById("createUserForm").reset();
        })
    return showListPosts();

}

//EDIT USERS
editPost = function(id) {
    // Code of function edit post
    callApi('users/' + id, 'GET')
        .then(function(response) {
            document.getElementById("editId").value = response.id;
            document.getElementById("editName").value = response.name;
            document.getElementById("editUsername").value = response.username;
            document.getElementById("editEmail").value = response.email;
            document.getElementById("editPhone").value = response.phone;
            document.getElementById("editWebsite").value = response.website;
        });
}

// SAVE EDIT POST

savePost = function() {
    var editName = document.getElementById("editName").value;
    var editUsername = document.getElementById("editUsername").value;
    var editEmail = document.getElementById("editEmail").value;
    var editPhone = document.getElementById("editPhone").value;
    var editWebsite = document.getElementById("editWebsite").value;
    var data = { "name": editName, "username": editUsername, "email": editEmail, "phone": editPhone, "website": editWebsite };



    callApi('users/' + id, 'PUT', data)
        .then(function(_) {
            showListPosts();
            alert("Edit Success");
        });
};


//DELETE USERS
deletePost = function(id) {
        // Code of function delete post
        callApi('users/' + id, 'DELETE')
            .then(function() {
                showListPosts();
            });
    }
    // GET TODOS

function getTodos(id) {
    usrId = id
    callApi('todos?userId=' + id, 'GET')
        .then(function(response) {
            if (response.length > 0) {
                let template = '';
                for (i = 0; i < response.length; i++) {
                    template += '<tr>';
                    template += '<td>' + response[i].title + '</td>';
                    template += '<td>' + response[i].completed + '</td>';
                    template += '<td class="colEdit"><button class="btn btn-warning" onclick="editTodos(' + response[i].id + ')" data-toggle="modal" data-target="#edittodoModal">Edit</button></td>';
                    template += `<td class="colDel"><button class="btn btn-danger" onclick="deleteTodos('${response[i].id}')">Delete</button></td>`;
                    template += '</tr>';
                }

                let $el = document.getElementById("todos");
                $el.innerHTML = template;

            } else {
                let template = '';
                template += '<tr>';
                template += '<td colspan="4">' + 'User has no information' + '</td>';
                template += '<tr>';

                let $el = document.getElementById("todos");
                $el.innerHTML = template;
            }
        })
}


// CREATE TODOS

createTodos = function() {

    var userId = document.getElementById("userId").value;
    var title = document.getElementById("title").value;
    var radio = document.getElementsByName("completed");
    for (i = 0; i < radio.length; i++) {
        if (radio[i].checked) {
            var completed = radio[i].value
        }
    }
    var data = {
        "userId": userId,
        "title": title,
        "completed": completed
    }

    callApi('todos', 'POST', data)
        .then(function(response) {
            getTodos(userId);
            alert("Success")
            document.getElementById("createTodosForm").reset();
        })
}

// DELETE TODOS

deleteTodos = function(id) {

    // Code of function delete todos
    callApi('todos/' + id, 'DELETE')
        .then(function() {
            var userid = document.getElementById("userTodos").value;
            console.log(usrId)
            alert("Delete Success!")
            getTodos(usrId);
        });

}

// EDIT TODOS

editTodos = function(id) {
    todosId = id
    callApi('todos/' + id, 'GET')
        .then(function(response) {
            var id = response.userId;
            var title = response.title;
            document.getElementById("editUserId").value = id;
            document.getElementById("editTitle").value = title;
            var editRadio = document.getElementsByName("editCompleted");
            for (let i = 0; i < editRadio.length; i++) {
                if (JSON.parse(editRadio[i].value) === response.completed) {
                    editRadio[i].checked = true;
                }
            }
        })
}

saveTodos = function() {
    var editUserId = document.getElementById("editUserId").value;
    var editTitle = document.getElementById("editTitle").value;
    var editRadio = document.getElementsByName("editCompleted");
    for (i = 0; i < editRadio.length; i++) {
        if (editRadio[i].checked) {
            var editCompleted = editRadio[i].value
        }
    }
    var data = {
        "userId": editUserId,
        "title": editTitle,
        "completed": editCompleted
    }

    callApiPost('todos/' + todosId, 'PUT', data)
        .then(function(response) {
            getTodos(usrId);
            alert("Edit Success!")
        });
}

// // SEARCH POST
searchPost = function() {

    let $el = document.getElementById("posts")
    var username = document.getElementById("find").value;

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