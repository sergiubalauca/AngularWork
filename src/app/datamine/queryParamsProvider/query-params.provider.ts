import { Inject, Injectable, InjectionToken } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class QueryParamsProvider {
  @Inject('URL') public url: string;
  public constructor() {
    // activatedRoute.data.subscribe(data => console.log('data in service: ', data));
    console.log('FAKE: ', this.url);
  }

  public readQueryParams(): void {
    // this.activatedRoute.data.subscribe(data => console.log('data in service: ', data));
    console.log('FAKE2: ', this.url);
  }
}
