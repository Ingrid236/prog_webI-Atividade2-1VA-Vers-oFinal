import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import { ProductControllerService } from '../../api/services/product-controller.service';
import { ProductCreateDto } from '../../api/models/product-create-dto';
import { ProductUpdateDto } from '../../api/models/product-update-dto';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-produto-form',
  templateUrl: './produto-form.component.html',
  standalone: false,
  styleUrls: ['./produto-form.component.scss']
})
export class ProdutoFormComponent implements OnInit {
  form: FormGroup;
  isEditMode: boolean = false;
  productId: number | null = null;
  pageTitle: string = 'Cadastro de Produto';

  constructor(
    private fb: FormBuilder,
    private productService: ProductControllerService,
    private route: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      price: [null, [Validators.required, Validators.min(0.01)]],
      active: [true]
    });
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      console.log("Id do produto ", id)
      if (id) {
        this.isEditMode = true;
        this.productId = Number(id);
        this.pageTitle = 'Edição de Produto';
        this.loadProductData(this.productId);
      }
    });
  }

  loadProductData(id: number): void {
    this.productService.getProductById({ id }).subscribe({
      next: (product) => {
        console.log("Produto a ser editado: ", product)
        if(product instanceof Blob) {
          product.text().then(jsonText => {
            let extractedProduct = JSON.parse(jsonText);

            this.form.patchValue({
              name: extractedProduct.name,
              price: extractedProduct.price,
              active: extractedProduct.active
            });
          })
        } else {
          this.form.patchValue({
            name: product.name,
            price: product.price,
            active: product.active
          });
        }
      },
      error: (err) => {
        console.error("Erro ao carregar dados do produto:", err);
        this.showError('Erro ao carregar dados do produto.');
        this.router.navigate(['/produtos']); // Redireciona se não encontrar
      }
    });
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    if (this.isEditMode && this.productId) {
      this.updateProduct();
    } else {
      this.createProduct();
    }
  }

  createProduct(): void {
    const newProduct: ProductCreateDto = this.form.value;
    this.productService.create({ body: newProduct }).subscribe({
      next: () => {
        this.showSuccess("Produto criado com sucesso!");
        this.router.navigate(['/produtos']);
      },
      error: (err) => {
        console.error("Erro ao criar produto:", err);
        this.showError("Erro ao criar o produto.");
      }
    });
  }

  updateProduct(): void {
    const updatedProduct: ProductUpdateDto = this.form.value;
    this.productService.updateProduct({ id: this.productId!, body: updatedProduct }).subscribe({
      next: () => {
        this.showSuccess("Produto atualizado com sucesso!");
        this.router.navigate(['/produtos']);
      },
      error: (err) => {
        console.error("Erro ao atualizar produto:", err);
        this.showError("Erro ao atualizar o produto.");
      }
    });
  }

  private showSuccess(message: string): void {
    this.snackBar.open(message, 'Fechar', {
      duration: 3000,
    });
  }

  private showError(message: string): void {
    this.snackBar.open(message, 'Fechar', {
      duration: 3000,
    });
  }
}
