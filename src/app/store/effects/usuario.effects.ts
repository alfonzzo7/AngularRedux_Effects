import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';

import { UsuarioService } from '../../services/usuario.service';

import { switchMap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

import * as usuarioActions from '../actions';


@Injectable()
export class UsuarioEffects {

    constructor(private actions$: Actions,
                public usuarioService: UsuarioService) {}

    @Effect()
    cargarUsuario$ = this.actions$.ofType(usuarioActions.CARGAR_USUARIO)
        .pipe(
            switchMap(action => {
                return this.usuarioService.getUserById(action['id'])
                    .pipe(
                        map(user => new usuarioActions.CargarUsuarioSuccess(user)),
                        catchError(error => of(new usuarioActions.CargarUsuarioFail(error)))
                    );
            })
        );

}
