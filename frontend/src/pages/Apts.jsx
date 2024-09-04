import { useNavigate, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
// contexts
import { useAuthContext, useDataContext } from "../hooks/useContexts";

// components
import AptInfo from "../components/public/AptInfo";
import Imageurl from "../components/public/AptInfo";
import AddApt from "../components/private/admin/AddApt";
import AddRealEstate from "../components/private/superadmin/AddRealEstate";
//mui imports for cards
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
// second mui
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Container from "@mui/material/Container";

import Pagination from "@mui/material/Pagination";

export default function Apts({ setHomePageCheck }) {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const {
    apts,
    aptsTotalPages: totalPages,
    aptsParams,
    setAptsParams,
  } = useDataContext();
  const { user } = useAuthContext();

  const [sortField, setSortField] = useState(aptsParams.sortField);
  const [sortOrder, setSortOrder] = useState(aptsParams.sortOrder);

  useEffect(() => {
    const page = parseInt(searchParams.get("page")) || 1;
    const sortBy = searchParams.get("sort_by") || "createdAt";
    const order = searchParams.get("order") || "desc";
    if (
      page !== aptsParams.currentPage ||
      sortBy !== aptsParams.sortField ||
      order !== aptsParams.sortOrder
    ) {
      setAptsParams({
        currentPage:
          page !== aptsParams.currentPage ? page : aptsParams.currentPage,
        sortField:
          sortBy !== aptsParams.sortField ? sortBy : aptsParams.sortField,
        sortOrder:
          order !== aptsParams.sortOrder ? order : aptsParams.sortOrder,
      });
    }
  }, [
    aptsParams.currentPage,
    aptsParams.sortField,
    aptsParams.sortOrder,
    searchParams,
    setAptsParams,
  ]);

  useEffect(() => {
    setHomePageCheck("no");
  });

  const handleClick = (id) => {
    navigate(`/apartment_details/${id}`);
  };

  const handlePageClick = (event, page) => {
    const prevParams = Object.fromEntries(searchParams);
    setSearchParams({ ...prevParams, page });
  };

  const handleDropDownChange = (e) => {
    const { name, value } = e.target;
    const prevParams = Object.fromEntries(searchParams);
    if (name === "sort_by") {
      setSortField(value);
      setSortOrder("asc");
      setSearchParams({ ...prevParams, [name]: value, order: "asc" });
    } else {
      setSortOrder(value);
      setSearchParams({ ...prevParams, [name]: value });
    }
  };

  return (
    <Grid
      container
      spacing={5}
      sx={
        user?.privilege === "admin" || user?.privilege === "superadmin"
          ? styles.home
          : styles.home1
      }
    >
      <Container sx={{ py: 8 }} maxWidth="lg">
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
        {/* <div>
          <span>Sort by:</span>
          <select name='sort_by' value={sortField} onChange={handleDropDownChange}>
              <option value="bedrooms">Bedrooms</option>
              <option value="bathrooms">Bathrooms</option>
              <option value="type">Type</option>
              <option value="price">Price</option>
              <option value="createdAt">Created Date</option>
          </select>
          <select name='order' value={sortOrder} onChange={handleDropDownChange}>
              <option value="asc">Ascending</option>
              <option value="desc">Descending</option>
          </select>
        </div> */}
        <Typography
          component="h1"
          variant="h2"
          align="center"
          color="text.primary"
          gutterBottom
        >
          <strong>Apartments</strong>
        </Typography>
        <Grid container spacing={4} item>
          {apts?.map((apt) => (
            <Grid item key={apt} xs={12} sm={6} md={4}>
              <CardActionArea
                component="a"
                // href="#"
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
                    height="200"
                    image={
                      apt.imageUrls.length > 0
                        ? `http://localhost:5000/${apt.imageUrls[0]}`
                        : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
                    }
                  />

                  <CardContent sx={{ flexGrow: 1 }}>
                    <AptInfo key={apt._id} apt={apt} />
                  </CardContent>
                </Card>
              </CardActionArea>
            </Grid>
          ))}
        </Grid>
      </Container>
      {(user?.privilege === "admin" || user?.privilege === "superadmin") && (
        <Grid>
          {user?.privilege === "admin" && <AddApt />}
          {user?.privilege === "superadmin" && <AddRealEstate />}
        </Grid>
      )}

      {totalPages > 1 && (
        <Grid container justifyContent="center" alignItems="center">
          <Pagination
            count={totalPages}
            shape="rounded"
            align="center"
            page={aptsParams.currentPage}
            onChange={handlePageClick}
          />
        </Grid>
      )}
    </Grid>
  );
}

const styles = {
  home: {
    display: "grid",
    gridTemplateColumns: "3fr 1fr",
    gap: "20px",
  },
  home1: {
    display: "block",
  },
};
