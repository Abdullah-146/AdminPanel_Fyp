import React from 'react'
import { sendNotificationToAll } from '../api/services/notification.service'
import { toast } from 'react-toastify';

function Notifications() {

    const [message, setMessage] = React.useState("");

    const handlSend = async() => {
        try{

            const response = await sendNotificationToAll(message);
            console.log(response);
            toast.success("Notification Sent")
        }catch(err){
            console.log(err);
        }
    }

  return (
    <div style={{display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center"}}>
        <h1>Send Notification</h1>
        <textarea 
        value={message}
        onChange={(e)=>setMessage(e.target.value)}
        style={{width:600,height:300,background:"#222"}}
        type="text" placeholder="Notification" />
        <button onClick={handlSend}>Send</button>
    </div>
  )
}

export default Notifications