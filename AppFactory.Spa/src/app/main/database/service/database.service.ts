import { ComponentFactoryResolver, Injectable, ViewContainerRef } from '@angular/core';
import { ReplaySubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  private instantiationQueuedSource = new ReplaySubject<any>();
  instantiationQueued$ = this.instantiationQueuedSource.asObservable();

  constructor(private resolver: ComponentFactoryResolver) { }

  createDatabase(viewContainerRef: ViewContainerRef) {
    
  }

}
