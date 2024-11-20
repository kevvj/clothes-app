// Guardar si el usuario está logueado
export const isLoggedIn = () => JSON.parse(localStorage.getItem('LogIn')) || false

export const setIsLoggedIn = (n) => {
    localStorage.setItem('LogIn', JSON.stringify(n));
}
export const idClient = () => JSON.parse(localStorage.getItem('IdClient')) || 0;

export const setIdClient = (n) => {
    localStorage.setItem('IdClient', JSON.stringify(n));
}

export const usernameGlobal = () => localStorage.getItem('UserName') || "";

export const setUsernameGlobal = (n) => {
    localStorage.setItem('UserName', n);
}

export const name = () => localStorage.getItem('Name') || "";

export const setName = (n) => {
    localStorage.setItem('Name', n)
}

export const email = () => localStorage.getItem('Email') || "";

export const setEmail = (n) => {
    localStorage.setItem('Email', n)
}


export const registrationDate = () => localStorage.getItem('Registration_date') || "";

export const setRegistrationDate = (n) => {
    localStorage.setItem('Registration_date', n)
}
