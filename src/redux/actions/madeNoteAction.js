import axios from 'axios';
import configfront from '../../helpers/configfront'
export const type = 'MADE_NOTE';

const madeNoteAction = (id) => {

    return async (dispatch) => {
        try{

            const server_host = process.env.REACT_APP_API+configfront.EOP_NOTES;
            const response =  await  axios.put(server_host + '/' + id );
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