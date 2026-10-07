# Blog tag descriptions

How to add a description to a blog tag listing page (e.g. `/resources/tag/byod`) using the **Blog Tag Descriptions** module.

## What it does

On a tag listing page the description is used in two places:

- The visible intro paragraph under the tag title (`<p class="blog-tag-desc">`).
- The page's `<meta name="description">`.

If no description is set for a tag, the page falls back to the blog's own description (`blog.description` from the blog settings). If that is empty too, neither the paragraph nor the meta tag is output.

## Where it lives

| Part | File |
| --- | --- |
| Module (fields only, no output) | `hubspot/q-theme/modules/blog-tag-descriptions.module/` |
| Module placed in the template | `hubspot/qoria-theme-us/templates/resource-index.html` (`{% module "tag_descriptions" ... %}`) |
| Lookup and output | Same template, in the `{% elif tag %}` branch |

Currently only the US resource listing template uses the module.

## Adding or editing a description

1. In HubSpot, open the blog listing template that uses `resource-index.html` (Linewize US - Resource Listing) in the page editor.
2. Find the **Blog Tag Descriptions** module (named `tag_descriptions`) and open its fields.
3. Click **Add** under **Tag descriptions** to create a new row.
4. **Select tag**: choose the blog tag. The tag's *slug* is what is saved and matched.
5. **Description**: enter the text (single line, no line breaks).
6. Publish/update the template. Changes apply to all tag listing pages for that blog.

To edit or remove a description, change or delete its row in the same module. Rows can be reordered; order does not matter.

## Things to know

- **One description per tag.** If the same tag is added twice, only one row is used, so keep to one row per tag.
- **Both fields are required for a row to count.** A row with a tag but an empty description (or the reverse) is ignored, and that tag falls back to the blog description.
- **Matching is by slug.** The template looks up `blog_tag.slug`. If a tag's slug is later changed in HubSpot, re-select the tag in its row.
- **Tag listing pages only.** The descriptions are not used on the main listing page or on author pages (`blog_author`), which have their own branches in the template.
- **Keep it short.** The text is shown as a heading-sized (`h4`) intro and used as the meta description, so aim for roughly 150 characters or fewer.
- **Plain text only.** The meta description is attribute-escaped and the visible text is a plain `<p>`, so HTML won't render.

## Using the module in another template

1. Add the module near the top of the listing template:

   ```hubl
   {% module "tag_descriptions" path="/q-theme/modules/blog-tag-descriptions" %}
   ```

2. In the `{% elif tag %}` branch, build the lookup from the module's saved data and use it:

   ```hubl
   {% set tag_descriptions = {} %}

   {% for tag_description in content.widgets.tag_descriptions.body.tag_descriptions %}
     {% if tag_description.tag and tag_description.description %}
       {% do tag_descriptions.put(tag_description.tag, tag_description.description) %}
     {% endif %}
   {% endfor %}

   {% set custom_description = tag_descriptions[blog_tag.slug] || blog.description %}
   ```

The module name (`tag_descriptions`) must match the `content.widgets.<name>` reference in the loop. The module's own `module.html` does not render anything; it only exists to hold the fields.
