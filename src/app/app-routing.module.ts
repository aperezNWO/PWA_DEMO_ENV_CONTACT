import { NgModule              } from '@angular/core';
import { Route, RouterModule   } from '@angular/router';
import { ContactFormComponent  } from './_modules/about/contactForm/contact-form..component';

//
export interface _Route extends Route
{
    caption : string;
}

//
export const routes : _Route[] = [ 
  { path: ''                 , component: ContactFormComponent      , caption : 'About - Contact Form'    },                     
  { path: 'ContactForm'      , component: ContactFormComponent      , caption : 'About - Contact Form'    },
  { path: '**'               , component: ContactFormComponent      , caption : 'About - Contact Form'    }                 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
