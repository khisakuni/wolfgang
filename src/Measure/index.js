import { connect } from 'react-redux'
import Measure from './components/Measure'
import { addMeasure, deleteMeasure } from '../reducers/measures'

const mapStateToProps = state => state.measures

const mapDispatchToProps = { addMeasure, deleteMeasure }

export default connect(mapStateToProps, mapDispatchToProps)(Measure)
