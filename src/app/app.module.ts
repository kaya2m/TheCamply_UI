import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdminModule } from './admin/admin.module';
import { UIModule } from './ui/ui.module';
import { ToastrModule } from 'ngx-toastr';
import { NgxSpinnerModule } from 'ngx-spinner';
import { HttpClientModule } from '@angular/common/http';
import { JwtModule } from '@auth0/angular-jwt';


@NgModule({
  declarations: [
    AppComponent,
    
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    NgxSpinnerModule,
    HttpClientModule,
    AppRoutingModule,
    AdminModule,
    UIModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: () => {
             return     localStorage.getItem('accessToken');},
        allowedDomains: ['localhost:7108']
      },
    })
    
  ],
  providers: [
    {
      provide: 'BASE_URL',
       useValue: 'https://localhost:7108/api',
       multi: true
      }
    ],
  bootstrap: [AppComponent]
})
export class AppModule { }
