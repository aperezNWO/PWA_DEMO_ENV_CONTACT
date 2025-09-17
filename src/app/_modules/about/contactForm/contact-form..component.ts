import { Component, OnInit                  } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient                         } from '@angular/common/http';
import { ConfigService                      } from 'src/app/_services/config/config.service';

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrl: './contact-form.component.css'
})
export class ContactFormComponent implements OnInit  {
  //
  isLoggedIn: boolean = true;
  contactForm!: FormGroup;
  //
  constructor(public configService: ConfigService, private fb: FormBuilder, private http: HttpClient) {
    //
    this.contactForm = this.fb.group({
      name    : ['', [Validators.required, Validators.minLength(3)]],
      email   : ['', [Validators.required, Validators.email]],
      message : ['', [Validators.required, Validators.minLength(10)]],
    });

  }

  ngOnInit() {
    //
  }

  onSubmit() {
    //
    if (this.contactForm.valid) {
      console.log('Form Submitted!', this.contactForm.value);

      // Here you can handle form submission, e.g., send data to a server

      if (this.contactForm.valid) {
        //
        const formData = this.contactForm.value;
  
        // Send the form data to the backend
        //this.http.post('https://fxh4m2-4000.csb.app/contact', formData).subscribe(
        this.http.post(`${this.getValueFromConfig('baseUrlNodeJs')}/contact`, formData).subscribe(
          (response) => {
            //
            console.log('Form submitted successfully!', response);
            alert('Gracias! Se le enviará pronto un email con más información.');
            this.contactForm.reset(); // Reset the form after successful submission
          },
          (error) => {
            console.error('Error submitting form:', error);
            alert('There was an error submitting the form. Please try again.');
          }
        );
      } else {
        console.log('Form is invalid');
      }

    } else {
      console.log('Form is invalid');
    }
  }
  //
  getValueFromConfig(key: string) {
    return this.configService.getConfigValue(key);
  }
}
