import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShare} from '@fortawesome/free-solid-svg-icons';

export const ShareScreenButton = ({ onClick }) => {
    return (
        <button className="p-4 mx-2" onClick={onClick}>
           <FontAwesomeIcon icon={faShare} />
        </button>
    );
};