export interface IAccessTokenPayload {
    authorities: string[];
    sub: string;
    iat: number;
    exp: number;
}

export interface IRefreshTokenPayload {
    sub: string;
    iat: number;
    exp: number;
}