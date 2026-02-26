export declare enum UserRole {
    CUSTOMER = "customer",
    STAFF = "staff",
    ADMIN = "admin"
}
export interface User {
    id: string;
    email: string;
    role: UserRole;
    firstName: string;
    lastName: string;
    createdAt: Date;
    updatedAt: Date;
}
export interface CreateUserDto {
    email: string;
    password: string;
    role: UserRole;
    firstName: string;
    lastName: string;
}
export interface LoginDto {
    email: string;
    password: string;
}
export interface AuthResponse {
    user: User;
    accessToken: string;
}
//# sourceMappingURL=user.types.d.ts.map