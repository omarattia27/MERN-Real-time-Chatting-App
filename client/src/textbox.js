import Message from './message';

function Textbox(props) { 

  return <div>
    {props.msgs.map(message =>(
          <div>
            <Message input={message.input} user={message.user} currentUser={props.currentUser}/>
            <p></p>
            </div>         
          ))}           
          <p></p>
          <p></p>
          </div>
    }
   
    
export default Textbox;