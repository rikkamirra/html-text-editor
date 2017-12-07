import textEditor from './textEditor/textEditor';
import TextService from './TextService';

const MODULE_NAME = 'HtmlTextEditor';

angular.module(MODULE_NAME, [])
.factory('TextService', TextService)
.component('textEditor', textEditor);

export default MODULE_NAME;
