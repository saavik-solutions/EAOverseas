import React from 'react';
import './TeamSection.css';
import edrikImg from '@/assets/team_edrik.jpg';
import laraImg from '@/assets/team_lara.jpg';
import samImg from '@/assets/team_sam.jpg';
import suiImg from '@/assets/team_sui.jpg';

const TeamSection = () => {
    const team = [
        {
            name: "Edrik Paul",
            role: "Founder & CEO",
            image: edrikImg,
            color: "#9747FF",
            tagBg: "#E8DAFF"
        },
        {
            name: "Lara Johnson",
            role: "Education Director",
            image: laraImg,
            color: "#007F16",
            tagBg: "#BFFFCA"
        },
        {
            name: "Sam Walsman",
            role: "Visa Specialist",
            image: samImg,
            color: "#2D83F2",
            tagBg: "#B2D3FF"
        },
        {
            name: "Sui Katte",
            role: "Scholarship Advisor",
            image: suiImg,
            color: "#F28A0B",
            tagBg: "#FFEBD2"
        }
    ];

    return (
        <section className="team-section">
            <div className="team-header">
                <div className="team-tag">Our Team</div>
                <h2 className="team-title">Experts to make your application Stand Out</h2>
            </div>
            <div className="team-grid">
                {team.map((member, index) => (
                    <div key={index} className="team-card">
                        <div
                            className="team-card-image"
                            style={{ backgroundImage: `linear-gradient(180deg, rgba(217, 217, 217, 0) 0%, #FFFFFF 100%), url(${member.image})` }}
                        >
                            <div className="team-card-content">
                                <h3 className="member-name" style={{ color: member.color }}>{member.name}</h3>
                                <div className="member-divider" style={{ borderColor: member.color }}></div>
                                <div className="member-role-tag" style={{ backgroundColor: member.tagBg, color: member.color }}>
                                    {member.role}
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default TeamSection;
