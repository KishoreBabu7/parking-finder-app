import { Component, OnInit, Renderer2, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  @ViewChild('menuToggle', { static: true }) menuToggle!: ElementRef;
  @ViewChild('navLinks', { static: true }) navLinks!: ElementRef;
  @ViewChild('loginBtn', { static: true }) loginBtn!: ElementRef;
  @ViewChild('loginModal', { static: true }) loginModal!: ElementRef;
  @ViewChild('closeModal', { static: true }) closeModal!: ElementRef;

  constructor(private renderer: Renderer2) { }

  ngOnInit(): void {
    this.initEventListeners();
  }

  private initEventListeners(): void {
    // Toggle mobile menu
    this.renderer.listen(this.menuToggle.nativeElement, 'click', () => {
      this.menuToggle.nativeElement.classList.toggle('open');
      this.navLinks.nativeElement.classList.toggle('active');
    });

    // Close menu and scroll up when a navigation link is clicked
    this.renderer.listen(this.navLinks.nativeElement, 'click', (event: Event) => {
      const target = event.target as HTMLElement;
      if (target.closest('a')) {
        this.menuToggle.nativeElement.classList.remove('open');
        this.navLinks.nativeElement.classList.remove('active');
        // Call the scroll function
        this.scrollToTop();
      }
    });

    // Open login modal
    this.renderer.listen(this.loginBtn.nativeElement, 'click', () => {
      this.openLoginModal();
    });

    // Close login modal when close button is clicked
    this.renderer.listen(this.closeModal.nativeElement, 'click', () => {
      this.closeLoginModal();
    });

    // Close modal when any button inside the modal is clicked (Admin/User Login)
    this.renderer.listen(this.loginModal.nativeElement, 'click', (event: Event) => {
      const target = event.target as HTMLElement;
      if (target.tagName === 'BUTTON') {
        this.closeLoginModal();
      }
    });

    // Close modal when clicking outside modal content
    this.renderer.listen('window', 'click', (event: Event) => {
      if (event.target === this.loginModal.nativeElement) {
        this.closeLoginModal();
      }
    });
  }

  openLoginModal(): void {
    this.renderer.setStyle(this.loginModal.nativeElement, 'display', 'block');
  }

  closeLoginModal(): void {
    this.renderer.setStyle(this.loginModal.nativeElement, 'display', 'none');
  }

  // Smooth scroll to the top of the page
  scrollToTop(): void {
    window.scrollTo({
      top: 0,
      behavior: 'smooth' // Smooth scrolling
    });
  }
}
