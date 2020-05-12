export class Candidate {
   employeeName: string;
   email: string;
   band: string;
   JRSS: string;
   technologyStream: String;
   phoneNumber: number;
   dateOfJoining: Date;
   createdBy: string;
   createdDate: Date;
   updatedBy: string;
   updatedDate: Date;
   username: String;

   constructor(employeeName,email,band,JRSS,technologyStream,phoneNumber
   ,dateOfJoining,createdBy,createdDate,updatedBy,updatedDate,username) {
    this.employeeName = employeeName;
    this.email = email;
    this.band = band;
    this.JRSS = JRSS;
    this.technologyStream = technologyStream;
    this.phoneNumber = phoneNumber;
    this.dateOfJoining = dateOfJoining;
    this.createdBy = createdBy;
    this.createdDate = createdDate;
    this.updatedBy = updatedBy;
    this.updatedDate = updatedDate;
    this.username = username;
   }
}
