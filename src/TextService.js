function TextService() {
  return {
    insertString(position, text, stringToInsert) {
      text = text || '';
      return text.slice(0, position) + stringToInsert + text.slice(position);
    },

    wrapByStringOrCut(str, strElement, cursor) {
      if (str.slice(cursor.start - strElement.open.length, cursor.start) === strElement.open) {
        return {
          str: str.slice(0, cursor.start - strElement.open.length) +
            str.slice(cursor.start, cursor.end) +
            str.slice(cursor.end + strElement.close.length, str.length),
          cursor: {
            start: cursor.start - strElement.open.length,
            end: cursor.end - strElement.open.length
          }
        }
      }
      return {
        str: str.slice(0, cursor.start) +
          strElement.open +
          str.slice(cursor.start, cursor.end) +
          strElement.close + str.slice(cursor.end, str.length),
        cursor: {
          start: cursor.start + strElement.open.length,
          end: cursor.end + strElement.open.length
        }
      }
    },

    setCursor(input, cursor) {
      setTimeout(() => {
        input.focus();
        input.setSelectionRange(cursor.start, cursor.end || cursor.start);
      }, 10);
    },

    buildImage(src) {
      return `\n<img height="300" style="margin: 0.5rem;" src="${src}">\n`;
    },

    buildElement(elContent) {
      return {
        open: `<${elContent}>`,
        close: `</${elContent}>`
      };
    },

    getStartText(position) {
      return position + '\n<p>\n'.length;
    },

    getEndText(position) {
      return position + '\n<p>\n'.length + 'текст'.length;
    },
  }
}

TextService.$inject = [];

export default TextService;
