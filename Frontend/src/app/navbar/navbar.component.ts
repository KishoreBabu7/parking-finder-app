import { Component, OnInit, Renderer2, ElementRef, ViewChild } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  @ViewChild('menuToggle', { static: true }) menuToggle!: ElementRef;
  @ViewChild('navLinks', { static: true }) navLinks!: ElementRef;
  @ViewChild('loginModal', { static: true }) loginModal!: ElementRef;
  @ViewChild('closeModal', { static: true }) closeModal!: ElementRef;

  isLoggedIn: boolean = false;
  user: any = null;

  constructor(private renderer: Renderer2, private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.authService.user$.subscribe((user: any) => {
      this.user = user;
      this.isLoggedIn = !!user; // Navbar updates when user logs in/out
    });

    this.initEventListeners();
  }

  logout(): void {
    this.authService.logout();
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
        this.scrollToTop();
      }
    });

    this.renderer.listen(this.closeModal.nativeElement, 'click', () => {
      this.closeLoginModal();
    });

    this.renderer.listen(this.loginModal.nativeElement, 'click', (event: Event) => {
      const target = event.target as HTMLElement;
      if (target.tagName === 'BUTTON') {
        this.closeLoginModal();
      }
    });

    this.renderer.listen('window', 'click', (event: Event) => {
      if (event.target === this.loginModal.nativeElement) {
        this.closeLoginModal();
      }
    });
  }

  closeLoginModal(): void {
    this.renderer.setStyle(this.loginModal.nativeElement, 'display', 'none');
  }

  scrollToTop(): void {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }
}
