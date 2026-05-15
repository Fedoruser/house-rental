import { ReactNode } from 'react'
import styles from './Section.module.scss'

interface Props {
  children: ReactNode
  id?: string
}

export const Section = ({ children, id }: Props) => {
  return (
    <section id={id} className={styles.section}>
      <div className="container">{children}</div>
    </section>
  )
}
