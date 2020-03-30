export class Question {
    questionID: number;
    question: string;
	skill: string;
    questionType: string;
	answerID: number;
	flagged: boolean;
    options: [{optionID: number;
				option: string;
				checked: string;
			}];
			
}