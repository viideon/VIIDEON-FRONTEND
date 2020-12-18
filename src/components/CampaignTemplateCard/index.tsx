import React from "react";
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
} from "@material-ui/core";

interface IProps {
  proceedToRecording: (template: any) => void;
  template: any;
}
const CampaignTemplateCard: React.FC<IProps> = ({
  proceedToRecording,
  template,
}) => {
  const moveToRecording = () => {
    console.log("template is ", template);
    proceedToRecording(template);
  };
  return (
    <Card className="campCards">
      <CardActionArea onClick={moveToRecording}>
        <CardMedia
          component="img"
          alt="Template Thumbnail"
          height="220"
          image={template.templateThumbnailUrl}
        />
        <CardContent style={{ maxHeight: "100px", minHeight: "100px" }}>
          <Typography gutterBottom variant="h5" component="h2">
            {template.name}
          </Typography>
          <Typography
            variant="body2"
            color="textSecondary"
            component="p"
            style={{ textAlign: "center" }}
          >
            {`${template.totalSteps} shots, ${
              template.duration ? template.duration : 0
            } seconds`}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default CampaignTemplateCard;
