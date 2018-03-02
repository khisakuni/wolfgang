import { connect } from 'react-redux'
import Sheet from './components/Sheet'
import { addSheet, deleteSheet } from '../reducers/sheets'

const mapStateToProps = ({ sheets, staves, measures }) => ({ sheets, staves, measures })

const mapDispatchToProps = { addSheet, deleteSheet }

export default connect(mapStateToProps, mapDispatchToProps)(Sheet)
