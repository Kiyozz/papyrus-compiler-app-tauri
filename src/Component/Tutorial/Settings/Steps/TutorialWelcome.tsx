/*
 * Copyright (c) 2023 Kiyozz~WK~WushuLate.
 *
 * All rights reserved.
 *
 */

import OpenInBrowserIcon from '@mui/icons-material/OpenInBrowser'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import AnchorExternal, { type AnchorExternalProps } from 'App/Component/AnchorExternal'
import AnimateAppLogo from 'App/Component/AnimateAppLogo'
import TutorialContent from 'App/Component/Tutorial/Settings/TutorialContent'
import useDocumentationUrl from 'App/Hook/UseDocumentationUrl'
import { useSettingsTutorial } from 'App/Hook/Tutorial/UseSettingsTutorial'
import { useMatomo } from 'App/Hook/UseMatomo'
import { enterPageAnimate, withDelay } from 'App/Lib/Framer'
import { AnimatePresence, motion } from 'framer-motion'
import { useTranslation, Trans } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

const MotionTypography = motion(Typography)
const MotionButton = motion(Button)

const AnchorWithOpenInBrowser = ({ children, ...props }: AnchorExternalProps) => {
  return (
    <AnchorExternal className="inline-flex cursor-pointer items-center gap-1 underline" {...props}>
      <span>{children}</span>
      <OpenInBrowserIcon />
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
            className="container mx-auto flex h-full w-full flex-col items-center justify-center gap-2 px-4 text-center"
            {...enterPageAnimate}
          >
            <div className="text-9xl">
              <AnimateAppLogo animate withText />
            </div>
            <MotionTypography variant="h4" gutterBottom className="font-normal" {...withDelay(1.4, enterPageAnimate)}>
              {t('common.settingsTutorial.welcome.title')}
            </MotionTypography>
            <MotionTypography gutterBottom className="font-normal" {...withDelay(1.75, enterPageAnimate)}>
              {t('common.settingsTutorial.welcome.firstStartText')}
            </MotionTypography>
            <AnimatePresence>
              {documentationUrl.isSuccess && (
                <MotionTypography className="font-bold" {...withDelay(1.75, enterPageAnimate)}>
                  <Trans i18nKey="common.settingsTutorial.welcome.documentationText">
                    <AnchorWithOpenInBrowser href={documentationUrl.data} />
                  </Trans>
                </MotionTypography>
              )}
            </AnimatePresence>
            <div className="mt-12 flex gap-2">
              <MotionButton
                variant="contained"
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
