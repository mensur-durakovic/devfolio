import React from 'react';

import Section from '../section';
import SummaryItem from '../summary-item';

const BlogPosts = ({ posts }) => {
  console.log("posts", posts)
  return (
    <Section title="All Blog Posts">
      {posts.map((post) => (
        <SummaryItem
          key={post.node.fields.slug}
          name={post.node.frontmatter.title}
          description={post.node.frontmatter.description}
          link={post.node.frontmatter.isStcArticle ? post.node.frontmatter.stcUrl : post.node.fields.slug}
          internal={!post.node.frontmatter.isStcArticle}
        />
      ))}
    </Section>
  );
};

export default BlogPosts;
