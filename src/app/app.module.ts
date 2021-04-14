import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FontAwesomeModule,
    RouterModule.forRoot(
      [
        {
          path: '',
          loadChildren: () =>
            import('./page/page.module').then(m => m.PageModule),
        },
      ],
      {
        useHash: true,
      },
    ),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
