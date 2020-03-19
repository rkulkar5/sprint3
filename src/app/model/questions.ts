export class Question {
    questionID: number;
    question: string;
	skill: string;
    questionType: string;
	answerID: number;
    options: [{optionID: number;
				option: string;
				checked: string;
			}];
			
}