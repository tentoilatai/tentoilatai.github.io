import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Bank } from '../../models/bank.model';

@Component({
  selector: 'app-bank-card',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './bank-card.component.html',
  styleUrls: ['./bank-card.component.css']
})
export class BankCardComponent implements OnInit {
  @Input() bank!: Bank;
  amount: number = 0;
  qrCodeUrl: string = '';

  ngOnInit() {
    this.generateQRCode();
  }

  async generateQRCode() {
    const amount = this.amount || 0;
    
    if (this.bank.name === 'HSBC Viet Nam Bank') {
      await this.generateHSBCQR(amount);
    } else if (this.bank.name === 'Standard Chartered Bank') {
      await this.generateSCQR(amount);
    }
  }

  private async generateHSBCQR(amount: number) {
    try {
      const apiUrl = `https://api.vietqr.io/image/458761-204340533001-U0BRVZi.jpg?accountName=TRAN%20VIET%20TAI&amount=${amount}&addInfo=Transfer%20to%20TRAN%20VIET%20TAI`;
      this.qrCodeUrl = apiUrl;
    } catch (err) {
      console.error('Error generating HSBC QR:', err);
    }
  }

  private async generateSCQR(amount: number) {
    try {
      const apiUrl = `https://api.vietqr.io/image/970410-88447347488-O6dovov.jpg?accountName=TRAN%20VIET%20TAI&amount=${amount}&addInfo=Transfer%20to%20TRAN%20VIET%20TAI`;
      this.qrCodeUrl = apiUrl;
    } catch (err) {
      console.error('Error generating SC QR:', err);
    }
  }
}