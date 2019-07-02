(function() {
    showListPosts();
})();


// SHOW LIST USERS
function showListPosts() {
    // Code of function show list post
    let $el = document.getElementById('posts');
    callApi('users', 'GET')
        .then(response => {
            if (response.length > 0) {
                let template = '';
                for (i = 0; i < response.length; i++) {
                    template += '<tr>';
                    template += '<td>' + response[i].id + '</td>';
                    template += '<td>' + response[i].name + '</td>';
                    template += '<td class="colEdit"><button class="editBtn" onclick="editPost(' + response[i].id + ')">Edit</button></td>';
                    template += `<td class="colDel"><button id="delBtn" onclick="deletePost('${response[i].id}')">Delete</button></td>`;
                    template += '<td class="colEdit"><button class="detailBtn" onclick="getTodos(' + response[i].id + ')">Detail</button></td>';
                    template += '</tr>'
                }
                $el.innerHTML = template;
            } else {
                $el.innerHTML = '';
            }
        })
}

showDetailPost = function() {
    // Code of function show detail
}

// POST USERS
addPost = function() {
    var name = document.getElementById("name").value;
    var data = { "name": name }

    callApiPost('users', 'POST', data)
        // .then(response => console.log('Success: ', JSON.stringify(response)))
        // .catch(error => console.error('Error:', error));
    return showListPosts();

}

//EDIT USERS
editPost = function(id) {
    // Code of function edit post
    let $el = document.getElementById('name')
        // change button "Add" and "Save"
    document.getElementById("Edit").style.display = 'block';
    document.getElementById("Add").style.display = 'none';
    callApi('users/' + id, 'GET')
        .then(function(response) {
            var name = response.name;
            var id = response.id;
            document.getElementById("id").value = id;
            document.getElementById("name").value = name;
        })
}

savePost = function() {
    var id = document.getElementById("id").value;
    var editName = document.getElementById("name").value;
    var data = { "name": editName }

    callApiPost('users/' + id, 'PUT', data)
        .then(function(response) {
            if (response) {
                console.log(response.id)
                showListPosts();
            }
        })
        .catch(error => console.error('Error:', error));

    document.getElementById("Add").style.display = 'block';
    document.getElementById("Edit").style.display = 'none';
}


//DELETE USERS
deletePost = function(id) {
    // console.log(id)
    // Code of function delete post
    callApi('users/' + id, 'DELETE')
        .then(function() {
            showListPosts()
        });
}

// GET TODOS

getTodos = function(id) {
    let $el = document.getElementById("todos");
    callApi('todos/' + id, 'GET')
        .then(response => {
            if (response) {
                let template = '';
                for (i = 0; i < response.length; i++) {
                    template += '<tr>';
                    template += '<td>' + response[i].id + '</td>';
                    template += '<td>' + response[i].tittle + '</td>';
                    template += '<td>' + response[i].completed + '</td>';
                    template += '<tr>';
                }
                $el.innerHTML = template;
            }
        })
}


function callApi(prefixUrl, method) {

    var baseUrl = 'http://localhost:3000';

    var settings = {
        async: true,
        crossDomain: true,
        method: method,
        headers: {
            "Content-Type": "application/json",
        }
    };

    var response = fetch(`${baseUrl}/${prefixUrl}`, settings)
        .then(function(response) {
            return response.json();
        })
        .catch(function(err) {
            console.log(err);
        })

    return response;
}

function callApiPost(prefixUrl, method, data) {

    var baseUrl = 'http://localhost:3000';

    var settings = {
        async: true,
        crossDomain: true,
        method: method,
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json",
        }
    };

    var response = fetch(`${baseUrl}/${prefixUrl}`, settings)
        .then(function(response) {
            return response.json();
        })
        .catch(function(err) {
            console.log(err);
        })

    return response;
}