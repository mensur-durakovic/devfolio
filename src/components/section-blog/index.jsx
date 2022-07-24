import { Link } from 'gatsby';
import React from 'react';

import Section from '../section';
import SummaryItem from '../summary-item';

const SectionBlog = ({ posts }) => {
  return (
    <Section title="Latest Posts">
      {posts.map((post) => (
        <SummaryItem
          key={post.node.fields.slug}
          name={post.node.frontmatter.title}
          description={post.node.frontmatter.description}
          link={post.node.frontmatter.isStcArticle ? post.node.frontmatter.stcUrl : post.node.fields.slug}
          internal={!post.node.frontmatter.isStcArticle}
        />
      ))}
      {posts.length >= 5 && (
        <Link className="text-gray-500 text-sm hover:text-black" to="/blog">
          View all posts &rarr;
        </Link>
      )}
    </Section>
  );
};

export default SectionBlog;
