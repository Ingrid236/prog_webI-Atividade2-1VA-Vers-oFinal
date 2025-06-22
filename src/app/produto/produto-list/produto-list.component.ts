import {Component, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {Router} from '@angular/router';
import {Product} from '../../api/models/product';
import {ProductControllerService} from '../../api/services/product-controller.service';
import {ConfirmationDialogComponent} from '../../confirmation-dialog/confirmation-dialog.component';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-produto-list',
  templateUrl: './produto-list.component.html',
  standalone: false,
  styleUrls: ['./produto-list.component.scss']
})
export class ProdutoListComponent implements OnInit {

  products: Product[] = [];
  displayedColumns: string[] = ['id', 'name', 'price', 'active', 'actions'];

  constructor(
    private productService: ProductControllerService,
    private dialog: MatDialog,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
  }

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.productService.listAllProducts().subscribe(
      (data) => {
        console.log('Dados recebidos da API:', data);
        if (data instanceof Blob) {
          data.text().then(jsonText => {
            this.products = JSON.parse(jsonText);

            console.log('Produtos convertidos para JSON:', this.products);
          });
        } else {
          this.products = data;
        }
      },
      (error) => {
        console.error('Erro ao carregar produtos:', error);
        this.showError('Erro ao carregar a lista de produtos.');
      }
    );
  }

  openDeleteConfirmationDialog(productId: number): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '350px',
      data: {message: 'Você tem certeza que deseja excluir este produto?'}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deleteProduct(productId);
      }
    });
  }

  deleteProduct(id: number): void {
    this.productService.deleteProduct({id}).subscribe({
      next: () => {
        this.showSuccess('Produto excluído com sucesso!');
        this.loadProducts(); // Atualiza a lista
      },
      error: (err) => {
        console.error("Erro ao excluir produto:", err);
        this.showError('Erro ao excluir o produto.');
      }
    });
  }

  editProduct(id: number): void {
    this.router.navigate(['/produtos/editar', id]); // Navega para a rota de edição
  }

  toggleActiveStatus(product: Product): void {
    const updatedProduct = {...product, active: !product.active};

    this.productService.updateProduct({
      id: product.id!,
      body: {
        name: updatedProduct.name,
        price: updatedProduct.price,
        active: updatedProduct.active
      }
    }).subscribe({
      next: () => {
        this.showSuccess(`Produto ${updatedProduct.active ? 'ativado' : 'desativado'} com sucesso!`);
        this.loadProducts();
      },
      error: (err) => {
        console.error('Erro ao atualizar status do produto:', err);
        this.showError('Erro ao alterar o status do produto.');
      }
    });
  }

  private showSuccess(message: string): void {
    this.snackBar.open(message, 'Fechar', {
      duration: 3000,
      panelClass: ['success-snackbar']
    });
  }

  private showError(message: string): void {
    this.snackBar.open(message, 'Fechar', {
      duration: 3000,
      panelClass: ['error-snackbar']
    });
  }
}
