export class Question {
  questionID: number;
  question: string;
	skill: string;
	jrss: string;
	technologyStream: string;
  questionType: string;
	answerID: number;
	flagged: boolean;
  options: [{optionID: number;
				option: string;
				checked: string;
	}];
			
}
