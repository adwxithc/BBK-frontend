export interface IAdmin {
    _id?: string;
    name: string;
    email: string;
    profile?: string;
    createdAt?: string;
    updatedAt?: string;
}

export interface IResponse<T> {
    success: boolean;
    data?: T;
    message?: string;
}
export interface Ierror {
    status: number;
    success: boolean;
    data: {
        errors: { field?: string; message: string }[];
    };
}

export interface ISigninRequest {
    email: string;
    password: string;
}
