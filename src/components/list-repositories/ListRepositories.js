import React from 'react';
import './styles/ListRepositories.css';

function ListRepositories({ repositories }) {

    function formatDate(date) {
        let dateTimeSplit = date.split("T");
        return dateTimeSplit[0].split('-').reverse().join('/') + " " + dateTimeSplit[1].replace("Z", "")
    }

    return (
        <>
            {repositories.length > 0 ?
                <table className="table">
                    <thead className="thead-dark">
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Nome</th>
                            <th scope="col">Linguagem</th>
                            <th scope="col">Forks</th>
                            <th scope="col">Criado em</th>
                            <th scope="col">Última atualização</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            repositories.map((repository, index) => {
                                return (
                                    <tr key={index}>
                                        <th scope="row">{index}</th>
                                        <td><a href={repository.html_url} target="blank">{repository.name}</a></td>
                                        <td>{repository.language}</td>
                                        <td>{repository.forks}</td>
                                        <td>{formatDate(repository.created_at)}</td>
                                        <td>{formatDate(repository.updated_at)}</td>
                                    </tr>
                                );
                            })
                        }
                    </tbody>
                </table>
                :
                <div className="no-results">
                    <span>Sem resultados!</span>
                </div>
            }
        </>
    );
}

export default ListRepositories;