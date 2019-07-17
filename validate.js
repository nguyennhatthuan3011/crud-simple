// USER
// VALIDATE CREATE USER
function validateCreateUser() {
    var fName = document.forms["createUserForm"]["name"].value;
    var fUsername = document.forms["createUserForm"]["username"].value;
    var fEmail = document.forms["createUserForm"]["email"].value;
    var fPhone = document.forms["createUserForm"]["phone"].value;
    var fWebsite = document.forms["createUserForm"]["website"].value;

    if (fName == "") {
        document.getElementById("errName").innerHTML = 'Name must be filled!';
    }
    if (fUsername == "") {
        document.getElementById("errUsername").innerHTML = 'Username must be filled!';
        return false;
    }
    if (fEmail == "") {
        document.getElementById("errEmail").innerHTML = 'Email must be filled!';
        return false;
    }
    if (fPhone == "") {
        document.getElementById("errPhone").innerHTML = 'Phone must be filled!';
        return false;
    }
    if (fWebsite == "") {
        document.getElementById("errWebsite").innerHTML = 'Website must be filled!';
        return false;
    }

    return addPost();
}


// VALIDATE EDIT USER

function validateEditUser() {
    var fEditName = document.forms["editUserForm"]["editName"].value;
    var fEditUsername = document.forms["editUserForm"]["editUsername"].value;
    var fEditEmail = document.forms["editUserForm"]["editEmail"].value;
    var fEditPhone = document.forms["editUserForm"]["editPhone"].value;
    var fEditWebsite = document.forms["editUserForm"]["editWebsite"].value;
    debugger;
    if (fEditName == "") {
        document.getElementById("errEditName").innerHTML = 'Name must be filled!';
        return false;
    }
    if (fEditUsername == "") {
        document.getElementById("errEditUsername").innerHTML = 'Username must be filled!';
        return false;
    }
    if (fEditEmail == "") {
        document.getElementById("errEditEmail").innerHTML = 'Email must be filled!';
        return false;
    }
    if (fEditPhone == "") {
        document.getElementById("errEditPhone").innerHTML = 'Phone must be filled!';
        return false;
    }
    if (fEditWebsite == "") {
        document.getElementById("errEditWebsite").innerHTML = 'Website must be filled!';
        return false;
    }
    debugger;
    return savePost();
}