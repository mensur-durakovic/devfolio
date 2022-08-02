import React from 'react';

import Section from '../section';
import SummaryItem from '../summary-item';

const BlogPosts = ({ posts }) => {

  function status(p){
    if(p.status == 0) return 0
    if(p.status > 0) return 1
    if(p.status < 0) return 2
  }

  const PATIENT_STATUSES = {
    NEW: 1,
    UNAUTHORIZED: 0,
    DEACTIVATED: 2
  }

  function getPatientStatus(patient){
    if(patient.status === 0){ 
      return PATIENT_STATUSES.UNAUTHORIZED
    }
    if(patient.status > 0){ 
      return PATIENT_STATUSES.NEW
    } 
    return PATIENT_STATUSES.DEACTIVATED
  }


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
