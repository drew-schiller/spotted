import React from 'react'

type Props = {}

const HeroSection = (props: Props) => {

  const description: string = "How well do you know your friend's music taste? "
  

  return (
    <section className='hero-section'>
      <h1 className="app-title">Spotted</h1>
      <p className="app-description">{description}</p>
      <button className='play-btn btn'>PLAY</button>
    </section>
  )
}

export default HeroSection