import { Component, OnInit } from '@angular/core';
import { AuthorService } from './author.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  authorData: any;
  sortOption: string = 'title';
  sortedBooks: any[] | undefined;
  newBook: any = {};
  isDesktop: boolean = false;

  constructor(private authorService: AuthorService) {}

  ngOnInit(): void {
    this.authorService.getAuthorData().subscribe(data => {
      this.authorData = data.data;
      this.sortedBooks = this.sortBooks(this.authorData.books, this.sortOption);
    });

    this.authorService.getAuthorDataObservable().subscribe(data => {
      if (data) {
        this.authorData = data;
        this.sortedBooks = this.sortBooks(this.authorData.books, this.sortOption);
      }
    });

    this.isDesktop = this.isDesktopView();
  }

  isDesktopView(): boolean {
    return window.innerWidth > 768; // Adjust the breakpoint as needed
  }

  onSortChange(): void {
    this.sortedBooks = this.sortBooks(this.authorData.books, this.sortOption);
  }

  addBook(): void {
    this.authorData.books.push(this.newBook);
    this.authorService.updateAuthorData({ ...this.authorData });
    this.newBook = {}; // clear the new book form
  }

  deleteBook(index: number): void {
    this.authorData.books.splice(index, 1);
    this.authorService.updateAuthorData({ ...this.authorData });
  }

  modifyBook(index: number): void {
    // Assuming you have a form to modify the book details
    // Update the book in the array and then update the author data
    this.authorData.books[index] = { ...this.newBook };
    this.authorService.updateAuthorData({ ...this.authorData });
    this.newBook = {}; // clear the modify book form
  }

  sortBooks(books: any[], option: string): any[] {
    if (option === 'title') {
      return books.slice().sort((a, b) => a.title.localeCompare(b.title));
    } else if (option === 'date') {
      return books.slice().sort((a, b) => +new Date(a.PublishDate) - +new Date(b.PublishDate));
    }
    return books;
  }
}

