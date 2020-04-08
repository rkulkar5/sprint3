export class UserResult {


        public userName: any;
        public userScore: any;
		public quizNumber: any;
		public createdDate:Date;
		
		
		constructor(userName,userScore, quizNumber) {
        
        this.userName = userName;
		this.userScore = userScore;
		this.quizNumber = quizNumber;
        this.createdDate = new Date();
    }
    
}

