import axios from 'axios';
import configfront from '../../helpers/configfront'
export const type = 'FIND_NOTE_BY_EDIT';

const findNoteByEditAction = (id) => {

    return async (dispatch) => {
        try{

            const server_host = process.env.REACT_APP_API+configfront.EOP_NOTES;
            console.log(server_host + '/' + id);
            const response =  await  axios.get(server_host + '/' + id);
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