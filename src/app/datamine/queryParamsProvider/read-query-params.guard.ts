import { ActivatedRouteSnapshot, RouterStateSnapshot, Resolve } from '@angular/router';
import { Injectable } from '@angular/core';
import { AppRoutingKeys } from '@shared';
import { firstValueFrom, Observable, of } from 'rxjs';
import { QueryParamsProvider } from '../services/query-params.provider';

@Injectable()
export class ReadQueryParamsGuard implements Resolve<string> {
	public constructor(private queryParamsService: QueryParamsProvider) { }

	public async resolve(_route: ActivatedRouteSnapshot, _state: RouterStateSnapshot): Promise<string> {
		const workfileId = _route.paramMap.get(AppRoutingKeys.queryParamWorkfileId);
		console.log('state url: ', _state.url);
		this.queryParamsService.url = _state.url;
		return firstValueFrom(of(_state.url));
	}
}
