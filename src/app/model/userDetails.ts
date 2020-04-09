export class UserDetails {
    username: string;
    password: string;
    quizNumber:number;
    status:string;
    accessLevel:string;
    createdBy:string;
    createdDate:Date;
    updatedBy:string;
    updatedDate:Date;
    dateOfJoining:Date;

    constructor(username,password,quizNumber,status,acessLevel,createdBy,createdDate,updatedBy,updatedDate,dateOfJoining){
        this.username = username;
        this.password = password;
        this.quizNumber = quizNumber;
        this.status = status;
        this.accessLevel = acessLevel;
        this.createdBy = createdBy;
        this.createdDate = createdDate;
        this.updatedBy = updatedBy;
        this.updatedDate = updatedDate;
        dateOfJoining = this.dateOfJoining;
    }

} 