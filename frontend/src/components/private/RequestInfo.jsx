import { toast } from "react-toastify";
import { useAuthContext, useDataContext } from "../../hooks/useContexts";
import { useState } from "react";

// date fns
import formatDistanceToNow from "date-fns/formatDistanceToNow";

//mui
import { Button, Grid, Paper } from "@mui/material";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";

export default function RequestDetails({ request }) {
  const { dispatch } = useDataContext();
  const { user } = useAuthContext();
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleDeletecheck = async () => {
    setShowConfirmation(!showConfirmation);
  };
  const handleDelete = async () => {
    const response = await fetch(
      `/api/requests/client_requests/${request._id}`,
      {
        method: "DELETE",
        headers: { Authorization: `Bearer ${user.token}` },
      }
    );
    const json = await response.json();

    if (!response.ok) {
      toast.error(json.error);
    }
    if (response.ok) {
      toast.success("Deleted a request successfully");
      dispatch({ type: "DELETE_REQUEST", payload: json });
    }
  };

  return (
    <Grid container spacing={1} sx={styles.home}>
      <div className="request-details">
        {console.log(request, "reqest")}
        <Typography component="h2" variant="h5">
          A Request to: {request.realestate_name}
        </Typography>
        <Typography variant="subtitle1" color="text.primery">
          From: {request.client_name}
        </Typography>
        <Typography variant="subtitle2" color="text.primery">
          Phone: {request.clinet_phone}
        </Typography>
        <p variant="subtitle1" color="text.primery">
          Message: {request.message}
        </p>
        <p className={request.status === "accepted" ? "status1" : "status"}>
          Status: {request.status}
        </p>
        {console.log(request.status, "status")}
        {request.reply_message && (
          <p className={request.status === "accepted" ? "status1" : "status"}>
            Response: {request.reply_message}
          </p>
        )}
        {request.updatedAt ? (
          <p>
            {formatDistanceToNow(new Date(request.updatedAt), {
              addSuffix: true,
            })}
          </p>
        ) : (
          <p>just now</p>
        )}
        <Grid sx={{ marginBottom: 3 }}>
          <Typography variant="h7">DoubleClick to view</Typography>{" "}
        </Grid>
        {user.privilege === "client" && request.status === "pending" ? (
          <Button
            variant="contained"
            style={{ backgroundColor: "#2D3642", color: "#fff" }}
            onClick={handleDeletecheck}
          >
            delete request
          </Button>
        ) : null}
        {showConfirmation && (
          <Paper
            elevation={21} // Add elevation for a shadow effect
            sx={{
              position: "fixed",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              backgroundColor: "rgba(255, 255, 255, 95%)",
              borderRadius: 2,
              padding: 2,
              zIndex: 9999,
            }}
          >
            <Typography variant="h6" sx={{ mb: 1, mt: 1, color: "red" }}>
              Are you sure you want to remove this RealEstate?
            </Typography>
            <Grid
              container
              justifyContent="center"
              alignItems="center"
              sx={{ mb: 1 }}
            >
              <Button
                sx={{
                  mr: 2,
                  color: "#CC645E",
                  "&:hover": {
                    backgroundColor: "#CC645E",
                    color: "white",
                  },
                }}
                onClick={handleDelete}
              >
                Yes
              </Button>
              <Button
                sx={{
                  outlineColor: "#78B777",
                  color: "#78B777",
                  "&:hover": {
                    backgroundColor: "#78B777",
                    color: "white",
                  },
                }}
                onClick={() => setShowConfirmation(false)}
              >
                No
              </Button>
            </Grid>
          </Paper>
        )}
      </div>
      <Grid container justifyContent="center" alignItems="top" sx={{ py: 4.3 }}>
        <Avatar
          src={
            request.clinet_image
              ? `http://localhost:5000/${request.clinet_image}`
              : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
          }
          alt=""
          sx={{ width: 74, height: 74 }}
        />
      </Grid>
    </Grid>
  );
}

const styles = {
  home: {
    display: "grid",
    gridTemplateColumns: "3fr 1fr",
    gap: "10px",
  },
  home1: {
    display: "block",
  },
};
