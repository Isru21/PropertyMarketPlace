import * as React from "react";
import PropTypes from "prop-types";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";
import CardMedia from "@mui/material/CardMedia";
import { useEffect, useState } from "react";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import AttachEmailIcon from "@mui/icons-material/AttachEmail";
import Container from "@mui/material/Container";
import styled from "@emotion/styled";
import { Card } from "@mui/material";

function MainFeaturedPostBanner(props) {
  const { post } = props;

  const [imageLoaded, setImageLoaded] = React.useState(false);

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  return (
    // <Paper
    //   sx={{
    //     position: "relative",
    //     backgroundColor: "#F1F1F1",
    //     color: "#fff",
    //     mb: 6,
    //     opacity: imageLoaded ? 1 : 0, // Set opacity to 0 until the image is loaded
    //     transition: 'opacity 0.5s ease-in-out',
    //     backgroundColor: "rgba(0,0,0,.3)"

    //   }}
    //   maxWidth="lg"
    // >

    <Card
      sx={{
        position: "relative",
        margin: 5,
        backgroundColor: "#F1F1F1",
        color: "#fff",
        
      }}
    >
      {/* <Box
        sx={{
          position: "absolute",
          top: 0,
          bottom: 0,
          right: 0,
          left: 0,
          backgroundColor: "rgba(0,0,0,.2)",
        }}
      /> */}
      {/* Increase the priority of the hero background image */}

      <CardMedia
        sx={{
          position: "absolute",
          backgroundColor: "rgba(0,0,0,.3)",
          // mt: 0,
          // mb: 6,
          // pb:2,
          // backgroundSize: "cover",
          // backgroundRepeat: "no-repeat",
          // backgroundPosition: "center",
          // backgroundImage: `url(${post.image})`,
        }}
        component="img"
        height="300"
        src={post.image}
        alt={post.imageText}
        onLoad={handleImageLoad}
      ></CardMedia>
      
      <Box
        sx={{
          position: "absolute",
          top: 0,
          bottom: 0,
          right: 0,
          left: 0,
          backgroundColor: "rgba(0,0,0,.2)",
        }}
      />
      <Grid container>
        <Grid item md={11}>
          <Box
            sx={{
              position: "relative",
              p: { xs: 3, md: 8 },
              pr: { md: 10 },
            }}
          >
            <Typography
              component="h1"
              variant="h3"
              color="inherit"
              gutterBottom
            >
              {post.title}
            </Typography>
            <Typography
              component="h1"
              variant="h5"
              sx={{ color: "#fff" }}
              paragraph
            >
              <AttachEmailIcon /> {post.description}
            </Typography>
            <Typography
              component="h1"
              variant="h5"
              sx={{ color: "#fff" }}
              paragraph
            >
              <LocalPhoneIcon /> {post.phone}
            </Typography>
            {/* <Link variant="subtitle1" href="#">
              {post.linkText}
            </Link> */}
          </Box>
        </Grid>
      </Grid>
    </Card>
  );
}

MainFeaturedPostBanner.propTypes = {
  post: PropTypes.shape({
    description: PropTypes.string.isRequired,
    phone: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    imageText: PropTypes.string.isRequired,
    linkText: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
  }).isRequired,
};

export default MainFeaturedPostBanner;

// import * as React from 'react';
// import PropTypes from 'prop-types';
// import Paper from '@mui/material/Paper';
// import Typography from '@mui/material/Typography';
// import Grid from '@mui/material/Grid';
// import Link from '@mui/material/Link';
// import Box from '@mui/material/Box';

// function MainFeaturedPostBanner(props) {
//   const { post } = props;
//   const [imageLoaded, setImageLoaded] = React.useState(false);

//   const handleImageLoad = () => {
//     setImageLoaded(true);
//   };
//   const WOrk = post.image;
//   return (
//     <Paper
//       sx={{
//         position: 'relative',
//         backgroundColor: 'grey.800',
//         color: '#fff',
//         mb: 4,
//         backgroundSize: 'cover',
//         backgroundRepeat: 'no-repeat',
//         backgroundPosition: 'center',
//         backgroundImage: `url(${WOrk})`,
//         opacity: imageLoaded ? 1 : 0, // Set opacity to 0 until the image is loaded
//         transition: 'opacity 0.5s ease-in-out',
//       }}

//     >
//       {/* Increase the priority of the hero background image */}
//       {<img style={{ display: 'none' }} src={post.image} alt={post.imageText} onLoad={handleImageLoad} />}
//       <Box
//         sx={{
//           position: 'absolute',
//           top: 0,
//           bottom: 0,
//           right: 0,
//           left: 0,
//           backgroundColor: 'rgba(0,0,0,.3)',
//         }}
//       />
//       <Grid container>
//         <Grid item md={6}>
//           <Box
//             sx={{
//               position: 'relative',
//               p: { xs: 3, md: 6 },
//               pr: { md: 0 },
//             }}
//           >
//             <Typography component="h1" variant="h3" color="inherit" gutterBottom>
//               {post.title}
//             </Typography>
//             <Typography variant="h5" color="inherit" paragraph>
//               {post.description}
//             </Typography>
//             <Link variant="subtitle1" href="#">
//               {post.linkText}
//             </Link>
//           </Box>
//         </Grid>
//       </Grid>
//     </Paper>
//   );
// }

// MainFeaturedPostBanner.propTypes = {
//   post: PropTypes.shape({
//     description: PropTypes.string.isRequired,
//     image: PropTypes.string.isRequired,
//     imageText: PropTypes.string.isRequired,
//     linkText: PropTypes.string.isRequired,
//     title: PropTypes.string.isRequired,
//   }).isRequired,
// };

// export default MainFeaturedPostBanner;
