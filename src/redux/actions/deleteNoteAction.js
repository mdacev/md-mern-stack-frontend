import axios from 'axios';
import configfront from '../../helpers/configfront'
export const type = 'DELETE_NOTE';

const deleteNoteAction = (id) => {

    return async (dispatch) => {
        try{

            const response =  await  axios.delete(configfront.EOP_NOTES + '/' + id );
            dispatch( { type, payload: response.data } );
        }
        catch(err){
            return  (dispatch) => {
                dispatch( { type, error: err } ) 
            }
        }
    }
}


export default deleteNoteAction;