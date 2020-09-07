import React from "react";
import { Card, CardActionArea, CardActions, CardContent, Button, CardMedia, Typography } from "@material-ui/core";


interface IProps {
    moveToNextStep: () => void;
}
const CampaignTemplateCard: React.FC<IProps> = ({ moveToNextStep }) => {
    return <Card >
        <CardActionArea>
            <CardMedia
                component="img"
                alt="Template Thumbnail"
                height="140"
                image="https://media.istockphoto.com/photos/law-should-know-concept-the-lawyer-explained-to-the-client-to-plan-picture-id944503634?k=6&m=944503634&s=612x612&w=0&h=sLdq_w0yE062amiwD04H-HkWYVptoMMhkqKvSEdm_nA="
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                    Lawyer
        </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                    Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging
                    across all continents except Antarctica
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