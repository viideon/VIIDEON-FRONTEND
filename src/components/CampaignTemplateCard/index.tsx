import React from "react";
import {
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  Button,
  CardMedia,
  Typography
} from "@material-ui/core";

interface IProps {
  proceedToRecording: (template: any) => void;
  template: any;
}
const CampaignTemplateCard: React.FC<IProps> = ({proceedToRecording, template}) => {
  console.log(template)
  const moveToRecording = () => {
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
          <Typography variant="body2" color="textSecondary" component="p">
            {`${template.totalSteps} shots, 30 seconds`}
            {template.templateDescription}
          </Typography>
        </CardContent>
      </CardActionArea>
      {/* <CardActions>
        <Button size="small" color="primary" onClick={moveToRecording}>
          Proceed
        </Button>
      </CardActions> */}
    </Card>
  );
};

export default CampaignTemplateCard;
