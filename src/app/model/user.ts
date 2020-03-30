import { Injectable } from '@angular/core';

@Injectable()
export class User {
    id: number;
    username: string;
    password: string;
    quizNumber:number;
    firstName: string;
    lastName: string;
    authdata?: string;
}