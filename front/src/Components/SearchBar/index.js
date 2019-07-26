import React from 'react';
import classnames from 'classnames';
import { IoMdSearch } from 'react-icons/io';
import Fuse from 'fuse.js';

const SearchBar = ({ className, list, searchOptions, callback, ...props }) => {
    const defaultSearchOptions = {
        shouldSort: true,
        matchAllTokens: true,
        threshold: 0.3,
        location: 0,
        distance: 100,
        maxPatternLength: 32,
        minMatchCharLength: 1
    };
    const fuse = new Fuse(list, Object.assign(defaultSearchOptions, searchOptions));

    const handleChange = (event) => {
        if (event.target.value === '')
            callback(null);
        else
            callback(fuse.search(event.target.value));
    };

    const newClassName = classnames('input-group', className);
    return (
        <div className={newClassName} {...props}>
            <div className="input-group-prepend">
                <span className="input-group-text"><IoMdSearch /></span>
            </div>
            <input className="form-control" type="text" placeholder="Search group..." onChange={handleChange} />
        </div>
    );
};

export default SearchBar;