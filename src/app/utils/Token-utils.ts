function getUserFromToken(token: string) {
    const payload = token.split('.')[1];
    const decodedPayload = atob(payload);
    const user = JSON.parse(decodedPayload);
    return user.sub;
}

function getPaylodFromToken(token: string) {
    const payload = token.split('.')[1];
    const decodedPayload = atob(payload);
    return JSON.parse(decodedPayload);
}

export { getUserFromToken, getPaylodFromToken };