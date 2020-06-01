import React from "react";
import PropTypes from "prop-types";


export const MemberCarousel = (props) => {
    const { members } = props;

    return (
        <div className="w-100">
            <div id="carousel-members" className="carousel slide" data-ride="carousel">
                <div className="carousel-inner">
                    {members.map((member, index) => (
                        <div key={member.name} className={`carousel-item ${index === 0 ? "active" : ""}`}>
                            <img className="d-block w-100" src={member.avatar_url} alt={member.name} />
                            <div className="text-center bg-dark rounded">
                                <h3>{member.name}</h3>
                            </div>
                        </div>
                    ))}
                </div>
                <a className="carousel-control-prev" href="#carousel-members" role="button" data-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true" />
                </a>
                <a className="carousel-control-next" href="#carousel-members" role="button" data-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true" />
                </a>
            </div>
        </div>
    );
};


MemberCarousel.propTypes = {
    members: PropTypes.arrayOf(PropTypes.object).isRequired,
};
