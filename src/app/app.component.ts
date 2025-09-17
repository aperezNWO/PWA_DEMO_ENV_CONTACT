import { Component, VERSION                     } from '@angular/core';
import { Router                                 } from '@angular/router';
import { Title                                  } from '@angular/platform-browser';
import { ConfigService                          } from './_services/config/config.service';
import { CustomErrorHandler, LoggingInterceptor } from './app.module';
import { ActivatedRoute                         } from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
   //
   _title         : string = '';
   _appName       : string = '';
   _appVersion    : string = '';
   runtimeVersion : string = VERSION.full;
   //
   redirectPage   : string | null = null;
   //
  constructor(    public router             : Router
                , private configService     : ConfigService 
                , private titleService      : Title
                , public customErrorHandler : CustomErrorHandler
                , public loggingInterceptor : LoggingInterceptor
                , public route              : ActivatedRoute) 
  {
    // IMPLEMENT AS MAP AND ITERATE
    let keyName  : string = '';
    let keyValue : string = '';
    //
    keyName  = 'appName';
    keyValue = this.configService.getConfigValue(keyName);
    //
    this._appName = keyValue;
    //
    keyName          = 'appVersion';
    keyValue         = this.configService.getConfigValue(keyName);
    this._appVersion = keyValue;
  }
  //
  ngOnInit() {
      //
      this.titleService.setTitle(`${this._appName} - v[${this._appVersion}]`);
  }
  //
  getValueFromConfig(key: string) {
    return this.configService.getConfigValue(key);
  }
}
