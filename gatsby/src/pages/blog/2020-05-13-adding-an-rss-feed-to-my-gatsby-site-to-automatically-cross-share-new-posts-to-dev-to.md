---
templateKey: blog-post
title: >-
  Adding an RSS Feed To My Gatsby Site To Automatically Cross-share New Posts To
  DEV.to
date: 2020-05-13T12:51:19.426Z
description: >-
  With Gatsby, you can automatically distribute every blog post to Dev.TO and
  Medium with a few simple plugins and set up!
featuredpost: false
featuredimage: /img/blog-rss-devto-medium.png
tags:
  - blogging
  - gatsby
---
![]()

Gatsby's plugin system makes adding and extending functionality SUPER easy. Today I set up an RSS feed for my blog, so that new posts can be automatically distributed to Dev.TO and Medium, in about twenty minutes. 

Here's how you can do it in 10!

# Wait hold on. Why are we doing this?

An RSS Feed is a structured format for sharing subscribe-able content in an XML feed. It was the shit in the hey days of blogging when folks actually subscribed to blog feeds (RIP Google Reader, 2005–2013 😓).

But an XML feed can enable more than that. Because with a feed, you can do cool things like automatically cross-post all your blog posts to other platforms like Dev.to, and Medium. Just like how I've shared this post!

### Will this hurt your SEO? NOPE! The opposite.

Thanks to a concept called canonical links, you can share your blog posts on other platforms like Medium and Dev, but refer back to your site as the original source. You get the benefit of exposing content to other audiences, but you get to keep the page rank.

# So, how do we add the RSS feed to you Gatsby  site?

Thanks to Gatsby's awesome plugin system, we can use `gatsby-plugin-feed` to do most of the heavy lifting.

> **For this example** I'm using my site which uses MDX for my blog. If you have the same setup from the (Gatsby Blog Starter)\[https://github.com/gatsbyjs/gatsby-starter-bloghttps://github.com/gatsbyjs/gatsby-starter-blog] or the (NetlifyCMS Starter)\[https://github.com/netlify-templates/gatsby-starter-netlify-cms] then this should be about the same, but if not, you may need some customization from the docs. 
>
> Either way, feel free to follow along and ask questions below!

So, first off install the plugin:

```
npm i --save gatsby-plugin-feed
```

Then, add the following chunks to your `gatsby-config.js`

```javascript
module.exports = {
  siteMetaData: {
    // ....
    siteUrl: 'https://mweeks.dev',
    // ...
  },
  plugins: [
    // ...
    {
      resolve: `gatsby-plugin-feed`,
      options: {
        feeds: [
          {
            serialize: ({ query: { site, allMarkdownRemark } }) => {
              return allMarkdownRemark.edges.map(edge => {
                return Object.assign({}, edge.node.frontmatter, {
                  description: edge.node.excerpt,
                  date: edge.node.frontmatter.date,
                  url: site.siteMetadata.siteUrl + edge.node.fields.slug,
                  guid: site.siteMetadata.siteUrl + edge.node.fields.slug,
                  custom_elements: [{ "content:encoded": edge.node.html }]
                });
              });
            },
            query: `
              {
                allMarkdownRemark(
                  sort: { order: DESC, fields: [frontmatter___date] },
                ) {
                  edges {
                    node {
                      excerpt
                      html
                      fields { slug }
                      frontmatter {
                        title
                        date
                      }
                    }
                  }
                }
              }
            `,
            output: "/blog/rss.xml",
            match: "^/blog/"
          }
        ]
      }
    }
  ],
  // ...
}
```

And that's it! Next time I run a `gatsby build`, my site will have a shiny new `/blog/rss.xml` for all of my blog pages!

In my case, I simply `git commit`, do a `git push` and watch Netlify deploy it!

# How to share your feed automatically on Dev.to

You'll want to head over to <https://dev.to/settings/publishing-from-rss> and enter in your fancy new RSS feed URL, and just watch the magic happen!

![Dev TO Settings Page Publishing from RSS](/img/devto-settings-rss.png)

Be sure to check the **Mark the RSS source as canonical URL by default** option to get that delicious, delicious Google Juice.

## And that's it!

If you wanted to post it on Medium as well, you can copy this Zapier Zap! https://zapier.com/shared/16969b48fc141b0d85705bc2d7fe2109e64b61ce

Now you've got no barrier to writing, and no need to worry about lock-in!

Happy hacking, and please like and subscribe!
