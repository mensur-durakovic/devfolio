import React from 'react';

import Section from '../section';
import SummaryItem from '../summary-item';

const SectionVolunteering = ({ volunteering }) => {
  if (!volunteering.length) return null;

  return (
    <Section title="Volunteering">
      {volunteering.map((vol) => (
        <SummaryItem
          key={vol.name}
          name={vol.name}
          description={vol.description}
          link={vol.link}
        />
      ))}
    </Section>
  );
};

export default SectionVolunteering;