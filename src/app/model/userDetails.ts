export class UserDetails {
    username: string;
    password: string;
    quizNumber:number;
    status:string;
    accessLevel:string;
    createdBy:string;
    CreatedDate:Date;
    UpdatedBy:string;
    UpdatedDate:Date;
    DateOfJoining:Date;

    constructor(username,password,quizNumber,status,acessLevel,createdBy,createdDate,updatedBy,updatedDate,DateOfJoining){
        this.username = username;
        this.password = password;
        this.quizNumber = quizNumber;
        this.status = status;
        this.accessLevel = acessLevel;
        this.createdBy = createdBy;
        this.CreatedDate = createdDate;
        this.UpdatedBy = updatedBy;
        this.UpdatedDate = updatedDate;
        this.DateOfJoining = DateOfJoining;
    }

} 