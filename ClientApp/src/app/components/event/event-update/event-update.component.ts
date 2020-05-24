import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { EventsService } from '../event.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Events } from '../event.model';

@Component({
  selector: 'app-event-update',
  templateUrl: './event-update.component.html',
  styleUrls: ['./event-update.component.css']
})
export class EventUpdateComponent implements OnInit {


  formEvent: FormGroup
  floatLabelControl = new FormControl('auto');
  hide = true;
  events: Events = {
    name: "",
    description: "",
    local: "",
    date: new Date(),
    eventTypeId: null
  }
  min = Date.now();

  constructor(private eventService: EventsService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id')
    this.eventService.getById(id).subscribe(
      events => {
        this.events = events
      });

    console.log(this.events)
    this.formEvent = new FormGroup({
      id: new FormControl({ value: this.events.id, disabled: true }, [Validators.required]),
      name: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
      local: new FormControl('', [Validators.required]),
      eventTypeId: new FormControl('', [Validators.required]),
      date: new FormControl('', [Validators.required])
    })
  }

  submit() {
    if (this.formEvent.valid) {
      //this.userService.showMessage("Chegou aqui")
      this.updateUser();
    } else {
      console.log('invalid')
    }
  }

  updateUser(): void {
    this.eventService.update(this.events).subscribe(
      () => {
        this.eventService.showMessage("Evento atualizado com sucesso")
        this.router.navigate(['/home/event'])
      },
      (error: any) => {
        this.eventService.showMessage("Deu zica");
        console.error('Erro: ' + error);
      }
    )
  }

  cancel(): void {
    this.router.navigate(['/home/event']);
  }
}
