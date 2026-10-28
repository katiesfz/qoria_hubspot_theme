const { field, group } = require('../../../../src/field-helpers/builders');
const {
  ctaAlignment,
  ctaSmallAlignment,
  ctaLink,
  ctaDownload,
  ctaDownloadName,
  ctaDownloadOnLoad,
  ctaButtonText,
  ctaButtonColour,
  ctaButtonStyle,
  ctaTextColour,
  ctaButtonSize,
  ctaWordWrap,
  ctaAdvancedGroup,
} = require('../../../../src/field-helpers/cta');

const stylesGroup = field({
  id: 'styles',
  name: 'styles',
  label: 'Styles',
  children: [
    field({
      id: 'styles.spacing_field',
      name: 'spacing_field',
      label: 'Spacing',
      type: 'spacing',
      default: { margin: { top: { value: 0, units: 'px' }, bottom: { value: 0, units: 'px' } } },
    }),
  ],
  ...group({ tab: 'STYLE' }),
});

module.exports = () => [
  ctaAlignment(),
  ctaSmallAlignment(),
  ctaLink(),
  ctaDownload(),
  ctaDownloadName(),
  ctaDownloadOnLoad(),
  ctaButtonText(),
  ctaButtonColour(),
  ctaButtonStyle(),
  ctaTextColour(),
  ctaButtonSize(),
  ctaWordWrap(),
  ctaAdvancedGroup(),
  stylesGroup,
];
