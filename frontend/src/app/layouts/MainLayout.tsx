import { useState, useEffect } from 'react'
import { Layout } from 'antd'
import { Outlet } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import styles from './MainLayout.module.scss'

const { Header, Content } = Layout

export const MainLayout = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => setIsMenuOpen(prev => !prev)
  const closeMenu = () => setIsMenuOpen(false)

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isMenuOpen])

  const menuVariants = {
    closed: {
      x: '100%',
      transition: {
        type: 'spring',
        stiffness: 400,
        damping: 40,
      },
    },
    opened: {
      x: 0,
      transition: {
        type: 'spring',
        stiffness: 400,
        damping: 40,
        staggerChildren: 0.08,
        delayChildren: 0.1,
      },
    },
  } as const

  const linkVariants = {
    closed: { opacity: 0, x: 20 },
    opened: { opacity: 1, x: 0 },
  }

  const navLinks = [
    { href: '#about', label: 'О нас' },
    { href: '#catalog', label: 'Каталог' },
    { href: '#gallery', label: 'Галерея' },
    { href: '#reviews', label: 'Отзывы' },
    { href: '#contacts', label: 'Контакты' },
  ]

  return (
    <Layout className={styles.layout}>
      <Header className={styles.header}>
        <div className={`container ${styles.headerInner}`}>
          <div className={styles.logo}>HOUSE RENTAL</div>

          <nav className={styles.desktopNav}>
            {navLinks.map(link => (
              <a key={link.href} href={link.href}>
                {link.label}
              </a>
            ))}
          </nav>

          <button
            className={`${styles.burger} ${isMenuOpen ? styles.burgerActive : ''}`}
            onClick={toggleMenu}
            aria-label="Переключить меню"
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </Header>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className={styles.mobileMenu}
            initial="closed"
            animate="opened"
            exit="closed"
            variants={menuVariants}
          >
            <nav className={styles.mobileNav}>
              {navLinks.map(link => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  variants={linkVariants}
                  onClick={closeMenu}
                >
                  {link.label}
                </motion.a>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      <Content className={styles.content}>
        <Outlet />
      </Content>
    </Layout>
  )
}
