import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { useAuth } from '@/features/auth/context/AuthContext';
import universityImg from '@/features/landing/assets/university_modern_building.png';

const CountryDetails = () => {
    const { countryCode } = useParams();
    const navigate = useNavigate();
    const { user } = useAuth();

    React.useEffect(() => {
        window.scrollTo(0, 0);
    }, [countryCode]);

    const handleExplore = () => {
        if (user) {
            navigate('/colleges');
        } else {
            navigate('/login', { state: { from: '/colleges' } });
        }
    };

    // Mock Data Lookup (In a real app, this would fetch from an API)
    const countryData = {
        'GB': {
            name: 'United Kingdom',
            tagline: 'Heritage of Excellence',
            heroImage: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?q=80&w=2070&auto=format&fit=crop',
            description: 'Experience a fusion of world-class education and a vibrant cultural tapestry. The UK offers a legacy of innovation and academic brilliance with a modern edge, preparing you for global career opportunities.',
            quote: "Ranked #1 for global research impact and home to 4 of the world's top 10 universities.",
            stats: {
                tuition: '£12k-25k',
                living: '£1.1k-1.4k',
                work: '20hrs/week',
                psw: '2 Years',
                language: 'English'
            },
            costs: {
                insurance: { range: '£470 - £776', label: 'Immigration Health Surcharge (Yearly)', percentage: 15 },
                accommodation: { range: '£600 - £1,100', label: 'Monthly range (Halls vs Private Rental)', percentage: 40 },
                food: { range: '£150 - £250', label: 'Estimated monthly grocery bill', percentage: 25 },
                transport: { range: '£50 - £120', label: 'Monthly student travel card (Bus/Rail)', percentage: 15 }
            },
            studentLife: [
                { title: 'Rail & Underground', icon: 'train', desc: 'Highly connected National Rail network and the iconic London Underground (The Tube) make inter-city travel seamless.' },
                { title: 'Urban Lifestyle', icon: 'restaurant_menu', desc: 'From cozy traditional pubs to Michelin-star dining, the UK boasts a diverse, multicultural social scene for students.' },
                { title: 'Culture & Sports', icon: 'stadium', desc: 'World-renowned museums (often free), historic architecture, and the home of the Premier League.' }
            ],
            universities: [
                { name: 'OXFORD', logoColor: 'bg-gray-400', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/13/Radcliffe_Camera%2C_Oxford_-_Oct_2006.jpg/400px-Radcliffe_Camera%2C_Oxford_-_Oct_2006.jpg' },
                { name: 'CAMBRIDGE', logoColor: 'bg-gray-400', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Kings_College_Chapel_from_the_river.jpg/400px-Kings_College_Chapel_from_the_river.jpg' },
                { name: 'LSE', logoColor: 'bg-gray-400', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/LSE_Old_Building.JPG/400px-LSE_Old_Building.JPG' },
                { name: 'UCL', logoColor: 'bg-gray-400', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d4/UCL_Portico.jpg/400px-UCL_Portico.jpg' },
                { name: 'IMPERIAL', logoColor: 'bg-gray-400', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Queens_Tower_Imperial_College.jpg/400px-Queens_Tower_Imperial_College.jpg' }
            ]
        },
        'US': {
            name: 'United States',
            tagline: 'Land of Opportunity',
            heroImage: 'https://images.unsplash.com/photo-1550133730-695473e544be?q=80&w=2070&auto=format&fit=crop',
            description: 'Home to the world’s most prestigious universities and cutting-edge research. The USA offers unmatched academic flexibility, diverse campus life, and vast career opportunities in every industry imaginable.',
            quote: "The world's #1 destination for international students, hosting over 1 million scholars.",
            stats: {
                tuition: '$20k-50k',
                living: '$1.2k-2k',
                work: '20hrs/week',
                psw: '1-3 Years',
                language: 'English'
            },
            costs: {
                insurance: { range: '$1,500 - $2,500', label: 'Annual Health Insurance (Mandatory)', percentage: 20 },
                accommodation: { range: '$800 - $1,500', label: 'Monthly rent (On-campus vs Off-campus)', percentage: 50 },
                food: { range: '$300 - $500', label: 'Monthly dining and groceries', percentage: 35 },
                transport: { range: '$80 - $200', label: 'Public transit or car expenses', percentage: 25 }
            },
            studentLife: [
                { title: 'Campus Spirit', icon: 'sports_football', desc: 'Experience the legendary US college spirit with massive sports events, fraternities, and hundreds of student clubs.' },
                { title: 'Innovation Hubs', icon: 'science', desc: 'Proximity to industry giants like Silicon Valley and Wall Street offers unparalleled internship opportunities.' },
                { title: 'Natural Wonders', icon: 'landscape', desc: 'Explore diverse landscapes from the Grand Canyon to the beaches of California and Florida.' }
            ],
            universities: [
                { name: 'MIT', logoColor: 'bg-red-400', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/Mitgreatdome.jpg/400px-Mitgreatdome.jpg' },
                { name: 'HARVARD', logoColor: 'bg-red-900', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/02/Memorial_Hall_at_Harvard_University.JPG/400px-Memorial_Hall_at_Harvard_University.JPG' },
                { name: 'STANFORD', logoColor: 'bg-red-700', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/23/Stanford_Quad.jpg/400px-Stanford_Quad.jpg' },
                { name: 'CALTECH', logoColor: 'bg-orange-500', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4e/Caltech_Beckman_Auditorium.jpg/400px-Caltech_Beckman_Auditorium.jpg' },
                { name: 'BERKELEY', logoColor: 'bg-blue-800', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a1/Sather_Tower_at_UC_Berkeley.jpg/400px-Sather_Tower_at_UC_Berkeley.jpg' }
            ]
        },
        'CA': {
            name: 'Canada',
            tagline: 'Inclusive & Welcoming',
            heroImage: 'https://images.unsplash.com/photo-1517935706615-2717063c2225?q=80&w=1965&auto=format&fit=crop',
            description: 'Known for its high quality of life, multicultural environment, and friendly policies for international students. Canada combines top-tier education with beautiful natural scenery and strong post-study work rights.',
            quote: "Consistently ranked as having the best quality of life for international students.",
            stats: {
                tuition: 'C$20k-40k',
                living: 'C$1.5k-2k',
                work: '20hrs/week',
                psw: 'Up to 3 Yrs',
                language: 'English/French'
            },
            costs: {
                insurance: { range: 'C$600 - C$900', label: 'Annual Health Insurance (Provincial Varies)', percentage: 15 },
                accommodation: { range: 'C$800 - C$1,500', label: 'Monthly range (Shared vs Private)', percentage: 45 },
                food: { range: 'C$300 - C$500', label: 'Monthly grocery budget', percentage: 30 },
                transport: { range: 'C$100 - C$150', label: 'Monthly transit pass', percentage: 20 }
            },
            studentLife: [
                { title: 'Great Outdoors', icon: 'hiking', desc: 'Unlimited access to hiking, skiing, and kayaking in some of the world’s most breathtaking landscapes.' },
                { title: 'Multicultural', icon: 'public', desc: 'A true cultural mosaic where diversity is celebrated, making international students feel right at home.' },
                { title: 'Safe & Friendly', icon: 'health_and_safety', desc: 'One of the safest countries in the world with a reputation for friendliness and politeness.' }
            ],
            universities: [
                { name: 'TORONTO', logoColor: 'bg-blue-900', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/06/UT_University_College.JPG/400px-UT_University_College.JPG' },
                { name: 'UBC', logoColor: 'bg-blue-700', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/25/UBC_Rose_Garden_01.jpg/400px-UBC_Rose_Garden_01.jpg' },
                { name: 'MCGILL', logoColor: 'bg-red-600', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/52/Arts_Building%2C_McGill_University.jpg/400px-Arts_Building%2C_McGill_University.jpg' },
                { name: 'WATERLOO', logoColor: 'bg-yellow-500', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/62/University_of_Waterloo_Engineering_5_Building.jpg/400px-University_of_Waterloo_Engineering_5_Building.jpg' },
                { name: 'ALBERTA', logoColor: 'bg-green-700', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/75/University_of_Alberta_Campus%2C_Edmonton.jpg/400px-University_of_Alberta_Campus%2C_Edmonton.jpg' }
            ]
        },
        'AU': {
            name: 'Australia',
            tagline: 'World-Class & Laid Back',
            heroImage: 'https://images.unsplash.com/photo-1523482580672-01e6f06379c5?q=80&w=2070&auto=format&fit=crop',
            description: 'A powerhouse of research and innovation set against a backdrop of stunning beaches and vibrant cities. Australia offers a unique lifestyle that balances academic rigor with outdoor adventure.',
            quote: "Home to 7 of the world’s top 100 student cities.",
            stats: {
                tuition: 'A$30k-45k',
                living: 'A$2k-2.5k',
                work: '48hrs/fortnight',
                psw: '2-4 Years',
                language: 'English'
            },
            costs: {
                insurance: { range: 'A$500 - A$700', label: 'OSHC (Overseas Student Health Cover) / Year', percentage: 10 },
                accommodation: { range: 'A$1,200 - A$2,000', label: 'Monthly rent in major cities', percentage: 55 },
                food: { range: 'A$400 - A$600', label: 'Monthly food and dining', percentage: 35 },
                transport: { range: 'A$150 - A$200', label: 'Public transport costs', percentage: 25 }
            },
            studentLife: [
                { title: 'Beach Lifestyle', icon: 'surfing', desc: 'With most major cities on the coast, the beach is never far away for a post-study surf or swim.' },
                { title: 'Coffee Culture', icon: 'coffee', desc: 'Australians take their coffee seriously, with a thriving café culture that is perfect for studying and socializing.' },
                { title: 'Unique Wildlife', icon: 'pets', desc: 'Encounter kangaroos, koalas, and quokkas in their natural habitats.' }
            ],
            universities: [
                { name: 'MELBOURNE', logoColor: 'bg-blue-900', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/94/Old_Quad_colonnade_University_of_Melbourne_2018.jpg/400px-Old_Quad_colonnade_University_of_Melbourne_2018.jpg' },
                { name: 'SYDNEY', logoColor: 'bg-red-900', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6a/University_of_Sydney_Main_Quadrangle.jpg/400px-University_of_Sydney_Main_Quadrangle.jpg' },
                { name: 'UNSW', logoColor: 'bg-yellow-400', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/07/UNSW_Clancy_Auditorium.jpg/400px-UNSW_Clancy_Auditorium.jpg' },
                { name: 'ANU', logoColor: 'bg-orange-600', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b0/ANU_School_of_Music.jpg/400px-ANU_School_of_Music.jpg' },
                { name: 'MONASH', logoColor: 'bg-blue-600', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0d/Monash_Caulfield_Green.jpg/400px-Monash_Caulfield_Green.jpg' }
            ]
        },
        'DE': {
            name: 'Germany',
            tagline: 'Efficiency & Innovation',
            heroImage: 'https://images.unsplash.com/photo-1467269204594-9661b134dd2b?q=80&w=2070&auto=format&fit=crop',
            description: 'The economic powerhouse of Europe, known for its engineering prowess and tuition-free public universities. Germany is the ideal destination for students seeking deep technical knowledge and career stability.',
            quote: "Europe's largest economy with tuition-free education at public universities.",
            stats: {
                tuition: '€0 - €3k',
                living: '€850-1.2k',
                work: '20hrs/week',
                psw: '18 Months',
                language: 'German/English'
            },
            costs: {
                insurance: { range: '€110 - €130', label: 'Monthly Public Health Insurance (Mandatory)', percentage: 25 },
                accommodation: { range: '€350 - €700', label: 'Monthly rent (WG/Shared Flat vs Studio)', percentage: 35 },
                food: { range: '€200 - €300', label: 'Groceries are relatively affordable', percentage: 25 },
                transport: { range: 'Inc. in Sem. Ticket', label: 'Usually covered by semester contribution', percentage: 10 }
            },
            studentLife: [
                { title: 'Central Europe', icon: 'train', desc: 'Located in the heart of Europe, making weekend trips to France, Italy, or Czech Republic incredibly easy.' },
                { title: 'Student Discounts', icon: 'local_offer', desc: 'The student ID card offers massive discounts on transport, museums, and even cafeteria meals.' },
                { title: 'Festivals', icon: 'festival', desc: 'From Oktoberfest to Christmas markets, experience rich traditions and celebrations year-round.' }
            ],
            universities: [
                { name: 'TUM', logoColor: 'bg-blue-600', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c2/TUM_Innenhof_Stammgelaende.jpg/400px-TUM_Innenhof_Stammgelaende.jpg' },
                { name: 'LMU', logoColor: 'bg-green-700', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3d/Geschwister-Scholl-Platz_2011_LMU_Muenchen_3.jpg/400px-Geschwister-Scholl-Platz_2011_LMU_Muenchen_3.jpg' },
                { name: 'HEIDELBERG', logoColor: 'bg-red-800', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/13/Heidelberg_Universitaetsbibliothek_2003.jpg/400px-Heidelberg_Universitaetsbibliothek_2003.jpg' },
                { name: 'RWTH AACHEN', logoColor: 'bg-blue-800', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5f/RWTH_Aachen_Hauptgeb%C3%A4ude.jpg/400px-RWTH_Aachen_Hauptgeb%C3%A4ude.jpg' },
                { name: 'KIT', logoColor: 'bg-green-600', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/Karlsruhe_Schloss_2010.jpg/400px-Karlsruhe_Schloss_2010.jpg' }
            ]
        },
        'IE': {
            name: 'Ireland',
            tagline: 'The Emerald Isle',
            heroImage: 'https://images.unsplash.com/photo-1590089415225-401ed6f9db8e?q=80&w=2089&auto=format&fit=crop',
            description: 'A friendly, English-speaking country with a rich literary history and a booming tech sector (Europe’s Silicon Valley). Ireland offers a warm welcome and high-quality education.',
            quote: "Home to the European headquarters of Google, Meta, and Apple.",
            stats: {
                tuition: '€10k-25k',
                living: '€1k-1.5k',
                work: '20hrs/week',
                psw: '2 Years',
                language: 'English'
            },
            costs: {
                insurance: { range: '€160 - €300', label: 'Medical Insurance (Annual)', percentage: 15 },
                accommodation: { range: '€600 - €1,200', label: 'Monthly rent varies by city (Dublin is higher)', percentage: 50 },
                food: { range: '€200 - €350', label: 'Monthly food budget', percentage: 30 },
                transport: { range: '€100 - €140', label: 'Student Leap Card cap', percentage: 20 }
            },
            studentLife: [
                { title: 'Craic', icon: 'nightlife', desc: 'Experience the legendary Irish "craic" (fun) with live music, dancing, and storytelling in pubs.' },
                { title: 'Tech Hub', icon: 'computer', desc: 'Network with professionals from the worlds biggest tech companies located right in Dublin.' },
                { title: 'Scenic Beauty', icon: 'terrain', desc: 'Discover the Cliffs of Moher, Ring of Kerry, and lush green landscapes on weekends.' }
            ],
            universities: [
                { name: 'TRINITY', logoColor: 'bg-blue-900', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c2/The_Campanile_of_Trinity_College%2C_Dublin.jpg/400px-The_Campanile_of_Trinity_College%2C_Dublin.jpg' },
                { name: 'UCD', logoColor: 'bg-yellow-600', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b3/UCD_Science_Centre.jpg/400px-UCD_Science_Centre.jpg' },
                { name: 'GALWAY', logoColor: 'bg-green-800', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/07/NUI_Galway_Quadrangle.jpg/400px-NUI_Galway_Quadrangle.jpg' },
                { name: 'UCC', logoColor: 'bg-red-700', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/52/UCC_Quadrangle.jpg/400px-UCC_Quadrangle.jpg' },
                { name: 'DCU', logoColor: 'bg-blue-500', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/22/DCU_Helix.jpg/400px-DCU_Helix.jpg' }
            ]
        },
        'NZ': {
            name: 'New Zealand',
            tagline: 'Pure Discovery',
            heroImage: 'https://images.unsplash.com/photo-1579808389656-787cd52d2f70?q=80&w=2070&auto=format&fit=crop',
            description: 'A safe and innovative country with a world-class education system. famous for its stunning landscapes, adventure sports, and progressive culture.',
            quote: "Ranked as the #1 English-speaking country for preparing students for the future.",
            stats: {
                tuition: 'NZ$25k-40k',
                living: 'NZ$1.5k-2k',
                work: '20hrs/week',
                psw: 'up to 3 Years',
                language: 'English'
            },
            costs: {
                insurance: { range: 'NZ$600 - NZ$800', label: 'StudentSafe Insurance (Annual)', percentage: 15 },
                accommodation: { range: 'NZ$800 - NZ$1,400', label: 'Monthly rent', percentage: 45 },
                food: { range: 'NZ$300 - NZ$500', label: 'Monthly grocery expenses', percentage: 30 },
                transport: { range: 'NZ$100 - NZ$150', label: 'Monthly transport costs', percentage: 20 }
            },
            studentLife: [
                { title: 'Adventure', icon: 'paragliding', desc: 'The adventure capital of the world – bungee jumping, skydiving, and skiing are popular weekend activities.' },
                { title: 'Manaakitanga', icon: 'handshake', desc: 'Experience the Maori value of Manaakitanga – welcoming and looking after guests with respect.' },
                { title: 'Film Tourism', icon: 'movie', desc: 'Visit Hobbiton and other iconic filming locations from Lord of the Rings.' }
            ],
            universities: [
                { name: 'AUCKLAND', logoColor: 'bg-blue-700', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/90/University_of_Auckland_Clock_Tower.jpg/400px-University_of_Auckland_Clock_Tower.jpg' },
                { name: 'OTAGO', logoColor: 'bg-yellow-700', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/University_of_Otago_Clocktower_Building.jpg/400px-University_of_Otago_Clocktower_Building.jpg' },
                { name: 'VICTORIA', logoColor: 'bg-green-900', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5d/Hunter_Building_VUW_Wellington_New_Zealand.jpg/400px-Hunter_Building_VUW_Wellington_New_Zealand.jpg' },
                { name: 'CANTERBURY', logoColor: 'bg-red-800', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4e/University_of_Canterbury_Central_Library.jpg/400px-University_of_Canterbury_Central_Library.jpg' },
                { name: 'WAIKATO', logoColor: 'bg-red-600', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/28/University_of_Waikato_Gate_1.jpg/400px-University_of_Waikato_Gate_1.jpg' }
            ]
        },
        // Fallback for other countries
        'default': {
            name: 'Study Destination',
            tagline: 'World of Opportunities',
            heroImage: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=2070&auto=format&fit=crop',
            description: 'Explore world-class education and diverse cultural experiences. Start your journey towards academic excellence and global career prospects.',
            quote: "A leading destination for international students seeking quality education.",
            stats: {
                tuition: 'Varies',
                living: '$1k-1.5k',
                work: '20hrs/week',
                psw: '1-3 Years',
                language: 'English'
            },
            costs: {
                insurance: { range: '$500 - $1,000', label: 'Estimated Annual Health Insurance', percentage: 20 },
                accommodation: { range: '$600 - $1,200', label: 'Monthly accommodation costs', percentage: 45 },
                food: { range: '$200 - $400', label: 'Estimated monthly food expenses', percentage: 30 },
                transport: { range: '$50 - $150', label: 'Monthly public transport costs', percentage: 20 }
            },
            studentLife: [
                { title: 'Global Community', icon: 'public', desc: 'Connect with students from around the world and build a global network.' },
                { title: 'Cultural Exchange', icon: 'diversity_3', desc: 'Immerse yourself in new traditions, cuisines, and languages.' },
                { title: 'Student Support', icon: 'support_agent', desc: 'dedicated international student support services to help you settle in.' }
            ],
            universities: [
                { name: 'National Univ', logoColor: 'bg-blue-600', image: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=400&auto=format&fit=crop' },
                { name: 'Tech Institute', logoColor: 'bg-green-600', image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=400&auto=format&fit=crop' },
                { name: 'State College', logoColor: 'bg-red-600', image: 'https://images.unsplash.com/photo-1606761568499-6d2451b23c66?q=80&w=400&auto=format&fit=crop' },
                { name: 'Arts Academy', logoColor: 'bg-yellow-600', image: 'https://images.unsplash.com/photo-1507537297725-24a1c029d3ca?q=80&w=400&auto=format&fit=crop' },
                { name: 'Business School', logoColor: 'bg-indigo-600', image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=400&auto=format&fit=crop' }
            ]
        }
    };

    const countryNames = {
        'FR': 'France', 'IT': 'Italy', 'ES': 'Spain', 'NL': 'Netherlands', 'SE': 'Sweden', 'CH': 'Switzerland',
        'JP': 'Japan', 'KR': 'South Korea', 'SG': 'Singapore', 'AT': 'Austria', 'PT': 'Portugal', 'MY': 'Malaysia',
        'CN': 'China', 'HK': 'Hong Kong', 'AE': 'UAE', 'PL': 'Poland', 'CZ': 'Czech Republic', 'HU': 'Hungary',
        'TR': 'Turkey', 'RU': 'Russia', 'BR': 'Brazil', 'AR': 'Argentina', 'MX': 'Mexico', 'ZA': 'South Africa',
        'EG': 'Egypt', 'TH': 'Thailand', 'VN': 'Vietnam', 'ID': 'Indonesia', 'PH': 'Philippines', 'GR': 'Greece',
        'IS': 'Iceland', 'LU': 'Luxembourg', 'CY': 'Cyprus', 'MT': 'Malta', 'EE': 'Estonia', 'LV': 'Latvia',
        'LT': 'Lithuania', 'SK': 'Slovakia', 'SI': 'Slovenia', 'RO': 'Romania', 'BG': 'Bulgaria', 'HR': 'Croatia',
        'RS': 'Serbia'
    };

    const countryFlags = {
        'GB': '🇬🇧', 'US': '🇺🇸', 'CA': '🇨🇦', 'AU': '🇦🇺', 'DE': '🇩🇪', 'IE': '🇮🇪', 'NZ': '🇳🇿',
        'FR': '🇫🇷', 'IT': '🇮🇹', 'ES': '🇪🇸', 'NL': '🇳🇱', 'SE': '🇸🇪', 'CH': '🇨🇭',
        'JP': '🇯🇵', 'KR': '🇰🇷', 'SG': '🇸🇬', 'AT': '🇦🇹', 'PT': '🇵🇹', 'MY': '🇲🇾',
        'CN': '🇨🇳', 'HK': '🇭🇰', 'AE': '🇦🇪', 'PL': '🇵🇱', 'CZ': '🇨🇿', 'HU': '🇭🇺',
        'TR': '🇹🇷', 'RU': '🇷🇺', 'BR': '🇧🇷', 'AR': '🇦🇷', 'MX': '🇲🇽', 'ZA': '🇿🇦',
        'EG': '🇪🇬', 'TH': '🇹🇭', 'VN': '🇻🇳', 'ID': '🇮🇩', 'PH': '🇵🇭', 'GR': '🇬🇷',
        'IS': '🇮🇸', 'LU': '🇱🇺', 'CY': '🇨🇾', 'MT': '🇲🇹', 'EE': '🇪🇪', 'LV': '🇱🇻',
        'LT': '🇱🇹', 'SK': '🇸🇰', 'SI': '🇸🇮', 'RO': '🇷🇴', 'BG': '🇧🇬', 'HR': '🇭🇷',
        'RS': '🇷🇸'
    };

    const getCountryData = () => {
        if (countryData[countryCode]) {
            // Add flag if missing in main data but present in lookup
            const data = { ...countryData[countryCode] };
            if (!data.flag && countryFlags[countryCode]) {
                data.flag = countryFlags[countryCode];
            }
            return data;
        }

        // Use fallback but override name if known
        const fallback = { ...countryData['default'] };
        if (countryNames[countryCode]) {
            fallback.name = countryNames[countryCode];
        }
        if (countryFlags[countryCode]) {
            fallback.flag = countryFlags[countryCode];
        }
        return fallback;
    };

    const country = getCountryData();



    return (
        <div className="flex flex-col min-h-screen bg-white text-[#111218] transition-colors duration-300 font-display" >
            <Navbar />

            <main className="max-w-[1200px] mx-auto w-full px-4 md:px-6 py-4 md:py-10 flex-grow">
                {/* Back Button */}
                <button
                    onClick={() => navigate(-1)}
                    className="inline-flex items-center gap-1 md:gap-2 text-slate-500 hover:text-[#2463eb] transition-colors mb-4 md:mb-8 font-medium group text-sm md:text-base"
                >
                    <span className="material-symbols-outlined text-lg md:text-2xl group-hover:-translate-x-1 transition-transform">arrow_back</span>
                    Back
                </button>

                {/* Hero Section */}
                <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 md:gap-12 items-center mb-6 md:mb-12">
                    <div className="lg:col-span-3 flex flex-col gap-3 md:gap-6">
                        <div className="inline-flex items-center gap-2 md:gap-3 bg-[#2463eb]/10 text-[#2463eb] px-3 py-1.5 md:px-4 md:py-2 rounded-full w-fit">
                            <img
                                src={`https://flagcdn.com/w40/${countryCode.toLowerCase()}.png`}
                                alt={`${country.name} Flag`}
                                className="w-6 h-auto md:w-8 rounded shadow-sm object-cover"
                            />
                            <span className="text-xs md:text-sm font-bold uppercase tracking-wider">{country.name}</span>
                        </div>
                        <h1 className="text-3xl md:text-5xl lg:text-6xl font-black leading-[1.1] tracking-[-0.033em]">
                            Study in {country.name}: <span className="text-[#2463eb]">{country.tagline}</span>
                        </h1>
                        <p className="text-sm md:text-lg text-slate-600 leading-relaxed max-w-2xl">
                            {country.description}
                        </p>
                        <div className="flex gap-4">
                            <button
                                onClick={handleExplore}
                                className="bg-[#193ce6] text-white font-bold py-3 px-6 md:py-4 md:px-8 rounded-xl flex items-center gap-2 shadow-lg shadow-[#193ce6]/20 hover:opacity-90 transition-opacity text-sm md:text-base"
                            >
                                Explore Universities
                                <span className="material-symbols-outlined text-lg md:text-2xl">arrow_forward</span>
                            </button>
                        </div>
                    </div>
                    <div className="lg:col-span-2 relative">
                        <div className="aspect-square bg-gradient-to-br from-[#2463eb]/5 to-[#2463eb]/20 rounded-3xl overflow-hidden relative">
                            <div className="absolute inset-0 flex items-center justify-center p-8">
                                <img
                                    src={country.heroImage}
                                    alt={country.name}
                                    className="w-full h-full object-cover rounded-2xl shadow-2xl transition-transform duration-500"
                                />
                            </div>
                            <div className="absolute bottom-4 left-4 right-4 md:bottom-6 md:left-6 md:right-6 bg-white/80 backdrop-blur-md p-3 md:p-4 rounded-xl border border-white/20">
                                <p className="text-xs md:text-sm font-medium">"{country.quote}"</p>
                            </div>
                        </div>
                    </div>
                </div>


                {/* Quick Facts Strip */}
                <div className="bg-white border border-slate-100 shadow-xl shadow-slate-200/50 rounded-2xl p-2 mb-10 md:mb-20">
                    <div className="grid grid-cols-2 md:grid-cols-5 divide-y md:divide-y-0 md:divide-x divide-slate-100">
                        <div className="flex flex-col md:flex-row items-center md:items-start text-center md:text-left gap-2 md:gap-4 p-4 md:p-6">
                            <div className="size-10 md:size-12 rounded-full bg-[#2463eb]/10 flex items-center justify-center text-[#2463eb]">
                                <span className="material-symbols-outlined text-xl md:text-2xl">payments</span>
                            </div>
                            <div>
                                <p className="text-[10px] md:text-xs text-slate-500 font-medium">Avg Tuition</p>
                                <p className="text-sm md:text-lg font-bold">{country.stats.tuition}</p>
                            </div>
                        </div>
                        <div className="flex flex-col md:flex-row items-center md:items-start text-center md:text-left gap-2 md:gap-4 p-4 md:p-6">
                            <div className="size-10 md:size-12 rounded-full bg-[#2463eb]/10 flex items-center justify-center text-[#2463eb]">
                                <span className="material-symbols-outlined text-xl md:text-2xl">home_work</span>
                            </div>
                            <div>
                                <p className="text-[10px] md:text-xs text-slate-500 font-medium">Monthly Living</p>
                                <p className="text-sm md:text-lg font-bold">{country.stats.living}</p>
                            </div>
                        </div>
                        <div className="flex flex-col md:flex-row items-center md:items-start text-center md:text-left gap-2 md:gap-4 p-4 md:p-6">
                            <div className="size-10 md:size-12 rounded-full bg-[#2463eb]/10 flex items-center justify-center text-[#2463eb]">
                                <span className="material-symbols-outlined text-xl md:text-2xl">work_history</span>
                            </div>
                            <div>
                                <p className="text-[10px] md:text-xs text-slate-500 font-medium">Part-Time Work</p>
                                <p className="text-sm md:text-lg font-bold">{country.stats.work}</p>
                            </div>
                        </div>
                        <div className="flex flex-col md:flex-row items-center md:items-start text-center md:text-left gap-2 md:gap-4 p-4 md:p-6">
                            <div className="size-10 md:size-12 rounded-full bg-[#2463eb]/10 flex items-center justify-center text-[#2463eb]">
                                <span className="material-symbols-outlined text-xl md:text-2xl">card_membership</span>
                            </div>
                            <div>
                                <p className="text-[10px] md:text-xs text-slate-500 font-medium">Post-Study Work</p>
                                <p className="text-sm md:text-lg font-bold">{country.stats.psw}</p>
                            </div>
                        </div>
                        <div className="flex flex-col md:flex-row items-center md:items-start text-center md:text-left gap-2 md:gap-4 p-4 md:p-6 col-span-2 md:col-span-1">
                            <div className="size-10 md:size-12 rounded-full bg-[#2463eb]/10 flex items-center justify-center text-[#2463eb]">
                                <span className="material-symbols-outlined text-xl md:text-2xl">translate</span>
                            </div>
                            <div>
                                <p className="text-[10px] md:text-xs text-slate-500 font-medium">Language</p>
                                <p className="text-sm md:text-lg font-bold">{country.stats.language}</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Cost of Living & Study */}
                {/* Cost of Living & Study */}
                <section className="mb-10 md:mb-20">
                    <div className="flex items-center gap-4 mb-4 md:mb-8">
                        <h2 className="text-xl md:text-3xl font-bold tracking-tight">Cost of Living & Study</h2>
                        <div className="h-px flex-1 bg-slate-200 dark:bg-gray-800"></div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
                        <div className="bg-white p-5 md:p-8 rounded-2xl border border-slate-100 flex flex-col gap-4 md:gap-6">
                            <div className="flex flex-col gap-2 md:gap-3">
                                <div className="flex justify-between items-end">
                                    <p className="text-sm md:text-lg font-semibold">Visa & Insurance</p>
                                    <p className="text-[#2463eb] font-bold text-sm md:text-base">{country.costs.insurance.range}</p>
                                </div>
                                <div className="h-1.5 md:h-3 bg-slate-100 rounded-full overflow-hidden relative">
                                    <div className="absolute left-0 h-full bg-[#2463eb] rounded-full" style={{ width: `${country.costs.insurance.percentage}%` }}></div>
                                </div>
                                <p className="text-[10px] md:text-sm text-slate-500">{country.costs.insurance.label}</p>
                            </div>
                            <div className="flex flex-col gap-2 md:gap-3">
                                <div className="flex justify-between items-end">
                                    <p className="text-sm md:text-lg font-semibold">Accommodation</p>
                                    <p className="text-[#2463eb] font-bold text-sm md:text-base">{country.costs.accommodation.range}</p>
                                </div>
                                <div className="h-1.5 md:h-3 bg-slate-100 rounded-full overflow-hidden relative">
                                    <div className="absolute left-0 h-full bg-[#2463eb] rounded-full" style={{ width: `${country.costs.accommodation.percentage}%` }}></div>
                                </div>
                                <p className="text-[10px] md:text-sm text-slate-500">{country.costs.accommodation.label}</p>
                            </div>
                        </div>
                        <div className="bg-white p-5 md:p-8 rounded-2xl border border-slate-100 flex flex-col gap-4 md:gap-6">
                            <div className="flex flex-col gap-2 md:gap-3">
                                <div className="flex justify-between items-end">
                                    <p className="text-sm md:text-lg font-semibold">Food & Groceries</p>
                                    <p className="text-[#2463eb] font-bold text-sm md:text-base">{country.costs.food.range}</p>
                                </div>
                                <div className="h-1.5 md:h-3 bg-slate-100 rounded-full overflow-hidden relative">
                                    <div className="absolute left-0 h-full bg-[#2463eb] rounded-full" style={{ width: `${country.costs.food.percentage}%` }}></div>
                                </div>
                                <p className="text-[10px] md:text-sm text-slate-500">{country.costs.food.label}</p>
                            </div>
                            <div className="flex flex-col gap-2 md:gap-3">
                                <div className="flex justify-between items-end">
                                    <p className="text-sm md:text-lg font-semibold">Public Transport</p>
                                    <p className="text-[#2463eb] font-bold text-sm md:text-base">{country.costs.transport.range}</p>
                                </div>
                                <div className="h-1.5 md:h-3 bg-slate-100 rounded-full overflow-hidden relative">
                                    <div className="absolute left-0 h-full bg-[#2463eb] rounded-full" style={{ width: `${country.costs.transport.percentage}%` }}></div>
                                </div>
                                <p className="text-[10px] md:text-sm text-slate-500">{country.costs.transport.label}</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Student Life & Transport */}
                {/* Student Life & Transport */}
                <section className="mb-10 md:mb-20">
                    <div className="flex items-center gap-4 mb-4 md:mb-8">
                        <h2 className="text-xl md:text-3xl font-bold tracking-tight">Student Life & Transport</h2>
                        <div className="h-px flex-1 bg-slate-200 dark:bg-gray-800"></div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-6">
                        {country.studentLife.map((item, index) => (
                            <div key={index} className="group p-4 md:p-8 rounded-2xl bg-white border border-slate-100 hover:border-[#2463eb] transition-all duration-300">
                                <div className="size-10 md:size-14 rounded-xl bg-[#2463eb] text-white flex items-center justify-center mb-4 md:mb-6 shadow-lg shadow-[#2463eb]/30 group-hover:-translate-y-1 transition-transform">
                                    <span className="material-symbols-outlined text-xl md:text-3xl">{item.icon}</span>
                                </div>
                                <h3 className="text-lg md:text-xl font-bold mb-2 md:mb-3">{item.title}</h3>
                                <p className="text-xs md:text-base text-slate-600 dark:text-gray-400 leading-relaxed">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Work & Career */}
                {/* Work & Career */}
                <section className="mb-10 md:mb-20">
                    <div className="bg-[#193ce6] rounded-2xl md:rounded-[2rem] p-6 md:p-12 text-white overflow-hidden relative">
                        <div className="absolute top-0 right-0 w-1/2 h-full opacity-10 pointer-events-none">
                            <div className="w-full h-full bg-contain bg-right bg-no-repeat" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDdPJRZUjKmjb8MwGxYkoDUsmVQnjC6_gitGiWN152X5SyYbcqikv44yC_57Pi6D8tWaof4umn88CeM76XFN0uStCPgIPwjeOATpHqLZrSx7t-g5GUomL1Jak6Z_VlVKoHjE9xgXQ6D8WcffMpQp0lU0-78HBtThV6CWWz1dgKCo8t3iBL4pFWa3n4Tb8rVzLHdHz-ueHJJjZezNRTKOVWvO6jW_6GBCKOiHCZ8EIG3X7RjbtTsU-INGFHID4IZfT95WM_bqQPniD0")' }}></div>
                        </div>
                        <div className="relative z-10 flex flex-col md:flex-row gap-8 md:gap-12">
                            <div className="flex-1">
                                <h2 className="text-2xl md:text-4xl font-bold mb-3 md:mb-6">Work & Career</h2>
                                <p className="text-white/80 text-sm md:text-lg mb-6 md:mb-8 leading-relaxed">The {country.name} provides a robust framework for students to gain professional experience during and after their studies.</p>
                                <div className="flex flex-col gap-3 md:gap-4">
                                    <div className="bg-white/10 backdrop-blur-md p-4 md:p-6 rounded-xl md:rounded-2xl border border-white/20">
                                        <h4 className="text-lg md:text-xl font-bold mb-1 md:mb-2">Graduate Route (PSW)</h4>
                                        <p className="text-white/70 text-xs md:text-base">A post-study work visa for graduates, extending with no job offer required to apply.</p>
                                    </div>
                                </div>
                            </div>
                            <div className="flex-1">
                                <div className="bg-white text-[#111218] rounded-xl md:rounded-2xl p-5 md:p-8 flex flex-col gap-3 md:gap-4">
                                    <h4 className="text-lg md:text-xl font-bold mb-1 md:mb-2 text-[#2463eb]">Top Industries for Students</h4>
                                    {['Technology & Fintech', 'Healthcare & Bio-Sciences', 'Renewable Energy', 'Creative Arts & Media'].map((industry, i) => (
                                        <div key={i} className="flex items-center gap-2 md:gap-3 py-2 md:py-3 border-b border-slate-100">
                                            <span className="material-symbols-outlined text-[#2463eb] font-bold text-lg md:text-2xl">check_circle</span>
                                            <span className="font-medium text-xs md:text-base">{industry}</span>
                                        </div>
                                    ))}

                                    <div className="mt-2 md:mt-4 p-3 md:p-4 bg-slate-50 rounded-xl">
                                        <p className="text-[10px] md:text-xs text-slate-500 uppercase font-bold tracking-widest mb-1">Min. Wage (Estimated)</p>
                                        <p className="text-xl md:text-2xl font-black text-[#2463eb]">Competitive Rates</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Education Landscape */}
                {/* Education Landscape */}
                <section className="mb-6 md:mb-10">
                    <div className="text-center max-w-3xl mx-auto mb-8 md:mb-16">
                        <h2 className="text-2xl md:text-4xl font-bold mb-3 md:mb-6">Education Landscape</h2>
                        <p className="text-slate-600 text-sm md:text-lg leading-relaxed">
                            From historic institutions to modern research centers, experience diverse learning environments.
                        </p>
                    </div>
                    {/* University Logo Carousel (Simulated) */}
                    <div className="relative overflow-hidden w-full h-16 md:h-24 mb-6 md:mb-10">
                        <div className="flex gap-10 md:gap-20 items-center justify-center">
                            {country.universities.map((uni, i) => (
                                <div key={i} className="flex items-center gap-2 md:gap-3 group cursor-pointer hover:scale-105 transition-transform duration-300">
                                    <div className="size-10 md:size-14 rounded-full overflow-hidden shadow-md border-2 border-white bg-slate-100 flex-shrink-0">
                                        <img
                                            src={uni.image || universityImg}
                                            alt={uni.name}
                                            className="w-full h-full object-cover"
                                            onError={(e) => { e.target.src = universityImg; }}
                                        />
                                    </div>
                                    <span className="font-bold text-sm md:text-xl text-[#111218] whitespace-nowrap">{uni.name}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
                        <div className="bg-[#f6f6f8] p-5 md:p-8 rounded-2xl">
                            <h4 className="text-lg md:text-xl font-bold mb-2 md:mb-4 flex items-center gap-2 md:gap-3">
                                <span className="material-symbols-outlined text-[#2463eb] text-xl md:text-2xl">school</span>
                                Research Intensive
                            </h4>
                            <p className="text-slate-600 text-xs md:text-base">World-class universities committed to maintaining the highest standards of research and education.</p>
                        </div>
                        <div className="bg-[#f6f6f8] p-5 md:p-8 rounded-2xl">
                            <h4 className="text-lg md:text-xl font-bold mb-2 md:mb-4 flex items-center gap-2 md:gap-3">
                                <span className="material-symbols-outlined text-[#2463eb] text-xl md:text-2xl">engineering</span>
                                Modern Universities
                            </h4>
                            <p className="text-slate-600 text-xs md:text-base">Focused on industry links and employability, offering practical, career-oriented degrees.</p>
                        </div>
                    </div>
                </section>

                {/* CTA Section */}
                {/* CTA Section */}
                <section className="py-10 md:py-20 flex flex-col items-center justify-center px-4">
                    <div className="bg-white p-8 md:p-12 rounded-3xl shadow-xl text-center max-w-4xl w-full border border-blue-50 relative overflow-hidden group hover:shadow-2xl transition-all duration-500">

                        {/* Interactive Background Elements */}
                        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-50/50 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl group-hover:bg-blue-100/50 transition-colors duration-500"></div>
                        <div className="absolute bottom-0 left-0 w-64 h-64 bg-indigo-50/50 rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl group-hover:bg-indigo-100/50 transition-colors duration-500"></div>

                        <div className="relative z-10">
                            <span className="inline-block py-1 px-3 rounded-full bg-blue-100 text-[#193ce6] text-xs font-bold mb-4 tracking-wide uppercase">Free Expert Guidance</span>
                            <h3 className="text-2xl md:text-4xl font-bold mb-4 md:mb-6 tracking-tight text-slate-900 leading-tight">
                                Ready to start your <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#193ce6] to-[#4f46e5]">study abroad journey</span>?
                            </h3>
                            <p className="text-slate-600 mb-8 md:mb-10 text-base md:text-lg mx-auto max-w-2xl leading-relaxed">
                                Get personalized university recommendations, scholarship alerts, and visa guidance from our expert consultants - completely free.
                            </p>
                            <div className="flex justify-center">
                                <button
                                    onClick={() => user ? navigate('/consultant') : navigate('/login', { state: { from: '/consultant' } })}
                                    className="bg-[#193ce6] text-white font-bold py-4 px-10 rounded-xl text-lg shadow-xl shadow-blue-600/20 hover:bg-[#132db0] hover:shadow-blue-600/30 hover:-translate-y-1 transition-all duration-300 flex items-center gap-2"
                                >
                                    Book Free Consultation
                                    <span className="material-symbols-outlined text-xl">arrow_forward</span>
                                </button>
                            </div>
                            <p className="mt-6 text-slate-400 text-sm">No hidden fees • 100% Free Consultation • Expert Support</p>
                        </div>
                    </div>
                </section>

            </main >
            <Footer />
        </div >
    );
};

export default CountryDetails;
