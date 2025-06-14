import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ProductCreateDto} from '../../api/models/product-create-dto';
import {ProductControllerService} from '../../api/services/product-controller.service';
import {Observable} from 'rxjs';
import {Product} from '../../api/models/product';

@Component({
  selector: 'app-produto-form',
  standalone: false,
  templateUrl: './produto-form.component.html',
  styleUrl: './produto-form.component.scss'
})
export class ProdutoFormComponent {
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private productService: ProductControllerService
  ) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      price: [null, [Validators.required, Validators.min(0.01)]], // Adicionado!
      active: [true]
    });
  }

  createProduct(productData: ProductCreateDto): Observable<Product> {
    return this.productService.create({ body: productData });
  }

  onSubmit(): void {
    if (this.form.valid) {
      const newProduct: ProductCreateDto = this.form.value
      this.createProduct(newProduct).subscribe({
        next: () => {
          console.log("Produto criado: " + newProduct.name)
          this.form.reset({ active: true }); // Reseta o formulário mantendo o toggle ativo
        },
        error: (err) => {
          // É uma boa prática logar o objeto de erro para mais detalhes
          console.error("Erro ao criar produto:", err);
        }
      })
    } else {
      // Força a exibição das mensagens de erro se o formulário for enviado inválido
      this.form.markAllAsTouched();
    }
  }
}
