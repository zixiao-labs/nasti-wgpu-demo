import { useState } from 'react'
import logoUrl from '../logo.svg?url'

import { FlareCanvas } from './flare/FlareCanvas'

export function App() {
  const [colorMode, setColorMode] = useState(true)

  return (
    <main className={`experience${colorMode ? ' experience--color' : ''}`}>
      <FlareCanvas colorMode={colorMode} />

      <header className="site-header">
        <a className="brand" href="/" aria-label="Zixiao Laboratories home">
          <img className="brand__mark" src={logoUrl} alt="" />
          <span className="brand__wordmark">
            <span>ZIXIAO</span>
            <span>LABORATORIES</span>
          </span>
        </a>

        <button
          className="mode-toggle"
          type="button"
          role="switch"
          aria-checked={colorMode}
          onClick={() => setColorMode((enabled) => !enabled)}
        >
          <span className="mode-toggle__copy">
            <span className="mode-toggle__label">Color mode</span>
            <span className="mode-toggle__value">
              {colorMode ? 'Logo palette' : 'Template glow'}
            </span>
          </span>
          <span className="mode-toggle__track" aria-hidden="true">
            <span className="mode-toggle__thumb" />
          </span>
        </button>
      </header>

      <section className="intro" aria-labelledby="intro-title">
        <p className="eyebrow">WebGPU / Light study 01</p>
        <h1 id="intro-title">A mark<br />drawn in light.</h1>
        <p className="intro__note">
          Move your pointer to direct the flare.<br />Leave the canvas to let it roam.
        </p>
      </section>

      <div className="status" aria-hidden="true">
        <span className="status__pulse" />
        Live render · 30 FPS
      </div>
    </main>
  )
}
