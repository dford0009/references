import Summary from "./Summary";
import Unique, { UniqueId } from "./Unique";
import User from "./User";
import Question from "./Question";
import getUniqueId from "../utils/getUniqueId";
import Attachment from "./Attachment";

class Answer implements Unique, Summary {
  private id: UniqueId;
  private author!: User;
  private text!: string;
  private question!: Question;
  private attachments: Attachment[];

  constructor(
    author: User,
    question: Question,
    text: string,
    attachments: Attachment[] = [],
  ) {
    this.id = getUniqueId();
    this.attachments = attachments;

    this.setText(text);
    this.setQuestion(question);
    this.setAuthor(author);
  }

  private setAuthor(author: User): void {
    this.author = author;
    author.addAnswer(this);
  }

  private setQuestion(question: Question): void {
    this.question = question;
    question.addAnswer(this);
  }

  setText(text: string): void {
    this.text = text;
  }

  getId(): UniqueId {
    return this.id;
  }

  addAttachment(attachment: Attachment) {
    this.attachments.push(attachment);
  }

  getSummary(prefix: string = ''): string {
    const author = this.author.getSummary(' - ');
    const question = this.question.getSummary(' - ');
    const maxTextLength = 40;

    const textSnippet = this.text.length >= maxTextLength
      ? `${this.text.substring(0, maxTextLength - 3)}...`
      : this.text;

    const lines = [
      `Answer: ${textSnippet}`,
      `Attachments: ${this.attachments.length}`,
      'Author: ',
      author,
      'Question: ',
      question,
    ];

    return lines
      .map(line => `${prefix}${line}`)
      .join('\n');
  }
}

export default Answer;
