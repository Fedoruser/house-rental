import { MotionSection } from '@shared/ui/Section/MotionSection'
import styles from './HeroSection.module.scss'
import { Button, Input } from 'antd'

export const HeroSection = () => {
  return (
    <MotionSection fullscreen id="about">
      <div className={`container ${styles.heroGrid}`}>
        {/* Левая часть: Текст */}
        <div className={styles.heroContent}>
          <span className={styles.subtitle}>Аренда загородных домов</span>
          <h1>
            Найдите идеальное место
            <br />
            для отдыха
          </h1>
          <p>
            Уютные дома, бани и коттеджи для вашего идеального отдыха вдали от
            городской суеты.
          </p>
        </div>

        {/* Правая часть: Форма */}
        <div className={styles.formCard}>
          <h3>Быстрая консультация</h3>
          <p>Оставьте номер, и мы подберем дом за 5 минут</p>

          <div className={styles.formGroup}>
            <Input
              placeholder="Ваше имя"
              size="large"
              className={styles.input}
            />
            <Input
              placeholder="+7 (___) ___-__-__"
              size="large"
              className={styles.input}
            />
            <Button
              type="primary"
              size="large"
              block
              className={styles.submitBtn}
            >
              Жду звонка
            </Button>
          </div>

          <span className={styles.privacy}>
            Нажимая кнопку, вы соглашаетесь с условиями
          </span>
        </div>
      </div>
    </MotionSection>
  )
}
