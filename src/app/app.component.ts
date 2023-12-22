import { Component, ViewChild } from '@angular/core';
import { EventSettingsModel, ScheduleComponent, EJ2Instance } from '@syncfusion/ej2-angular-schedule';
import { TextBoxComponent } from '@syncfusion/ej2-angular-inputs';
import { closest, isNullOrUndefined } from '@syncfusion/ej2-base';
import { hospitalData } from './data';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'myangularproject';
  @ViewChild('schedule') scheduleObj !: ScheduleComponent;
  public eventSettings: EventSettingsModel = {
    dataSource: hospitalData
  };

  public onCloseClick(){
    this.scheduleObj.closeQuickInfoPopup();
  }

  public onBtnClk(e:Event, option:string){
    let quickPopup: HTMLElement = closest(e.target as HTMLElement, '.e-quick-popup-wrapper') as HTMLElement;
    if(option === 'Add'){
      let subject = ((quickPopup.querySelector('#subject') as EJ2Instance).ej2_instances[0] as TextBoxComponent).value;
      let addObj: Record<string, any> = {
        Id: this.scheduleObj.getEventMaxID(),
        Subject: isNullOrUndefined(subject) ? 'Add title' : subject,
        StartTime: new Date(this.scheduleObj.activeCellsData.startTime),
        EndTime: new Date(this.scheduleObj.activeCellsData.endTime),
        IsAllDay: this.scheduleObj.activeCellsData.isAllDay
      };
      this.scheduleObj.addEvent(addObj);
    } else{
      let eventDetails: Record<string, any> = this.scheduleObj.activeEventData.event as Record<string, any>;
      if(option === 'Edit'){
        eventDetails['Subject'] = ((quickPopup.querySelector('#subject') as EJ2Instance).ej2_instances[0] as TextBoxComponent).value;
        this.scheduleObj.saveEvent(eventDetails);
      } else {
        this.scheduleObj.deleteEvent(eventDetails['Id']);
      }
    }
    this.onCloseClick();
  }
}
