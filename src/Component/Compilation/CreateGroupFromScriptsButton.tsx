import AddIcon from '@mui/icons-material/Add'
import Button, { ButtonProps } from '@mui/material/Button'
import { FileScriptCompilation } from 'App/Lib/Compilation/FileScriptCompilationDecoder'
import { fileScriptsCompilationToFileScripts } from 'App/Lib/FileScriptsCompilationToFileScripts'
import { A } from 'App/Lib/FpTs'
import { forwardRef } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

const CreateGroupFromScriptsButton = forwardRef<
  HTMLButtonElement,
  {
    scripts: FileScriptCompilation[]
  } & Omit<ButtonProps, 'ref'>
>(({ scripts, className, ...props }, ref) => {
  const navigate = useNavigate()
  const { t } = useTranslation()

  return (
    <Button
      {...props}
      ref={ref}
      className={className}
      disabled={A.isEmpty(scripts)}
      onClick={() => {
        navigate('/groups', {
          state: {
            scripts: fileScriptsCompilationToFileScripts(scripts),
          },
        })
      }}
      startIcon={<AddIcon />}
      color="inherit"
    >
      {t('common.createGroup')}
    </Button>
  )
})

CreateGroupFromScriptsButton.displayName = 'CreateGroupFromScriptsButton'

export default CreateGroupFromScriptsButton
