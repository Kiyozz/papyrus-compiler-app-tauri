/*
 * Copyright (c) 2023 Kiyozz~WK~WushuLate.
 *
 * All rights reserved.
 *
 */

import OpenInBrowserIcon from '@mui/icons-material/OpenInBrowser'
import Button from '@mui/material/Button'
import Fade from '@mui/material/Fade'
import Typography from '@mui/material/Typography'
import AnchorExternal, { AnchorExternalProps } from 'App/Component/AnchorExternal'
import TutorialContent from 'App/Component/Tutorial/TutorialContent'
import useDocumentationUrl from 'App/Hook/UseDocumentationUrl'
import { useTutorial } from 'App/Hook/UseTutorial'
import { useState } from 'react'
import { useTranslation, Trans } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { useTimeout } from 'usehooks-ts'

const AnchorWithOpenInBrowser = ({ children, ...props }: AnchorExternalProps) => {
  return (
    <AnchorExternal className="inline-flex cursor-pointer items-center gap-1 underline" {...props}>
      <span>{children}</span>
      <OpenInBrowserIcon />
    </AnchorExternal>
  )
}

const TutorialWelcome = () => {
  const { changeStep, skip } = useTutorial()
  const [waiting, setWaiting] = useState(true)
  const documentationUrl = useDocumentationUrl()
  const { t } = useTranslation()
  const navigate = useNavigate()

  useTimeout(() => {
    setWaiting(false)
  }, 500)

  return (
    <TutorialContent>
      <Fade in={!documentationUrl.isLoading}>
        <div className="container mx-auto flex h-full w-full flex-col items-center justify-center gap-2 px-4 text-center">
          <Typography variant="h4" gutterBottom className="font-normal">
            {t('common.tutorial.welcome.title')}
          </Typography>
          <Typography gutterBottom className="font-normal">
            {t('common.tutorial.welcome.firstStartText')}
          </Typography>
          <Fade in={documentationUrl.isSuccess}>
            <Typography className="font-bold">
              <Trans i18nKey="common.tutorial.welcome.documentationText">
                <AnchorWithOpenInBrowser href={documentationUrl?.data ?? ''} />
              </Trans>
            </Typography>
          </Fade>
          <div className="mt-12 flex gap-2">
            <Button
              disabled={waiting}
              variant="contained"
              onClick={() => {
                navigate('/settings')
                changeStep('settings-game')
              }}
            >
              {t('common.tutorial.welcome.needHelpText')}
            </Button>
            <Button disabled={waiting} color="inherit" onClick={skip}>
              {t('common.close')}
            </Button>
          </div>
        </div>
      </Fade>
    </TutorialContent>
  )
}

export default TutorialWelcome
