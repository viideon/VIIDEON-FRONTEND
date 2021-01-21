import React, { useEffect } from "react";
import { connect } from "react-redux";
import { getTemplate } from "../../Redux/Actions/videos";

const TemplateIs = ({ getTemplate, getSingleTemplate }: any) => {
  useEffect(() => {
    getTemplate("sleek");
  }, []);
  return (
    <div>
      <h1>template</h1>
      <div dangerouslySetInnerHTML={{ __html: getSingleTemplate }}></div>
      {/* {getSingleTemplate} */}
      {console.log("temp from api is", getSingleTemplate)}
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
