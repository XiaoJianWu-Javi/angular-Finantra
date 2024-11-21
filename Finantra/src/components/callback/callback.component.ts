import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BankService } from '@services/bankService/bank.service';
import { BankAccountDTO } from '@models/bank-account-dto';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-callback',
  standalone: true,
  imports:[CommonModule, FormsModule],
  templateUrl: './callback.component.html',
  styleUrl: './callback.component.css'
})
export class CallbackComponent implements OnInit{
  code: string | null = null;
  bankAccounts: BankAccountDTO[] = []; 
  selectedAccounts: boolean[] = []; 

  constructor(private route: ActivatedRoute, private bankService: BankService) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.code = params['code'] || null;
      if (this.code) {
        this.bankService.showSelectionAccount(this.code).subscribe(
          (response) => {
            this.bankAccounts = response;
            this.selectedAccounts = new Array(this.bankAccounts.length).fill(false);
          },
          (error) => {
            console.error('Error al obtener las cuentas:', error);
          }
        );
      } else {
        console.log('No se recibió código');
      }
    });
  }

  addSelectedAccounts(): void {
    const selectedAccounts = this.bankAccounts.filter((account, index) => this.selectedAccounts[index]);

    if (selectedAccounts.length > 0) {
      console.log('Cuentas seleccionadas:', selectedAccounts);
    } else {
      console.log('No se han seleccionado cuentas.');
    }
  }
}