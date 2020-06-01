import React, { Component } from "react";
import PropTypes from "prop-types";

import { Card, Spinner } from "react-bootstrap";

import * as API from "./http/about-us";

import MemberCard from "./components/MemberCard";
import { MemberCarousel } from "./components/MemberCarousel";
import { ReposCard } from "./components/ReposCard";

import "./styles.scss";

export default class AboutUs extends Component {
    constructor(props) {
        super(props);
        this.state = {
            organizationInfo: {},
            organizationMembers: [],
            organizationRepos: [],
            spinnerStatus: false,

            width: 0,
        };

        this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
    }

    componentDidMount() {
        const { organizationName } = this.props;

        this.updateWindowDimensions();
        window.addEventListener("resize", this.updateWindowDimensions);

        API.fetchOrganizationData(organizationName)
            .then((response) => {
                this.setState(() => ({
                    organizationInfo: response.data.organization,
                    organizationMembers: response.data.members,
                    organizationRepos: response.data.repos,
                    spinnerStatus: true,
                }));
            });
    }

    componentWillUnmount() {
        window.removeEventListener("resize", this.updateWindowDimensions);
    }

    updateWindowDimensions() {
        this.setState(() => ({
            width: window.innerWidth,
        }));
    }

    render() {
        const {
            organizationInfo,
            organizationMembers,
            organizationRepos,
            width,
            spinnerStatus,
        } = this.state;

        return (
            <Card className="about-us">
                <Card.Body>
                    <Card.Title className="m-3">
                        <h1>
                            <a
                                href={organizationInfo.url}
                                className="text-body"
                                rel="noopener noreferrer"
                                target="_blank"
                            >
                                {organizationInfo.name}
                            </a>
                        </h1>
                        {organizationInfo.desription
                            && (
                                <footer className="blockquote-footer">
                                    {organizationInfo.desription}
                                </footer>
                            )}
                    </Card.Title>

                    <div className="cards-members card-text justify-content-center mb-3">
                        <div>
                            <h3 className="text-center">
                                Our Team
                            </h3>
                            <hr className="w-50 border border-dark" />
                        </div>
                        <div className="container">
                            <div className="row justify-content-center">
                                {/* eslint-disable-next-line no-nested-ternary */}
                                {spinnerStatus ? (width < 426 ? (
                                    <MemberCarousel members={organizationMembers} />
                                ) : (organizationMembers.map((member) => (
                                    <MemberCard key={member.name} member={member} />
                                )))) : (
                                    <Spinner animation="border" />
                                )}
                            </div>
                        </div>
                    </div>

                    <div>
                        <h3 className="text-center">
                            Our Projects
                        </h3>
                        <hr className="w-50 border border-dark" />
                    </div>
                    <div className="container">
                        <div className="row justify-content-center">
                            {spinnerStatus ? (
                                organizationRepos.map((repo) => (
                                    <ReposCard key={repo.name} repo={repo} />
                                ))
                            ) : (
                                <Spinner animation="border" />
                            )}
                        </div>
                    </div>
                </Card.Body>
            </Card>
        );
    }
}

AboutUs.propTypes = {
    organizationName: PropTypes.string.isRequired,
};
