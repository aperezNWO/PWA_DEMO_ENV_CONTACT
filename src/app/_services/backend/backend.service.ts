import { Injectable, OnInit                                      } from '@angular/core';
import { HttpClient, HttpEvent, HttpHandler, HttpHeaders         } from '@angular/common/http';
import { HttpRequest, HttpResponse  , HttpInterceptor            } from '@angular/common/http';
import { ConfigService                                           } from '../config/config.service';
import { Observable                                              } from 'rxjs';
import { LogEntry, LogType                                       } from 'src/app/_models/common/common';
//
@Injectable({
  providedIn: 'root'
})
//
export class BackendService implements OnInit {
    ////////////////////////////////////////////////////////////////  
    // CAMPOS
    ////////////////////////////////////////////////////////////////  
    public HTTPOptions_Text = {
      headers: new HttpHeaders({
        'Accept':'application/text'
      }),
      'responseType'  : 'text' as 'json'
    };
    //    
    public HTTPOptions_JSON = {
      headers: new HttpHeaders({
       'Content-Type' : 'application/json'
      })
      ,'responseType' : 'text' as 'json'
    }; 
    //
    public get _baseUrlNetCore(): string {
      //
      return this.__baseUrlNetCore;
    }
    //
    public set _baseUrlNetCore(value: string) {
      //
      this.__baseUrlNetCore = value;
    }
    //
    public get _baseUrlNodeJs(): string {
      //
      return this.__baseUrlNodeJs;
    }
    //
    public set _baseUrlNodeJs(value: string) {
      //
      this.__baseUrlNodeJs = value;
    }
    //
    protected __baseUrlNetCore        : string = '';
    protected __baseUrlNodeJs         : string = '';
    //
    ////////////////////////////////////////////////////////////////  
    // METODOS - [EVENT HANDLERS]
    ////////////////////////////////////////////////////////////////  
    //
    ngOnInit(): void {
      //
      this._baseUrlNetCore     = this._configService.getConfigValue('baseUrlNetCore');
      this._baseUrlNodeJs      = this._configService.getConfigValue('baseUrlNodeJs');
    }
    constructor(public http: HttpClient, public _configService : ConfigService) {
      //
      console.log("Calling MCSDService constructor...");
      //
      this._baseUrlNetCore     = this._configService.getConfigValue('baseUrlNetCore');
      this._baseUrlNodeJs      = this._configService.getConfigValue('baseUrlNodeJs');
    }
    ////////////////////////////////////////////////////////////////  
    // METODOS - [COMUNES]
    ////////////////////////////////////////////////////////////////  
    //
    _GetWebApiAppVersion(): Observable<string>
    {
      //
      let p_url         : string  = `${this._baseUrlNetCore}demos/_GetAppVersion`;
      //
      let appVersion    : Observable<string> =  this.http.get<string>(p_url,this.HTTPOptions_Text);
      //
      return appVersion;
    }
    ////////////////////////////////////////////////////////////////  
    // METODOS - [LOG]
    ////////////////////////////////////////////////////////////////  
    //
    public SetLog(p_PageTitle : string ,p_logMsg : string, logType : LogType = LogType.Info):void
    {
      //
      let logInfo!  : Observable<string>;
      //
      let p_url     = `${this._baseUrlNetCore}demos/_SetLog?p_logMsg=${p_logMsg}&logType=${logType.toString()}`;
      //
      logInfo       = this.http.get<string>(p_url, this.HTTPOptions_Text);
      //
      const logInfoObserver   = {
            //
            next: (logResult: string)     => { 
                  //
                  console.warn(p_PageTitle +  ' - [LOG] - [RESULT] : ' + logResult);
            },
            error: (err: Error) => {
                  //
                  console.error(p_PageTitle + ' - [LOG] - [ERROR]  : ' + err);
            },       
            complete: ()        => {
                  //
                  console.info(p_PageTitle  + ' - [LOG] - [COMPLETE]');
            },
        };
        //
        logInfo.subscribe(logInfoObserver);
    };
   
}
  