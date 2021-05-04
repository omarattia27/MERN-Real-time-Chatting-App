import React from 'react'
import { Card, CardContent, Typography } from '@material-ui/core';
import './message.css';

function Message(props) {
    const isUser = props.user === props.currentUser;
    console.log(props.user,' message user vs current user  ',props.currentUser);
    if (isUser === true){
        return (
          <div className='M'>
            <Card className='M2'>
                <CardContent >
                    <Typography
                    varient="h5"
                    component="h2">
            
                    {props.input}
            
                    </Typography>
                </CardContent>
            </Card>
            {props.user} 
          </div>)
    } else{
        return (
          <div className='M_another'>
            <Card  className='M1'>
              <CardContent >
                <Typography
                varient="h5"
                color="white"
                component="h2">
        
                {props.input}
        
                </Typography>
              </CardContent>
            </Card>
            {props.user}
          </div>
    )}
    
}

export default Message;