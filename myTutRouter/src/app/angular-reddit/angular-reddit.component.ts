import { Component } from '@angular/core';
import { Article } from './article/article.model';

@Component({
  selector: 'angular-reddit',
  templateUrl: './angular-reddit.component.html',
  styleUrls: ['./angular-reddit.component.css']
})

export class AngularRedditComponent {
  
  articles: Article[]; // <-- component property

  constructor() {
    this.articles = [
      new Article('Angular', 'http://angular.io', 3),
      new Article('Fullstack', 'http://fullstack.io', 2),
      new Article('Angular Homepage', 'http://angular.io', 1),
    ];
  }

  addArticle(title: HTMLInputElement, link: HTMLInputElement): boolean {
    console.log(`Adding article title: ${title.value} and link: ${link.value}`);
    this.articles.push(new Article(title.value, link.value, 0));
    title.value = '';
    link.value = '';
    return false;
  }

  sortedArticles(): Article[] {
    return this.articles.sort((a: Article, b: Article) => b.votes - a.votes);
  }
  
}