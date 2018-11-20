import { Usuario } from '../../models/usuario.model';
import * as fromUsuarios from '../actions';

export interface UsuarioState {
    usuario: Usuario;
    loaded: boolean;
    loading: boolean;
    error: any;
}

const initState: UsuarioState = {
    usuario: null,
    loaded: false,
    loading: false,
    error: null
};

export function usuarioReducer(state = initState, action: fromUsuarios.usuarioActions): UsuarioState {
    switch (action.type) {
        case fromUsuarios.CARGAR_USUARIO:
            return {
                ...state,
                loading: true,
                error: null
            };

        case fromUsuarios.CARGAR_USUARIO_SUCCESS:
            return {
                ...state,
                loading: false,
                loaded: true,
                usuario: {...action.usuario}
            };

        case fromUsuarios.CARGAR_USUARIO_FAIL:
            return {
                ...state,
                loading: false,
                loaded: false,
                error: {
                    status: action.payload.status,
                    message: action.payload.message,
                    url: action.payload.url
                }
            };

        default:
            return state;
    }
}
