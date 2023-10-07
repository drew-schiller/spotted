import React from 'react'

type Props = {
  header: string;
};

const InfoSection = ({ header }: Props) => {
  return (
    <section className="info-section">
      <div>InfoSection</div>
      <h2>{header}</h2>
    </section>
  );
};

export default InfoSection;