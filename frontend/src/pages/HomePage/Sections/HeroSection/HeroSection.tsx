import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MotionSection } from '@shared/ui/Section/MotionSection'
import { useCreateLead } from '@shared/hooks/useCreateLead'
import { useFormLock } from '@shared/hooks/useFormLock'

import styles from './HeroSection.module.scss'

export const HeroSection = () => {
  const [formData, setFormData] = useState({ name: '', phone: '' })

  const { mutate, isPending } = useCreateLead()
  const { isLocked, lockForm } = useFormLock()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const leadData = {
      name: formData.name,
      phone: formData.phone,
      source: 'hero_form' as const,
    }

    mutate(leadData, {
      onSuccess: () => {
        setFormData({ name: '', phone: '' })
        lockForm()
      },
    })
  }

  return (
    <MotionSection fullscreen snap id="about">
      <div className={`container ${styles.heroGrid}`}>
        <div className={styles.heroContent}>
          <motion.span
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className={styles.subtitle}
          >
            Проектирование и строительство
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            Строим современные <br className={styles.desktopBr} /> дома для
            жизни
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Создаем технологичные загородные дома по скандинавским и европейским
            технологиям с гарантией качества до 20 лет.
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{
            type: 'spring',
            stiffness: 100,
            damping: 20,
            delay: 0.3,
          }}
          className={styles.formCard}
        >
          <AnimatePresence mode="wait">
            {!isLocked ? (
              <motion.div
                key="form-fields"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.2 }}
              >
                <h3>Рассчитать стоимость</h3>
                <p>
                  Оставьте заявку на персональный расчет стоимости вашего
                  будущего дома
                </p>

                <form className={styles.formGroup} onSubmit={handleSubmit}>
                  <div className={styles.inputWrapper}>
                    <input
                      type="text"
                      name="name"
                      placeholder="Ваше имя"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      disabled={isPending}
                      className={styles.customInput}
                    />
                  </div>

                  <div className={styles.inputWrapper}>
                    <input
                      type="tel"
                      name="phone"
                      placeholder="Номер телефона"
                      required
                      value={formData.phone}
                      onChange={handleChange}
                      disabled={isPending}
                      className={styles.customInput}
                    />
                  </div>

                  <button
                    type="submit"
                    className={`${styles.submitBtn} ${isPending ? styles.loading : ''}`}
                    disabled={isPending}
                  >
                    <span>
                      {isPending ? 'Отправка...' : 'Получить расчет стоимости'}
                    </span>
                  </button>
                </form>

                <span className={styles.privacy}>
                  Нажимая кнопку, вы соглашаетесь с условиями обработки
                  персональных данных
                </span>
              </motion.div>
            ) : (
              <motion.div
                key="success-message"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ type: 'spring', stiffness: 200, damping: 20 }}
                className={styles.successState}
                style={{ textAlign: 'center', padding: '40px 0' }}
              >
                <div style={{ fontSize: '48px', marginBottom: '16px' }}>🎉</div>
                <h3>Заявка успешно принята!</h3>
                <p
                  style={{ marginTop: '12px', fontSize: '14px', opacity: 0.8 }}
                >
                  Менеджер уже обрабатывает ваши данные и свяжется с вами в
                  течение 15 минут. Повторная отправка заблокирована.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </MotionSection>
  )
}
