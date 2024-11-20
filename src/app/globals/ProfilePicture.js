


export const profilePicture = () => localStorage.getItem('ProfilePicture') || "";

export const setProfilePicture = (n) => {
    localStorage.setItem('ProfilePicture', n)
}
