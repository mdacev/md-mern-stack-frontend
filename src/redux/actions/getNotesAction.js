import axios from 'axios';
import configfront from '../../helpers/configfront'

export const type = 'GET_NOTES';

const getNotesAction = (text) => {

        let t = localStorage.getItem('token');
        let u = localStorage.getItem('userid');
        let token = t ? JSON.parse(t) : '-1';
        let title = text;
        
        const reqHeaders = {
            'headers': {
                'Access-Control-Allow-Headers': 'x-access-token',
                'X-WP-Nonce': 'my-wp-nonce-here',
                'Content-Type': 'application/json',
                'x-access-token': token,
                'user': u,
                'title': title
            }
        };
        

        return async (dispatch) => {
            try{
                const server_host = process.env.REACT_APP_API+configfront.EOP_NOTES;
                const response =  await  axios.get(server_host, Object.assign({}, reqHeaders))
                dispatch( { type, payload: response.data } ) 
            }
            catch(err){
                return  (dispatch) => {
                    dispatch( { type, error: err } ) 
                }
            }
        }
        
}


export default getNotesAction;