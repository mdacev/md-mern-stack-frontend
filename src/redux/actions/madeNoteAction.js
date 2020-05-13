import axios from 'axios';
import configfront from '../../helpers/configfront'
export const type = 'MADE_NOTE';

const madeNoteAction = (id) => {

    return async (dispatch) => {
        try{

            const response =  await  axios.put(configfront.EOP_NOTES + '/' + id );
            dispatch( { type, payload: response.data } );
        }
        catch(err){
            return  (dispatch) => {
                dispatch( { type, error: err } ) 
            }
        }
    }
}


export default madeNoteAction;