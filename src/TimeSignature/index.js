import { connect } from 'react-redux'
import TimeSignature from './components/TimeSignature'
import { addTimeSignature, deleteTimeSignature } from '../reducers/time-signatures'

const mapStateToProps = ({ timeSignatures }) => ({ timeSignatures })
const mapDispatchToProps = {
  addTimeSignature,
  deleteTimeSignature,
}

export default connect(mapStateToProps, mapDispatchToProps)(TimeSignature)
