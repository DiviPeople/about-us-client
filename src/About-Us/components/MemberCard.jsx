import React, { Component } from "react";
import PropTypes from "prop-types";

import { Card, OverlayTrigger, Tooltip } from "react-bootstrap";

export default class MemberCard extends Component {
    constructor(props) {
        super(props);

        this.bioTooltip = this.bioTooltip.bind(this);
    }

    bioTooltip(props) {
        const { member } = this.props;

        if (member.bio) {
            return (
                // eslint-disable-next-line react/jsx-props-no-spreading
                <Tooltip id="tooltip-bio" {...props}>
                    {member.bio}
                </Tooltip>
            );
        }

        return <p />;
    }

    render() {
        const { member } = this.props;

        return (
            <a
                href={member.url}
                rel="noopener noreferrer"
                target="_blank"
            >
                <Card border="dark" style={{ width: 150, height: 240 }} className="ml-3 border">
                    <OverlayTrigger
                        key="right"
                        placement="right"
                        overlay={this.bioTooltip}
                    >
                        <Card.Img
                            variant="top"
                            src={member.avatar_url}
                        />
                    </OverlayTrigger>
                    <Card.Body>
                        <Card.Title>
                            <p className="text-left text-body">
                                {member.name}
                            </p>
                        </Card.Title>
                    </Card.Body>
                </Card>
            </a>
        );
    }
}

MemberCard.propTypes = {
    member: PropTypes.objectOf(PropTypes.string).isRequired,
};
