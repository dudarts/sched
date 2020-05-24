import { UserEvent } from './../userEvent.model';
import { EventsService } from './../event.service';
import { Events } from './../event.model';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-event-create',
  templateUrl: './event-create.component.html',
  styleUrls: ['./event-create.component.css']
})

export class EventCreateComponent implements OnInit {

  events: Events = {
    name: "",
    description: "",
    local: "",
    date: null,
    eventTypeId: null
  }

  userEvent: UserEvent = {
    userId: null,
    eventId: null
  }

  floatLabelControl = new FormControl('auto');
  hide = true;
  formEvent: FormGroup
  dateMin = new Date()

  constructor(private eventService: EventsService,
    private router: Router,
    private auth: AuthService
  ) {

  }

  ngOnInit(): void {
    this.formEvent = new FormGroup({
      name: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
      local: new FormControl('', [Validators.required]),
      eventTypeId: new FormControl('', [Validators.required]),
      //passwordConfirm: new FormControl('', [Validators.required]),
      date: new FormControl('', { updateOn: 'blur', validators: [Validators.required] }),
      //gender: new FormControl('', [Validators.required])
    })
  }



  submit() {
    if (this.formEvent.valid) {
      //this.userService.showMessage("Chegou aqui")
      this.createEvent();
    } else {
      console.log('invalid')
    }
  }

  createEvent(): void {
    console.log(this.events)
    this.eventService.create(this.events).subscribe(
      (ue) => {
        let userId = this.auth.getId()
        let eventId = ue.id;

        this.userEvent.userId = +userId;
        this.userEvent.eventId = eventId;
        
        this.eventService.saveUserInEvent(this.userEvent)
          .toPromise().then()
          .catch((e: HttpErrorResponse) => {
            console.log(this.userEvent)
            this.eventService.showMessage(e.message)
          });

        this.eventService.showMessage("Evento cadastrado com sucesso")
        this.router.navigate(['/home/event'])
      },
      (error: any) => {
        this.eventService.showMessage("Deu zica");
        console.error('Observer got an error: ' + error);
      }
    )
  }

  cancel(): void {
    this.router.navigate(['/home/user']);
  }

  @ViewChild('date') dateField: ElementRef;

  checkDate() {
    let dateForm = this.events.date.toString();
    let dateParts = dateForm.split('-');
    let typeId = this.events.eventTypeId;
    const dateYear = dateParts[0];
    const dateMonth = dateParts[1];
    const dateDay = dateParts[2];

    //this.eventService.showMessage(`Data: ${dateParts[0]}/${dateParts[1]}/${dateParts[2]}`);
    this.eventService.getByDateAndType(dateYear, dateMonth, dateDay, typeId.toString()).subscribe(
      (e) => {
        if (e.id != null) {
          this.events.date = null;
          this.dateField.nativeElement.focus();
          this.eventService.showMessage(`O Evento: ${e.name} já está exclusivo para esta data.`);
          console.log(e)
        }
        //this.router.navigate(['/home/event'])
      },
      (error: any) => {
        this.formEvent.valid
        this.eventService.showMessage("Deu zica");
        console.error('Observer got an error: ' + error);
      }
    )
  }


}
