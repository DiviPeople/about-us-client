import React from "react";
import PropTypes from "prop-types";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

import { Card } from "react-bootstrap";

export const ReposCard = (props) => {
    const { repo } = props;

    return (
        <Card border="dark" className="ml-2 border col-md-5 col-12">
            <Card.Body>
                <Card.Title className="mb-2">
                    <b>{repo.name}</b>
                </Card.Title>
                <span className="mt-n2 border border-dark p-1 rounded float-right bg-light">
                    <a
                        href={repo.url}
                        className="text-body"
                        rel="noopener noreferrer"
                        target="_blank"
                    >
                        <b>Git</b>
                        {" "}
                        <FontAwesomeIcon icon={faStar} />
                    </a>
                    {repo.star_count}
                </span>
                <Card.Text>
                    {repo.description}
                </Card.Text>
            </Card.Body>
        </Card>
    );
};


ReposCard.propTypes = {
    repo: PropTypes.shape({
        name: PropTypes.string,
        description: PropTypes.string,
        url: PropTypes.string,
        star_count: PropTypes.number,
    }).isRequired,
};
