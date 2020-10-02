import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Axios from 'axios';
import './styles/Home.css';

import ListRepositories from '../components/list-repositories/ListRepositories';

function Home() {

    const [userSearched, setUserSearched] = useState("");
    const [infosUser, setInfosUser] = useState(null);
    const [userNotFound, setUserNotFound] = useState(false);
    const [repositories, setRepositories] = useState(null);
    const [mostVisitedRepositories, setMostVisitedRepositories] = useState(null);

    const { userGithub } = useParams()

    useEffect(() => {
        if (userGithub !== undefined) {
            Axios.get('/' + userGithub).then(response => {
                setInfosUser(response.data);
            }).catch(error => {
                setUserNotFound(true);
                console.log(error);
            });
        }
    }, [userGithub])

    function handleSearchUser() {
        window.location.href = window.location.href.replace(window.location.pathname, "") + userSearched;
    }

    function handleBackSearch() {
        window.location.href = window.location.href.replace(window.location.pathname, "");
    }

    function handleRepositories() {
        setMostVisitedRepositories(null);
        Axios.get('/' + userGithub + '/repos').then(response => {
            setRepositories(response.data);
        }).catch(error => {
            console.log(error)
        });
    }

    function handleMostVisitedRepositories() {
        setRepositories(null);
        Axios.get('/' + userGithub + '/starred').then(response => {
            setMostVisitedRepositories(response.data);
        }).catch(error => {
            console.log(error)
        });
    }

    return (
        <div className="container home">
            {infosUser === null ?
                <div className="search-page">
                    <img alt="logo-github-api" src={require("../assets/github-api.png")} width="500"></img>
                    <div className="form-group search-user">
                        <input className="form-control input-text" type="text" placeholder="Informe o usuário" onChange={(e) => {
                            setUserSearched(e.target.value);
                        }}></input>
                        <button type="submit" className="btn btn-primary input-button" onClick={() => { handleSearchUser() }}>Pesquisar</button>
                    </div>
                    {userNotFound ?
                        <div className="error">
                            <span>Usuário não encontrado!</span>
                        </div>
                        :
                        ""
                    }
                    <label>by: Hugo Carvalho</label>
                </div>
                :
                <div>
                    <div className="infos-user">
                        <img alt="user-github" src={infosUser.avatar_url} className="img-user"></img>
                        <div className="identity">
                            <label className="identity-item">{"Nome: " + infosUser.name}</label>
                            <label className="identity-item">{"Login: " + infosUser.login}</label>
                            <br />
                            <label className="identity-item">{"Seguidores: " + infosUser.followers}</label>
                            <label className="identity-item">{"Seguindo: " + infosUser.following}</label>
                            <br />
                            <label className="identity-item">{"Repositórios publicos: " + infosUser.public_repos}</label>
                            <br />
                            <label className="identity-item">{infosUser.bio}</label>
                        </div>
                        <button type="submit" className="btn btn-primary button-back" onClick={() => { handleBackSearch() }}>Voltar</button>
                    </div>
                    <div className="menu-options">
                        <button type="submit" className="btn btn-primary input-button" onClick={() => { handleRepositories() }}>Repos</button>
                        <button type="submit" className="btn btn-primary input-button" onClick={() => { handleMostVisitedRepositories() }}>Starred</button>
                    </div>
                    {repositories !== null ?
                        <ListRepositories repositories={repositories} />
                        :
                        ""
                    }
                    {mostVisitedRepositories !== null ?
                        <ListRepositories repositories={mostVisitedRepositories} />
                        :
                        ""
                    }
                </div>
            }
        </div>
    );
}

export default Home;