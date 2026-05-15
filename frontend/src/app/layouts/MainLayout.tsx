import { Layout } from 'antd'
import { Outlet } from 'react-router-dom'
import styles from './MainLayout.module.scss'

const { Header, Content } = Layout

export const MainLayout = () => {
  return (
    <Layout className={styles.layout}>
      <Header className={styles.header}>
        <div className={`container ${styles.headerInner}`}>
          <div className={styles.logo}>HOUSE RENTAL</div>

          <nav className={styles.nav}>
            <a href="#hero">О нас</a>
            <a href="#catalog">Каталог</a>
            <a href="#gallery">Галерея</a>
            <a href="#reviews">Отзывы</a>
            <a href="#contacts">Контакты</a>
          </nav>
        </div>
      </Header>

      <Content className={styles.content}>
        <Outlet />
      </Content>
    </Layout>
  )
}
