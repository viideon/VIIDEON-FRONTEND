import React from "react";
import { Card, CardActionArea, CardActions, CardContent, Button, CardMedia, Typography } from "@material-ui/core";


interface IProps {
    moveToNextStep: () => void;
    template: any;
}
const CampaignTemplateCard: React.FC<IProps> = ({ moveToNextStep, template }) => {
    return <Card  >
        <CardActionArea>
            <CardMedia
                component="img"
                alt="Template Thumbnail"
                height="140"
                image={template.templateThumbnailUrl}
            />
            <CardContent style={{ maxHeight: "100px", minHeight: "100px" }}>
                <Typography gutterBottom variant="h5" component="h2">
                    {template.name}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                    {template.templateDescription}
                </Typography>
            </CardContent>
        </CardActionArea>
        <CardActions>
            <Button size="small" color="primary" onClick={moveToNextStep}>
                Proceed
      </Button>
        </CardActions>
    </Card>
}

export default CampaignTemplateCard;