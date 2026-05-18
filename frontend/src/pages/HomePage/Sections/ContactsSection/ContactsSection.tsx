import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MotionSection } from '@shared/ui/Section/MotionSection'
import { useCreateLead } from '@shared/hooks/useCreateLead'
import { useFormLock } from '@shared/hooks/useFormLock'

import styles from './ContactsSection.module.scss'

export const ContactsSection = () => {
  const currentYear = new Date().getFullYear()

  const [formData, setFormData] = useState({ name: '', phone: '', message: '' })

  const { mutate, isPending } = useCreateLead()
  const { isLocked, lockForm } = useFormLock()

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const leadData = {
      name: formData.name,
      phone: formData.phone,
      message: formData.message || undefined,
      source: 'contacts_form' as const,
    }

    mutate(leadData, {
      onSuccess: () => {
        setFormData({ name: '', phone: '', message: '' })
        lockForm()
      },
    })
  }

  return (
    <MotionSection id="contacts" fullscreen snap className={styles.section}>
      <div className={styles.wrapper}>
        <div className={styles.mainContent}>
          <div className={styles.header}>
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className={styles.label}
            >
              Остались вопросы?
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              Связаться с нами
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15 }}
            >
              Оставьте заявку, и мы перезвоним вам в течение 15 минут
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 30 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ type: 'spring', duration: 0.6 }}
            className={styles.card}
          >
            <AnimatePresence mode="wait">
              {!isLocked ? (
                <motion.div
                  key="contacts-form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                >
                  <form className={styles.form} onSubmit={handleSubmit}>
                    <div className={styles.inputGroup}>
                      <input
                        type="text"
                        name="name"
                        placeholder="Ваше имя"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        disabled={isPending}
                      />
                    </div>

                    <div className={styles.inputGroup}>
                      <input
                        type="tel"
                        name="phone"
                        placeholder="Номер телефона"
                        required
                        value={formData.phone}
                        onChange={handleChange}
                        disabled={isPending}
                      />
                    </div>

                    <div className={styles.inputGroup}>
                      <textarea
                        name="message"
                        placeholder="Ваше сообщение (необязательно)"
                        value={formData.message}
                        onChange={handleChange}
                        disabled={isPending}
                      />
                    </div>

                    <button
                      type="submit"
                      className={`${styles.submitBtn} ${isPending ? styles.loading : ''}`}
                      disabled={isPending}
                    >
                      <span>
                        {isPending ? 'Отправка...' : 'Отправить заявку'}
                      </span>
                    </button>
                  </form>

                  <p className={styles.policy}>
                    Нажимая кнопку, вы соглашаетесь с политикой
                    конфиденциальности
                  </p>
                </motion.div>
              ) : (
                <motion.div
                  key="contacts-success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  style={{ textAlign: 'center', padding: '20px 0' }}
                >
                  <div style={{ fontSize: '36px', marginBottom: '12px' }}>
                    🙏
                  </div>
                  <h3>Спасибо, мы уже связываемся с вами!</h3>
                  <p
                    style={{ marginTop: '8px', fontSize: '14px', opacity: 0.7 }}
                  >
                    Вы уже оставили заявку. Чтобы отправить новую, подождите
                    окончания блокировки спама.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>

        <footer className={styles.footer}>
          <div className={styles.footerContainer}>
            <div className={styles.footerTop}>
              <div className={styles.legalInfo}>
                <p className={styles.companyName}>ИП Иванов И. В.</p>
                <p>ИНН: 502733189900</p>
                <p>ОГРНИП: 326508100012345</p>
              </div>
              <div className={styles.footerLinks}>
                <a href="#policy">Политика конфиденциальности</a>
                <a href="#terms">Пользовательское соглашение</a>
              </div>
            </div>

            <div className={styles.footerBottom}>
              <p>© {currentYear} Все права защищены.</p>
              <p className={styles.developer}>Design & Development</p>
            </div>
          </div>
        </footer>
      </div>
    </MotionSection>
  )
}
