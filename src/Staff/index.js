import { connect } from 'react-redux'
import Staff from './components/Staff'
import { addStaff, deleteStaff } from '../reducers/staves'

const mapStateToProps = ({ staves, measures, notes, clefs }) => ({ staves, measures, notes, clefs })

const mapDispatchToProps = { addStaff, deleteStaff }

export default connect(mapStateToProps, mapDispatchToProps)(Staff)
