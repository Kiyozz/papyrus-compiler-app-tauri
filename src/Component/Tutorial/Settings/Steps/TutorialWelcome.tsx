/*
 * Copyright (c) 2023 Kiyozz~WK~WushuLate.
 *
 * All rights reserved.
 *
 */

import { ArrowTopRightOnSquareIcon } from '@heroicons/react/24/solid'
import AnchorExternal, { type AnchorExternalProps } from 'App/Component/AnchorExternal'
import AnimateAppLogo from 'App/Component/AnimateAppLogo'
import TutorialContent from 'App/Component/Tutorial/Settings/TutorialContent'
import { Button } from 'App/Component/UI/Button'
import useDocumentationUrl from 'App/Hook/UseDocumentationUrl'
import { useSettingsTutorial } from 'App/Hook/Tutorial/UseSettingsTutorial'
import { useMatomo } from 'App/Hook/UseMatomo'
import { enterPageAnimate, withDelay } from 'App/Lib/Framer'
import { AnimatePresence, motion } from 'framer-motion'
import { useTranslation, Trans } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

const MotionButton = motion(Button)

const AnchorWithOpenInBrowser = ({ children, ...props }: AnchorExternalProps) => {
  return (
    <AnchorExternal className="inline-flex cursor-pointer items-center gap-1 underline" {...props}>
      <span>{children}</span>
      <ArrowTopRightOnSquareIcon className="h-4 w-4" />
    </AnchorExternal>
  )
}

const TutorialWelcome = () => {
  const { changeStep, skip } = useSettingsTutorial()
  const { trackEvent } = useMatomo()
  const documentationUrl = useDocumentationUrl()
  const { t } = useTranslation()
  const navigate = useNavigate()

  return (
    <TutorialContent>
      <AnimatePresence>
        {!documentationUrl.isLoading && (
          <motion.div
            className="container prose mx-auto h-full w-full items-center justify-center px-4 text-center"
            {...enterPageAnimate}
          >
            <AnimateAppLogo animate className="h-72" />
            <motion.h1 {...withDelay(1.4, enterPageAnimate)}>{t('common.settingsTutorial.welcome.title')}</motion.h1>
            <motion.p {...withDelay(1.75, enterPageAnimate)}>
              {t('common.settingsTutorial.welcome.firstStartText')}
            </motion.p>
            <AnimatePresence>
              {documentationUrl.isSuccess && (
                <motion.p className="font-bold" {...withDelay(1.75, enterPageAnimate)}>
                  <strong>
                    <Trans i18nKey="common.settingsTutorial.welcome.documentationText">
                      <AnchorWithOpenInBrowser href={documentationUrl.data} />
                    </Trans>
                  </strong>
                </motion.p>
              )}
            </AnimatePresence>
            <div className="mt-12 flex justify-center gap-2">
              <MotionButton
                size="xl"
                onClick={() => {
                  navigate('/settings')
                  changeStep('settings-game')
                  trackEvent({
                    category: 'Settings tutorial',
                    action: 'Start',
                  })
                }}
                {...withDelay(2.75, enterPageAnimate)}
              >
                {t('common.settingsTutorial.welcome.needHelpText')}
              </MotionButton>
              <MotionButton
                variant="ghost"
                color="inherit"
                onClick={() => {
                  skip('deny')
                }}
                {...withDelay(2.75, enterPageAnimate)}
              >
                {t('common.close')}
              </MotionButton>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </TutorialContent>
  )
}

export default TutorialWelcome
