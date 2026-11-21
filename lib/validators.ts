// password rule from the assignment
export const validatePassword = (password: string) => {
    if (password.length < 6) return "Password must be at least 6 characters"
    if (!/[A-Z]/.test(password)) return "Password must have an uppercase letter"
    if (!/[a-z]/.test(password)) return "Password must have a lowercase letter"
    return null
}