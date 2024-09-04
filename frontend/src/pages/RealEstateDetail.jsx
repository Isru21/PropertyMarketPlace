import { useParams, useNavigate, useSearchParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useAuthContext, useDataContext } from "../hooks/useContexts";

// date fns
import formatDistanceToNow from "date-fns/formatDistanceToNow";

// components
import AptDetails from "../components/public/AptInfo";
import MainFeaturedPostBanner from "../pages/MainFeaturedPostBanner";
//mui import
import Typography from "@mui/material/Typography";
import {Pagination} from "@mui/material";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import { Paper } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Container from "@mui/material/Container";
export default function RealEstateDetail({ setHomePageCheck }) {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const {realestateInfo, realestateApts, realestateAptsTotalPages: totalPages, realestateAptsParams, setRealEstateAptsParams, dispatch} = useDataContext();
  const {user} = useAuthContext();
  const { id } = useParams();

  const [sortField, setSortField] = useState(realestateAptsParams.sortField);
  const [sortOrder, setSortOrder] = useState(realestateAptsParams.sortOrder);
  const [showConfirmation, setShowConfirmation] = useState(false);

  useEffect(() => {
    setHomePageCheck("no");
  });

  
  useEffect(() => {
    const fetchRealEstate = async () => {
        const response = await fetch(`/api/user/view_realestates?id=${id}`);
        const json = await response.json();
        if(response.ok){
            dispatch({type: 'SET_REALESTATEINFO', payload: json});
        }
        if(!response.ok){
            toast.error(json.error);
        }
    };
    fetchRealEstate();
  }, [dispatch, id]);

  useEffect(() => {
      const page = parseInt(searchParams.get('page')) || 1;
      const sortBy = searchParams.get('sort_by') || 'createdAt';
      const order = searchParams.get('order') || 'desc';
      if(page !== realestateAptsParams.currentPage ||
          sortBy !== realestateAptsParams.sortField ||
          order !== realestateAptsParams.sortOrder){
              setRealEstateAptsParams({
                  currentPage: page !== realestateAptsParams.currentPage ? page : realestateAptsParams.currentPage,
                  sortField: sortBy !== realestateAptsParams.sortField ? sortBy : realestateAptsParams.sortField,
                  sortOrder: order !== realestateAptsParams.sortOrder ? order : realestateAptsParams.sortOrder,
              })
          }
  }, [realestateAptsParams.currentPage, realestateAptsParams.sortField, realestateAptsParams.sortOrder, searchParams, setRealEstateAptsParams]);

  const handleDeletecheck = async () => {
    setShowConfirmation(!showConfirmation);
  };

  const handleDelete = async () => {
    const response = await fetch(`/api/user/remove_realEstate/${realestateInfo._id}`, {
        method: 'DELETE',
        headers: {'Authorization': `Bearer ${user.token}`}
    });
    const json = await response.json();

    if(!response.ok){
        toast.error(json.error);
    }
    if(response.ok){
        toast.success('Removed a realestate successfully');
        dispatch({type: 'DELETE_REALESTATE', payload: json})
        navigate('/');
    }

    setShowConfirmation(false);
}

  const handleClick = (id) => {
    navigate(`/apartment_details/${id}`);
  };

  const handlePageClick = (event, page) => {
    const prevParams = Object.fromEntries(searchParams);
    setSearchParams({...prevParams, page});
  };

  const handleDropDownChange = (e) => {
    const { name, value } = e.target;
    const prevParams = Object.fromEntries(searchParams);
    if(name === 'sort_by'){
        setSortField(value);
        setSortOrder('asc');
        setSearchParams({...prevParams, [name]: value, order: 'asc'});
    } else{
        setSortOrder(value);
        setSearchParams({...prevParams, [name]: value});
    }
}

  const dynamicImageUrl = realestateInfo
    ? `http://localhost:5000/${realestateInfo.imageUrl}`
    : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png";

  return (
    <div className="realestatedetail-page">
      <Typography variant="h3" sx={{ mb: -2 }}>
        <strong>RealEstate Info</strong>
      </Typography>
      {realestateInfo && (
        <MainFeaturedPostBanner
          post={{
            title: `${realestateInfo.fullname}'s Apartment`,
            description: `${realestateInfo.email}`,
            phone: `${realestateInfo.contact}`,
            linkText: "Continue reading…",
            imageText: "Main image description",
            image: dynamicImageUrl,
          }}
        />
      )}
      {realestateInfo && (
        <div className="realestate-details">
          {user?.privilege === "superadmin" ? (
            <div>
              <Typography variant="h6" component="h6" sx={{ mt: -2 }}>
                Created:{" "}
                {formatDistanceToNow(new Date(realestateInfo.createdAt), {
                  addSuffix: true,
                })}
              </Typography>
              <br />
              <Button
                type="submit"
                // fullWidth
                variant="contained"
                style={{
                  backgroundColor: "#2D3642",
                }}
                sx={{ mt: -2, mb: 2 }}
                onClick={handleDeletecheck}
              >
                Remove RealEstate
              </Button>
              {/* <button onClick={handleDelete}>Remove RealEstate</button> */}
            </div>
          ) : null}
        </div>
      )}

      {/* Confirmation Dialog */}
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
              // variant="contained"
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
              // variant="outlined"
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
      <Typography variant="h4" sx={{ mb: 3 }}>
        Apartments Within this RealEstate
      </Typography>
      {/* <h2>Apartments Within this RealEstate</h2> */}
      <Grid container justifyContent="right" alignItems="right">
          <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
            <InputLabel id="sort_by">Sort by</InputLabel>
            <Select
              labelId="sort_by"
              id="sort_by"
              name="sort_by"
              label="Age"
              value={sortField}
              onChange={handleDropDownChange}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value="bedrooms">Bedrooms</MenuItem>
              <MenuItem value="bathrooms">Bathrooms</MenuItem>
              <MenuItem value="type">Type</MenuItem>
              {/* <MenuItem value="price">Price</MenuItem> */}
              <MenuItem value="createdAt">Date</MenuItem>
            </Select>
          </FormControl>
          <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
            <InputLabel id="order">Sort by</InputLabel>
            <Select
              labelId="order"
              id="order"
              name="order"
              label="Age"
              value={sortOrder}
              onChange={handleDropDownChange}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value="asc">Ascending</MenuItem>
              <MenuItem value="desc">Descending</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      <Grid container spacing={4} item>
        {realestateApts?.length > 0 ? (
          realestateApts.map((apt) => (
            <Grid item key={apt} xs={12} sm={6} md={4}>
              <CardActionArea
                color="primary"
                onClick={() => handleClick(apt._id)}
                key={apt._id}
                className="links"
              >
                <Card
                  sx={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <CardMedia
                    component="img"
                    variant="div"
                    // sx={{
                    //   // 16:9
                    //   pt: "56.25%",
                    // }}

                    height="200"
                    image={
                      apt.imageUrls.length > 0
                        ? `http://localhost:5000/${apt.imageUrls[0]}`
                        : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
                    }
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <AptDetails key={apt._id} apt={apt} />
                  </CardContent>
                </Card>
              </CardActionArea>
            </Grid>
          ))
        ) : (
          <Grid
            container
            justifyContent="center"
            alignItems="center"
            sx={{ py: 2 }}
          >
            {" "}
            <Typography
              variant="h5"
              sx={{
                mb: 2,
                mt: 3,
                p: 3,
                alignContent: "center",
                backgroundColor: "rgba(222,219,203,40%)",
                borderRadius: 2,
              }}
            >
              No apartment listed by this realestat
            </Typography>
            
             
            
          </Grid>

          // <h3>No apartment listed by this realestate</h3>
        )}
        {totalPages > 1 && (
         <Grid container justifyContent="center" alignItems="center">
                <Pagination
                  count={totalPages}
                  shape="rounded"
                  align="center"
                  page={realestateAptsParams.currentPage}
                  onChange={handlePageClick}
                />
              </Grid>
              )}
      </Grid>
      
    </div>
  );
}
