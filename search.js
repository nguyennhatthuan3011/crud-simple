// SEARCH POST
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