/*
 * Copyright (c) 2023 Kiyozz~WK~WushuLate.
 *
 * All rights reserved.
 *
 */

import { ArrowDownTrayIcon, ArrowTopRightOnSquareIcon } from '@heroicons/react/24/solid'
import Code from 'App/Component/Markdown/Code'
import Li from 'App/Component/Markdown/Li'
import P from 'App/Component/Markdown/P'
import Ul from 'App/Component/Markdown/Ul'
import H1 from 'App/Component/Markdown/H1'
import H2 from 'App/Component/Markdown/H2'
import H3 from 'App/Component/Markdown/H3'
import H5 from 'App/Component/Markdown/H5'
import useDocumentationUrl from 'App/Hook/UseDocumentationUrl'
import { useTranslation, Trans } from 'react-i18next'
import Markdown from 'react-markdown'
import A from '../Markdown/A'
import Img from '../Markdown/Img'
import { open as openExternal } from '@tauri-apps/api/shell'
import * as Dialog from 'App/Component/UI/Dialog'
import * as Button from 'App/Component/UI/Button'

const ChangelogDialog = ({
  open,
  onClose,
  markdownNotes,
  version,
}: {
  open: boolean
  onClose: () => void
  markdownNotes: string
  version: string
}) => {
  const documentationUrl = useDocumentationUrl()
  const { t } = useTranslation()

  return (
    <Dialog.Root open={open} onClose={onClose} fullScreen>
      <Dialog.Title id="dialog-changelogs-title" className="flex items-center">
        <span className="grow">
          <Trans i18nKey="common.changelogs" values={{ version }}>
            <strong />
          </Trans>
        </span>
        <Button.Root
          size="sm"
          color="inherit"
          variant="soft"
          disabled={documentationUrl.data === undefined}
          aria-label={t('common.openInBrowser')}
          onClick={() => {
            if (documentationUrl.data === undefined) return

            void openExternal(`${documentationUrl.data}/changelogs/${version.replace('v', '')}`)
          }}
        >
          <Button.Icon edge="start" size="sm">
            <ArrowTopRightOnSquareIcon />
          </Button.Icon>
          <span>{t('common.openInBrowser')}</span>
        </Button.Root>
      </Dialog.Title>
      <Dialog.Content className="px-4" id="dialog-changelogs-content">
        <Markdown
          components={{
            p: P,
            h1: H1,
            h2: H2,
            h3: H3,
            h5: H5,
            code: Code,
            a: A,
            img: Img,
            ul: Ul,
            li: Li,
          }}
        >
          {markdownNotes}
        </Markdown>
      </Dialog.Content>
      <Dialog.Actions className="flex justify-end gap-x-4">
        <Button.Root onClick={onClose} color="inherit" variant="secondary">
          {t('common.close')}
        </Button.Root>
        <Button.Root
          onClick={() => {
            // TODO: Download update
          }}
          color="inherit"
          disabled
        >
          <Button.Icon edge="start">
            <ArrowDownTrayIcon />
          </Button.Icon>
          {t('common.download')}
        </Button.Root>
      </Dialog.Actions>
    </Dialog.Root>
  )
}

export default ChangelogDialog
