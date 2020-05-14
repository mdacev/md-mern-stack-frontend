import axios from 'axios';
import configfront from '../../helpers/configfront'
export const type = 'DELETE_NOTE';

const deleteNoteAction = (id) => {

    return async (dispatch) => {
        try{

            const server_host = process.env.REACT_APP_API+configfront.EOP_NOTES;
            const response =  await  axios.delete(server_host + '/' + id );
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