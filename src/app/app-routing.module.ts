import { NgModule                      } from '@angular/core';
import { Route, RouterModule, Routes   } from '@angular/router';
import { HomeComponent                 } from './_modules/_home/home/home.component';import { NotFoundPageComponent } from './_modules/_home/not-found-page/not-found-page.component';
import { ContactFormComponent          } from './_modules/about/contactForm/contact-form..component';

//
export interface _Route extends Route
{
    caption : string;
}

//
export const routes : _Route[] = [ 
  { path: 'Home'             , component: HomeComponent              , caption : 'Home'                  },
  { path: ''                 , component: HomeComponent              , caption : ''                      },
  { path: 'ContactForm'      , component: ContactFormComponent       , caption : 'About - Contact Form'  },
  { path: '**'               , component: NotFoundPageComponent      , caption : ''                      },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
