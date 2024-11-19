let LogIn = false

export const isLoggedIn = () => LogIn

export const setIsLoggedIn = (n) =>{
    LogIn = n
}

/* ////////////////////////////// */

let UserName = ""

let Name = ""

let Email = ""

let Registration_date = ""

export const usernameGlobal = () => UserName

export const setUsernameGlobal = (n) =>{
    UserName = n
}

export const name = () => Name

export const setName = (n) =>{
    Name = n
}

export const email = () => Email

export const setEmail = (n) =>{
    Email = n
}

export const registrationDate = () => Registration_date

export const setRegistrationDate = (n) =>{
    Registration_date = n
}