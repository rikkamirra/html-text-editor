const textEditor = {
  restrict: 'E',
  template: require('./textEditor.html'),
  bindings: {
    myText: '=',
    addImage: '&'
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

  this.addList = () => {
    var stringToInsert = '\n<ul>\n<li></li>\n</ul>';
    this.myText = TextService.insertString(this.cursor.start, this.myText, stringToInsert);
    TextService.setCursor(this.textareaElement, { start: this.cursor.start + 10 });
    this.isInsideList = true;
  };

  this.handleKeyPress = (e) => {
    switch (e.code) {
      case "Enter":
        e.preventDefault();
        let position = e.srcElement.selectionStart;
        let stringToInsert = '</br>\n';
        let cursorStart = position + stringToInsert.length;

        if (this.myText.slice(position, position + 5) === '</li>') {
          stringToInsert = '\n<li></li>';
          position += 5;
          cursorStart = position + 5;
        }
        this.myText = TextService.insertString(position, this.myText, stringToInsert);
        TextService.setCursor(e.srcElement, { start: cursorStart });
        break;
      default:
        break;
    }
  };
}

TextEditorController.$inject = ['TextService'];

export default textEditor;
