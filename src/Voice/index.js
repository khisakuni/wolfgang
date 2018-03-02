import { connect } from 'react-redux'
import Voice from './components/Voice'
import { addVoice, deleteVoice } from '../reducers/voices'

const mapStateToProps = state => state.voices

const mapDispatchToProps = { addVoice, deleteVoice }

export default connect(mapStateToProps, mapDispatchToProps)(Voice)
