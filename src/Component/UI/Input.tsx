import { ExclamationCircleIcon } from '@heroicons/react/20/solid'
import cx from 'classnames'
import { motion } from 'framer-motion'
import { type DetailedHTMLProps, type InputHTMLAttributes, forwardRef, type ReactNode } from 'react'

interface InputProps extends DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
  label?: string
  overlapLabel?: boolean
  leadingAddon?: ReactNode
  trailingAddon?: ReactNode
  inlineLeadingAddon?: boolean
  inlineTrailingAddon?: boolean
  cornerHint?: ReactNode
  helpText?: ReactNode
  error?: string
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      id,
      label,
      overlapLabel = false,
      leadingAddon,
      trailingAddon,
      inlineLeadingAddon = false,
      inlineTrailingAddon = false,
      cornerHint,
      helpText,
      error,
      ...props
    },
    ref,
  ) => {
    const hasTrailingAddon = trailingAddon != null || error != null

    return (
      <motion.div className="relative">
        <motion.div className={cx(cornerHint != null && 'flex justify-between')}>
          <motion.label
            htmlFor={id}
            className={cx(
              overlapLabel
                ? 'absolute -top-2 left-2 inline-block bg-white px-1 text-xs font-medium text-gray-900'
                : 'block text-sm font-medium leading-6 text-gray-900',
            )}
          >
            {label}
          </motion.label>
          <span className="text-sm leading-6 text-gray-500">{cornerHint}</span>
        </motion.div>
        <motion.div
          className={cx(
            ((leadingAddon != null && inlineLeadingAddon) ||
              (trailingAddon != null && inlineTrailingAddon) ||
              error != null) &&
              'flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-indigo-600',
            ((leadingAddon != null && !inlineLeadingAddon) || (trailingAddon != null && !inlineTrailingAddon)) &&
              'mt-2 flex rounded-md shadow-sm',
            leadingAddon != null && inlineLeadingAddon && error != null && 'ring-red-300 focus-within:ring-red-600',
            error != null && leadingAddon == null && 'flex rounded-md shadow-sm ring-red-300 focus-within:ring-red-600',
            error != null && leadingAddon != null && 'group ring-red-300 focus-within:ring-red-600',
            leadingAddon == null && trailingAddon == null && 'mt-2 flex rounded-md shadow-sm',
          )}
        >
          {leadingAddon != null && inlineLeadingAddon && (
            <motion.div
              className={cx(
                'flex select-none items-center pl-3 text-gray-500 sm:text-sm',
                error != null && 'text-red-500',
              )}
            >
              {leadingAddon}
            </motion.div>
          )}
          {leadingAddon != null && !inlineLeadingAddon && (
            <motion.div
              className={cx(
                'inline-flex items-center rounded-l-md border border-r-0 border-gray-300 px-3 text-gray-500 sm:text-sm',
                error != null && 'border-0 border-r border-red-300 text-red-500 group-focus-within:border-red-600',
              )}
            >
              {leadingAddon}
            </motion.div>
          )}
          <input
            type="text"
            name={id}
            id={id}
            className={cx(
              'block w-full border-0 py-1.5 text-gray-900 placeholder:text-gray-400 disabled:cursor-not-allowed sm:text-sm sm:leading-6',
              {
                'flex-1 bg-transparent pl-1 focus:ring-0': leadingAddon != null && inlineLeadingAddon && error == null,
                'min-w-0 flex-1 rounded-none ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600':
                  leadingAddon != null && !inlineLeadingAddon && error == null,
                'rounded-r-md': leadingAddon != null && !inlineLeadingAddon && trailingAddon == null && error == null,
                'rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 disabled:bg-gray-50 disabled:text-gray-500 disabled:ring-gray-200':
                  leadingAddon == null && trailingAddon == null && error == null,
                'flex-1 bg-transparent text-red-900 ring-red-300 focus:ring-0 focus:ring-red-600': error != null,
                'pl-1': error != null && leadingAddon != null,
                'min-w-0 flex-1 rounded-none rounded-l-md ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600':
                  trailingAddon != null && !inlineTrailingAddon && leadingAddon == null && error == null,
                'flex-1 bg-transparent pr-1 focus:ring-0':
                  trailingAddon != null && inlineTrailingAddon && error == null,
              },
            )}
            placeholder="Jane Smith"
            ref={ref}
            {...props}
          />
          {hasTrailingAddon && (
            <motion.div
              className={cx(
                'trailing-addon',
                'flex select-none items-center pr-3 text-gray-500 sm:text-sm',
                error != null && 'text-red-600',
              )}
            >
              {error != null ? <ExclamationCircleIcon className="h-5 w-5 text-red-500" /> : trailingAddon}
            </motion.div>
          )}
        </motion.div>
        {helpText != null && error == null && <motion.p className="mt-2 text-sm text-gray-500">{helpText}</motion.p>}
        {error != null && <motion.p className="mt-2 text-sm text-red-600">{error}</motion.p>}
      </motion.div>
    )
  },
)

Input.displayName = 'Input'

export default Input
