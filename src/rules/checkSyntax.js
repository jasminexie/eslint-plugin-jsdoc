import iterateJsdoc from '../iterateJsdoc';

export default iterateJsdoc(({
  jsdoc,
  report
}) => {
  if (!jsdoc.tags) {
    return;
  }

  for (const tag of jsdoc.tags) {
    if (tag.type.slice(-1) === '=') {
      report('Syntax should not be Google Closure Compiler style.');
      break;
    }
  }
}, {
  meta: {
    type: 'suggestion'
  }
});
