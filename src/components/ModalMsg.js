import React, { Component } from 'react';
import { Modal,ModalManager,Effect} from 'react-dynamic-modal';

export default class ModalMsg extends Component {

    render(){
        const { text,onRequestClose, cn } = this.props;
        
        const myStyle = {
         overlay: {
           position        : 'fixed',
           top             : 0,
           left            : 0,
           right           : 0,
           bottom          : 0,
           zIndex          : 99999999,
           overflow        : 'hidden',
           perspective     :  1300,
           backgroundColor : 'rgba(0, 0, 0, 0.3)'
         },
       
         content: {
           position                : 'relative',
           margin                  : '15% auto',
           padding                 : '1% auto',
           width                   : '30%',
           heigth                  : '150px',
           alignItems              : 'center',
           border                  : '1px solid rgba(0, 0, 0, .2)',
           background              : '#fff',
           overflow                : 'auto',
           borderRadius            : '4px',
           outline                 : 'solid',
           boxShadow               : '0 5px 10px rgba(0, 0, 0, .3)',
         }
       }


        return (
           <Modal style={myStyle}
              onRequestClose={onRequestClose}
              effect={Effect.Newspaper}>
                <div className={cn} >
                    <p>{text}</p>
                    <button className="btn btn-primary" onClick={ModalManager.close}>Ok</button>
              </div>
           </Modal>
        );
     }
    
  }