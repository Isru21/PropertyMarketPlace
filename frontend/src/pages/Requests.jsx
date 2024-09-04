import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAuthContext, useDataContext } from "../hooks/useContexts";

// components
import RequestInfo from "../components/private/RequestInfo";
import UpdateRequest from "../components/private/client/UpdateRequest";
import RespondRequest from "../components/private/admin/RespondRequest";
//mui imports for cards
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
// second mui
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
import Pagination from "@mui/material/Pagination";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

export default function Requests({ setHomePageCheck }) {
  const [id, setId] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();

  const {
    requests,
    requestsTotalPages: totalPages,
    requestsParams,
    setRequestsParams,
  } = useDataContext();
  const { user } = useAuthContext();

  const [sortField, setSortField] = useState(requestsParams.sortField);
  const [sortOrder, setSortOrder] = useState(requestsParams.sortOrder);

  const navigate = useNavigate();
  const [RequestedAppartama, setRequestedAppartama] = useState("");
  const [Sentmessage, setSentmessage] = useState("");
  const [UserName, setUserName] = useState("");

  useEffect(() => {
    setHomePageCheck("no");
  });

  useEffect(() => {
    const page = parseInt(searchParams.get("page")) || 1;
    const sortBy = searchParams.get("sort_by") || "createdAt";
    const order = searchParams.get("order") || "desc";
    if (
      page !== requestsParams.currentPage ||
      sortBy !== requestsParams.sortField ||
      order !== requestsParams.sortOrder
    ) {
      setRequestsParams({
        currentPage:
          page !== requestsParams.currentPage
            ? page
            : requestsParams.currentPage,
        sortField:
          sortBy !== requestsParams.sortField
            ? sortBy
            : requestsParams.sortField,
        sortOrder:
          order !== requestsParams.sortOrder ? order : requestsParams.sortOrder,
      });
    }
  }, [
    requestsParams.currentPage,
    requestsParams.sortField,
    requestsParams.sortOrder,
    searchParams,
    setRequestsParams,
  ]);

  const handlePageClick = (event, page) => {
    const prevParams = Object.fromEntries(searchParams);
    setSearchParams({ ...prevParams, page });
    setId("");
  };
  const handleClick = (id) => {
    navigate(`/apartment_details/${id}`);
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
        user?.privilege === "admin" || user?.privilege === "client"
          ? styles.Requestpage
          : styles.Requestpage1
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
              <MenuItem value="status">Status</MenuItem>
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
                    <option value="status">Status</option>
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
          {/* <Pagination
            count={totalPage}
            shape="rounded"
            page={currentPage}
            onChange={handlePageClick}
          /> */}
          <strong>Requests</strong>
        </Typography>
        <Grid
          container
          spacing={2}
          item
          // justifyContent="center"
          // alignItems="center"
        >
          {/* <div className="requests"> */}

          {requests?.length === 0 && <h3>No Requests Available</h3>}
          {requests?.map((request) => (
            <Grid item key={request} xs={12} sm={6} md={6}>
              {console.log(request, request.apartment_id, "reqwsts")}

              <CardActionArea
                component="a"
                // href="#"
                color="primary"
                onDoubleClick={() => handleClick(request.apartment_id)}
                onClick={() => {
                  setId(request._id);
                  setRequestedAppartama(request.realestate_name);
                  setSentmessage(request.message);
                  setUserName(request.client_name);
                }}
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
          {/* </div> */}
        </Grid>
      </Container>
      {(user?.privilege === "admin" || user?.privilege === "client") && (
        <Grid>
          {requests?.length > 0 && user.privilege === "admin" && (
            <RespondRequest
              request_id={id}
              sentmessage={Sentmessage}
              username={UserName}
            />
          )}
          {requests?.length > 0 && user.privilege === "client" && (
            <UpdateRequest
              request_id={id}
              sentmessage={Sentmessage}
              chosenAppartment={RequestedAppartama}
            />
          )}
        </Grid>
      )}
      {totalPages > 1 && (
        <Grid container justifyContent="center" alignItems="center">
          <Pagination
            count={totalPages}
            shape="rounded"
            align="center"
            page={requestsParams.currentPage}
            onChange={handlePageClick}
          />
        </Grid>
      )}
    </Grid>
  );
}

const styles = {
  Requestpage: {
    display: "grid",
    gridTemplateColumns: "3fr 1fr",
    gap: "20px",
  },
  Requestpage1: {
    display: "block",
  },
};
