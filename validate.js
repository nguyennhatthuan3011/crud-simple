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
    var fEditName = document.forms["editUserForm"]["editName"].value;
    var fEditUsername = document.forms["editUserForm"]["editUsername"].value;
    var fEditEmail = document.forms["editUserForm"]["editEmail"].value;
    var fEditPhone = document.forms["editUserForm"]["editPhone"].value;
    var fEditWebsite = document.forms["editUserForm"]["editWebsite"].value;
    if (fEditName == "") {
        document.getElementById("errEditName").style.display = 'block';
        document.getElementById("errEditName").innerHTML = 'Name must be filled!';
        return false;
    }
    if (fEditUsername == "") {
        document.getElementById("errEditUsername").style.display = 'block';
        document.getElementById("errEditUsername").innerHTML = 'Username must be filled!';
        return false;
    }
    if (fEditEmail == "") {
        document.getElementById("errEditEmail").style.display = 'block';
        document.getElementById("errEditEmail").innerHTML = 'Email must be filled!';
        return false;
    }
    if (fEditPhone == "") {
        document.getElementById("errEditPhone").style.display = 'block';
        document.getElementById("errEditPhone").innerHTML = 'Phone must be filled!';
        return false;
    }
    if (fEditWebsite == "") {
        document.getElementById("errEditWebsite").style.display = 'block';
        document.getElementById("errEditWebsite").innerHTML = 'Website must be filled!';
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


// HIDE ERROR EDIT USER

//HIDE ERR EDITNAME
function hideErrEditName() {
    document.getElementById("errEditName").style.display = 'none';
}

//HIDE ERR EDITUSERNAME
function hideErrEditUserName() {
    document.getElementById("errEditUsername").style.display = 'none';
}

//HIDE ERR EDITEMAIL
function hideErrEditEmail() {
    document.getElementById("errEditEmail").style.display = 'none';
}

//HIDE ERR EDITPHONE
function hideErrEditPhone() {
    document.getElementById("errEditPhone").style.display = 'none';
}

//HIDE ERR EDITWEBSITE
function hideErrEditWebsite() {
    document.getElementById("errEditWebsite").style.display = 'none';
}



//TODOS

function passValueIdUser() {
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
    var fEditTitle = document.forms["edittodoModal"]["editTitle"].value;
    if (fEditTitle == "") {
        document.getElementById("errEditTitle").style.display = 'block';
        document.getElementById("errEditTitle").innerHTML = 'Title must be filled';
        return false;
    }

    return saveTodos();
}


//HIDE ERR TODOS

function hideErrTitle() {
    document.getElementById("errTitle").style.display = 'none';
}

function hideErrEditTitle() {
    document.getElementById("errEditTitle").style.display = 'none';
}