import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';

import { UsuarioService } from '../../services/usuario.service';

import { switchMap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

import * as usuariosActions from '../actions';


@Injectable()
export class UsuariosEffects {

    constructor(private actions$: Actions,
                public usuarioService: UsuarioService) {}

    @Effect()
    cargarUsuarios$ = this.actions$.ofType(usuariosActions.CARGAR_USUARIOS)
        .pipe(
            switchMap(() => {
                return this.usuarioService.getUsers()
                    .pipe(
                        map(users => new usuariosActions.CargarUsuariosSuccess(users)),
                        catchError(error => of(new usuariosActions.CargarUsuariosFail(error)))
                    );
            })
        );

}
