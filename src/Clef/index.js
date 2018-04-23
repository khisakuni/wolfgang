import { connect } from "react-redux";
import Clef from "./components/Clef";
import { addClef, deleteClef } from "../reducers/clefs";

const mapStateToProps = ({ clefs }) => ({ clefs });
const mapDispatchToProps = {
  addClef,
  deleteClef
};

export default connect(mapStateToProps, mapDispatchToProps)(Clef);
