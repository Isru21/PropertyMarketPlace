import { useNavigate, useSearchParams } from "react-router-dom";
import { useState, useEffect } from "react";

// contexts
import { useAuthContext, useDataContext } from "../hooks/useContexts";

// components
import RealEstateInfo from "../components/public/RealEstateInfo";
import AddApt from "../components/private/admin/AddApt";
import AddRealEstate from "../components/private/superadmin/AddRealEstate";
// mui
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
// second mui
import BathtubIcon from "@mui/icons-material/Bathtub";
import AppBar from "@mui/material/AppBar";
import Button from "@mui/material/Button";
import CameraIcon from "@mui/icons-material/PhotoCamera";
import CardActions from "@mui/material/CardActions";
import CssBaseline from "@mui/material/CssBaseline";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Link from "@mui/material/Link";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import MainFeaturedPost from "./MainFeatuedPost";
import BedIcon from "@mui/icons-material/Bed";
import FamilyRestroomIcon from "@mui/icons-material/FamilyRestroom";
import ApartmentIcon from "@mui/icons-material/Apartment";
import PaymentsIcon from "@mui/icons-material/Payments";
import DescriptionIcon from "@mui/icons-material/Description";
import DateRangeIcon from "@mui/icons-material/DateRange";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import Pagination from "@mui/material/Pagination";
import { TextField } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

export default function Home({ setLoginClicked, setHomePageCheck }) {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const {
    realestates,
    realestatesTotalPages: totalPages,
    realestatesParams,
    setRealEstatesParams,
  } = useDataContext();
  const { user } = useAuthContext();

  // const [searchKeyword, setSearchKeyword] = useState(
  //   realestatesParams.searchKey
  // );
  const [sortField, setSortField] = useState(realestatesParams.sortField);
  const [sortOrder, setSortOrder] = useState(realestatesParams.sortOrder);

  useEffect(() => {
    setLoginClicked("No");
  });
  useEffect(() => {
    setHomePageCheck("yes");
  });

  useEffect(() => {
    const page = parseInt(searchParams.get("page")) || 1;
    const key = searchParams.get("key") || "";
    const sortBy = searchParams.get("sort_by") || "createdAt";
    const order = searchParams.get("order") || "desc";
    if (
      page !== realestatesParams.currentPage ||
      key !== realestatesParams.searchKey ||
      sortBy !== realestatesParams.sortField ||
      order !== realestatesParams.sortOrder
    ) {
      setRealEstatesParams({
        currentPage:
          page !== realestatesParams.currentPage
            ? page
            : realestatesParams.currentPage,
        searchKey:
          key !== realestatesParams.searchKey
            ? key
            : realestatesParams.searchKey,
        sortField:
          sortBy !== realestatesParams.sortField
            ? sortBy
            : realestatesParams.sortField,
        sortOrder:
          order !== realestatesParams.sortOrder
            ? order
            : realestatesParams.sortOrder,
      });
    }
  }, [
    realestatesParams.currentPage,
    realestatesParams.searchKey,
    realestatesParams.sortField,
    realestatesParams.sortOrder,
    searchParams,
    setRealEstatesParams,
  ]);

  // const handleKeyPress = (e) => {
  //   if (e.key === "Enter" && searchKeyword !== "") {
  //     setSearchParams({ key: searchKeyword });
  //   }
  // };

  const handleClick = (id) => {
    navigate(`/realestate_details/${id}`);
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
      <div className="realestates">
        {/* <input
          type="text"
          placeholder="Search realestates"
          onKeyPress={handleKeyPress}
          onChange={(e) => setSearchKeyword(e.target.value)}
        /> */}
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
              <MenuItem value="fullname">Name</MenuItem>
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
          <select
            name="sort_by"
            value={sortField}
            onChange={handleDropDownChange}
          >
            <option value="fullname">Name</option>
            <option value="createdAt">Created Date</option>
          </select>
          <select
            name="order"
            value={sortOrder}
            onChange={handleDropDownChange}
          >
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
        </div> */}

        <Grid
          container
          justifyContent="left"
          alignItems="center"
          sx={{ mb: -3, ml: 3 }}
        >
          {/* <Grid container justifyContent="center" alignItems="center">
          <TextField
            type="text"
            placeholder="Search realestates"
            onKeyPress={handleKeyPress}
            onChange={(e) => setSearchKeyword(e.target.value)}
          sx={{width:500}}
            
          />
          </Grid> */}
          <Typography
            component="h1"
            variant="h2"
            // align="center"
            color="text.primary"
            gutterBottom
          >
            {/* <Pagination
            count={totalPage}
            shape="rounded"
            page={currentPage}
            onChange={handlePageClick}
          /> */}
            <strong>Real Estates</strong>
          </Typography>
        </Grid>
        {realestates?.map((realestate) => (
          <div
            onClick={() => handleClick(realestate._id)}
            key={realestate._id}
            className="links"
          >
            <RealEstateInfo key={realestate._id} realestate={realestate} />
          </div>
        ))}
      </div>

      {(user?.privilege === "admin" || user?.privilege === "superadmin") && (
        <Grid>
          {user?.privilege === "admin" ? <AddApt /> : null}
          {user?.privilege === "superadmin" ? <AddRealEstate /> : null}
        </Grid>
      )}
      {/* {totalPage > 1 && <div className="pagination">
                <label className="arrows"><button onClick={() => currentPage > 1 && handlePageClick(currentPage - 1)}>
                    &lt;
                </button></label>
                {renderPageNumbers()}
                <label className="arrows"><button onClick={() => currentPage < totalPage && handlePageClick(currentPage + 1)}>
                    &gt;
                </button></label>
            </div>} */}
      {totalPages > 1 && (
        <Grid container justifyContent="center" alignItems="center">
          <Pagination
            count={totalPages}
            shape="rounded"
            align="center"
            page={realestatesParams.currentPage}
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
