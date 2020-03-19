export class UserAnswer {


        public userName: any;
        public quizNumber: any;
		public questionID: any;
        public userAnswerID: any;
		public flagged: any;
		
		
		constructor(userName,quizNumber, questionID, userAnswerID, flagged) {
        
        this.userName = userName;
		this.quizNumber = quizNumber;
        this.questionID = questionID;
		this.userAnswerID = userAnswerID;
        this.flagged = flagged;
    }
    
}

/**
	userName: string;
    quizNumber: number;
	questionID: number;
    userAnswerID: string;
    flagged: boolean;
	
	constructor(data: any) {
        data = data || {};
        this.userName = data.userName;
		this.quizNumber = data.quizNumber;
        this.questionID = data.questionID;
		this.userAnswerID = data.userAnswerID;
        this.flagged = data.flagged;
    }
	**/
