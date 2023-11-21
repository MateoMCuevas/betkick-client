import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { FormGroup, FormBuilder } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class BetService {
  private listBets = new BehaviorSubject<FormGroup[]>([]);
  listBets$ = this.listBets.asObservable();

  constructor(private fb: FormBuilder) {}

  addData(datos: any) {
    const nuevoFormGroup = this.fb.group({
      homeTeam: [datos.homeTeam],
      awayTeam: [datos.awayTeam],
      placedAt:[datos.placedAt],
      betOdds: [datos.betOdds],
      betAmount: [datos.betAmount],
      winner: [datos.winner],
    });

    const nuevaLista = [...this.listBets.value, nuevoFormGroup];
    this.listBets.next(nuevaLista);
  }

  setBetAmount(form: FormGroup, nuevoMonto: number) {
    form.get('betAmount')?.setValue(nuevoMonto)
  }
  deleteForm(form: FormGroup){
    const listaActualizada = this.listBets.value.slice();
    const index = listaActualizada.findIndex((formulario) => formulario === form);

    if (index !== -1) {
      listaActualizada.splice(index, 1);
      this.listBets.next(listaActualizada);
    }
  }
  deleteList()
  {
    this.listBets.next([])
  }
}

