import React from 'react';
import './Places.css';
import mapimg from './place1-1.jpg';

function Places() {
    return (
        <div className="placemain">
            <div className="place-title">
            <p>마음에 드는 책을 찾으셨나요?</p>
            <p>가까운 곳으로 안내해 드릴게요.</p>
            </div>
            <div className="map">
                <img src={mapimg} alt="map" />
            </div>
        </div>
    )
}

export default Places;