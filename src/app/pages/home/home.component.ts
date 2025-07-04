import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  greeting = '';
  currentTime = '';
  private timeInterval?: number;

  ngOnInit() {
    this.updateGreeting();
    this.updateTime();
    this.timeInterval = window.setInterval(() => {
      this.updateTime();
      this.updateGreeting();
    }, 1000);
  }

  ngOnDestroy() {
    if (this.timeInterval) {
      clearInterval(this.timeInterval);
    }
  }

  private updateGreeting() {
    const now = new Date();
    const gmt7Time = new Date(now.getTime() + (7 * 60 * 60 * 1000) + (now.getTimezoneOffset() * 60 * 1000));
    const hour = gmt7Time.getHours();
    
    if (hour >= 5 && hour < 12) {
      this.greeting = 'おはようございます (Good Morning)';
    } else if (hour >= 12 && hour < 18) {
      this.greeting = 'こんにちは (Good Afternoon)';
    } else {
      this.greeting = 'こんばんは (Good Evening)';
    }
  }

  private updateTime() {
    const now = new Date();
    const gmt7Time = new Date(now.getTime() + (7 * 60 * 60 * 1000) + (now.getTimezoneOffset() * 60 * 1000));
    
    const hours = gmt7Time.getHours().toString().padStart(2, '0');
    const minutes = gmt7Time.getMinutes().toString().padStart(2, '0');
    const seconds = gmt7Time.getSeconds().toString().padStart(2, '0');
    
    const options: Intl.DateTimeFormatOptions = {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    };
    const dateString = gmt7Time.toLocaleDateString('en-US', options);
    
    this.currentTime = `${hours}:${minutes}:${seconds} GMT+7 • ${dateString}`;
  }

  addToContacts() {
    // Create vCard data
    const vCardData = `BEGIN:VCARD
VERSION:3.0
FN:Tai Tran Viet
N:Tran;Tai;Viet;;
ORG:Full Stack Developer
TITLE:Software Engineer
EMAIL:iam@kaiz.vn
TEL;TYPE=CELL:+84362946262
URL:https://kaiz.vn
ADR;TYPE=HOME:;;Vietnam;;;;Vietnam
NOTE:Full Stack Developer specializing in modern web technologies
PHOTO;ENCODING=b;TYPE=JPEG:data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTI4IiBoZWlnaHQ9IjEyOCIgdmlld0JveD0iMCAwIDEyOCAxMjgiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxjaXJjbGUgY3g9IjY0IiBjeT0iNjQiIHI9IjY0IiBmaWxsPSJ1cmwoI2dyYWRpZW50KSIvPgo8dGV4dCB4PSI2NCIgeT0iNzgiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSI0OCIgZm9udC13ZWlnaHQ9ImJvbGQiIGZpbGw9IndoaXRlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIj5UPC90ZXh0Pgo8ZGVmcz4KPGxpbmVhckdyYWRpZW50IGlkPSJncmFkaWVudCIgeDE9IjAiIHkxPSIwIiB4Mj0iMTI4IiB5Mj0iMTI4IiBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+CjxzdG9wIG9mZnNldD0iMCUiIHN0b3AtY29sb3I9IiMzQjgyRjYiLz4KPHN0b3Agb2Zmc2V0PSIxMDAlIiBzdG9wLWNvbG9yPSIjOEI1Q0Y2Ii8+CjwvbGluZWFyR3JhZGllbnQ+CjwvZGVmcz4KPC9zdmc+
END:VCARD`;

    // Create blob and download link
    const blob = new Blob([vCardData], { type: 'text/vcard' });
    const url = window.URL.createObjectURL(blob);
    
    // Create temporary download link
    const link = document.createElement('a');
    link.href = url;
    link.download = 'Tai_Tran_Viet.vcf';
    
    // Trigger download
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    // Clean up
    window.URL.revokeObjectURL(url);
    
    // Show success message
    this.showSuccessMessage();
  }

  private showSuccessMessage() {
    // Create success notification
    const notification = document.createElement('div');
    notification.className = 'fixed top-24 right-4 bg-red-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 transform translate-x-full transition-transform duration-300';
    notification.innerHTML = `
      <div class="flex items-center space-x-2">
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
        </svg>
        <span>Contact added successfully!</span>
      </div>
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
      notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Animate out and remove
    setTimeout(() => {
      notification.style.transform = 'translateX(100%)';
      setTimeout(() => {
        if (notification.parentNode) {
          notification.parentNode.removeChild(notification);
        }
      }, 300);
    }, 3000);
  }
}