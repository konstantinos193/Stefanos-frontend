'use client'

type IncantoHeroProps = {
  lang: string
}

export function IncantoHero({ lang }: IncantoHeroProps) {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black">
      {/* Background with exact L'incanto logo image */}
      <div 
        className="absolute inset-0 bg-black"
        style={{
          backgroundImage: 'url(/incanto-logo.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center center',
          backgroundRepeat: 'no-repeat',
          backgroundColor: '#000000'
        }}
      />
    </section>
  )
}

