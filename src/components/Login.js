import React, { Component } from 'react'
import hjson from '../helpers/headers.json'
import {connect} from 'react-redux'
import { ModalManager} from 'react-dynamic-modal';
import ModalMsg from './ModalMsg'
import GoogleLogin from 'react-google-login';

import signinAction from '../redux/actions/signinAction' 
import signupAction from '../redux/actions/signupAction'


 class Login extends Component {

    constructor(props){
        super(props);

        this.state = {
            username: '',
            password: '',
            email: '',
            image: null,
            usernameError: '',
            passwordError: '',
            emailError: '',
            imageError: '',
            inputClass: 'form-control',
            divClass: 'form-group',
            h_button: true,
            title: 'Sing In',
            msg_login: '',
            show_msg_login: false,
            show_ok_login: false
        }
    }
    

    async componentDidMount() {
        this.setSingin();
        localStorage.clear();
        console.log(localStorage);
        
    }

    setUsernameFocus = () => {
        document.getElementById("username").focus();
    }

    setSingin = () => {

        this.setState({ username: this.state.username , 
            password: this.state.password , 
            email: this.state.email,
            h_button:true, 
            title: 'Sign In',
            show_msg_login: false,
            msg_login: '',
            usernameError: '',
            passwordError: '',
            emailError: '',
            inputClass: 'form-control',
            divClass: 'form-group'
        });
        this.setUsernameFocus();
    }

    setSingup = () => {

        this.setState({ username: '' , 
            password: '' , 
            email: '',
            h_button:false, 
            title: 'Sign Up',
            show_msg_login: false,
            msg_login: ''
        });
    }

    validate = () => {
        let hasError = false;

        this.setState({ usernameError: ''});
        if(this.state.username.trim() === ''){
            this.setState({ usernameError: 'The username is required.'});
            hasError = true;   
        }

        this.setState({ passwordError: ''});
        if(this.state.password.trim() === ''){
            this.setState({ passwordError: 'The password is required.'});
            hasError = true;
        }

        this.setState({ emailError: ''});
        if(this.state.email.trim() === ''){
            this.setState({ emailError: 'The email is required.'});
            hasError = true;
        }
        else{
            
            if(!this.validateEmail(this.state.email)){
                this.setState({ emailError: 'You have entered an invalid email address.'});
                hasError = true;
            }
        }
        
            
        if(hasError){
            this.setState({ 
                inputClass: 'form-control is-invalid',
                divClass: 'form-group has-danger'});
                hasError = true;
        }
        else{
            this.setState({
                inputClass: 'form-control',
                divClass: 'form-group'});
                hasError = false;
        }
        return hasError;
    }

    validateEmail = (mail) => {
        // eslint-disable-next-line
        const r_e = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
        if (r_e.test(mail))
            return (true)
        
        return (false)
    }

    onInputChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    onImageChange = (e) => {
        this.setState({
            image:e.target.files[0],
            imageError: ''
        })
    }

    onSubmit = async (e) => {

        try{
                e.preventDefault();
                //=====  signin
                if(e.target.id === 'signin'){   

                    const user = {
                        username: this.state.username,
                        password: this.state.password
                    }
                    
                   

                    await this.props.signinAction(user);
                    const {loginReducer} = this.props;
                    const res = loginReducer.response;
                    
                    console.log('Token: ' , res.token);
                    if(res.auth){
                        hjson['x-access-token'] = res.token;
                        localStorage.setItem('token', JSON.stringify(hjson['x-access-token']));
                        localStorage.setItem('username', '('+res.username+')');
                        localStorage.setItem('userid', res.userId);
                        localStorage.setItem('avatar', res.avatar);
                        this.props.history.push('/notes');
                    

                    }
                    else{

                        if(res.status === 201){
                            this.setState({
                                show_msg_login : true,
                                msg_login : 'El usuario no existe.',
                                show_ok_login: false
                            });
                        }
                        else{
                            this.setState({
                                show_msg_login : true,
                                msg_login : 'La password es incorrecta.',
                                show_ok_login: false
                            });
                        }

                    }
                    
                    
                }
                //=====  signup
                else{
                    
                    if(!this.validate()){

                        
                        let formData = new FormData();

                        formData.append('username', this.state.username);
                        formData.append('password', this.state.password);
                        formData.append('email', this.state.email);
                        formData.append('image', this.state.image);
                        formData.append('google', false);

                        for (var pair of formData.entries()) {
                            console.log(pair[0]+ ' - ' + pair[1]); 
                        }
                       
                        const user = {
                            username: this.state.username,
                            password: this.state.password,
                            email: this.state.email,
                            image: this.state.image
                        }
                        
                        await this.props.signupAction(formData);
                        const {loginReducer} = this.props;
                        const res = loginReducer.response;

                        if(res.auth){
                            //window.location.href = '/';
                            this.props.history.push('/');
                            this.setSingin();
                            this.setState({
                                show_msg_login : true,
                                msg_login : 'Se creo el usuario exitosamente.',
                                show_ok_login: true
                            });
                        }
                        else{
                            
                            if(res.code === 11000){
                                this.setState({
                                    show_msg_login : true,
                                    msg_login : res.msg,
                                    show_ok_login: false,
                                    username: user.username,
                                    password: user.password,
                                    email: user.email
                                });
                                this.setUsernameFocus();
                            }
                            if(res.code === 11001 || res.code === 11002){
                                this.setState({
                                    imageError : res.msg,
                                    inputClass: 'form-control is-invalid',
                                    divClass: 'form-group has-danger',
                                    show_ok_login: false,
                                    username: user.username,
                                    password: user.password,
                                    email: user.email
                                });
                                this.setUsernameFocus();
                            }
                        }
                    }
                        
                }
            }   
            catch (err) {
                console.log(err);
            }
       
    }

    onclickLink = async (e) =>{
        e.preventDefault();
        if(e.target.id === 'up_li')
            this.setSingup();
        else
            this.setSingin();

        document.getElementById("username").focus();
    }

    signupGoogle = async (_gObj) => {

        let formData = new FormData();
        let _user = _gObj.profileObj;

        formData.append('username', _user.name);
        formData.append('password', _user.email);
        formData.append('email',  _user.email);
        formData.append('image', _user.imageUrl);
        formData.append('google', true);

        await this.props.signupAction(formData);
        const {loginReducer} = this.props;
        const res = loginReducer.response;
        if(res.auth){
            
            if(res.exist === undefined){
                hjson['x-access-token'] = res.token;
                localStorage.setItem('token', JSON.stringify(hjson['x-access-token']));
                localStorage.setItem('username', '('+res.username+')');
                localStorage.setItem('userid', res.userId);
                localStorage.setItem('avatar', res.avatar);
                this.props.history.push('/notes');
            }
            else{

                this.setState({ username:  _user.name , 
                    password:  _user.email , 
                    email:  _user.email
                });

                this.setSingin();
                this.setMessage(res.msg, res.path);
            }
        }
    }

    setMessage = (message, path) => {
        ModalManager.open(<ModalMsg text={message} onRequestClose={() => true} cn="modal-msg modal-msg-ok"/>);
        this.props.history.push(path);
    }

    render() {

        const responseGoogle = (response) => {
            console.log(response);
            let gObj = response;
            this.signupGoogle(gObj);
        }

        return (
            <div className="row">
                <div className="col-md-4 offset-md-2 mx-auto form-modal">
                    <div className="card card-body bg-light ">
                        <h4>
                            <i className="material-icons mb-1 mr-2">no_encryption</i>
                            {this.state.title}
                        </h4>
                        <form ref={el => (this.form = el)}>
                            <div className={this.state.divClass}>
                                <input
                                    className={this.state.usernameError !== '' ? this.state.inputClass : 'form-control'}
                                    placeholder="User"
                                    value={this.state.username}
                                    type="text"
                                    name="username"
                                    id="username"
                                    onChange={this.onInputChange}
                                />
                                {this.state.usernameError !== '' ? <div className="invalid-feedback">{this.state.usernameError}</div> : null}
                                </div>
                                <div className={this.state.divClass}>
                                    <input
                                        className={this.state.passwordError !== '' ? this.state.inputClass : 'form-control'}
                                        placeholder="Password"
                                        value={this.state.password}
                                        type="password"
                                        name="password"
                                        onChange={this.onInputChange}
                                    />
                                    {this.state.passwordError !== '' ? <div className="invalid-feedback">{this.state.passwordError}</div> : null}
                                </div>
                                {!this.state.h_button ?
                                <div className={this.state.divClass}>
                                    <input
                                        className={this.state.emailError !== '' ? this.state.inputClass : 'form-control'}
                                        placeholder="Email"
                                        value={this.state.email}
                                        type="email"
                                        name="email"
                                        onChange={this.onInputChange}
                                        hidden={this.state.h_button}
                                    />
                                    {this.state.emailError !== '' ? <div className="invalid-feedback">{this.state.emailError}</div> : null}
                                </div>
                                :null}

                                {!this.state.h_button ?
                                <div className={this.state.divClass}>
                                    <input
                                        className={this.state.imageError !== '' ? this.state.inputClass : 'form-control-file btn btn-outline-primary'}
                                        placeholder="Image..."
                                        type="file"
                                        name="image"
                                        onChange={this.onImageChange}
                                        hidden={this.state.h_button}
                                    />
                                    {this.state.imageError !== '' ? <div className="invalid-feedback">{this.state.imageError}</div> : null}
                                    
                                </div>
                                :null}
                                
                                {this.state.show_msg_login ?
                                <div className="row col-md-12">
                                    <p className={this.state.show_ok_login ? 'login-text-success' : 'login-text-error'}>{this.state.msg_login}</p>
                                </div>
                                :null}

                                <div className="row col-md-12" style={{justifyContent: 'flex-end'}}>

                                    {this.state.h_button ?
                                    <div className="row col-md-6">
                                        <button id="signin" type="submit" onClick={this.onSubmit} value="in"className="btn btn-primary">
                                            <i className="material-icons mr-2">vpn_key</i>Sign In 
                                        </button>
                                    </div>
                                    : null}
                                

                                    {this.state.h_button ?
                                    <div className="row col-md-6">
                                        <button id="up_li" type="button" value="up_li" onClick={this.onclickLink} className="btn btn-secondary">
                                            <i className="material-icons mr-2">fingerprint</i>Sign Up 
                                        </button>
                                    </div>
                                    : null}

                                    {!this.state.h_button ?
                                    <button  id="reg" type="button" value="reg" onClick={this.onSubmit} className="btn btn-success">
                                        <i className="material-icons mr-2">fingerprint</i>Register
                                    </button>
                                    :null}

                                    {!this.state.h_button ?
                                    <span className="col-md-4"/>
                                    :null}

                                    {!this.state.h_button ?
                                    <button id="si_li" type="button" value="si_li" onClick={this.onclickLink} className="btn btn-sm btn-link ml-4">
                                        <i className="material-icons mr-2">vpn_key</i>Sign In 
                                    </button>
                                    :null}
                                </div>
                                
                                {this.state.h_button ?
                                <div className="col-md-12 mt-3 pt-2" style={{textAlign: 'center', borderTop: '1px solid darkgrey'}}>
                                    <GoogleLogin id="google"
                                        clientId="400541357062-mktdshn8cijvodmsdebummjrfro2a723.apps.googleusercontent.com"
                                        buttonText="Sign In with Google"
                                        onSuccess={responseGoogle}
                                        onFailure={responseGoogle}
                                    >
                                    </GoogleLogin>
                                </div>
                                :null}
                                
                        </form>
                    </div>
                </div>
            </div>

        )


        
        
    }
}

const mapStateToProps = (state) => {

    return {
        loginReducer: state.loginReducer
    }
}



const mapDispatchToProps = (dispatch) => {

    return {
        signinAction : (user) => dispatch(signinAction(user)),
        signupAction : (user) => dispatch(signupAction(user))
    }
}

export default connect(mapStateToProps , mapDispatchToProps) (Login)
