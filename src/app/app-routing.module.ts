import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './admin/layout/layout.component';
import { DashboardComponent } from './admin/components/dashboard/dashboard.component';
import { HomeComponent } from './ui/components/home/home.component';
import { AuthGuard } from './guards/common/auth.guard';

const routes: Routes = [
  {
    path: 'admin',
    component: LayoutComponent,
    children: [
      { path: 'dashboard', component: DashboardComponent ,canActivate:[AuthGuard]},
      {
        path: 'customer',
        loadChildren: () =>
          import('./admin/components/customer/customer.module').then((m) => m.CustomerModule),canActivate:[AuthGuard]
      },
      {
        path: 'order',
        loadChildren: () =>
          import('./admin/components/order/order.module').then((m) => m.OrderModule),canActivate:[AuthGuard]
      },
      {
        path: 'product',
        loadChildren: () =>
          import('./admin/components/product/product.module').then((m) => m.ProductModule),canActivate:[AuthGuard]
      },
    ], canActivate:[AuthGuard],
  },
  { path: 'home', component: HomeComponent },
  {
    path: 'basket',
    loadChildren: () =>
      import('./ui/components/baskets/baskets.module').then((m) => m.BasketsModule),
  },
  {
    path: 'product',
    loadChildren: () =>
      import('./ui/components/products/products.module').then((m) => m.ProductsModule),
  },
  {
    path: 'register',
    loadChildren: () =>
      import('./ui/components/register/register.module').then((m) => m.RegisterModule),
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./ui/components/login/login.module').then((m) => m.LoginModule),
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
