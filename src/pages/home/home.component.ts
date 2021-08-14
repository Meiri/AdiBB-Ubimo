import {
  ComponentRef,
  ComponentFactoryResolver,
  ViewContainerRef,
  ViewChild,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
  ElementRef,
  AfterViewInit,
  OnDestroy,
  NgZone,
} from '@angular/core';
import { AddsService } from '@services/adds.service';

import { IAdEvent, adDispatcher } from 'ubimo-ad-dispatcher';
import { ExtendIAdEvent } from '@models/adds.models';
import { AdImageComponent } from '@components/ad-image/ad-image.component';
import { AdVideoComponent } from '@components/ad-video/ad-video.component';

import {
  Observable,
  Subject,
  of,
} from 'rxjs';
import {
  expand,
  take,
  delay,
} from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, AfterViewInit, OnDestroy {
  adList: ExtendIAdEvent[] = [];


  filterdadList: ExtendIAdEvent[] = [];
  startTime!: string;
  endTime!: string;
  offSetWidth: number = 0;
  offSetHight: number = 0;
  @ViewChild('main') refMain!: ElementRef;
  @ViewChild('viewContainerRef', { read: ViewContainerRef })
  VCR!: ViewContainerRef;
  child_unique_key: number = 0;
  componentsReferences = Array<
    ComponentRef<AdImageComponent> | ComponentRef<AdVideoComponent>>();

  sub!: { removeListener: () => void; };

  constructor(
    public addService: AddsService,
    public cdr: ChangeDetectorRef,
    private CFR: ComponentFactoryResolver,

    private ngZone: NgZone
  ) {



  }
  ngOnDestroy(): void {
    this.sub.removeListener();
  }

  arr: any[] = [];

  private _test$ = new Subject<number>();
  test$!: Observable<number>;

  ngOnInit(): void {

    this.sub = adDispatcher.registerToAdEvents(ad => {
      this.ngZone.run(() => {
        //this.createComponent(ad);
        let extende: ExtendIAdEvent = ad;

        extende.time = this.addService.convertDateToTimestamp(new Date());



        
        this.adList.push(extende);
        let index = this.adList.length-1;

        // setTimeout(()=>{
        //   this.adList.splice(this.adList.indexOf(extende),1);
        // } ,5000);
      })
    });

    // this.addService.startListeningToEvents(ad=>{
    //   this.arr.push(ad);
    // })
    // this.test$= this._test$.asObservable();



    // of(null)
    //     .pipe(
    //         expand(() => {
    //           return of(i)
    //               .pipe(
    //                   delay(500),
    //               );
    //         }),
    //         take(20),
    //     )
    //     .subscribe((n) => {
    //       this._test$.next(n);

    //       i++;
    //     });


    //     this.test$.subscribe(n=>{
    //       this.arr.push(n);  
    //     });

    // this.test$ = new Observable(obs =>{
    //   let i=1;
    //   setInterval(()=>{
    //     obs.next(i);
    //     i++;
    //   },500);
    // }); 


    // this.test$.subscribe(value=>{
    //   this.arr.push(value);
    //   console.log(value);
    // });

    //console.log(this.arr.length);
    // })

  }

  ngAfterViewInit() {
    this.offSetWidth = this.refMain.nativeElement.offsetWidth;
    this.offSetHight = this.refMain.nativeElement.offsetHeight;
    console.log(this.offSetWidth, this.offSetHight);

    // adDispatcher.adEvents$.subscribe((ad) => {
    //   console.log(ad);
    //   this.createComponent(ad);
    //   //let extende: ExtendIAdEvent = ad;
    //   //extende.time = this.addService.convertDateToTimestamp(new Date());
    //   this.adList.push({} as ExtendIAdEvent);
    //   console.log(this.adList.length);
    //   //this.cdr.detectChanges();
    // });

  }

  // createComponent(add: IAdEvent) {
  //   let componentFactory =
  //     add.type == 'IMAGE'
  //       ? this.CFR.resolveComponentFactory(AdImageComponent)
  //       : this.CFR.resolveComponentFactory(AdVideoComponent);

  //   let childComponentRef = this.VCR.createComponent(componentFactory);

  //   let childComponent = childComponentRef.instance;
  //   childComponent.unique_key = ++this.child_unique_key;
  //   childComponent.adObject = add;
  //   childComponent.parentRef = this;

  //   // add reference for newly created component
  //   this.componentsReferences.push(childComponentRef);
  // }

  // remove(key: number) {
  //   let componentRef = this.componentsReferences.findIndex(
  //     (x) => x.instance.unique_key == key
  //   );

  //   console.log('ref', componentRef);
  //   // let vcrIndex: number = this.VCR.indexOf(componentRef as any);

  //   // removing component from container
  //   this.VCR.remove(componentRef);

  //   // removing component from the list
  //   this.componentsReferences = this.componentsReferences.filter(
  //     (x) => x.instance.unique_key !== key
  //   );
  // }

  filterLog() {
    this.filterdadList = this.adList.filter((ad) => {
      ad.time != null &&
        ad.time >= Number.parseInt(this.startTime) &&
        ad.time >= Number.parseInt(this.endTime);
    });
  }
}
