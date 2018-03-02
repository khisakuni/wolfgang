import { connect } from 'react-redux'
import Note from './components/Note'
import { addNote, deleteNote } from '../reducers/notes'

const mapStateToProps = state => state.notes

const mapDispatchToProps = { addNote, deleteNote }

export default connect(mapStateToProps, mapDispatchToProps)(Note)
