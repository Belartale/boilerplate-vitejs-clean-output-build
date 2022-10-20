// Components
// import './components';
import { constHeader } from './components';

// Styles
import './index.scss'

import './assets/images/burst-logo.png'

// alert('Alert ./src/index.ts');

const functionCustomConsoleLog = (text: string) => {
    return console.log(text)
};

functionCustomConsoleLog('>>> test functionCustomConsoleLog <<<' + constHeader)