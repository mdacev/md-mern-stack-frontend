import axios from 'axios';
import configfront from '../../helpers/configfront'

export const type = 'SIGNUP';

const signupAction = (formData) => {

        

        return async (dispatch) => {
            try{

                const reqHeaders = {
                    'headers': {
                        'X-WP-Nonce': 'my-wp-nonce-here',
                        'Content-Type': 'application/json',
                    }
                };

                const server_host = process.env.REACT_APP_API+configfront.EOP_SIGNUP;
                const response =  await  axios.post(server_host, formData, Object.assign({}, reqHeaders));
                dispatch( { type, payload: response.data } );
            }
            catch(err){
                return  (dispatch) => {
                    dispatch( { type, error: err } ) 
                }
            }
        }
        
}


export default signupAction;