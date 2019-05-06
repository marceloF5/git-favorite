import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import PropTypes from 'prop-types'

import * as FavoritesActions from '../../store/actions/favorites'

class Main extends React.Component {
    static propTypes = {
        addFavoriteRequest: PropTypes.func.isRequired,
        favorites: PropTypes.shape({
            loading: PropTypes.bool,
            data: PropTypes.arrayOf(
                PropTypes.shape({
                    id: PropTypes.number,
                    name: PropTypes.string,
                    description: PropTypes.string,
                    url: PropTypes.string,
                })
            ),
        }).isRequired,
        error: PropTypes.oneOfType([null, PropTypes.string]),
    }

    state = {
        repositoryInput: '',
    }

    handleAddRepository = e => {
        e.preventDefault()
        this.props.addFavoriteRequest(this.state.repositoryInput)
        this.setState({ repositoryInput: '' })
    }

    render() {
        return (
            <React.Fragment>
                <form onSubmit={this.handleAddRepository}>
                    <input
                        type="text"
                        placeholder="user/repository"
                        value={this.state.repositoryInput}
                        onChange={e => this.setState({ repositoryInput: e.target.value })}
                    />
                    <button type="submit">Add</button>
                    {this.props.favorites.loading && <span>Loading...</span>}
                    {!!this.props.favorites.error && (
                        <span style={{ color: '#F00' }}>{this.props.favorites.error}</span>
                    )}
                </form>

                <ul>
                    {this.props.favorites.data.map(favorite => (
                        <li key={favorite.id}>
                            <p>
                                <strong>{favorite.name}</strong> ({favorite.description})
                            </p>
                            <a href={favorite.url}>Access Git</a>
                        </li>
                    ))}
                </ul>
            </React.Fragment>
        )
    }
}

const mapStateToProps = state => ({
    favorites: state.favorites,
})

const mapDispatchToProps = dispatch => bindActionCreators(FavoritesActions, dispatch)

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Main)
