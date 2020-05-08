export class TestConfig {
   JRSS: string;
   noOfQuestions: number;
   testDuration: number;

   constructor(JRSS, noOfQuestions, testDuration) {
      this.JRSS = JRSS;
   		this.noOfQuestions = noOfQuestions;
   		this.testDuration = testDuration;
   }

}
