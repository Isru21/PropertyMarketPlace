import { useState } from "react";
import { toast } from "react-toastify";
import { useDataContext, useAuthContext } from "../../../hooks/useContexts";

//mui
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import { Paper } from "@mui/material";

export default function UpdateRequest({
  request_id,
  chosenAppartment,
  sentmessage,
}) {
  const {dispatch} = useDataContext();
  const {user} = useAuthContext();

  const [formData, setFormData] = useState({
      message: '',
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
      const data = JSON.stringify(formData);

      try {
          const response = await fetch(`/api/requests/client_requests/${request_id}`, {
              method: 'PATCH',
              body: data,
              headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${user.token}`
              }
          });
          const json = await response.json();
  
          if(!response.ok){
              toast.error(json.error)
          }
          if(response.ok){
              toast.success('Updated a request successfully');
              dispatch({type: 'UPDATE_REQUEST', payload: json})
              setFormData({
                  message: '',
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
          message: '',
          id: ''
      })
  }

  return (
    <Grid
      sx={{
        px: 2,
        my: 8,

        height: 520,
        position: "sticky",
        top: "10%",
        zIndex: 1,
        borderRadius: "3px",
        backgroundColor: "#E5E6EA",
      }}
      component={Paper}
      elevation={5}
    >
      <form
        className="other-forms"
        onSubmit={handleSubmit}
        onReset={handleReset}
      >
        <Grid
          container
          justifyContent="center"
          alignItems="center"
          sx={{ py: 2 }}
        >
          <Typography variant="h5">Update Request</Typography>
        </Grid>

        <label>Request Appartama(Click the request):</label>
        <input
          type="text"
          name="appartment"
          disabled
          value={chosenAppartment}
        />
        <label>previously sent message(Click the request):</label>
        <textarea type="textarea" name="message" disabled value={sentmessage} />

        <label>Message:</label>
        <textarea
          name="message"
          onChange={handleInputChange}
          value={formData.message}
        />

        <input className="submit" type="submit" value="Update" />
      </form>
    </Grid>
  );
}
