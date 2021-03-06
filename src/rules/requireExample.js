import _ from 'lodash';
import iterateJsdoc from '../iterateJsdoc';

export default iterateJsdoc(({
  jsdoc,
  report,
  utils
}) => {
  if (utils.avoidDocs()) {
    return;
  }

  const targetTagName = 'example';

  const functionExamples = _.filter(jsdoc.tags, {
    tag: targetTagName
  });

  if (utils.avoidExampleOnConstructors() && (
    utils.hasATag([
      'class',
      'constructor'
    ]) ||
    utils.isConstructor()
  )) {
    return;
  }

  if (!functionExamples.length) {
    report('Missing JSDoc @' + targetTagName + ' declaration.');

    return;
  }

  functionExamples.forEach((example) => {
    const exampleContent = _.compact((example.name + ' ' + example.description).trim().split('\n'));

    if (!exampleContent.length) {
      report('Missing JSDoc @' + targetTagName + ' description.');
    }
  });
}, {
  meta: {
    type: 'suggestion'
  }
});
