import React from "react";
// import LinearProgress from "@material-ui/core/LinearProgress";
import "./styles.css";

type IProps = {
  styles?: object;
  Title: string;
  Number?: number;
  iconBg?: string;
};
const HeaderCard: React.FC<IProps> = ({ styles, Title, Number, iconBg }) => {
  const renderIcon = () => {
    switch (Title) {
      case "VIDEOS":
        return <i className="fas fa-video iconCards" />;
      case "VIEWS":
        return <i className="far fa-eye iconCards" />;
      case "CAMPAIGNS":
        return <i className="fas fa-bullhorn iconCards" />;
      case "CONTACTS":
        return <i className="far fa-id-card iconCards" />;
      default:
        break;
    }
  };
  return (
    <div className="CardMain">
      <span className="cardTitle">{Number}</span>
      <div className="detailsCard">
        <span className="wrapperIconCard">{renderIcon()}</span>
        <div className="detailCardHeader">
          <span className="cardText"> {Title}</span>
        </div>
      </div>
    </div>
  );
};
export default HeaderCard;
