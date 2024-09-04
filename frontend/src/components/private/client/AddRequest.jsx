import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDataContext, useAuthContext } from "../../../hooks/useContexts";
//mui
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import { Paper } from "@mui/material";

export default function AddRequest({ apt }) {
  const { dispatch } = useDataContext();
  const { user } = useAuthContext();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    message: "",
    id: apt._id,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      toast.info("Login to add a request");
      navigate("/login");
      return;
    }

    const data = JSON.stringify({ ...formData });

    try {
      const response = await fetch(
        `/api/requests/client_requests/${formData.id}`,
        {
          method: "POST",
          body: data,
          headers: {
            Authorization: `Bearer ${user.token}`,
            "Content-Type": "application/json",
          },
        }
      );
      const res = await response.json();

      if (!response.ok) {
        toast.error(res.error);
      }
      if (response.ok) {
        toast.success("Added a request successfully");
        setFormData({ ...formData, message: "" });
        dispatch({ type: "CREATE_REQUEST", payload: res });
        navigate("/requests");
      }
    } catch (err) {
      toast.error(err.message);
    }
  };

  const handleReset = (e) => {
    e.preventDefault();
    setFormData({ ...formData, message: "" });
  };

  return (
    <Grid
      sx={{
        px: 2,
        my: 8,
        height: 280,
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
          <Typography variant="h5">Add Request</Typography>
        </Grid>

        <label>Write a rquest for this appartment:</label>
        <textarea
          name="message"
          onChange={handleInputChange}
          value={formData.message}
        />

        <input className="submit" type="submit" value="Add" />
      </form>
    </Grid>
  );
}
