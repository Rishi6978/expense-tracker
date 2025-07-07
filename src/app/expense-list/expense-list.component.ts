import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-expense-list',
  imports: [CommonModule],
  templateUrl: './expense-list.component.html',
  styleUrl: './expense-list.component.css'
})
export class ExpenseListComponent {

 expandedIndex: number | null = null;

  videoBlocks: {
    title: string;
    videos: SafeResourceUrl[];
  }[];

  constructor(private sanitizer: DomSanitizer) {
    this.videoBlocks = [
      {
        title: 'Angular Basics',
        videos: [
          this.sanitizer.bypassSecurityTrustResourceUrl('https://drive.google.com/file/d/1Nz8NsbvTozfompJeTz149wQdPiFNu-sV/view?usp=sharing'),
          this.sanitizer.bypassSecurityTrustResourceUrl('https://www.youtube.com/embed/Fdf5aTYRW0E')
        ]
      },
      {
        title: 'RxJS Deep Dive',
        videos: [
          this.sanitizer.bypassSecurityTrustResourceUrl('https://www.youtube.com/embed/PhggNGsSQyg'),
          this.sanitizer.bypassSecurityTrustResourceUrl('https://www.youtube.com/embed/7kz03sP0r10')
        ]
      },
      {
        title: 'Angular Routing & Forms',
        videos: [
          this.sanitizer.bypassSecurityTrustResourceUrl('https://www.youtube.com/embed/k3mVZfv3H-E'),
          this.sanitizer.bypassSecurityTrustResourceUrl('https://www.youtube.com/embed/FpsF6zMPk6c')
        ]
      }
    ];
  }

  toggle(index: number): void {
    this.expandedIndex = this.expandedIndex === index ? null : index;
  }
}