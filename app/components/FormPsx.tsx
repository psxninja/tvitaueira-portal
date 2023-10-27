import React, { FormHTMLAttributes } from 'react'

interface FormProps extends FormHTMLAttributes<HTMLFormElement> {
    onSubmit: (...args: any) => void
    dataForm?: any
}

const FormPsx: React.ForwardRefRenderFunction<HTMLFormElement, FormProps> = (
    { onSubmit, dataForm, children, noValidate, ...rest },
    ref
) => {
    const handleFormsubmit = React.useCallback(
        (evt: React.SyntheticEvent<EventTarget>) => {
            evt.preventDefault()
            const form = evt.target as HTMLFormElement
            const formValues: { [key: string]: any } = {}

            for (let i = 0, f = form.length; i < f; i++) {
                const element = form[i] as HTMLInputElement
                if (element.required && noValidate) {
                    if (element.value === '') return element.focus()
                }
                if (element.name !== '') {
                    if (element.type === 'file') {
                        formValues[element.name] = []
                        for (let ind = 0, len = element?.files?.length || 0; ind < len; ind++) {
                            formValues[element.name].push(element?.files?.[ind])
                        }
                        continue
                    }
                    if (element.type === 'radio') {
                        if (element.checked) formValues[element.name] = element.value
                        continue
                    }
                    formValues[element.name] = element.value || null
                }
            }

            onSubmit(
                {
                    values: { ...formValues },
                    form
                },
                dataForm
            )
        },
        [dataForm]
    )

    return (
        <form ref={ref} {...rest} onSubmit={(e) => handleFormsubmit(e)}>
            {children}
        </form>
    )
}

export default React.forwardRef(FormPsx)
