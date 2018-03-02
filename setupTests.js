import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

// Supress console.error from intentional errors
const printError = console.error
beforeEach(() => { console.error = () => {} })
afterEach(() => { console.error = printError })
