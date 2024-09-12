import { Component, OnInit, Renderer2, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  @ViewChild('menuToggle', { static: true }) menuToggle!: ElementRef;
  @ViewChild('navLinks', { static: true }) navLinks!: ElementRef;

  constructor(private renderer: Renderer2) { }

  ngOnInit(): void {
    this.initEventListeners();
  }

  private initEventListeners(): void {
    this.renderer.listen(this.menuToggle.nativeElement, 'click', () => {
      this.menuToggle.nativeElement.classList.toggle('open');
      this.navLinks.nativeElement.classList.toggle('active');
    });

    this.renderer.listen(this.navLinks.nativeElement, 'click', (event: Event) => {
      const target = event.target as HTMLElement;
      if (target.closest('a')) {
        this.menuToggle.nativeElement.classList.remove('open');
        this.navLinks.nativeElement.classList.remove('active');
      }
    });
  }
}
