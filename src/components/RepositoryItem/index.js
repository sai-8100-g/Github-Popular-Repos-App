import './index.css'

const RepositoryItem = props => {
  const {repoItem} = props
  const {avatarUrl, forksCount, issuesCount, name, starsCount} = repoItem
  return (
    <li className="repoListItem">
      <div className="avatarCard">
        <img src={avatarUrl} alt={name} />
      </div>
      <h1 className="avatarName">{name}</h1>
      <div className="paraImg">
        <img
          src="https://assets.ccbp.in/frontend/react-js/stars-count-img.png"
          alt="stars"
        />{' '}
        <p>{starsCount} stars</p>
      </div>
      <div className="paraImg">
        <img
          src="https://assets.ccbp.in/frontend/react-js/forks-count-img.png"
          alt="forks"
        />{' '}
        <p>{forksCount} forks</p>
      </div>
      <div className="paraImg">
        <img
          src="https://assets.ccbp.in/frontend/react-js/issues-count-img.png"
          alt="open issues"
        />{' '}
        <p>{issuesCount} open issues</p>
      </div>
    </li>
  )
}

export default RepositoryItem
