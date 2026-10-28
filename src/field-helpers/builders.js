// Generic builders for HubSpot fields.js files. Used by the other helpers in this folder.

// Every HubSpot field carries these three keys, so they are written once here.
const field = (props) => ({ display_width: null, required: false, locked: false, ...props });

const select = (props) =>
  field({ display: 'select', multiple: false, reordering_enabled: true, preset: null, type: 'choice', ...props });

const toggle = (props) => field({ display: 'toggle', type: 'boolean', ...props });
const checkbox = (props) => field({ display: 'checkbox', type: 'boolean', ...props });

const group = (props) => ({ tab: 'CONTENT', expanded: false, type: 'group', ...props });

// Visibility. `when` is one criterion, `adv` wraps criteria in an advanced_visibility block.
const when = (path, regex, property = null, operator = 'EQUAL') => ({
  controlling_field: null,
  controlling_field_path: path,
  controlling_value_regex: regex,
  property,
  operator,
  access: null,
});
const adv = (boolean_operator, criteria, children = []) => ({ boolean_operator, criteria, children });
const ADVANCED = 'ADVANCED';

module.exports = { field, select, toggle, checkbox, group, when, adv, ADVANCED };
