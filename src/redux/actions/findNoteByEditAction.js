import axios from 'axios';
import configfront from '../../helpers/configfront'
export const type = 'FIND_NOTE_BY_EDIT';

const findNoteByEditAction = (id) => {

    return async (dispatch) => {
        try{

            const response =  await  axios.get(configfront.EOP_NOTES + '/' + id);
            dispatch( { type, payload: response.data } );
        }
        catch(err){
            return  (dispatch) => {
                dispatch( { type, error: err } ) 
            }
        }
    }
}


export default findNoteByEditAction;