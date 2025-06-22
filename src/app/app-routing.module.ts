import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponentComponent} from './produto/home-component/home-component.component';
import {ProdutoFormComponent} from './produto/produto-form/produto-form.component';

const routes: Routes = [
  {path: '', component: HomeComponentComponent},
  {path: 'produtos', component: HomeComponentComponent},
  {path: 'produtos/novo', component: ProdutoFormComponent},
  {path: 'produtos/editar/:id', component: ProdutoFormComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
