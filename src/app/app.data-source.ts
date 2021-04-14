/**
 * App datasource
 *
 * @copyright (c) 2018-2019 Versátil Tecnologia da Informação LTDA
 */

import { BehaviorSubject, Observable, Subject } from 'rxjs';

export class AppDataSource<T> {
  protected dataSubject = new Subject<T>();
  protected loadingSubject = new BehaviorSubject<boolean>(false);
  protected filterSubject = new BehaviorSubject<any>(null);

  public getDataObservable(): Observable<T> {
    return this.dataSubject.asObservable();
  }

  public getLoadingObservable(): Observable<boolean> {
    return this.loadingSubject.asObservable();
  }

  public getFilterObservable(): Observable<any> {
    return this.filterSubject.asObservable();
  }

  protected setDataSubject(value: T) {
    this.dataSubject.next(value);
  }

  protected setLoadingSubject(value: boolean) {
    this.loadingSubject.next(value);
  }

  protected setFilterSubject(value: any) {
    this.filterSubject.next(value);
  }
}
