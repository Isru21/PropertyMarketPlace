import { useState } from "react";
import { toast } from 'react-toastify'
import { useDataContext, useAuthContext } from "../../../hooks/useContexts";
//mui
import Typography from '@mui/material/Typography';
import Grid from "@mui/material/Grid";
import { Paper } from "@mui/material";


export default function RespondRequest({request_id,username,sentmessage}){
    const {dispatch} = useDataContext();
    const {user} = useAuthContext();

    const [formData, setFormData] = useState({
        reply_message: '',
        status: 'accepted',
    });


    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (request_id === ''){
            toast.error('Please select one request to update')
            return;
        }

        const data = JSON.stringify({...formData});

        try {
            const response = await fetch(`/api/requests/realestate_requests/${request_id}`, {
                method: 'PATCH',
                body: data,
                headers: {
                    'Authorization': `Bearer ${user.token}`,
                    'Content-Type': 'application/json'
                }
            });
            const json = await response.json();
    
            if(!response.ok){
                toast.error(json.error);
            }
            if(response.ok){
                toast.success('Responded a request successfully');
                dispatch({type: 'UPDATE_REQUEST', payload: json})
                setFormData({
                    reply_message: '',
                    status: 'accepted',
                    id: ''
                });
            }
        } catch (err) {
            toast.error(err.message);
        }
    }

    const handleReset = (e) => {
        e.preventDefault();
        setFormData({
            reply_message: '',
            status: 'accepted',
            id: ''
        })
    }

    return ( 
        <Grid
          sx={{
            px: 2,
            my: 8,
            // py: 1,
            // mx: 4,
            height: 610,
            position: "sticky",
            top: "10%",
            zIndex: 1,
            borderRadius: "3px",
            backgroundColor: "#E5E6EA",
          }}
          component={Paper}
          elevation={5}
        >
        <form className="other-forms" onSubmit={handleSubmit} onReset={handleReset}>
            <Grid container justifyContent="center" alignItems="center" sx={{py:2 }}>
            <Typography variant='h5' >Respond Request</Typography>
            </Grid>
           
            {/* <label>Request ID(Click the request):</label>
            <input
                type="text"
                name="id"
                disabled
                value={request_id}
            /> */}

             <label>sender's name:</label>
            <input
                type="text"
                name="id"
                disabled
                value={username}
            />

             <label>sent message:</label>
            <textarea
                type="text"
                name="id"
                disabled
                value={sentmessage}
            />

            <label>Reply Message:</label>
            <textarea
                name="reply_message"
                onChange={handleInputChange}
                value={formData.reply_message}
            />

            <label>Status: </label>
            <select
                name="status"
                onChange={handleInputChange}
                value={formData.status}
            >
                <option value="accepted">accepted</option>
                <option value="rejected">rejected</option>
            </select><br /><br />

            <input className="submit" type="submit" value="Submit"/>
        </form>
        </Grid>
     );
}