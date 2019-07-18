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
        return false;
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
    var fName = document.forms["createUserForm"]["name"].value;
    var fUsername = document.forms["createUserForm"]["username"].value;
    var fEmail = document.forms["createUserForm"]["email"].value;
    var fPhone = document.forms["createUserForm"]["phone"].value;
    var fWebsite = document.forms["createUserForm"]["website"].value;

    if (fName == "") {
        document.getElementById("errName").style.display = 'block';
        document.getElementById("errName").innerHTML = 'Name must be filled!';
        return false;
    }
    if (fUsername == "") {
        document.getElementById("errUsername").style.display = 'block';
        document.getElementById("errUsername").innerHTML = 'Username must be filled!';
        return false;
    }
    if (fEmail == "") {
        document.getElementById("errEmail").style.display = 'block';
        document.getElementById("errEmail").innerHTML = 'Email must be filled!';
        return false;
    }
    if (fPhone == "") {
        document.getElementById("errPhone").style.display = 'block';
        document.getElementById("errPhone").innerHTML = 'Phone must be filled!';
        return false;
    }
    if (fWebsite == "") {
        document.getElementById("errWebsite").style.display = 'block';
        document.getElementById("errWebsite").innerHTML = 'Website must be filled!';
        return false;
    }

    return savePost();
}


// HIDE ERROR CREATE USER

//HIDE ERROR NAME

function hideErrName() {
    document.getElementById("errName").style.display = 'none';
}

//HIDE ERROR USERNAME

function hideErrUsername() {
    document.getElementById("errUsername").style.display = 'none';
}

//HIDE ERROR EMAIL
function hideErrEmail() {
    document.getElementById("errEmail").style.display = 'none';
}

//HIDE ERROR PHONE
function hideErrPhone() {
    document.getElementById("errPhone").style.display = 'none';
}

//HIDE ERROR WEBSITE
function hideErrWebsite() {
    document.getElementById("errWebsite").style.display = 'none';
}


//TODOS

function passValueIdUser() {
    document.getElementById("titleTodos").innerHTML = 'Create Todo';
    document.getElementById("btnCreateTodos").style.display = 'inline-block';
    document.getElementById("btnEditTodos").style.display = 'none';
    var valIdUser = document.getElementById("userId");
    valIdUser.value = defaultUserId;
}

// VALIDATE CREATE TODOS

function validateCreateTodos() {
    var fTitle = document.forms["createTodosForm"]["title"].value;
    var fComplete = document.forms["createTodosForm"]["completed"].value;

    if (fTitle == "") {
        document.getElementById("errTitle").innerHTML = 'Title must be filled';
        return false;
    }

    if (fComplete == "") {
        document.getElementById("errCompleted").innerHTML = 'You must choose one';
        return false;
    }

    return createTodos();
}

//VALIDATE EDIT TODOS

function validateEditTodos() {
    var fTitle = document.forms["createTodosForm"]["title"].value;

    if (fTitle == "") {
        document.getElementById("errTitle").style.display = 'block';
        document.getElementById("errTitle").innerHTML = 'Title must be filled';
        return false;
    }

    return saveTodos();
}


//HIDE ERR TODOS

function hideErrTitle() {
    document.getElementById("errTitle").style.display = 'none';
}