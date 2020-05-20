import axios from 'axios';
import configfront from '../../helpers/configfront';


export const type = 'SIGNIN';

const signinAction = (user) => {

        return async (dispatch) => {
            try{
                
                console.log(process.env);
                const server_host = process.env.REACT_APP_API+configfront.EOP_SIGNIN;
                const response =  await  axios.post( server_host , user);
                dispatch( { type, payload: response.data } );
            }
            catch(err){
                return  (dispatch) => {
                    dispatch( { type, error: err } ) 
                }
            }
        }
        
}


export default signinAction;