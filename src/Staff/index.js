import { connect } from 'react-redux'
import Staff from './components/Staff'
import { addStaff, deleteStaff } from '../reducers/staves'

const mapStateToProps = ({ staves, measures, notes }) => ({ staves, measures, notes })

const mapDispatchToProps = { addStaff, deleteStaff }

export default connect(mapStateToProps, mapDispatchToProps)(Staff)
