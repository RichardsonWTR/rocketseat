import React, {SelectHTMLAttributes} from 'react'
import './styles.css'

interface SelectItem {
    value: string,
    label: string
}
interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement>{
    label: string;
    name: string;
    options: Array<SelectItem>;
}

const Select: React.FC<SelectProps> = ({label,name,options, ...rest}) =>{
    return (
        <div className="select-block">
            <label htmlFor={name}>{label}</label>
            <select defaultValue="" id={name} {...rest}>
                <option value="" disabled hidden>Selecione uma opção</option>
                {options.map(op => {
                    return <option key={op.value} value={op.value}>{op.label}</option>
                })}
                </select>
        </div>
    )
}

export default Select;