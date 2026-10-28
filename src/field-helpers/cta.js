// Fields for the CTA module (hubspot/q-theme/modules/cta.module). Each helper takes optional
// overrides, e.g. ctaLink({ id: 'cta.link', name: 'link' }).
const { field, select, toggle, group, when, adv, ADVANCED } = require('./builders');

const ALIGNMENTS = [['start', 'Left'], ['center', 'Center'], ['end', 'Right']];
const BUTTON_COLOURS = [['primary', 'Primary'], ['secondary', 'Secondary'], ['teal', 'Teal'], ['indigo', 'Indigo'], ['orange', 'Orange'], ['red', 'Red'], ['dark', 'Dark'], ['light', 'Light']];
const BUTTON_STYLES = [['-', 'Normal'], ['-outline-', 'Outline'], ['-gradient-', 'Gradient']];
const BUTTON_SIZES = [['btn-sm', 'Small'], [' ', 'Standard'], ['btn-lg', 'Large']];
const TEXT_COLOURS = [['text-white', 'Light'], ['text-dark', 'Dark']];

// The download controls only apply to external and file links.
const urlIsDownloadable = (linkPath) => [when(linkPath, 'EXTERNAL', 'url.type'), when(linkPath, 'FILE', 'url.type')];
const downloadOn = (downloadPath, linkPath) =>
  adv('AND', [when(downloadPath, 'true')], [adv('OR', urlIsDownloadable(linkPath))]);

const plainText = (props) =>
  field({ validation_regex: '', allow_new_line: false, show_emoji_picker: false, type: 'text', ...props });

const ctaAlignment = (props) =>
  select({ id: 'alignment', name: 'alignment', label: 'Alignment', choices: ALIGNMENTS, ...props });

const ctaSmallAlignment = (props) =>
  select({
    id: 'small_alignment',
    name: 'small_alignment',
    label: 'Alignment on small screens',
    choices: [['default', 'Default'], ...ALIGNMENTS],
    default: 'default',
    ...props,
  });

const ctaLink = (props) =>
  field({
    id: 'link',
    name: 'link',
    label: 'Link',
    supported_types: ['EXTERNAL', 'CONTENT', 'FILE', 'EMAIL_ADDRESS'],
    show_advanced_rel_options: true,
    type: 'link',
    default: {
      url: { type: 'EXTERNAL', href: 'www.hubspot.com', content_id: null },
      open_in_new_tab: false,
      no_follow: false,
    },
    ...props,
  });

// `linkPath` and `downloadPath` are the paths of the link and download fields this one reads.
const ctaDownload = ({ linkPath = 'link', ...props } = {}) =>
  toggle({
    id: 'download',
    name: 'download',
    label: 'Download',
    visibility_rules: ADVANCED,
    advanced_visibility: adv('OR', urlIsDownloadable(linkPath)),
    default: false,
    ...props,
  });

const ctaDownloadName = ({ linkPath = 'link', downloadPath = 'download', ...props } = {}) =>
  plainText({
    id: 'download_file',
    name: 'download_file',
    label: 'Download name',
    visibility_rules: ADVANCED,
    advanced_visibility: downloadOn(downloadPath, linkPath),
    default: '',
    ...props,
  });

const ctaDownloadOnLoad = ({ linkPath = 'link', downloadPath = 'download', ...props } = {}) =>
  toggle({
    id: 'download_on_page_load',
    name: 'download_on_page_load',
    label: 'Download automatically',
    visibility_rules: ADVANCED,
    advanced_visibility: downloadOn(downloadPath, linkPath),
    default: false,
    ...props,
  });

const ctaButtonText = (props) =>
  plainText({ id: 'button_text', name: 'button_text', label: 'Button text', required: true, default: 'Add a button link here', ...props });

const ctaButtonColour = (props) =>
  select({ id: 'button_colour', name: 'button_colour', label: 'Button Colour', choices: BUTTON_COLOURS, default: 'primary', ...props });

const ctaButtonStyle = (props) =>
  select({ id: 'button_style', name: 'button_style', label: 'Button Style', choices: BUTTON_STYLES, default: '-', ...props });

// Only shown once the button style is not the plain "-" one.
const ctaTextColour = ({ buttonStylePath = 'button_style', ...props } = {}) =>
  select({
    id: 'text_colour',
    name: 'text_colour',
    label: 'Text colour',
    locked: true,
    visibility: when(buttonStylePath, '-', null, 'NOT_EQUAL'),
    choices: TEXT_COLOURS,
    default: 'text-dark',
    ...props,
  });

const ctaButtonSize = (props) =>
  select({ id: 'button_size', name: 'button_size', label: 'Button Size', choices: BUTTON_SIZES, default: ' ', ...props });

const ctaWordWrap = (props) =>
  toggle({ id: 'word_wrap', name: 'word_wrap', label: 'Enable word wrap', default: false, ...props });

const ctaAdvancedGroup = (props) =>
  field({
    id: 'advanced',
    name: 'advanced',
    label: 'Advanced',
    children: [
      plainText({ id: 'advanced.additional_classes', name: 'additional_classes', label: 'Additional Classes' }),
      toggle({ id: 'advanced.trigger_modal', name: 'trigger_modal', label: 'Trigger modal', default: false }),
      plainText({ id: 'advanced.modal_id', name: 'modal_id', label: 'Modal ID' }),
    ],
    ...group({}),
    default: { trigger_modal: false },
    ...props,
  });

module.exports = {
  ALIGNMENTS,
  BUTTON_COLOURS,
  BUTTON_STYLES,
  BUTTON_SIZES,
  TEXT_COLOURS,
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
};
