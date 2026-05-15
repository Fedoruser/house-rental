import { motion } from 'framer-motion'
import { MotionSection } from '@shared/ui/Section/MotionSection'
import styles from './ContactsSection.module.scss'

export const ContactsSection = () => {
  return (
    <MotionSection id="contacts" className={styles.section}>
      <div className="container">
        <div className={styles.wrapper}>
          <div className={styles.header}>
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              className={styles.label}
            >
              Остались вопросы?
            </motion.span>
            <h2>Связаться с нами</h2>
            <p>Оставьте заявку, и мы перезвоним вам в течение 15 минут</p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className={styles.card}
          >
            <form className={styles.form} onSubmit={e => e.preventDefault()}>
              <div className={styles.inputGroup}>
                <input type="text" placeholder="Ваше имя" required />
              </div>

              <div className={styles.inputGroup}>
                <input type="tel" placeholder="Номер телефона" required />
              </div>

              <div className={styles.inputGroup}>
                <textarea placeholder="Ваше сообщение (необязательно)" />
              </div>

              <button type="submit" className={styles.submitBtn}>
                <span>Отправить заявку</span>
                <div className={styles.btnEffect} />
              </button>
            </form>

            <p className={styles.policy}>
              Нажимая кнопку, вы соглашаетесь с политикой конфиденциальности
            </p>
          </motion.div>
        </div>
      </div>
    </MotionSection>
  )
}
