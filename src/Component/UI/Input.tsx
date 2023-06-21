/*
 * Copyright (c) 2023 Kiyozz~WK~WushuLate.
 *
 * All rights reserved.
 *
 */

import { ExclamationCircleIcon } from '@heroicons/react/20/solid'
import { twMerge } from 'tailwind-merge'
import { type DetailedHTMLProps, type InputHTMLAttributes, forwardRef, type ReactNode } from 'react'

interface InputProps extends DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
  label?: ReactNode
  overlapLabel?: boolean
  leadingAddon?: ReactNode
  trailingAddon?: ReactNode
  inlineLeadingAddon?: boolean
  inlineTrailingAddon?: boolean
  cornerHint?: ReactNode
  helpText?: ReactNode
  error?: string | boolean
}

const ErrorIcon = () => <ExclamationCircleIcon className="hidden h-5 w-5 text-red-500 group-aria-invalid:block" />

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      id,
      name,
      label,
      overlapLabel = false,
      leadingAddon,
      trailingAddon,
      inlineLeadingAddon = false,
      inlineTrailingAddon = false,
      cornerHint,
      helpText,
      error,
      type = 'text',
      disabled,
      className,
      ...props
    },
    ref,
  ) => {
    const hasError = typeof error === 'boolean' ? error : error != null
    const hasHelpText = helpText != null
    const hasCornerHint = cornerHint != null
    const hasLeadingAddon = leadingAddon != null
    const hasTrailingAddon = trailingAddon != null
    const hasNoAddon = !hasLeadingAddon && !hasTrailingAddon
    const hasNonInlineLeadingAndHasNoTrailingAddon = hasLeadingAddon && !inlineLeadingAddon && !hasTrailingAddon
    const hasNoLeadingAndHasNonInlineTrailingAddon = !hasLeadingAddon && hasTrailingAddon && !inlineTrailingAddon
    const hasInlineLeadingAndHasNoTrailingAddon = hasLeadingAddon && inlineLeadingAddon && !hasTrailingAddon
    const hasNoLeadingAndHasInlineTrailingAddon = !hasLeadingAddon && hasTrailingAddon && inlineTrailingAddon
    const hasNonInlineLeadingAndHasNonInlineTrailingAddon =
      hasLeadingAddon && !inlineLeadingAddon && hasTrailingAddon && !inlineTrailingAddon
    const hasNonInlineLeadingAndHasInlineTrailingAddon =
      hasLeadingAddon && !inlineLeadingAddon && hasTrailingAddon && inlineTrailingAddon
    const hasInlineLeadingAndHasNonInlineTrailingAddon =
      hasLeadingAddon && inlineLeadingAddon && hasTrailingAddon && !inlineTrailingAddon
    const hasInlineLeadingAndHasInlineTrailingAddon =
      hasLeadingAddon && inlineLeadingAddon && hasTrailingAddon && inlineTrailingAddon

    return (
      <div className="relative [&_*]:delay-75">
        <div className={twMerge(cornerHint != null && 'flex justify-between')}>
          <label
            htmlFor={id}
            className={twMerge(
              'text-gray-900 dark:text-gray-100',
              overlapLabel
                ? 'absolute -top-2 left-2 inline-block bg-white px-1 text-xs font-medium aria-disabled:bg-red-50/20 dark:bg-gray-700'
                : 'block text-sm font-medium leading-6',
            )}
            aria-disabled={disabled}
          >
            {label}
          </label>
          {hasCornerHint && <span className="text-sm leading-6 text-gray-500 dark:text-gray-300">{cornerHint}</span>}
        </div>
        {hasNoAddon && (
          <div
            className={twMerge(
              'group mt-2 flex w-full rounded-md shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-gray-600',
              'focus-within:ring-2 focus-within:ring-inset focus-within:ring-primary-600 dark:focus-within:ring-primary-700',
              'aria-disabled:bg-gray-50 aria-disabled:ring-gray-200 dark:aria-disabled:bg-gray-500/30 dark:aria-disabled:ring-gray-700',
              'aria-invalid:text-red-900 aria-invalid:ring-red-300 aria-invalid:focus:ring-red-600',
            )}
            aria-disabled={disabled}
            aria-invalid={hasError}
          >
            <input
              key="input"
              type={type}
              name={name ?? id}
              id={id}
              className={twMerge(
                'block flex-1 rounded-md border-0 bg-transparent py-1.5 text-gray-900 focus:ring-0 dark:text-gray-100 sm:text-sm sm:leading-6',
                'placeholder:text-gray-400',
                'disabled:cursor-not-allowed disabled:text-gray-500 dark:disabled:text-gray-400',
                'group-aria-invalid:text-red-900 group-aria-invalid:placeholder:text-red-300 group-aria-invalid:group-aria-disabled:text-red-300',
                className,
              )}
              ref={ref}
              disabled={disabled}
              {...props}
            />
            <span>
              <ExclamationCircleIcon />
            </span>
            <div
              key="trailing"
              className={twMerge(
                'hidden items-center rounded-r-md px-3 text-gray-500 group-aria-invalid:inline-flex sm:text-sm',
                'group-aria-invalid:text-red-600',
              )}
            >
              <div className="inline-flex space-x-1">
                <span>{trailingAddon}</span>
                <ErrorIcon />
              </div>
            </div>
          </div>
        )}
        {hasNonInlineLeadingAndHasNoTrailingAddon && (
          <div className="group mt-2 flex rounded-md shadow-sm" aria-disabled={disabled} aria-invalid={hasError}>
            <div
              key="leading"
              className="inline-flex items-center rounded-l-md border border-r-0 border-gray-300 px-3 text-gray-500 group-aria-disabled:border-gray-200 group-aria-invalid:border-red-300 group-aria-invalid:text-red-900 dark:border-gray-600 dark:group-aria-disabled:border-gray-600 dark:group-aria-disabled:bg-gray-700/30 sm:text-sm"
            >
              {leadingAddon}
            </div>
            <input
              key="input"
              type={type}
              name={id}
              id={id}
              className={twMerge(
                'block w-full rounded-none rounded-r-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 group-aria-invalid:ring-red-300 group-aria-invalid:group-aria-disabled:ring-red-200 dark:bg-gray-800 dark:text-gray-100 dark:ring-gray-600 dark:focus:ring-primary-700',
                'disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500 disabled:ring-gray-200 dark:disabled:bg-gray-500/30 dark:aria-disabled:ring-gray-700 sm:text-sm sm:leading-6',
                className,
              )}
              ref={ref}
              disabled={disabled}
              {...props}
            />
          </div>
        )}
        {hasInlineLeadingAndHasNoTrailingAddon && (
          <div
            className={twMerge(
              'group mt-2 flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300',
              'focus-within:ring-2 focus-within:ring-inset focus-within:ring-primary-600',
              'aria-disabled:cursor-not-allowed aria-disabled:bg-gray-50 aria-disabled:ring-gray-200 dark:aria-disabled:bg-gray-500/30 dark:aria-disabled:ring-gray-700',
            )}
            aria-disabled={disabled}
            aria-invalid={hasError}
          >
            <span
              key="leading"
              className={twMerge(
                'flex select-none items-center pl-3 text-gray-500 sm:text-sm',
                'group-aria-disabled:text-gray-400',
              )}
            >
              {leadingAddon}
            </span>
            <input
              key="input"
              type={type}
              name={id}
              id={id}
              className={twMerge(
                'block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 disabled:cursor-not-allowed sm:text-sm sm:leading-6',
                className,
              )}
              ref={ref}
              disabled={disabled}
              {...props}
            />
          </div>
        )}
        {hasNoLeadingAndHasNonInlineTrailingAddon && (
          <div className="group mt-2 flex rounded-md shadow-sm" aria-disabled={disabled} aria-invalid={hasError}>
            <input
              key="input"
              type={type}
              name={id}
              id={id}
              className={twMerge(
                'block w-full rounded-none rounded-l-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500 disabled:ring-gray-200 sm:text-sm sm:leading-6',
                'group-aria-invalid:text-red-900 group-aria-invalid:ring-red-300 group-aria-invalid:placeholder:text-red-300 group-aria-invalid:focus:ring-red-500 group-aria-invalid:disabled:text-red-300 group-aria-invalid:disabled:ring-red-200',
                className,
              )}
              ref={ref}
              disabled={disabled}
              {...props}
            />
            <div
              key="trailing"
              className={twMerge(
                'inline-flex items-center rounded-r-md border border-l-0 border-gray-300 px-3 text-gray-500 sm:text-sm',
                'group-aria-disabled:border-gray-200 group-aria-invalid:border-red-300 group-aria-invalid:text-red-600 group-aria-invalid:group-aria-disabled:border-red-200',
              )}
            >
              <div className="inline-flex space-x-1">
                <span>{trailingAddon}</span>
                <ErrorIcon />
              </div>
            </div>
          </div>
        )}
        {hasNoLeadingAndHasInlineTrailingAddon && (
          <div className="mt-2">
            <div
              className={twMerge(
                'group flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-primary-600',
                'aria-disabled:cursor-not-allowed aria-disabled:bg-gray-50 aria-disabled:ring-gray-200 aria-invalid:ring-red-300 aria-invalid:focus-within:ring-red-500 aria-disabled:aria-invalid:ring-red-200',
              )}
              aria-disabled={disabled}
              aria-invalid={hasError}
            >
              <input
                key="input"
                type={type}
                name={id}
                id={id}
                className={twMerge(
                  'block flex-1 border-0 bg-transparent py-1.5 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6',
                  'disabled:cursor-not-allowed',
                  'group-aria-invalid:text-red-900 group-aria-invalid:placeholder:text-red-300',
                  className,
                )}
                ref={ref}
                disabled={disabled}
                {...props}
              />
              <span
                key="trailing"
                className={twMerge(
                  'flex select-none items-center pr-3 text-gray-500 sm:text-sm',
                  'group-aria-disabled:text-gray-400 group-aria-invalid:text-red-600',
                )}
              >
                <div className="inline-flex space-x-1">
                  <span>{trailingAddon}</span>
                  <ErrorIcon />
                </div>
              </span>
            </div>
          </div>
        )}
        {hasNonInlineLeadingAndHasNonInlineTrailingAddon && (
          <div className="group mt-2 flex rounded-md shadow-sm" aria-disabled={disabled} aria-invalid={hasError}>
            <div
              key="leading"
              className={twMerge(
                'inline-flex items-center rounded-l-md border border-r-0 border-gray-300 px-3 text-gray-500 sm:text-sm',
                'group-aria-disabled:border-gray-200 group-aria-invalid:border-red-300 group-aria-invalid:text-red-600 group-aria-invalid:group-aria-disabled:border-red-200',
              )}
            >
              {leadingAddon}
            </div>
            <input
              key="input"
              type={type}
              name={id}
              id={id}
              className={twMerge(
                'block w-full rounded-none border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500 disabled:ring-gray-200 sm:text-sm sm:leading-6',
                'group-aria-invalid:text-red-900 group-aria-invalid:ring-red-300 group-aria-invalid:placeholder:text-red-300 group-aria-invalid:focus:ring-red-500 group-aria-invalid:disabled:text-red-300 group-aria-invalid:disabled:ring-red-200',
                className,
              )}
              ref={ref}
              disabled={disabled}
              {...props}
            />
            <div
              key="trailing"
              className={twMerge(
                'inline-flex items-center rounded-r-md border border-l-0 border-gray-300 px-3 text-gray-500 sm:text-sm',
                'group-aria-disabled:border-gray-200 group-aria-invalid:border-red-300 group-aria-invalid:text-red-600 group-aria-invalid:group-aria-disabled:border-red-200',
              )}
            >
              <div className="inline-flex space-x-1">
                <span>{trailingAddon}</span>
                <ErrorIcon />
              </div>
            </div>
          </div>
        )}
        {hasInlineLeadingAndHasNonInlineTrailingAddon && (
          <div className="group mt-2 flex items-center rounded-md" aria-disabled={disabled} aria-invalid={hasError}>
            <div
              className={twMerge(
                'flex w-full rounded-md rounded-r-none shadow-sm ring-1 ring-inset ring-gray-300',
                'focus-within:ring-2 focus-within:ring-inset focus-within:ring-primary-600',
                'group-aria-invalid:ring-red-300 group-aria-invalid:focus-within:ring-red-500',
                'group-aria-disabled:bg-gray-50 group-aria-disabled:group-aria-invalid:ring-red-200',
              )}
            >
              <span
                key="leading"
                className={twMerge(
                  'flex select-none items-center pl-3 text-gray-500 sm:text-sm',
                  'group-aria-disabled:cursor-not-allowed group-aria-disabled:text-gray-400 group-aria-invalid:text-red-600',
                )}
              >
                {leadingAddon}
              </span>
              <input
                key="input"
                type={type}
                name={id}
                id={id}
                className={twMerge(
                  'block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 disabled:cursor-not-allowed disabled:text-gray-500 sm:text-sm sm:leading-6',
                  'group-aria-invalid:text-red-900 group-aria-invalid:placeholder:text-red-300 group-aria-invalid:disabled:text-red-300 group-aria-invalid:disabled:ring-red-200',
                  className,
                )}
                ref={ref}
                disabled={disabled}
                {...props}
              />
            </div>
            <div
              key="trailing"
              className={twMerge(
                'flex select-none items-center rounded-r-md border border-l-0 border-gray-300 px-3 py-[0.4375rem] text-gray-500 sm:text-sm',
                'group-aria-invalid:border-red-300 group-aria-invalid:text-red-600',
              )}
            >
              <div className="inline-flex space-x-1">
                <span>{trailingAddon}</span>
                <ErrorIcon />
              </div>
            </div>
          </div>
        )}
        {hasInlineLeadingAndHasInlineTrailingAddon && (
          <div
            className={twMerge(
              'group mt-2 flex w-full rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-primary-600',
              'aria-disabled:cursor-not-allowed aria-disabled:bg-gray-50 aria-disabled:aria-invalid:ring-red-200',
              'aria-invalid:ring-red-300 aria-invalid:focus-within:ring-red-500',
              '',
            )}
            aria-disabled={disabled}
            aria-invalid={hasError}
          >
            <span
              key="leading"
              className={twMerge(
                'flex select-none items-center pl-3 text-gray-500 sm:text-sm',
                'group-aria-disabled:cursor-not-allowed group-aria-invalid:text-red-600',
              )}
            >
              {leadingAddon}
            </span>
            <input
              key="input"
              type={type}
              name={id}
              id={id}
              className={twMerge(
                'block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6',
                'disabled:cursor-not-allowed group-aria-invalid:text-red-900 group-aria-invalid:placeholder:text-red-300 group-aria-invalid:disabled:text-red-300',
                className,
              )}
              ref={ref}
              disabled={disabled}
              {...props}
            />
            <div
              key="trailing"
              className={twMerge(
                'flex select-none items-center rounded-r-md px-3 py-1.5 text-gray-500 sm:text-sm',
                'group-aria-invalid:text-red-600',
              )}
            >
              <div className="inline-flex space-x-1">
                <span>{trailingAddon}</span>
                <ErrorIcon />
              </div>
            </div>
          </div>
        )}
        {hasNonInlineLeadingAndHasInlineTrailingAddon && (
          <div className="mt-2 flex items-center rounded-md">
            <div
              key="trailing"
              className="flex select-none items-center rounded-l-md border border-r-0 border-gray-300 px-3 py-[0.4375rem] text-gray-500 sm:text-sm"
            >
              {leadingAddon}
            </div>
            <div className="flex w-full rounded-md rounded-l-none shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-primary-600">
              <input
                key="input"
                type={type}
                name={id}
                id={id}
                className={twMerge(
                  'block flex-1 border-0 bg-transparent py-1.5 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6',
                  className,
                )}
                ref={ref}
                disabled={disabled}
                {...props}
              />
              <span key="leading" className="flex select-none items-center pr-3 text-gray-500 sm:text-sm">
                {trailingAddon}
              </span>
            </div>
          </div>
        )}
        {hasHelpText && !hasError && <p className="mt-2 text-sm text-gray-500">{helpText}</p>}
        {typeof error !== 'boolean' && hasError && <p className="mt-2 text-sm text-red-600">{error}</p>}
      </div>
    )
  },
)

Input.displayName = 'Input'

export default Input
