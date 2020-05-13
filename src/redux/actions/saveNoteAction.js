import axios from 'axios';
import configfront from '../../helpers/configfront'
export const type = 'SAVE_NOTE';

const saveNoteAction = (id , note) => {

    let t = localStorage.getItem('token');
    let u = localStorage.getItem('userid');
    let token = t ? JSON.parse(t) : '-1';
    
    const reqHeaders = {
        'headers': {
            'Access-Control-Allow-Headers': 'x-access-token',
            'X-WP-Nonce': 'my-wp-nonce-here',
            'Content-Type': 'application/json',
            'x-access-token': token,
            'user': u
        }
    };

    return async (dispatch) => {
        try{

            let response;
            if(id && id !== '')
                response =  await axios.put(configfront.EOP_NOTES + '/' + id, note , Object.assign({}, reqHeaders));
            else
                response = await axios.post(configfront.EOP_NOTES, note , Object.assign({}, reqHeaders));

            dispatch( { type, payload: response.data } );
        }
        catch(err){
            return  (dispatch) => {
                dispatch( { type, error: err } ) 
            }
        }
    }
}


export default saveNoteAction;