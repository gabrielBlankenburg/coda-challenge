function email(email: string): boolean {
    const pattern = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
    return pattern.test(email);
}

export default email