'use client'

import styles from './IncantoFooter.module.css'

/**
 * Premium, minimal footer used only on the Incanto page.
 * Keeps only the copyrights with a darker, more luxurious feel.
 */
export const IncantoFooter = () => {
  const currentYear = new Date().getFullYear()
  
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <p className={styles.copyright}>
          © {currentYear}{' '}
          <a
            href="https://adinfinity.gr/"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.link}
          >
            adinfinity
          </a>
          . All rights reserved.
        </p>
      </div>
    </footer>
  )
}


