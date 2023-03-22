declare module "express" {
    export interface Request {
        user: any
    }
}

declare module "*.png" {
    const value: any;
    export = value;
}
