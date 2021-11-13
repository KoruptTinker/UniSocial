import PropTypes from "prop-types";
import UploadFile from "./UploadFile.jsx";

const EditAvatar = ({ src }) => {
  return (
    <UploadFile />
  );
};

EditAvatar.propTypes = {
  src: PropTypes.string,
};

EditAvatar.defaultProps = { src: "" };
export default EditAvatar;