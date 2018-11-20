import { Usuario } from '../../models/usuario.model';
import * as fromUsuarios from '../actions';

export interface UsuariosState {
    usuarios: Usuario[];
    loaded: boolean;
    loading: boolean;
    error: any;
}

const initState: UsuariosState = {
    usuarios: [],
    loaded: false,
    loading: false,
    error: null
};

export function usuariosReducer(state = initState, action: fromUsuarios.usuariosActions): UsuariosState {
    switch (action.type) {
        case fromUsuarios.CARGAR_USUARIOS:
            return {
                ...state,
                loading: true,
                error: null
            };

        case fromUsuarios.CARGAR_USUARIOS_SUCCESS:
            return {
                ...state,
                loading: false,
                loaded: true,
                usuarios: [...action.usuarios]
            };

        case fromUsuarios.CARGAR_USUARIOS_FAIL:
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
