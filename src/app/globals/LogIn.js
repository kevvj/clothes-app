export const isLoggedIn = () => {
    if (typeof window !== 'undefined') {
        return JSON.parse(localStorage.getItem('LogIn')) || false
    }
    return false
}

export const setIsLoggedIn = (n) => {
    if (typeof window !== 'undefined') {
        localStorage.setItem('LogIn', JSON.stringify(n))
    }
}

export const idClient = () => {
    if (typeof window !== 'undefined') {
        return JSON.parse(localStorage.getItem('IdClient')) || 0
    }
    return 0
}

export const setIdClient = (n) => {
    if (typeof window !== 'undefined') {
        localStorage.setItem('IdClient', JSON.stringify(n))
    }
}

export const usernameGlobal = () => {
    if (typeof window !== 'undefined') {
        return localStorage.getItem('UserName') || ""
    }
    return ""
}

export const setUsernameGlobal = (n) => {
    if (typeof window !== 'undefined') {
        localStorage.setItem('UserName', n)
    }
}

export const name = () => {
    if (typeof window !== 'undefined') {
        return localStorage.getItem('Name') || ""
    }
    return ""
}

export const setName = (n) => {
    if (typeof window !== 'undefined') {
        localStorage.setItem('Name', n)
    }
}

export const email = () => {
    if (typeof window !== 'undefined') {
        return localStorage.getItem('Email') || ""
    }
    return ""
}

export const setEmail = (n) => {
    if (typeof window !== 'undefined') {
        localStorage.setItem('Email', n)
    }
}

export const registrationDate = () => {
    if (typeof window !== 'undefined') {
        return localStorage.getItem('Registration_date') || ""
    }
    return ""
}

export const setRegistrationDate = (n) => {
    if (typeof window !== 'undefined') {
        localStorage.setItem('Registration_date', n)
    }
}
