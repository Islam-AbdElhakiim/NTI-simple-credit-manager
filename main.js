const   addUserForm         = document.querySelector('#addUserForm')
        allUsersForm        = document.querySelector('#allUsersForm')
        userName            = document.querySelector('#userName'),
        userBalance         = document.querySelector('#userBalance'),
        addUser             = document.querySelector('#addUser')
        addBalanace         = document.querySelector('#addBalanace'),
        withdrawBalanace    = document.querySelector('#withdraw'),
        deleteBalance       = document.querySelector('#delete'),
        tBody               = document.querySelector('#usersList'),
        usersArray          = fetchUsersFromLocalStorage('usersArray') ? fetchUsersFromLocalStorage('usersArray') : []

/* Methods */

//Add to Local
const addUsersToLocalStorage = (key, value) => {
    localStorage.setItem(key, JSON.stringify(value))
}

//Fetch from Local
function fetchUsersFromLocalStorage(data){
    let stringData    = localStorage.getItem(data)
    if(stringData){
         usersArray = JSON.parse(stringData)
         return usersArray
    }
}

//Create table row
const createUsersRow = (user) => {
    
    return       `<tr>
                    <th scope="row">${user.id}</th>
                        <td>${user.nameValue}</td>
                        <td>${user.balanceValue}</td>
                        <td>
                            <input type="submit" value="Add" class="btn btn-success" id= "addBalanace" onclick="addUsersBalance(${user.balanceValue}, ${user.id})">
                            <input type="submit" value="Withdraw" class="btn btn-primary" onclick="withdrawUserBalance(${user.balanceValue}, ${user.id})">
                            <input type="submit" value="Delete" class="btn btn-danger" onclick="deleteUserRow(${user.id})">
                    </td>
                </tr>`
}

//Adding Balanace
const addUsersBalance = (balanceValue, id) => {

    let num    = window.prompt('Please Add Your Balance')

    if ( (balanceValue + Number(num) ) <=  1000 ) {
        balanceValue   += Number(num)

        usersArray = usersArray.map( user => {
            if (user.id === id) {
                user.balanceValue = balanceValue
                return user
            } else{
                return user
            }            
        }) 
        addUsersToLocalStorage('usersArray', usersArray)
        createTableWithFetchedUsers()

    } else {
        input = window.alert('sorry, Your Tottal must be 1000 or less ;)')
        console.log(balanceValue += Number(num))
        
    }
}

//Withdrawing Balance
const withdrawUserBalance = (balanceValue, id) => {
    //Get the Requested Amount
    let num = window.prompt('Don\'t take all your money away...WE WILL KILL YOU ')
    
    //Validate His Potential
    if ( num > balanceValue ) {
        window.alert('so, You wanna spoil us...WE KILL YOU M***F***')
    } else {        
        usersArray = usersArray.map(user => user.id === id ? {...user, balanceValue : balanceValue - num } : user  )
        addUsersToLocalStorage('usersArray', usersArray)
        createTableWithFetchedUsers()
    }
}

//Delete Row       
const deleteUserRow = id => {
    // console.log(usersArray)
    usersArray = usersArray.filter( user => user.id !== id)
    addUsersToLocalStorage('usersArray', usersArray)
    createTableWithFetchedUsers() 
}

//Create Dynamic Rows
function createTableWithFetchedUsers() {
    tBody.innerHTML =''
    let fetchedUsers = fetchUsersFromLocalStorage('usersArray')
    // console.log(fetchedUsers)
    fetchedUsers.map(user=> tBody.innerHTML += createUsersRow(user) )
}

/**Event Handlers */

//Home page Adding user
if (addUserForm) {
        addUser.addEventListener('click', function (e) {
            e.preventDefault()
            let id              = new Date().getMilliseconds(),
                nameValue       = userName.value,
                balanceValue    = userBalance.value
                userObject      = {id, nameValue, balanceValue}
            
            

            if ( balanceValue <= 1000 ) {
                usersArray.push(userObject )
                addUsersToLocalStorage( 'usersArray', usersArray )
                setTimeout( () => window.location.replace("addUser.html"), 500 )
            } else{
                window.alert('sorry, maximum input is 1000$')  
            }

            
    })
}

//Internal Page modifying users
if (allUsersForm) {
    createTableWithFetchedUsers()
}

// addBalanace.addEventListener('click', AddUsersBalance())