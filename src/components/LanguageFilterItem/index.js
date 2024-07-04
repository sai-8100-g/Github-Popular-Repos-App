import './index.css'

const LanguageFilterItem = props => {
  const {listOfBtns, getUpdatingLanguageId, isActive} = props
  const {language, id} = listOfBtns
  const updatingLanguageId = () => {
    getUpdatingLanguageId(id)
  }

  const btnClassName = isActive ? 'languageBtn active' : 'languageBtn'
  return (
    <li>
      <button
        type="button"
        className={btnClassName}
        onClick={updatingLanguageId}
      >
        {language}
      </button>
    </li>
  )
}

export default LanguageFilterItem
