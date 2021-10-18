var gNextId = 100
var gUsers
_createUsers()

function _createUser(username, password, isAdmin, url) {
    const user = {
        id: gNextId++,
        username: username,
        password: password,
        lastLoginTime: 111,
        isAdmin: isAdmin,
        img: `<img src=${url} class="signned-up-img" alt="">`
    }
    return user
}


function _createUsers() {
    var users = loadFromStorage('safeConectDB')
    if (!users || !users.length) {
        //if the array is empty or if it is the first time or if this key from localstorage was deleted
        users = [
            _createUser('Puki', '12345', false, "../img/secret1.png"),
            _createUser('Muki', '1234', false, "../img/secret2.png"),
            _createUser('Luki', '123', true, "../img/secret3.png"),
            _createUser('Yossi', '123', true, "../img/secret3.png"),
            _createUser('Rotem', '123', false, "../img/secret3.png"),
            _createUser('Shalom', '123', false, "../img/secret3.png"),
            _createUser('Yuval', '123', true, "../img/secret3.png"),
            _createUser('Dan', '123', true, "../img/secret3.png"),
        ]
    }
    gUsers = users
    _saveUsersToStorage()
    console.log(gUsers);
}


function _saveUsersToStorage() {
    saveToStorage('safeConectDB', gUsers)
}


function _getUsersToShow() {
    return loadFromStorage('safeConectDB')
}


function doLogin(userName, password) {
    var userAuth = gUsers.find(function (user) {
        return user.username === userName && user.password === password
    })
    if (!userAuth) return null

    userAuth.lastLoginTime = Date.now()
    saveToStorage('currLoggenInUser', userAuth)
    _saveUsersToStorage()

    return userAuth
    //all the dom things in the controller
}


function doLogout() {
    saveToStorage('currLoggenInUser', '')
    _saveUsersToStorage()
}