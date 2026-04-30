import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './DestinationsSection.css';
import universityImg from '@/assets/university_modern_building.png';
import orbitGraphic from '@/assets/destinations_orbit_graphic.png';
import historicCampus from '@/assets/university_historic_campus.png';
import modernGlass from '@/assets/university_modern_glass.png';
import greenCampus from '@/assets/university_green_campus.png';
import classicHall from '@/assets/university_classic_hall.png';

// Fallback pool to ensure variety if we run out of unique single assets
const imgPool = [historicCampus, modernGlass, greenCampus, classicHall, universityImg];

const universitiesData = {
    'Netherlands': [
        { name: 'University of Amsterdam', ielts: '6.5', ranking: '61', image: historicCampus },
        { name: 'Delft University', ielts: '6.5', ranking: '57', image: modernGlass },
        { name: 'Utrecht University', ielts: '6.5', ranking: '110', image: greenCampus },
        { name: 'Leiden University', ielts: '6.5', ranking: '128', image: classicHall }
    ],
    'UK': [
        { name: 'Imperial College London', ielts: '7.0', ranking: '6', image: classicHall },
        { name: 'University of Oxford', ielts: '7.5', ranking: '2', image: historicCampus },
        { name: 'University of Cambridge', ielts: '7.5', ranking: '3', image: greenCampus },
        { name: 'UCL', ielts: '7.0', ranking: '8', image: modernGlass }
    ],
    'USA': [
        { name: 'Harvard University', ielts: '7.5', ranking: '5', image: historicCampus },
        { name: 'MIT', ielts: '7.5', ranking: '1', image: modernGlass },
        { name: 'Stanford University', ielts: '7.0', ranking: '3', image: greenCampus },
        { name: 'Yale University', ielts: '7.5', ranking: '14', image: classicHall }
    ],
    'Canada': [
        { name: 'University of Toronto', ielts: '6.5', ranking: '26', image: modernGlass },
        { name: 'McGill University', ielts: '6.5', ranking: '27', image: historicCampus },
        { name: 'UBC', ielts: '6.5', ranking: '47', image: universityImg },
        { name: 'University of Alberta', ielts: '6.5', ranking: '110', image: greenCampus }
    ],
    'Ireland': [
        { name: 'Trinity College Dublin', ielts: '6.5', ranking: '101', image: classicHall },
        { name: 'University College Dublin', ielts: '6.5', ranking: '173', image: modernGlass },
        { name: 'University of Galway', ielts: '6.5', ranking: '270', image: historicCampus },
        { name: 'University College Cork', ielts: '6.5', ranking: '298', image: universityImg }
    ]
};

const DestinationsSection = () => {
    const navigate = useNavigate();
    const [selectedCountry, setSelectedCountry] = useState('UK');
    const countries = ['Netherlands', 'UK', 'USA', 'Canada', 'Ireland'];

    return (
        <section className="destinations-section">
            <div className="destinations-container">
                <h2 className="destinations-heading">Popular Study Destinations</h2>
                <p className="destinations-subheading">
                    Explore top education destinations across the globe with our comprehensive guides and support.
                </p>

                <div className="destinations-filter-row">
                    <div className="filter-options">
                        {countries.map(country => (
                            <span
                                key={country}
                                onClick={() => setSelectedCountry(country)}
                                className={`filter-option ${selectedCountry === country ? 'active' : ''}`}
                            >
                                {country}
                            </span>
                        ))}
                    </div>

                </div>

                <div className="destinations-content">
                    {/* Key is crucial for triggering animation on re-render */}
                    <div className="cards-grid" key={selectedCountry}>
                        {universitiesData[selectedCountry]?.map((uni, index) => (
                            <div key={index} className="destination-card">
                                <img src={uni.image} alt={uni.name} className="card-bg" />
                                <div className="card-overlay">
                                    <h3 className="uni-name">{uni.name}</h3>
                                    <p className="uni-stats">
                                        {uni.ielts} Minimum IELTS Required <br />
                                        {uni.ranking} Ranking
                                    </p>
                                    <button
                                        className="btn-talk"
                                        onClick={() => navigate('/login', { state: { from: '/consultant' } })}
                                    >
                                        Talk to our Consultant
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="section-footer">
                    <button className="btn-explore-all" onClick={() => navigate('/countries')}>Explore All</button>
                </div>
            </div>

            <div className="visual-area">
                <img src={orbitGraphic} alt="Global Destinations" className="orbit-graphic" />
            </div>
        </section>
    );
};

export default DestinationsSection;
