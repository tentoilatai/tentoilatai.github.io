import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Bank {
  name: string;
  accountNumber: string;
  accountName: string;
  amount: number;
  qrCodeUrl: string;
  loading: boolean;
}

@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {
  banks: Bank[] = [
    {
      name: 'HSBC Viet Nam Bank',
      accountNumber: '2043 4053 3001',
      accountName: 'TRAN VIET TAI',
      amount: 0,
      qrCodeUrl: '',
      loading: false
    },
    {
      name: 'Standard Chartered Bank',
      accountNumber: '8844 7347 488',
      accountName: 'TRAN VIET TAI',
      amount: 0,
      qrCodeUrl: '',
      loading: false
    }
  ];

  ngOnInit() {
    // Generate initial QR codes
    this.banks.forEach(bank => this.generateQRCode(bank));
  }

  async generateQRCode(bank: Bank) {
    bank.loading = true;
    
    try {
      const amount = bank.amount || 0;
      
      if (bank.name === 'HSBC Viet Nam Bank') {
        await this.generateHSBCQR(bank, amount);
      } else if (bank.name === 'Standard Chartered Bank') {
        await this.generateSCQR(bank, amount);
      }
    } catch (error) {
      console.error('Error generating QR code:', error);
    } finally {
      bank.loading = false;
    }
  }

  private async generateHSBCQR(bank: Bank, amount: number) {
    try {
      const apiUrl = `https://api.vietqr.io/image/458761-204340533001-U0BRVZi.jpg?accountName=TRAN%20VIET%20TAI&amount=${amount}&addInfo=Transfer%20to%20TRAN%20VIET%20TAI`;
      bank.qrCodeUrl = apiUrl;
    } catch (err) {
      console.error('Error generating HSBC QR:', err);
    }
  }

  private async generateSCQR(bank: Bank, amount: number) {
    try {
      const apiUrl = `https://api.vietqr.io/image/970410-88447347488-O6dovov.jpg?accountName=TRAN%20VIET%20TAI&amount=${amount}&addInfo=Transfer%20to%20TRAN%20VIET%20TAI`;
      bank.qrCodeUrl = apiUrl;
    } catch (err) {
      console.error('Error generating SC QR:', err);
    }
  }

  downloadQR(bank: Bank) {
    if (!bank.qrCodeUrl) return;
    
    const link = document.createElement('a');
    link.href = bank.qrCodeUrl;
    link.download = `${bank.name}-QR-${bank.amount}VND.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  async shareQR(bank: Bank) {
    if (!bank.qrCodeUrl) return;
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: `Payment QR - ${bank.name}`,
          text: `Payment QR code for ${bank.accountName} - ${bank.amount} VND`,
          url: bank.qrCodeUrl
        });
      } catch (error) {
        console.log('Error sharing:', error);
        this.fallbackShare(bank);
      }
    } else {
      this.fallbackShare(bank);
    }
  }

  private fallbackShare(bank: Bank) {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(bank.qrCodeUrl).then(() => {
        alert('QR code URL copied to clipboard!');
      });
    }
  }
}