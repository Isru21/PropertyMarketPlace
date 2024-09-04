import Typography from "@mui/material/Typography";

export default function AptInfo({ apt }) {
  return (
    <div>
      <Typography component="h2" variant="h5">
        {apt.realestate_name}'s Apartment
      </Typography>
      <Typography variant="subtitle1" color="text.secondary">
        <strong> {apt.bedrooms}</strong> bedrooms
      </Typography>
      <Typography variant="subtitle1" color="text.secondary">
        <strong>{apt.bathrooms}</strong> bathrooms
      </Typography>
      <Typography variant="subtitle1" color="text.secondary">
        For <strong>{apt.type}</strong>
        {apt.type === "both" && <strong> Sale and Rent</strong>}
      </Typography>
      <Typography variant="subtitle1" color="text.secondary">
        <strong>{apt.available}</strong> apartment/s available
      </Typography>
      <Typography variant="subtitle1" color="text.secondary">
        Price: <strong>{apt.price}</strong>
      </Typography>
    </div>
  );
}
