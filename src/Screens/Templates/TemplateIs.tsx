import React, { useEffect } from "react";
import { connect } from "react-redux";
import { getTemplate } from "../../Redux/Actions/videos";

const TemplateIs = ({
  getTemplate,
  getSingleTemplate,
  tempName,
  video,
}: any) => {
  useEffect(() => {
    getTemplate(video);
  }, []);
  return (
    <div className="showtemplate">
      {getSingleTemplate && (
        <div dangerouslySetInnerHTML={{ __html: getSingleTemplate }}></div>
      )}
      {/* <div dangerouslySetInnerHTML={{ __html: getSingleTemplate }}></div> */}

      {/* {console.log("template from api in component", getSingleTemplate)} */}
    </div>
  );
};

const mapStateToProps = (state: any) => {
  return {
    loadingTemplate: state.video.loadingTemplate,
    getSingleTemplate: state.video.getSingleTemplate,
  };
};
const mapDispatchToProps = (dispatch: any) => {
  return {
    getTemplate: (name: any) => dispatch(getTemplate(name)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(TemplateIs);
