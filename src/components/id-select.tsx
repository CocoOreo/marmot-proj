import { Select } from "antd";
import React from "react";

type SelectProps = React.ComponentProps<typeof Select>

interface IdSelectProps extends Omit<SelectProps, 'value' | 'onChange' | 'defaultOptionName' | 'options'> {
    value: string | number | null | undefined;
    onChange: (value?: number) => void;
    defaultOptionName?: string;
    options?: { name: string, id: number }[]
}

export const IdSelect = (props: IdSelectProps) => {
    const { value, onChange, defaultOptionName, options, ...restProps } = props
    return (
        <Select
            value={options?.length ? toNumber(value) : 0}
            onChange={value => onChange(toNumber(value) || undefined)}
            {...restProps}
        >
            {
                defaultOptionName ? <Select.Option key={0} value={0}>
                    {defaultOptionName}
                </Select.Option> : null
            }
            {
                options?.map(option => {
                    return (
                        <Select.Option key={option.id} value={option.id}>
                            {option.name}
                        </Select.Option>
                    )
                })
            }
        </Select>
    )
}

const toNumber = (value: unknown) => {
    return isNaN((Number(value))) ? 0 : Number(value)
}