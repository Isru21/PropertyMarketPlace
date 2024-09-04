// contexts
import { useAuthContext, useDataContext } from "../hooks/useContexts";
import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
// components
import UpdateProfile from "../components/private/UpdateProfile";
import RequestInfo from "../components/private/RequestInfo";
//mui
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import CardMedia from "@mui/material/CardMedia";
import { TextareaAutosize } from "@mui/base/TextareaAutosize";
import { Pagination, Typography } from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import MilitaryTechIcon from "@mui/icons-material/MilitaryTech";
//MUI2
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardContent from "@mui/material/CardContent";



export default function UserProfile({setHomePageCheck}) {
  useEffect (() => {setHomePageCheck('no')});

  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const {
    user,
    requestsCurrentPage: currentPage,
    requestsTotalPage: totalPage,
    dispatch: pageDispatch,
  } = useAuthContext();
  const { requests } = useDataContext();

  const handlePageClick = (event, page) => {
    pageDispatch({ type: "SET_REQUESTS_CURRENTPAGE", payload: page });
    setSearchParams({ page });
  };

  const handleClick = (id) => {
    navigate(`/apartment_details/${id}`);
  };
  return (
    <Grid container spacing={5} sx={styles.home}>
      <Grid backgroundColor=" rgba(222,219,203,20%)">
        {user && (
          <Container
            sx={{ py: 4, marginRight: 71, marginBottom: 4 }}
            className="profile"
          >
            <Grid
              backgroundColor=" rgb(196, 212, 224,40%)"
              borderRadius="7px"
              sx={styles.home2}
            >
              {/* <h2>My Profile</h2> */}
              <CardMedia
                component="img"
                src={
                  user.imageUrl
                    ? `http://localhost:5000/${user.imageUrl}`
                    : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
                }
                alt=""
                // height="300"
                sx={{ width: 200, height: 200 }}
              />
              <p>
                <Typography variant="h2">{user.fullname}</Typography>
                <Typography variant="h6">
                  {" "}
                  <EmailIcon /> {user.email}
                </Typography>
                <Typography variant="h6">
                  {" "}
                  <LocalPhoneIcon /> {user.contact}
                </Typography>
                <Typography variant="h6">
                  {" "}
                  <LocationOnIcon /> {user.address}
                </Typography>
                {user?.privilege === "superadmin" && (
                  <Typography variant="h6">
                    {" "}
                    <MilitaryTechIcon /> {user.privilege}
                  </Typography>
                )}
                <Typography variant="h6">
                  {" "}
                  <strong>Bio:</strong> {user.description}
                </Typography>
              </p>{" "}
            </Grid>
            {/* <p>
            Email: <strong>{user.email}</strong>
          </p> */}
            {/* <p>
            Username: <strong>{user.username}</strong>
          </p> */}
            {/* <p>
            Contact: <strong>{user.contact}</strong>
          </p> */}
            {/* <p>
            Privilege: <strong>{user.privilege}</strong>
          </p> */}
            {/* <p>
            Address: <strong>{user.address}</strong>
          </p> */}
            {/* <p>
            Gender: <strong>{user.gender}</strong>
          </p> */}
            {/* <p>
          <Typography variant="h6"> <strong>Bio:</strong> {user.description}</Typography>
          </p> */}
          </Container>
        )}
        <Grid
          container
          justifyContent="center"
          alignItems="center"
          spacing={2}
          sx={{ marginBottom: 4 }}
          item
        >
          {requests
            ?.filter((request) => request.status === "accepted")
            .map((request) => (
              <Grid item key={request} xs={12} sm={6} md={10}>
                {console.log(request, request.realestate_name, "reqwsts")}

                <CardActionArea
                  component="a"
                  // href="#"
                  color="primary"
                  onClick={()=> handleClick(request.apartment_id)}
                  key={request._id}
                  className="links"
                >
                  <Card
                    sx={{
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                      backgroundColor: " #E5E6EA",
                    }}
                  >
                    <CardContent sx={{ flexGrow: 1 }}>
                      <RequestInfo key={request._id} request={request} />
                    </CardContent>
                  </Card>
                </CardActionArea>
              </Grid>
            ))}

          
        </Grid>
        {totalPage > 1 && (
            <Grid container justifyContent="center" alignItems="center">
              <Pagination
                count={totalPage}
                shape="rounded"
                align="center"
                page={currentPage}
                onChange={handlePageClick}
              />
            </Grid>
          )}
      </Grid>

      {user && <UpdateProfile />}
    </Grid>
  );
}

const styles = {
  home: {
    display: "grid",
    gridTemplateColumns: "3fr 1fr",
    gap: "20px",
  },
  home2: {
    display: "grid",
    gridTemplateColumns: "0.3fr 1fr",
    // gap: "20px",
    padding: "20px",
  },
};
