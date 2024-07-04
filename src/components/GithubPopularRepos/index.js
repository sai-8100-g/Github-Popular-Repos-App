import {Component} from 'react'
import Loader from 'react-loader-spinner'
import LanguageFilterItem from '../LanguageFilterItem'
import RepositoryItem from '../RepositoryItem'

import './index.css'

const languageFiltersData = [
  {id: 'ALL', language: 'All'},
  {id: 'JAVASCRIPT', language: 'Javascript'},
  {id: 'RUBY', language: 'Ruby'},
  {id: 'JAVA', language: 'Java'},
  {id: 'CSS', language: 'CSS'},
]

const initialStatus = {
  success: 'SUCCESS',
  failure: 'FAILURE',
  progess: 'IN PROGRESS',
}

class GithubPopularRepos extends Component {
  state = {
    renderingStatus: 'INITIAL',
    language: languageFiltersData[0].id,
    reposList: [],
  }

  componentDidMount() {
    this.getGithubRepos()
  }

  getGithubRepos = async () => {
    this.setState({renderingStatus: initialStatus.progess})
    const {language} = this.state
    const response = await fetch(
      `https://apis.ccbp.in/popular-repos?language=${language}`,
    )
    if (response.ok) {
      const data = await response.json()
      const updatedData = data.popular_repos.map(eachObj => ({
        avatarUrl: eachObj.avatar_url,
        forksCount: eachObj.forks_count,
        id: eachObj.id,
        issuesCount: eachObj.issues_count,
        name: eachObj.name,
        starsCount: eachObj.stars_count,
      }))
      console.log(updatedData)
      this.setState({
        renderingStatus: initialStatus.success,
        reposList: updatedData,
      })
    } else {
      this.setState({renderingStatus: initialStatus.failure})
    }
  }

  getUpdatingLanguageId = id => {
    this.setState({language: id}, this.getGithubRepos)
  }

  successfullRender = () => {
    const {reposList} = this.state
    return (
      <ul className="repoItemsUrl">
        {reposList.map(eachObj => (
          <RepositoryItem repoItem={eachObj} key={eachObj.id} />
        ))}
      </ul>
    )
  }

  failureRender = () => (
    <div className="failureCard">
      <img
        src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
        alt="failure view"
      />
    </div>
  )

  progressRender = () => (
    <div data-testid="loader">
      <Loader type="ThreeDots" color="#90EE90" height="50" width="50" />
    </div>
  )

  showRenderingFunctions = () => {
    const {renderingStatus} = this.state
    switch (renderingStatus) {
      case initialStatus.success:
        return this.successfullRender()
      case initialStatus.failure:
        return this.failureRender()
      case initialStatus.progess:
        return this.progressRender()
      default:
        return null
    }
  }

  render() {
    const {language} = this.state
    return (
      <div className="reposMainContainer">
        <h1 className="popularHeading">popular</h1>
        <ul className="languageBtnUl">
          {languageFiltersData.map(eachObj => (
            <LanguageFilterItem
              listOfBtns={eachObj}
              key={eachObj.id}
              isActive={language === eachObj.id}
              getUpdatingLanguageId={this.getUpdatingLanguageId}
            />
          ))}
        </ul>
        {this.showRenderingFunctions()}
      </div>
    )
  }
}

export default GithubPopularRepos
