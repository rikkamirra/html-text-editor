const textEditor = {
  restrict: 'E',
  template: require('./textEditor.html'),
  bindings: {
    myText: '=',
  },
  controller: TextEditorController
};

function TextEditorController(TextService) {
  this.$onInit = () => {
    this.cursor = {
      start: 0,
      end: 0
    };
    this.textareaElement = document.getElementById('article-input');
    this.myText = this.myText || '';
  }

  this.saveCursor = (e) => {
    this.cursor.start = e.srcElement.selectionStart;
    this.cursor.end = e.srcElement.selectionEnd;
  };

  this.sortText = () => {
    this.myText = this.myText.split('\n').sort().join('\n');
  };

  this.wrapText = (wrap) => {
    const element = TextService.buildElement(wrap);
    const result = TextService.wrapByStringOrCut(
      this.myText,
      element,
      this.cursor
    );
    this.myText = result.str;
    this.cursor = result.cursor;
    TextService.setCursor(
      this.textareaElement,
      this.cursor
    );
  };

  this.handleKeyPress = (e) => {
    switch (e.code) {
      case "Enter":
        e.preventDefault();
        let position = e.srcElement.selectionStart;
        let stringToInsert = '</br>\n';
        this.myText = TextService.insertString(position, this.myText, stringToInsert);
        TextService.setCursor(e.srcElement, { start: position + stringToInsert.length });
        break;
      default:
        break;
    }
  };
}

TextEditorController.$inject = ['TextService'];

export default textEditor;
