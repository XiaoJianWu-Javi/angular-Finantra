import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  typeInformation:string = 'cuentas bancarias';
  infoName:string='';

  setTypeInformation(type:string):void {
    this.typeInformation = type;
  }

  search(infoName:string):void {
    //Aquí irá la lógica para buscar una cuenta solo con el nombre de la cuenta
    
  }
}