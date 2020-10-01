import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Axios from 'axios';
import './styles/Home.css';

function Home() {

    const [userSearched, setUserSearched] = useState("");
    const [infosUser, setInfosUser] = useState(null);
    const [repositories, setRepositories] = useState([]);
    const [mostVisitedRepositories, setMostVisitedRepositories] = useState([]);

    const { userGithub } = useParams()

    useEffect(() => {
        if (userGithub !== undefined) {
            Axios.get('/' + userGithub).then(response => {
                setInfosUser(response.data);
            }).catch(error => {
                console.log(error)
            });
        }
    }, [userGithub])

    function handleSearchUser() {
        window.location.href = window.location.href + userSearched;
    }

    function handleRepositories() {
        Axios.get('/' + userGithub + '/repos').then(response => {
            setRepositories(response.data);
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
                        <input className="form-control input-text" type="text" placeholder="Informe o usuario" onChange={(e) => {
                            setUserSearched(e.target.value);
                        }}></input>
                        <button type="submit" className="btn btn-primary input-button" onClick={() => { handleSearchUser() }}>Pesquisar</button>
                    </div>
                    <label>by: Hugo Carvalho</label>
                </div>
                :
                <div>
                    <div className="infos-user">
                        <img alt="photo-user-github" src={infosUser.avatar_url} className="img-user"></img>
                        <div className="identity">
                            <label>{"Nome: " + infosUser.name}</label>
                            <br />
                            <label>{"Login: " + infosUser.login}</label>
                        </div>
                    </div>
                    <button type="submit" className="btn btn-primary input-button" onClick={() => { handleRepositories() }}>Repos</button>
                    <button type="submit" className="btn btn-primary input-button" onClick={() => { handleRepositories() }}>Starred</button>
                </div>
            }
        </div>
    );
}

export default Home;