// Components
// import './components';
import { constHeader } from './components';

// Styles
import './index.scss';

import './assets/images/burst-logo.png';

// alert('Alert ./src/index.ts');

const functionCustomConsoleLog = (text: string) => {
    try {
        return console.log(text);
    } catch (error) {
        console.log('functionCustomConsoleLog => error', error);
    } finally {
        console.log('functionCustomConsoleLog => finally');
    }
};

functionCustomConsoleLog('>>> test functionCustomConsoleLog <<<' + constHeader);
