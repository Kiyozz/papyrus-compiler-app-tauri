/*
 * Copyright (c) 2022 Kiyozz~WK~WushuLate.
 *
 * All rights reserved.
 *
 */

import HelpIcon from '@mui/icons-material/Help'
import RefreshIcon from '@mui/icons-material/Refresh'
import Button from '@mui/material/Button'
import Page from 'App/Component/Page/Page'
import PageAppBar from 'App/Component/Page/PageAppBar'
import SettingsCompilationSection from 'App/Component/Settings/SettingsCompilationSection'
import SettingsGameSection from 'App/Component/Settings/SettingsGameSection'
import SettingsMo2Section from 'App/Component/Settings/SettingsMo2Section'
import SettingsTelemetrySection from 'App/Component/Settings/SettingsTelemetrySection'
import SettingsThemeSection from 'App/Component/Settings/SettingsThemeSection'
import { useTranslation } from 'react-i18next'

function SettingsPage() {
  const { t } = useTranslation()

  return (
    <div>
      <PageAppBar title={t('page.settings.appBar.title')}>
        <Button className="px-3 py-2" color="inherit" startIcon={<HelpIcon />}>
          {t('page.settings.appBar.actions.documentation')}
        </Button>
        <Button className="px-3 py-2" color="inherit" startIcon={<RefreshIcon />}>
          {t('page.settings.appBar.actions.refresh')}
        </Button>
      </PageAppBar>

      <Page>
        <section className="container mx-auto">
          <SettingsGameSection />
          <SettingsCompilationSection />
          <SettingsMo2Section />
          <SettingsThemeSection />
          <SettingsTelemetrySection />
        </section>
      </Page>
    </div>
  )
}

export default SettingsPage
