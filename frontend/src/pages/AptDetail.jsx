import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useAuthContext, useDataContext } from "../hooks/useContexts";

// date fns
import formatDistanceToNow from "date-fns/formatDistanceToNow";

// components
import AddRequest from "../components/private/client/AddRequest";
import UpdateApt from "../components/private/admin/UpdateApt";
import AptInfo from "../components/public/AptInfo";

//mui imports for cards
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";

// second mui
import BathtubIcon from "@mui/icons-material/Bathtub";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import MainFeaturedPost from "./MainFeatuedPost";
import BedIcon from "@mui/icons-material/Bed";
import FamilyRestroomIcon from "@mui/icons-material/FamilyRestroom";
import ApartmentIcon from "@mui/icons-material/Apartment";
import PaymentsIcon from "@mui/icons-material/Payments";
import DateRangeIcon from "@mui/icons-material/DateRange";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
//mui dialog
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
// ... other imports ...
import IconButton from "@mui/material/IconButton";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";

export default function AptDetail() {
  const { user } = useAuthContext();
  const { dispatch } = useDataContext();
  const { id } = useParams();
  const navigate = useNavigate();

  const [apt, setApt] = useState(null);
  const [owner, setOwner] = useState(false);

  const [showConfirmation, setShowConfirmation] = useState(false);

  const [selectedImageIndex, setSelectedImageIndex] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchApt = async () => {
      const response = await fetch(`/api/apartments?id=${id}`);
      const json = await response.json();
      if (response.ok) {
        setApt(json);
      }
    };
    fetchApt();
  }, []);

  useEffect(() => {
    setOwner(user?._id === apt?.realestate_id ? true : false);
  }, [apt?.realestate_id, user?._id]);

  const handleDeletecheck = async () => {
    setShowConfirmation(!showConfirmation);
  };

  const handleDelete = async () => {
    const response = await fetch(`/api/apartments/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${user.token}` },
    });
    const json = await response.json();

    if (!response.ok) {
      toast.error(json.error);
    }
    if (response.ok) {
      toast.success("Deleted an apartment successfully");
      dispatch({ type: "DELETE_APARTMENT", payload: json });
      navigate("/apartments");
    }
  };

  const handleAptChange = (updatedApt) => {
    setApt(updatedApt);
  };

  const dynamicImageUrl = apt
    ? apt.imageUrls[0]
      ? `http://localhost:5000/${apt.imageUrls[0]}`
      : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
    : "";

  const handleImageClick = (index) => {
    setSelectedImageIndex(index);
    setIsModalOpen(true);
  };

  return (
    <Grid
      container
      spacing={1}
      sx={
        !owner && user && user?.privilege !== "client"
          ? styles.aptdetailPage1
          : styles.aptdetailPage
      }
    >
      <div>
        <br />
        {apt?.imageUrls ? (
          <MainFeaturedPost
            post={{
              title: `${apt.realestate_name}'s Apartment`,
              description: `${apt.description}`,
              linkText: "Continue reading…",
              imageText: "Main image description",
              image: dynamicImageUrl,
            }}
          />
        ) : null}
        {console.log(dynamicImageUrl, "saadadad")}
        <Grid>
          {apt && (
            <Grid component={Paper} align="center" sx={{ py: 3, px: 3 }}>
              <Typography
                component="h1"
                variant="h2"
                align="center"
                color="text.primary"
                style={{ borderBottom: "2px solid black" }}
                gutterBottom
              >
                {apt.realestate_name}'s Apartment
              </Typography>
              <Typography variant="h6">
                <BedIcon />
                <strong> {apt.bedrooms}</strong> bedrooms
              </Typography>
              <Typography variant="h6">
                <BathtubIcon />
                <strong> {apt.bathrooms}</strong> bathrooms
              </Typography>
              <Typography variant="h6">
                <FamilyRestroomIcon />
                For <strong>{apt.type}</strong>
                {apt.type === "both" && <strong> Sale and Rent</strong>}
              </Typography>
              <Typography variant="h6">
                <ApartmentIcon />
                <strong> {apt.available}</strong> apartment/s available
              </Typography>
              <Typography variant="h6">
                <PaymentsIcon />
                Price: <strong>{apt.price}</strong>
              </Typography>

              <br />

              <ImageList variant="masonry" cols={3} gap={8}>
                {apt.imageUrls.length > 0 &&
                  apt.imageUrls.map((image, index) => (
                    <ImageListItem key={image.img}>
                      <img
                        className="detail"
                        src={`http://localhost:5000/${image}`}
                        alt=""
                        onClick={() => handleImageClick(index)}
                        style={{ cursor: "pointer" }}
                      />
                    </ImageListItem>
                  ))}
              </ImageList>

              <Dialog open={isModalOpen} onClose={() => setIsModalOpen(false)}>
                <Grid
                  container
                  justifyContent="center"
                  alignItems="center"
                  sx={{ mb: -5 }}
                >
                  {" "}
                  <DialogTitle>Apartment Images</DialogTitle>
                </Grid>
                <DialogContent sx={{ mt: -2 }}>
                  {selectedImageIndex !== null && (
                    <>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          marginTop: "10px",
                        }}
                      >
                        <IconButton
                          onClick={() =>
                            setSelectedImageIndex((prevIndex) =>
                              prevIndex > 0
                                ? prevIndex - 1
                                : apt.imageUrls.length - 1
                            )
                          }
                        >
                          <NavigateBeforeIcon />
                        </IconButton>
                        <IconButton
                          onClick={() =>
                            setSelectedImageIndex((prevIndex) =>
                              prevIndex < apt.imageUrls.length - 1
                                ? prevIndex + 1
                                : 0
                            )
                          }
                        >
                          <NavigateNextIcon />
                        </IconButton>
                      </div>
                      <img
                        src={`http://localhost:5000/${apt.imageUrls[selectedImageIndex]}`}
                        alt=""
                        style={{ width: "100%", height: "auto" }}
                      />
                    </>
                  )}
                </DialogContent>
              </Dialog>
              <Typography variant="h6" align="right">
                <DateRangeIcon />
                Created At:{" "}
                <strong>
                  {formatDistanceToNow(new Date(apt.createdAt), {
                    addSuffix: true,
                  })}
                </strong>
              </Typography>
              {owner && (
                <Button
                  variant="contained"
                  style={{ backgroundColor: "#2D3642", color: "#fff" }}
                  onClick={handleDeletecheck}
                >
                  Remove Apartment
                </Button>
              )}
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
            </Grid>
          )}
        </Grid>
      </div>
      {apt && (owner || !user || user?.privilege === "client") && (
        <Grid>
          {apt && (!user || user?.privilege === "client") && (
            <AddRequest apt={apt} />
          )}
          {apt && owner && (
            <UpdateApt apt={apt} onAptChange={handleAptChange} />
          )}
        </Grid>
      )}
    </Grid>
  );
}

const styles = {
  aptdetailPage: {
    display: "grid",
    gridTemplateColumns: "3fr 1fr",
    gap: "20px",
  },
  aptdetailPage1: {
    display: "block",
  },
};
