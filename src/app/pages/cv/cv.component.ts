import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

interface Skill {
  name: string;
  level: number;
}

interface Language {
  name: string;
  level: string;
}

interface Experience {
  title: string;
  company: string;
  period: string;
  description: string;
}

interface Education {
  degree: string;
  school: string;
  year: string;
}

interface Project {
  name: string;
  description: string;
  technologies: string[];
}

@Component({
  selector: 'app-cv',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cv.component.html',
  styleUrls: ['./cv.component.css']
})
export class CvComponent implements OnInit {
  isGeneratingPDF = false;

  skills: Skill[] = [
    { name: 'JavaScript/TypeScript', level: 95 },
    { name: 'Angular', level: 90 },
    { name: 'React', level: 85 },
    { name: 'Node.js', level: 88 },
    { name: 'Python', level: 80 },
    { name: 'HTML/CSS', level: 95 },
    { name: 'SQL/NoSQL', level: 85 },
    { name: 'Docker', level: 75 }
  ];

  languages: Language[] = [
    { name: 'Vietnamese', level: 'Native' },
    { name: 'English', level: 'Fluent' },
    { name: 'Japanese', level: 'Intermediate' }
  ];

  experience: Experience[] = [
    {
      title: 'Senior Full Stack Developer',
      company: 'Tech Solutions Inc.',
      period: '2022 - Present',
      description: 'Lead development of enterprise web applications using Angular, Node.js, and cloud technologies. Mentor junior developers and architect scalable solutions.'
    },
    {
      title: 'Full Stack Developer',
      company: 'Digital Agency Co.',
      period: '2020 - 2022',
      description: 'Developed responsive web applications and RESTful APIs. Collaborated with design teams to implement pixel-perfect user interfaces.'
    },
    {
      title: 'Frontend Developer',
      company: 'Startup Ventures',
      period: '2019 - 2020',
      description: 'Built modern, interactive user interfaces using React and Vue.js. Optimized application performance and implemented responsive designs.'
    }
  ];

  education: Education[] = [
    {
      degree: 'Bachelor of Computer Science',
      school: 'University of Technology',
      year: '2015 - 2019'
    },
    {
      degree: 'Full Stack Web Development Certification',
      school: 'Online Tech Academy',
      year: '2019'
    }
  ];

  projects: Project[] = [
    {
      name: 'E-Commerce Platform',
      description: 'Full-featured online shopping platform with payment integration',
      technologies: ['Angular', 'Node.js', 'MongoDB', 'Stripe']
    },
    {
      name: 'Task Management App',
      description: 'Collaborative project management tool with real-time updates',
      technologies: ['React', 'Express', 'Socket.io', 'PostgreSQL']
    },
    {
      name: 'Banking QR Generator',
      description: 'Secure QR code generation system for banking transactions',
      technologies: ['Angular', 'TypeScript', 'QR.js', 'Tailwind CSS']
    },
    {
      name: 'Portfolio Website',
      description: 'Modern, responsive portfolio with liquid glass design',
      technologies: ['Angular', 'CSS3', 'TypeScript', 'Animations']
    }
  ];

  ngOnInit() {
    // Animate skill bars on load
    setTimeout(() => {
      this.animateSkillBars();
    }, 500);
  }

  private animateSkillBars() {
    const skillBars = document.querySelectorAll('.skill-bar');
    skillBars.forEach((bar, index) => {
      setTimeout(() => {
        bar.classList.add('animate');
      }, index * 100);
    });
  }

  async downloadCV() {
    this.isGeneratingPDF = true;
    
    try {
      const element = document.getElementById('cv-content');
      if (!element) {
        throw new Error('CV content not found');
      }

      this.showMessage('Generating PDF...', 'info');

      // Create canvas from HTML element
      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        backgroundColor: '#f5f7fa',
        scrollX: 0,
        scrollY: 0,
        width: element.scrollWidth,
        height: element.scrollHeight,
        logging: false
      });

      // Calculate PDF dimensions
      const imgWidth = 210; // A4 width in mm
      const pageHeight = 295; // A4 height in mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;

      // Create PDF
      const pdf = new jsPDF('p', 'mm', 'a4');
      let position = 0;

      // Add first page
      pdf.addImage(canvas.toDataURL('image/png'), 'PNG', 0, position, imgWidth, imgHeight, '', 'FAST');
      heightLeft -= pageHeight;

      // Add additional pages if needed
      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(canvas.toDataURL('image/png'), 'PNG', 0, position, imgWidth, imgHeight, '', 'FAST');
        heightLeft -= pageHeight;
      }

      // Save PDF
      pdf.save('Tai_Tran_Viet_CV.pdf');
      
      this.showMessage('CV downloaded successfully!', 'success');
      
    } catch (error) {
      console.error('Error generating PDF:', error);
      this.showMessage('Error generating PDF. Please try again.', 'error');
    } finally {
      this.isGeneratingPDF = false;
    }
  }

  private showMessage(message: string, type: 'success' | 'error' | 'info') {
    const notification = document.createElement('div');
    const bgColor = type === 'success' ? 'bg-green-500' : 
                   type === 'error' ? 'bg-red-500' : 'bg-blue-500';
    
    notification.className = `fixed top-24 right-4 ${bgColor} text-white px-6 py-3 rounded-lg shadow-lg z-50 transform translate-x-full transition-transform duration-300`;
    
    const icon = type === 'success' ? 
      '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>' :
      type === 'error' ?
      '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>' :
      '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>';
    
    notification.innerHTML = `
      <div class="flex items-center space-x-2">
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          ${icon}
        </svg>
        <span>${message}</span>
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