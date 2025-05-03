import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-produto-form',
  standalone: false,
  templateUrl: './produto-form.component.html',
  styleUrl: './produto-form.component.scss'
})
export class ProdutoFormComponent {
  form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      active: [true]
    });
  }

  onSubmit(): void {
    if (this.form.valid) {
      console.log('Produto cadastrado:', this.form.value);
      // Futuramente: chamar o serviço para enviar ao backend
    }
  }
}

