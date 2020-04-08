export class Candidate {
   employeeName: string;
   username: string;
   band: string;
   JRSS: string;
   phoneNumber: number;
   dateOfJoining: Date;
   createdBy: string;
   createdDate: Date;
   updatedBy: string;
   updatedDate: Date;

   constructor(employeeName,username,band,JRSS,phoneNumber
   ,dateOfJoining,createdBy,createdDate,updatedBy,updatedDate) {
    this.employeeName = employeeName;
    this.username = username;
    this.band = band;
    this.JRSS = JRSS;
    this.phoneNumber = phoneNumber;
    this.dateOfJoining = dateOfJoining;
    this.createdBy = createdBy;
    this.createdDate = createdDate;
    this.updatedBy = updatedBy;
    this.updatedDate = updatedDate;
   }
}
