import AddIcon from '@mui/icons-material/Add'
import Button from '@mui/material/Button'
import { FileScriptCompilation } from 'App/Lib/Compilation/FileScriptCompilationDecoder'
import { fileScriptsCompilationToFileScripts } from 'App/Lib/FileScriptsCompilationToFileScripts'
import { A } from 'App/Lib/FpTs'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

const CreateGroupFromScriptsButton = ({
  scripts,
  className,
}: {
  className?: string
  scripts: FileScriptCompilation[]
}) => {
  const navigate = useNavigate()
  const { t } = useTranslation()

  return (
    <Button
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
}

export default CreateGroupFromScriptsButton
