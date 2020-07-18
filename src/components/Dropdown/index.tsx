import React from 'react'

type Props = {
  options: (string | undefined)[]
  onSelect(option: string): void
  modifier?: string
  placeholder?: string
  defaultValue?: string
}

const Dropdown: React.FC<Props> = ({ options, onSelect, placeholder = null, defaultValue = '', modifier = '' }) => {
  const [chosenOption, setChosenOption] = React.useState(defaultValue)
  
  React.useEffect(() => {
    setChosenOption(defaultValue)
  }, [defaultValue])

  const handleSelectChange = (e: React.FormEvent<HTMLSelectElement>) => {
    setChosenOption(e.currentTarget.value)
    onSelect(e.currentTarget.value)
  }

  return (
    <select
      className={`dropdown dropdown--${modifier}`}
      name="select"
      id="select"
      onChange={handleSelectChange}
      value={chosenOption}
    >
      {placeholder && <option value="">{placeholder}</option>}
      {options.map((item) => (
        <option key={item} value={item}>
          {item}
        </option>
      ))}
    </select>
  )
}

export default Dropdown
