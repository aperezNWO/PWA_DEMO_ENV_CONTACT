import { APP_INITIALIZER, ErrorHandler                  } from '@angular/core';
import { Injectable, NgModule                           } from '@angular/core';
import { AsyncPipe, CommonModule, DatePipe, DecimalPipe } from '@angular/common';
import { FormsModule                                    } from '@angular/forms';
import { ReactiveFormsModule                            } from '@angular/forms';
import { BrowserModule                                  } from '@angular/platform-browser';
import { provideClientHydration                         } from '@angular/platform-browser';
import { BrowserAnimationsModule                        } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS, HttpClient                  } from '@angular/common/http';
import { HttpHandler, HttpInterceptor                   } from '@angular/common/http';
import { HttpRequest, HttpResponse                      } from '@angular/common/http';
import { HttpClientModule                               } from '@angular/common/http';
import { AppComponent                                   } from './app.component';
import { AppRoutingModule                               } from './app-routing.module';
import { ConfigService                       } from './_services/config/config.service';
import { BackendService                      } from './_services/backend/backend.service';
import { NavComponent                        } from './_modules/_home/nav/nav.component';
import { HomeComponent                       } from './_modules/_home/home/home.component';
import { NotFoundPageComponent               } from './_modules/_home/not-found-page/not-found-page.component';
import { finalize, tap                       } from 'rxjs';
import { NgbHighlight, NgbModule             } from '@ng-bootstrap/ng-bootstrap';
import { NgbPaginationModule, NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxSignaturePadModule               } from '@eve-sama/ngx-signature-pad';
import { ButtonModule                        } from 'primeng/button';
import { ContactFormComponent                } from './_modules/about/contactForm/contact-form..component';
import { FacebookLoginProvider, SocialAuthServiceConfig, SocialLoginModule } from '@abacritt/angularx-social-login';
//  
@Injectable({
  providedIn: 'root'
})
//
export class CustomErrorHandler implements ErrorHandler {
  //
  constructor(public mcsdService: BackendService) { }
  //
  handleError(_error: Error): void {
    // 
    console.warn("[CUSTOM ERROR HANDLING]:\n" + _error.name + "\n" + _error.message);
    //
    this.mcsdService.SetLog("[CUSTOM ERROR HANDLING]", _error.message);
    //
  }
}
//
@Injectable({
  providedIn: 'root'
})
export class LoggingInterceptor implements HttpInterceptor {
  constructor() { }

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const started = Date.now();
    let ok: string;

    // extend server response observable with logging
    return next.handle(req)
      .pipe(
        tap({
          // Succeeds when there is a response; ignore other events
          next: (event) => (ok = event instanceof HttpResponse ? 'succeeded' : ''),
          // Operation failed; error is an HttpErrorResponse
          error: (error) => (ok = 'failed')
        }),
        // Log when response observable either completes or errors
        finalize(() => {
          const elapsed = Date.now() - started;
          const msg = `${req.method} "${req.urlWithParams}" ${ok} in ${elapsed} ms.`;
          console.warn(' [REQUEST URL (INTERCEPT)] : ' + msg);
        })
      );
  }
}
//
export function loadConfig(configService: ConfigService) {
  //
  return () => configService.loadConfig();
}

//
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavComponent,
    NotFoundPageComponent,
    ContactFormComponent
  ],
  providers: [DatePipe, DecimalPipe, HttpClient, provideClientHydration(),
    [
      { provide: HTTP_INTERCEPTORS, useClass: LoggingInterceptor, multi: true },
      { provide: ErrorHandler, useClass: CustomErrorHandler },
      ConfigService,
      {
        provide: APP_INITIALIZER,
        useFactory: loadConfig,
        deps: [ConfigService],
        multi: true
      },
      {
        provide: 'SocialAuthServiceConfig',
        useValue: {
          autoLogin: false, // Set to true if you want auto login
          providers: [
            {
              id: FacebookLoginProvider.PROVIDER_ID,
              provider: new FacebookLoginProvider(
                '1763416537924183' // Replace with your Facebook App ID
              )
            }
          ]
        } as SocialAuthServiceConfig,
      }
    ],
  ],
  bootstrap: [AppComponent],
  imports: [
    AppRoutingModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserModule,
    BrowserAnimationsModule,
    NgxSignaturePadModule,
    NgbModule,
    NgbModule,
    NgbPaginationModule,
    NgbAlertModule,
    NgbHighlight,
    NgbPaginationModule,
    DecimalPipe,
    FormsModule,
    AsyncPipe,
    ButtonModule,
    SocialLoginModule // Add SocialLoginModule
  ]
})
export class AppModule {
  constructor() {
      //
  }
}
