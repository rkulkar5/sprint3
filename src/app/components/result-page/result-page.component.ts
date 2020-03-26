import { Component, OnInit } from '@angular/core';
import { Question } from './../../model/Questions';
import { QuizService } from './../../components/quiz/quiz.service';

@Component({
  selector: 'app-result-page',
  templateUrl: './result-page.component.html',
  styleUrls: ['./result-page.component.css']
})
export class ResultPageComponent implements OnInit {
  questions:any = [];
  totalNumberofQuestions: number = 0;
  correctQuestions: number = 0;

  constructor(private quizService: QuizService) { }

  ngOnInit(): void {
    this.quizService.getQuizQuestions().subscribe(res => {
          this.questions = res;
          this.totalNumberofQuestions = this.questions.length;
    });

  }



}
