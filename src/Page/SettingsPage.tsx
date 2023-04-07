/*
 * Copyright (c) 2023 Kiyozz~WK~WushuLate.
 *
 * All rights reserved.
 *
 */

import RefreshIcon from '@mui/icons-material/Refresh'
import Button from '@mui/material/Button'
import Page from 'App/Component/Page/Page'
import PageAppBar from 'App/Component/Page/PageAppBar'
import SettingsCompilationSection from 'App/Component/Settings/SettingsCompilationSection'
import SettingsGameSection from 'App/Component/Settings/SettingsGameSection'
import SettingsMo2Section from 'App/Component/Settings/SettingsMo2Section'
import SettingsTelemetrySection from 'App/Component/Settings/SettingsTelemetrySection'
import SettingsThemeSection from 'App/Component/Settings/SettingsThemeSection'
import Input from 'App/Component/UI/Input'
import { useRefreshConf } from 'App/Hook/Conf/UseRefreshConf'
import { useMatomo } from 'App/Hook/UseMatomo'
import { enterPageAnimate } from 'App/Lib/Framer'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'

function SettingsPage() {
  const { t } = useTranslation()
  const refreshConf = useRefreshConf()
  const { trackEvent } = useMatomo()

  return (
    <div>
      <PageAppBar title={t('page.settings.appBar.title')}>
        <Button
          className="px-3 py-2"
          color="inherit"
          startIcon={<RefreshIcon />}
          onClick={() => {
            void refreshConf()
            trackEvent({
              category: 'Conf',
              action: 'Refresh',
              name: 'Settings',
            })
          }}
        >
          {t('common.refresh')}
        </Button>
      </PageAppBar>

      <Page>
        <motion.section className="container mx-auto space-y-4" {...enterPageAnimate}>
          <SettingsGameSection />
          <SettingsCompilationSection />
          <SettingsMo2Section />
          <SettingsThemeSection />
          <SettingsTelemetrySection />
        </motion.section>
      </Page>
    </div>
  )
}

export default SettingsPage
