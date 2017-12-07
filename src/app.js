import textEditor from './textEditor/textEditor';

const MODULE_NAME = 'HtmlTextEditor';

angular.module(MODULE_NAME, [])
.component('textEditor', textEditor);

export default MODULE_NAME;
