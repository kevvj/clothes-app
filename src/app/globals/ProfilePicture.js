export const profilePicture = () => {
    if (typeof window !== 'undefined') {
        return localStorage.getItem('ProfilePicture') || ""
    }
    return ""
}

export const setProfilePicture = (n) => {
    if (typeof window !== 'undefined') {
        localStorage.setItem('ProfilePicture', n)
    }
}