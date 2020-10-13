import React from "react";
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography
} from "@material-ui/core";

interface IProps {
  proceedToRecording: (industry: any) => void;
  industry: any;
}
const CampaignIndustryCard: React.FC<IProps> = ({proceedToRecording, industry}) => {
  const moveToRecording = () => {
    proceedToRecording(industry);
  };
  return (
    <Card className="campCards">
      <CardActionArea onClick={moveToRecording}>
        <CardMedia
          component="img"
          alt="Industry Thumbnail"
          height="200"
          image={industry.templateThumbnailUrl}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {industry.name}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export const ChosedIndustry: React.FC<IProps> = ({industry}) => {
  return (
    <Card className="chosenIndustry campCards">
      <CardActionArea>
      <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            Industry:
          </Typography>
        </CardContent>
        <CardMedia
          component="img"
          alt="Industry Thumbnail"
          height="200"
          image={industry.templateThumbnailUrl}
        />
        <CardContent style={{ textAlign: "center" }}>
          <Typography className="chosenIndustryName" gutterBottom variant="h5" component="h2">
            {/* {industry.name} */}
            Legal
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default CampaignIndustryCard;
