import React, { useState } from 'react';
import './DestinationsSection.css';
// import statsIcon from '../assets/stats_icon_placeholder.png'; // Placeholder for stats icon
import { useNavigate } from 'react-router-dom';

const DestinationsSection = () => {
    const navigate = useNavigate();
    const [selectedFilter, setSelectedFilter] = useState('All');

    const filters = ['All', 'Top Ranking', 'Budget-Friendly', 'Work Opportunities'];

    const destinations = [
        {
            university: 'Cambridge University',
            location: 'Cambridge, UK',
            ranking: '#2',
            acceptance: '21%',
            tuition: '$45K/yr',
            image: "https://images.unsplash.com/photo-1492215849891-271d820562e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80", // Cambridge-like
            tags: ['Top Ranking', 'Work Opportunities']
        },
        {
            university: 'Harvard University',
            location: 'Cambridge, USA',
            ranking: '#1',
            acceptance: '5%',
            tuition: '$55K/yr',
            image: "https://images.unsplash.com/photo-1559135197-8a45ea74d36v?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80", // Harvard-like
            tags: ['Top Ranking']
        },
        {
            university: 'University of Toronto',
            location: 'Toronto, Canada',
            ranking: '#21',
            acceptance: '43%',
            tuition: '$30K/yr',
            image: "https://images.unsplash.com/photo-1564981797816-1043664bf78d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80", // Toronto-like
            tags: ['Work Opportunities', 'Budget-Friendly']
        },
        {
            university: 'University of Munich',
            location: 'Munich, Germany',
            ranking: '#32',
            acceptance: '18%',
            tuition: '$0/yr',
            image: "https://images.unsplash.com/photo-1590426578036-7c963289052a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80", // Munich-like
            tags: ['Budget-Friendly']
        }
    ];

    const filteredDestinations = selectedFilter === 'All'
        ? destinations
        : destinations.filter(dest => dest.tags.includes(selectedFilter));

    return (
        <section className="destinations-section" id="countries">
            <div className="destinations-header">
                <div>
                    <h2 className="destinations-title">Popular Study Destinations</h2>
                    <p className="destinations-subtitle">
                        Explore top-ranked universities and countries tailored to your career goals
                    </p>
                </div>
                <div className="search-pill">
                    <span className="search-icon">🔍</span>
                    <input type="text" placeholder="Search for universities, courses..." className="search-input" />
                </div>
            </div>

            <div className="filters-row">
                {filters.map(filter => (
                    <button
                        key={filter}
                        className={`filter-btn ${selectedFilter === filter ? 'active' : ''}`}
                        onClick={() => setSelectedFilter(filter)}
                    >
                        {filter}
                    </button>
                ))}
            </div>

            <div className="cards-grid">
                {filteredDestinations.map((dest, index) => (
                    <div key={index} className="destination-card" style={{ backgroundImage: `url(${dest.image})` }}>
                        <div className="card-overlay">
                            <div className="card-top">
                                <span className="uni-location">📍 {dest.location}</span>
                            </div>
                            <div className="card-bottom">
                                <h3 className="uni-name">{dest.university}</h3>
                                <div className="uni-stats">
                                    <div className="stat-item">
                                        <span>🏆 Ranking</span>
                                        <span className="stat-val">{dest.ranking}</span>
                                    </div>
                                    <div className="stat-item">
                                        <span>🎓 Acceptance</span>
                                        <span className="stat-val">{dest.acceptance}</span>
                                    </div>
                                    <div className="stat-item">
                                        <span>💰 Tuition</span>
                                        <span className="stat-val">{dest.tuition}</span>
                                    </div>
                                </div>
                                <button className="btn-talk" onClick={() => navigate('/consultant')}>
                                    Talk to Us
                                    <span className="arrow-icon">↗</span>
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="explore-all-container">
                <button className="btn-explore-all">Explore all Universities</button>
            </div>
        </section>
    );
};

export default DestinationsSection;
