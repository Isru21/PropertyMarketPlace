import MainFeaturedPostBanner from "../../pages/MainFeaturedPostBanner";

import Grid from "@mui/material/Grid";

export default function RealEstateInfo({ realestate }) {
  const dynamicImageUrl = realestate.imageUrl
    ? `http://localhost:5000/${realestate.imageUrl}`
    : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png";
  return (
    <Grid>
      <MainFeaturedPostBanner
        post={{
          title: `${realestate.fullname}'s Apartment`,
          description: `${realestate.email}`,
          phone: `${realestate.contact}`,
          linkText: "Continue reading…",
          imageText: "Main image description",
          image: dynamicImageUrl,
        }}
      />
    </Grid>
  );
}
