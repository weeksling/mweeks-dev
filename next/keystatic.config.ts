import { config, collection, fields } from '@keystatic/core';

export default config({
  storage: {
    kind: 'local',
  },
  collections: {
    posts: collection({
      label: 'Posts',
      slugField: 'title',
      path: 'content/posts/*',
      format: {
        contentField: 'content',
      },
      entryLayout: 'content',
      schema: {
        title: fields.slug({ name: { label: 'Title', validation: { isRequired: true } } }),
        templateKey: fields.text({
          label: 'Template Key',
          defaultValue: 'blog-post',
        }),
        date: fields.datetime({
          label: 'Date',
          validation: { isRequired: true },
        }),
        description: fields.text({
          label: 'Description',
          multiline: true,
          validation: { isRequired: true },
        }),
        featuredpost: fields.checkbox({
          label: 'Featured Post',
          defaultValue: false,
        }),
        featuredimage: fields.text({
          label: 'Featured Image',
          description: 'Path to the featured image (e.g. /images/my-image.jpg)',
        }),
        tags: fields.array(fields.text({ label: 'Tag' }), {
          label: 'Tags',
          itemLabel: (props) => props.value,
        }),
        content: fields.markdoc({
          label: 'Content',
          extension: 'md',
        }),
      },
    }),
  },
});
