import React from 'react';

import Section from '../section';
import SummaryItem from '../summary-item';

const SectionLanguages = ({ languages }) => {
  return (
    <Section title="Languages">
      {languages.map((language) => (
        <SummaryItem
          key={language.name}
          name={language.name}
          description={language.description}
        />
      ))}
    </Section>
  );
};

export default SectionLanguages;
