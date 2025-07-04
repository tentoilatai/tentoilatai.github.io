import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  currentYear = new Date().getFullYear();
  mobileMenuOpen = false;
  currentPage = 0;
  isTransitioning = false;
  isMobile = false;
  private particleInterval?: number;
  private loadingTimeout?: number;

  ngOnInit() {
    this.checkMobile();
    this.showLoadingScreen();
    this.initParticles();
    
    // Listen for window resize
    window.addEventListener('resize', () => this.checkMobile());
  }

  ngOnDestroy() {
    if (this.particleInterval) {
      clearInterval(this.particleInterval);
    }
    if (this.loadingTimeout) {
      clearTimeout(this.loadingTimeout);
    }
    window.removeEventListener('resize', () => this.checkMobile());
  }

  private checkMobile() {
    this.isMobile = window.innerWidth <= 768;
  }

  private showLoadingScreen() {
    // Show loading screen for 2.5 seconds
    this.loadingTimeout = window.setTimeout(() => {
      const loadingScreen = document.getElementById('loadingScreen');
      if (loadingScreen) {
        loadingScreen.classList.add('hidden');
      }
    }, 2500);
  }

  @HostListener('window:wheel', ['$event'])
  onWheel(event: WheelEvent) {
    // Only handle wheel events on desktop
    if (this.isMobile || this.isTransitioning) return;
    
    event.preventDefault();
    
    if (event.deltaY > 0) {
      // Scroll down
      this.goToPage(1);
    } else {
      // Scroll up
      this.goToPage(0);
    }
  }

  @HostListener('window:keydown', ['$event'])
  onKeyDown(event: KeyboardEvent) {
    // Only handle keyboard events on desktop
    if (this.isMobile || this.isTransitioning) return;

    switch (event.key) {
      case 'ArrowDown':
      case 'PageDown':
      case ' ': // Space
        event.preventDefault();
        this.goToPage(1);
        break;
      case 'ArrowUp':
      case 'PageUp':
        event.preventDefault();
        this.goToPage(0);
        break;
      case 'Home':
        event.preventDefault();
        this.goToPage(0);
        break;
      case 'End':
        event.preventDefault();
        this.goToPage(1);
        break;
    }
  }

  // Touch events for mobile
  private touchStartY = 0;
  private touchEndY = 0;

  @HostListener('window:touchstart', ['$event'])
  onTouchStart(event: TouchEvent) {
    if (!this.isMobile) return;
    this.touchStartY = event.changedTouches[0].screenY;
  }

  @HostListener('window:touchend', ['$event'])
  onTouchEnd(event: TouchEvent) {
    if (!this.isMobile || this.isTransitioning) return;
    
    this.touchEndY = event.changedTouches[0].screenY;
    this.handleSwipe();
  }

  private handleSwipe() {
    const swipeThreshold = 50;
    const swipeDistance = this.touchStartY - this.touchEndY;

    if (Math.abs(swipeDistance) > swipeThreshold) {
      if (swipeDistance > 0) {
        // Swipe up - go to next page
        this.goToPage(1);
      } else {
        // Swipe down - go to previous page
        this.goToPage(0);
      }
    }
  }

  goToPage(pageIndex: number) {
    if (pageIndex === this.currentPage || this.isTransitioning) return;
    
    this.isTransitioning = true;
    
    // Add transition effect
    const currentPageElement = document.getElementById(`page${this.currentPage + 1}`);
    const targetPageElement = document.getElementById(`page${pageIndex + 1}`);
    
    if (currentPageElement && targetPageElement) {
      // Remove active class from current page
      currentPageElement.classList.remove('active');
      
      // Add transition classes
      if (pageIndex > this.currentPage) {
        currentPageElement.classList.add('prev');
      }
      
      // Set new current page
      this.currentPage = pageIndex;
      
      // Activate new page after a short delay
      setTimeout(() => {
        targetPageElement.classList.add('active');
        
        // Clean up classes
        setTimeout(() => {
          currentPageElement.classList.remove('prev');
          this.isTransitioning = false;
        }, 800);
      }, 50);
    } else {
      this.currentPage = pageIndex;
      this.isTransitioning = false;
    }
    
    // Add page change effect (only on desktop)
    if (!this.isMobile) {
      this.addPageChangeEffect();
    }
  }

  private addPageChangeEffect() {
    // Create ripple effect
    const ripple = document.createElement('div');
    ripple.style.cssText = `
      position: fixed;
      top: 50%;
      left: 50%;
      width: 0;
      height: 0;
      background: radial-gradient(circle, rgba(234, 67, 53, 0.3) 0%, transparent 70%);
      border-radius: 50%;
      transform: translate(-50%, -50%);
      pointer-events: none;
      z-index: 9998;
      transition: all 0.6s ease-out;
    `;
    
    document.body.appendChild(ripple);
    
    // Animate ripple
    setTimeout(() => {
      ripple.style.width = '200vw';
      ripple.style.height = '200vw';
      ripple.style.opacity = '0';
    }, 10);
    
    // Remove ripple
    setTimeout(() => {
      if (ripple.parentNode) {
        ripple.parentNode.removeChild(ripple);
      }
    }, 600);
  }

  toggleMobileMenu() {
    this.mobileMenuOpen = !this.mobileMenuOpen;
  }

  closeMobileMenu() {
    this.mobileMenuOpen = false;
  }

  private initParticles() {
    const particlesContainer = document.getElementById('particles');
    if (!particlesContainer) return;

    const createParticle = () => {
      const particle = document.createElement('div');
      particle.className = 'particle';
      
      // Random properties
      const size = Math.random() * 4 + 2;
      const opacity = Math.random() * 0.5 + 0.1;
      const duration = Math.random() * 4 + 6;
      
      particle.style.cssText = `
        left: ${Math.random() * 100}%;
        width: ${size}px;
        height: ${size}px;
        opacity: ${opacity};
        animation-delay: ${Math.random() * 8}s;
        animation-duration: ${duration}s;
      `;
      
      particlesContainer.appendChild(particle);
      
      setTimeout(() => {
        if (particle.parentNode) {
          particle.parentNode.removeChild(particle);
        }
      }, duration * 1000);
    };

    // Create initial particles
    for (let i = 0; i < 30; i++) {
      setTimeout(() => createParticle(), i * 100);
    }

    // Continue creating particles
    this.particleInterval = window.setInterval(() => {
      createParticle();
    }, 1500);
  }
}