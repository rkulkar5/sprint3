import { Injectable } from '@angular/core';

@Injectable()
export class User {
    id: number;
    username: string;
    password: string;
    quizNumber:number;
    status:string;
    acessLevel:string;
    createdBy:string;
    createdDate:Date;
    updatedBy:string;
    updatedDate:Date;
    firstName: string;
    lastName: string;
    authdata?: string;
}