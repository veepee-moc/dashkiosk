import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { connect } from 'react-redux';
import { IoMdReturnLeft } from 'react-icons/io';
import { Types, action } from '../../Actions';
import './History.css';

function getLogs(page, limit, setLogs) {
    Axios.get(`/api/history/${page}/limit/${limit}`)
        .then((res) => setLogs(res.data))
        .catch((err) => toast.error(`Failed to load history: ${err.message}`));
}

function getNbPage(limit, setNbPage) {
    Axios.get('/api/history/count')
        .then((res) => setNbPage(Math.ceil(res.data.count/limit)))
        .catch((err) => toast.error(`Failed to get page number${err.message}`));
}

const History = ({historyLogs, setLogs}) => {
    const [ initialized, setInitialized ] = useState(false);
    const [ page, setPage ] = useState(1);
    const [ limit, setLimit ] = useState(25);
    const [ nbPage, setNbPage ] = useState(1);

    var input = null;

    function changePage(pageNumber) {
        setPage(pageNumber);
        getLogs(pageNumber, limit, setLogs);
    }

    function changeLimit(e) {
        e.preventDefault();
        setLimit(input.value);
        setPage(1);
        getLogs(1, input.value, setLogs);
    }

    function renderPages() {
        var arr = [];
        arr.push({page: 1});
        for (var i = -3; i < 0; i++) {
            if (i + page > 1)
                arr.push({page: page + i});
        }
        if (page !== 1)
            arr.push({page: page});
        for (i = 1; i <= 3; i++) {
            if (i + page < nbPage + 1)
                arr.push({page: page + i});
        }
        if (!(page >= nbPage-3))
            arr.push({page: nbPage});
        return (
            <span className="absolute center">
                { arr.map((button, key) => <button key={key} className="btn btn-light" onClick={() => changePage(button.page)}>{button.page}</button> ) }
            </span>
        );
    }

    useEffect(() => {
        if (!initialized) {
            getLogs(page, limit, setLogs);
            setInitialized(true);
        }
        getNbPage(limit, setNbPage);
    }, [initialized, limit, page, setLogs]);

    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="mr-auto">
                    <Link to="/admin" className="btn btn-dark mr-3">
                        <IoMdReturnLeft className="mr-1" /> Back to admin
                    </Link>
                    <button className="btn btn-dark mr-3" onClick={ () => getLogs(page, limit, setLogs) }>
                        Refresh
                    </button>
                    { renderPages() }
                </div>
                <form className="form-inline ml-auto" onSubmit={changeLimit}>
                    <input ref={(elem) => input = elem} type="number" placeholder="Limit" className="form-control text-center" ></input>
                </form>
            </nav>
            <table className="table table-sm" >
                <thead className="thead-dark">
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Email</th>
                        <th scope="col">Method</th>
                        <th scope="col">RefererUrl</th>
                        <th scope="col">OriginalUrl</th>
                        <th scope="col">Params</th>
                        <th scope="col">Query</th>
                        <th scope="col">Body</th>
                        <th scope="col">Timestamp</th>
                    </tr>
                </thead>
                <tbody>
                    { historyLogs.map((log, key) =>
                        <tr key={key}>
                            <th scope="row">{(key+1)+((page-1)*limit)}</th>
                            <td className="text-nowrap">{log.email}ccornut@vente-privee.com</td>
                            <td>{log.originalMethod}</td>
                            <td className="text-nowrap">{log.refererUrl}</td>
                            <td>{log.originalUrl}</td>
                            <td className="wordBreakAll">{log.params}</td>
                            <td className="wordBreakAll">{log.query}</td>
                            <td className="wordBreakAll">{log.body}</td>
                            <td className="text-nowrap">{log.createdAt}</td>
                        </tr>
                    ) }
                </tbody>
            </table>
        </>
    );
}

function mapStateToProps(state) {
    return ({
        historyLogs: state.history.historyLogs
    });
}

function mapDispatchToProps(dispatch) {
    return {
        setLogs: (logs) => dispatch(action(Types.SetLogs, logs))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(History);