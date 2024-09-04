import { useSearchParams } from "react-router-dom";

import { Link } from "react-router-dom";
import { useAuthContext, useDataContext } from "../../hooks/useContexts";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import { Container } from "@mui/system";
import { styled } from "@mui/system";
import { AppBar } from "@mui/material";
import { Grid } from "@mui/material";

import FormControl from "@mui/material/FormControl";
import Input from "@mui/material/Input";
import InputLabel from "@mui/material/InputLabel";
import { useEffect,useState } from "react";

export default function Navbar({
  setSearchKeywords,
  searchKeywords,
  HomePageCheck,
}) {
  const { user, dispatch: userDispatch } = useAuthContext();

  const { dispatch: requestDispatch,realestatesParams } = useDataContext();

  const [searchParams, setSearchParams] = useSearchParams();
  const [searchKeyword, setSearchKeyword] = useState(
    realestatesParams.searchKey
  );

  useEffect(() => {
    setSearchKeywords(searchKeyword);
  });
  const handleClick = () => {
    localStorage.removeItem("user");

    // dispatch logout action
    userDispatch({ type: "LOGOUT" });

    // dispatch SET_REQUEST action
    requestDispatch({ type: "SET_REQUESTS", payload: null });
  };

 const handleKeyPress = (e) => {
    if (e.key === "Enter" && searchKeywords !== "") {
      setSearchParams({ key: searchKeywords });
    }
  };

  return (
    <AppBar
      sx={{
        backgroundColor: "#E1E2E7",
      }}
    >
      {" "}
      <Grid>
        <Container
          sx={{
            backgroundColor: "#E1E2E7",

            display: "flex",
            justifyContent: "space-between",
          }}
          maxWidth="xl"
        >
          <Link to="/">
            <h2>Everlink's PMS</h2>
          </Link>
          <nav>
            {HomePageCheck === "yes" && (
              <FormControl variant="standard">
                <InputLabel htmlFor="component-simple">
                  Search realestates
                </InputLabel>
                <Input
                  type="text"
                  fullWidth
                  onKeyPress={handleKeyPress}
                  onChange={(e) => setSearchKeyword(e.target.value)}
                  sx={{ width: 400, pl: 20 }}
                />
              </FormControl>
            )}
            {/* <FormControl variant="standard">
              <InputLabel htmlFor="component-simple">Search realestates</InputLabel>
              <Input
                type="text"
               // placeholder="Search realestates"
                fullWidth
                onKeyPress={handleKeyPress}
                onChange={(e) => setSearchKeyword(e.target.value)}
                sx={{ width: 400, pl:20 }}
              />
            </FormControl> */}

            <Link to={"/apartments"}>
              <Button
                style={{
                  color: "#2D3642",

                  borderRadius: 0,
                }}
              >
                Apartments
              </Button>
            </Link>
            <Link to={"/"}>
              <Button
                style={{
                  color: "#2D3642",

                  borderRadius: 0,
                }}
              >
                Realstates
              </Button>
            </Link>

            {user && (
              <Link to={"/requests"}>
                <Button
                  style={{
                    color: "#2D3642",
                    borderRadius: 0,
                  }}
                >
                  Requests
                </Button>
              </Link>
            )}

            {user && (
              <div>
                <Link to="/profile">
                  <GreenRingAvatar>
                    <Avatar
                      src={
                        user.imageUrl
                          ? `http://localhost:5000/${user.imageUrl}`
                          : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
                      }
                      alt=""
                      sx={{ width: 47, height: 47, objectFit: "cover" }}
                    />
                  </GreenRingAvatar>
                  <span>{user.username}</span>
                </Link>

                <Button
                  onClick={handleClick}
                  variant="contained"
                  style={{ backgroundColor: "#2D3642", color: "#fff" }}
                  sx={{ ml: "13px" }}
                >
                  Log out
                </Button>
              </div>
            )}

            {!user && (
              <div>
                <Link to={"/login"}>
                  <Button
                    onClick={handleClick}
                    variant="outlined"
                    style={{ backgroundColor: "#2D3642", color: "#fff" }}
                  >
                    Log in
                  </Button>
                </Link>
              </div>
            )}
          </nav>
        </Container>
      </Grid>
    </AppBar>
  );
}

const GreenRingAvatar = styled("div")({
  marginRight: "7px",
});
