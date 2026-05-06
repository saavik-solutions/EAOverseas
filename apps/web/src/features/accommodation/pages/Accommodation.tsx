import React, { useState, useMemo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSavedItems } from '@/features/saved-items/context/SavedItemsContext';
import { useAuthAction } from '@/hooks/useAuthAction';
import { useAuth } from '@/features/auth/context/AuthContext';
import LoginModal from '@/features/auth/components/LoginModal';

const Accommodation = () => {
    const navigate = useNavigate();
    const { executeAction, isLoginModalOpen, closeLoginModal } = useAuthAction();
    const { user } = useAuth();

    // 1. State for Filters and Pagination
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [filters, setFilters] = useState({
        university: 'Any',
        city: 'Any',
        types: {
            'University Dorm': true,
            'Private Student Housing': true,
            'Shared Apartment': true,
            'Homestay': true
        },
        priceRange: [400, 2500],
        distance: 'Any'
    });
    const [sortBy, setSortBy] = useState('Relevance');
    const [currentPage, setCurrentPage] = useState(1);
    const [showAmenitiesModal, setShowAmenitiesModal] = useState(null);
    const itemsPerPage = 6;
    const { toggleAccommodation, isAccommodationSaved } = useSavedItems();

    // 2. Mock Data for Accommodations (Expanded)
    const accommodations = [
        {
            id: 1,
            title: "Maple Leaf Residences",
            university: "University of Toronto",
            image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBgal1M-tWKc_S3qFG158VjGJ5ouyJc6b6pAbJq9Mkm4SsYyycm38qcA_KusiY5WDnd1gdsOk8-QG8L7LetDJ8IqFg3osPu-kCKPL7Ygl1Vy2PJkcliKxd-Jq7qhomQEtSp8wlhDD-5-xDBTVnQQ-5Cl6EZbdbnHssrgPbyauuaYVrsFwF-SOyj2qQJMmtN4deSdq6WXc2WAf9Sj-WalzGyl6svQTLCInOByCnY1kTclplEyKlWYWMyT4S4fCIFVfyYiVqJzRZv60s",
            type: "Private Student Housing",
            distance: "0.5 miles",
            location: "Toronto, ON",
            amenities: ["wifi", "fitness_center", "local_laundry_service", "security"],
            header: "Nearest to Your University",
            price: "$750", // Monthly
            priceValue: 750,
            period: "/month",
            saved: false,
            description: "Maple Leaf Residences offers a vibrant community atmosphere tailored specifically for international students. Located in the heart of downtown, it provides a safe, modern, and inclusive environment.",
            images: [
                "https://lh3.googleusercontent.com/aida-public/AB6AXuBgal1M-tWKc_S3qFG158VjGJ5ouyJc6b6pAbJq9Mkm4SsYyycm38qcA_KusiY5WDnd1gdsOk8-QG8L7LetDJ8IqFg3osPu-kCKPL7Ygl1Vy2PJkcliKxd-Jq7qhomQEtSp8wlhDD-5-xDBTVnQQ-5Cl6EZbdbnHssrgPbyauuaYVrsFwF-SOyj2qQJMmtN4deSdq6WXc2WAf9Sj-WalzGyl6svQTLCInOByCnY1kTclplEyKlWYWMyT4S4fCIFVfyYiVqJzRZv60s",
                "https://lh3.googleusercontent.com/aida-public/AB6AXuBDv2ChOaSFAN9rwtOZ5ljePS-MA8Bx8UT-0oKP7ftWjLAcxjPe87VNeurUAsc_VjfioKzwfoBFuk6prMQqFz6Ddsw3kFA1tiHrCrsz_yKdoHFtjZHeL23LG--yTvod0N9GH-6MGqybvV8Q33YiItYMhhGEhV4jMuVYkKVASBT8ws2WDH8bh1DuJcahzPAv3w4lLHHMyBdTr2r1DcKXz9GSdVLxKy-ZfDI1fjMa5nXA4mr5W3ojBBz2JHbY221EWjoBQE5psJlF068"
            ],
            roomTypes: [
                {
                    title: "Private Studio",
                    subtitle: "Ideal for maximum privacy",
                    tags: ["Ensuite Bathroom", "Private Kitchenette", "Double Bed"],
                    description: "Includes study desk, chair, and wardrobe.",
                    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAGZv7vfjnUI7QI1fGrU7HV2xu-NzH8ilPP0j6kf-uTZRnmtz6uJZpIfV2p8U1rEYbIVDDyv6wR88AzOV7APCbaGYK9N_RmjCfMOCtixj-347Ak_Wx3zNVLlFvlYTu4aKNaRM-Qg5QTgSsAe6pjg9yL2l2VK15xLb0VpedKRCWaYNwyWv-PJWno-FODlDxSLZhbbmQEk0Nfa4u5ecKXNRYHMn3zMUTRh8ICHeih1fMaDJvDNECVtzdRKSJKCv0qlCeL9rSsglNLbp4",
                    price: 750
                }
            ],
            locationDetails: {
                address: "45 Willcocks St, Toronto, ON M5S 1C7",
                mapImage: "https://lh3.googleusercontent.com/aida-public/AB6AXuAZkRCLW9CMzndcvvvCFGLwERTU5NS0voqzIQY5HdeFIA_xuW_PuHjFmUO4EPcCIGWlSg1fRBRlGlRwsgDpDUtrMR1-Xph7Vpz8nY5nw-QFDtt3ijbvV5SF2O6Zx8SFQ0y837_-K_FCtL-_MZ1M2yMjJ6wZ8bgkGAk3x_McWGFeNBpJEFYfaJ-o6u_o9udhXAIPSIJ67QNZzzPhtf0swDI7EbhA1RCR0l122cdC2MZch9Vh7MwZ_iMQhmll-vLYNTNXgW_s3heWmNI"
            },
            inclusions: ["All Utilities", "High-speed Internet"],
            categorizedAmenities: { "Amenities": [{ icon: "wifi", label: "WiFi" }] }
        },
        {
            id: 2,
            title: "King's Court Residence",
            university: "King's College London",
            image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCr5a-hzIW08rz2sGCkXBcA6E_FZYI82axze0EEZgb-35Xkxqf5O0bdG-S-t_5vA4pCXTirZVq9JhZl6bmT_wsGxpCOvaRobBo1-LAEOH1pehrfKnpvLvjly4JLiqdlI7Q2HC_kYTJPRDFCkeX4bWWGqUm3whOZW0pwa0SVrmS5A6_0ECar6qo_yfE8WZETuT8lFWMZVeLnaG6TBQLGKL41A__oswnEn9mFD1qyDAZITwbf3BNPq5LnTHsae2iCm4wqR2y0H8JSnPs",
            type: "University Dorm",
            distance: "0.2 miles",
            location: "London, UK",
            amenities: ["kitchen", "wifi", "local_laundry_service", "chair"],
            header: "On Campus Choice",
            price: "£850",
            priceValue: 850,
            period: "/month",
            saved: false,
            description: "Experience the convenience of living right on campus at King's Court. This detailed residence offers a perfect blend of academic focus and social activities.",
            images: [
                "https://lh3.googleusercontent.com/aida-public/AB6AXuCr5a-hzIW08rz2sGCkXBcA6E_FZYI82axze0EEZgb-35Xkxqf5O0bdG-S-t_5vA4pCXTirZVq9JhZl6bmT_wsGxpCOvaRobBo1-LAEOH1pehrfKnpvLvjly4JLiqdlI7Q2HC_kYTJPRDFCkeX4bWWGqUm3whOZW0pwa0SVrmS5A6_0ECar6qo_yfE8WZETuT8lFWMZVeLnaG6TBQLGKL41A__oswnEn9mFD1qyDAZITwbf3BNPq5LnTHsae2iCm4wqR2y0H8JSnPs",
            ],
            roomTypes: [
                {
                    title: "Standard Single",
                    subtitle: "Your own private space",
                    tags: ["Single Bed", "Shared Bathroom"],
                    description: "A cozy single room with essential furniture.",
                    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBDrpME1J2iVUCssM-A9nZgN1AcCrdBwUWiMXBZjY375SQTHf_TORB_9tOjaEErl-uR1dzn336mgKvG3t04OtYH2fOY1LmjwBVhxkjm_5u6L4761fpDJGmAemULDPhL7sT-tdw6niOB4iv7f8lfu7_woOaJ-TAMdsU9Dc4Wyv8oeflni4eQ1HUJfKuhD-zA0RL7EoXq_rJgEST9FVHHz2WwBK_WkA15Hs2ctkPPnWwemXJwhPbD83HKWxspd8v7vQ0-qu-xM_6DLjo",
                    price: 850
                }
            ],
            locationDetails: {
                address: "King's Court, Strand, London WC2R 2LS",
                mapImage: "https://lh3.googleusercontent.com/aida-public/AB6AXuAZkRCLW9CMzndcvvvCFGLwERTU5NS0voqzIQY5HdeFIA_xuW_PuHjFmUO4EPcCIGWlSg1fRBRlGlRwsgDpDUtrMR1-Xph7Vpz8nY5nw-QFDtt3ijbvV5SF2O6Zx8SFQ0y837_-K_FCtL-_MZ1M2yMjJ6wZ8bgkGAk3x_McWGFeNBpJEFYfaJ-o6u_o9udhXAIPSIJ67QNZzzPhtf0swDI7EbhA1RCR0l122cdC2MZch9Vh7MwZ_iMQhmll-vLYNTNXgW_s3heWmNI"
            },
            inclusions: ["All Bills Included", "Campus Security"],
            categorizedAmenities: { "Amenities": [{ icon: "wifi", label: "WiFi" }] }
        },
        {
            id: 3,
            title: "Camden Flat Share",
            university: "UCL",
            image: "https://lh3.googleusercontent.com/aida-public/AB6AXuColJxQTr37JtMjJ0X2AvohM6Wi5Q0TifthNHvFPvHNKIzEqRbHrK_sO7U_xRF37eQzMzRZTwNKJgjstwNr9Cl0FW-5tIvh5F1cV3Xf52ZG9bclNGVuW2Y1HPMsA7vNk1Pf9rDqqqc5ajTuUMoC21MGL6pxfACf6HLe7RozJFoxUeRsOciBKTRd-fQGYxybZdNezZcmEYPlpGgivMV7ZQ6EVC8bDIoTK1WEK7dO40PiKDKUwZhagn8gBv-vrxwR4f48g16wiXFV9hc",
            type: "Shared Apartment",
            distance: "2.5 miles",
            location: "Camden, London",
            amenities: ["chair", "weekend", "deck", "table_restaurant"],
            header: "Best Value",
            price: "£750",
            priceValue: 750,
            period: "/month",
            saved: false,
            description: "Live inside the vibrant culture of Camden Town. This shared apartment is perfect for students looking for independence.",
            images: [
                "https://lh3.googleusercontent.com/aida-public/AB6AXuColJxQTr37JtMjJ0X2AvohM6Wi5Q0TifthNHvFPvHNKIzEqRbHrK_sO7U_xRF37eQzMzRZTwNKJgjstwNr9Cl0FW-5tIvh5F1cV3Xf52ZG9bclNGVuW2Y1HPMsA7vNk1Pf9rDqqqc5ajTuUMoC21MGL6pxfACf6HLe7RozJFoxUeRsOciBKTRd-fQGYxybZdNezZcmEYPlpGgivMV7ZQ6EVC8bDIoTK1WEK7dO40PiKDKUwZhagn8gBv-vrxwR4f48g16wiXFV9hc",
            ],
            roomTypes: [
                {
                    title: "Double Room",
                    subtitle: "Spacious and bright",
                    tags: ["Double Bed"],
                    description: "A large double room with plenty of natural light.",
                    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAyofmbE6BQ1oKD_K5rKFIejNVdgeqUiSyrolvHkNfCE26ZnAXiT-oINCudT0C-fT3MCmy9redQzfVamIOAnrhXrylTrlJkbQPzWlxG7hTppX9A53giOaN0dXM6Yg3W2IXnmrCIHAK7jp5hyFYv-ptAImCikMurQL6guj1jZaXnZbloJ3SOSTuzhdxZ0Nnj6dAjTODFzyzL_gA8HM3MX7QjAv3pDPx-BL07xUcB4uKUW_dao5sgRNXIJtrcbyIivxNSWhyQOVL-cK4",
                    price: 800
                }
            ],
            locationDetails: {
                address: "Camden High St, London NW1 7JE",
                mapImage: "https://lh3.googleusercontent.com/aida-public/AB6AXuAZkRCLW9CMzndcvvvCFGLwERTU5NS0voqzIQY5HdeFIA_xuW_PuHjFmUO4EPcCIGWlSg1fRBRlGlRwsgDpDUtrMR1-Xph7Vpz8nY5nw-QFDtt3ijbvV5SF2O6Zx8SFQ0y837_-K_FCtL-_MZ1M2yMjJ6wZ8bgkGAk3x_McWGFeNBpJEFYfaJ-o6u_o9udhXAIPSIJ67QNZzzPhtf0swDI7EbhA1RCR0l122cdC2MZch9Vh7MwZ_iMQhmll-vLYNTNXgW_s3heWmNI"
            },
            inclusions: ["Water", "Internet"],
            categorizedAmenities: { "Amenities": [{ icon: "deck", label: "Terrace Access" }] }
        },
        {
            id: 4,
            title: "The Hive - Bethnal Green",
            university: "Queen Mary University",
            image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCSqktYlN1jZAXfmY3PmmJrPthXzol8JWERJG79Uh7uDCa3yHs0je9PEXl9R0B9mOMboT0LdZunHQ6DIah7l-lYlXQtF8a570ui4LyNy7RghWleNM-jRaR687Y_jQgNU6BBU2Qg6NGXdPJV8Dsh0UmJIxW21ig_rNJ8L5fJ6wvGEIC0TPHl7mhtSVS1NIHNbSugvl7Jb0b7H0jXNDsujR0_dmJBYaEmZmnLu_pViYSTqpWvu8WFox4AEPan3xA4KqVCz9pQ1I7yK0A",
            type: "Private Student Housing",
            distance: "3.0 miles",
            location: "London, UK",
            amenities: ["deck", "groups", "wifi", "lock"],
            header: "Top Rated",
            price: "£980",
            priceValue: 980,
            period: "/month",
            saved: true,
            description: "The Hive offers a modern, stylish living environment. Known for its strong community and social events.",
            images: [
                "https://lh3.googleusercontent.com/aida-public/AB6AXuCSqktYlN1jZAXfmY3PmmJrPthXzol8JWERJG79Uh7uDCa3yHs0je9PEXl9R0B9mOMboT0LdZunHQ6DIah7l-lYlXQtF8a570ui4LyNy7RghWleNM-jRaR687Y_jQgNU6BBU2Qg6NGXdPJV8Dsh0UmJIxW21ig_rNJ8L5fJ6wvGEIC0TPHl7mhtSVS1NIHNbSugvl7Jb0b7H0jXNDsujR0_dmJBYaEmZmnLu_pViYSTqpWvu8WFox4AEPan3xA4KqVCz9pQ1I7yK0A"
            ],
            roomTypes: [
                {
                    title: "Studio Apartment",
                    subtitle: "All-in-one living",
                    tags: ["Kitchenette", "Double Bed"],
                    description: "A self-contained studio with everything you need.",
                    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAGZv7vfjnUI7QI1fGrU7HV2xu-NzH8ilPP0j6kf-uTZRnmtz6uJZpIfV2p8U1rEYbIVDDyv6wR88AzOV7APCbaGYK9N_RmjCfMOCtixj-347Ak_Wx3zNVLlFvlYTu4aKNaRM-Qg5QTgSsAe6pjg9yL2l2VK15xLb0VpedKRCWaYNwyWv-PJWno-FODlDxSLZhbbmQEk0Nfa4u5ecKXNRYHMn3zMUTRh8ICHeih1fMaDJvDNECVtzdRKSJKCv0qlCeL9rSsglNLbp4",
                    price: 980
                }
            ],
            locationDetails: {
                address: "Bethnal Green Rd, London E2 0AN",
                mapImage: "https://lh3.googleusercontent.com/aida-public/AB6AXuAZkRCLW9CMzndcvvvCFGLwERTU5NS0voqzIQY5HdeFIA_xuW_PuHjFmUO4EPcCIGWlSg1fRBRlGlRwsgDpDUtrMR1-Xph7Vpz8nY5nw-QFDtt3ijbvV5SF2O6Zx8SFQ0y837_-K_FCtL-_MZ1M2yMjJ6wZ8bgkGAk3x_McWGFeNBpJEFYfaJ-o6u_o9udhXAIPSIJ67QNZzzPhtf0swDI7EbhA1RCR0l122cdC2MZch9Vh7MwZ_iMQhmll-vLYNTNXgW_s3heWmNI"
            },
            inclusions: ["All Bills", "Events"],
            categorizedAmenities: { "Amenities": [{ icon: "deck", label: "Roof Terrace" }] }
        },
        {
            id: 5,
            title: "Chapter Spitalfields",
            university: "Imperial College",
            image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAz1QWXQyjz2HHcii8juUV11qrWFIGKDPkS-Z9uILdhwuZgOnXVaSZORyzbAbCihnLx0bSCUYsZg9Tq1FXUYvoRYOSgFAyE4rtRpVyXi72EzCA_Up4ZB4gLXbV9CJUY6fhf0pOYoLp6O5FoUKSFIBQcbCZ-ygyb22adovndWtfKDYYEs3Rkpbm_Qtin2uZHAELCyDVEx8jXBnZEyptClBFfhQKch9ZbLa9QFB6OB24JIIh_4FMeBrzXy8_mhX4SzQfl4-uRYsbhPlY",
            type: "Private Student Housing",
            distance: "1.1 miles",
            location: "Spitalfields, London",
            amenities: ["theaters", "verified_user", "fitness_center", "wifi"],
            header: "Premium Choice",
            price: "£1,450",
            priceValue: 1450,
            period: "/month",
            saved: false,
            description: "Luxury student living at its finest. Chapter Spitalfields boasts incredible amenities including a cinema room and gym.",
            images: [
                "https://lh3.googleusercontent.com/aida-public/AB6AXuAz1QWXQyjz2HHcii8juUV11qrWFIGKDPkS-Z9uILdhwuZgOnXVaSZORyzbAbCihnLx0bSCUYsZg9Tq1FXUYvoRYOSgFAyE4rtRpVyXi72EzCA_Up4ZB4gLXbV9CJUY6fhf0pOYoLp6O5FoUKSFIBQcbCZ-ygyb22adovndWtfKDYYEs3Rkpbm_Qtin2uZHAELCyDVEx8jXBnZEyptClBFfhQKch9ZbLa9QFB6OB24JIIh_4FMeBrzXy8_mhX4SzQfl4-uRYsbhPlY"
            ],
            roomTypes: [
                {
                    title: "Platinum Studio",
                    subtitle: "The height of luxury",
                    tags: ["City Views", "Private Kitchen"],
                    description: "Stunning high-floor studio.",
                    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAGZv7vfjnUI7QI1fGrU7HV2xu-NzH8ilPP0j6kf-uTZRnmtz6uJZpIfV2p8U1rEYbIVDDyv6wR88AzOV7APCbaGYK9N_RmjCfMOCtixj-347Ak_Wx3zNVLlFvlYTu4aKNaRM-Qg5QTgSsAe6pjg9yL2l2VK15xLb0VpedKRCWaYNwyWv-PJWno-FODlDxSLZhbbmQEk0Nfa4u5ecKXNRYHMn3zMUTRh8ICHeih1fMaDJvDNECVtzdRKSJKCv0qlCeL9rSsglNLbp4",
                    price: 1650
                }
            ],
            locationDetails: {
                address: "9 Frying Pan Alley, London E1 7HS",
                mapImage: "https://lh3.googleusercontent.com/aida-public/AB6AXuAZkRCLW9CMzndcvvvCFGLwERTU5NS0voqzIQY5HdeFIA_xuW_PuHjFmUO4EPcCIGWlSg1fRBRlGlRwsgDpDUtrMR1-Xph7Vpz8nY5nw-QFDtt3ijbvV5SF2O6Zx8SFQ0y837_-K_FCtL-_MZ1M2yMjJ6wZ8bgkGAk3x_McWGFeNBpJEFYfaJ-o6u_o9udhXAIPSIJ67QNZzzPhtf0swDI7EbhA1RCR0l122cdC2MZch9Vh7MwZ_iMQhmll-vLYNTNXgW_s3heWmNI"
            },
            inclusions: ["All Utilities", "Gym Membership"],
            categorizedAmenities: { "Amenities": [{ icon: "theaters", label: "Cinema" }] }
        },
        {
            id: 6,
            title: "Great Dover Street Apts",
            university: "King's College London",
            image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCAoBW6VLSuh0Xm-elYcAJbtn8CO9TzdE1pyg_whzNiootVBQsdPRnaSFgQJuDDuCAvxkepH1FjoF19HwwGqVGKwyW6tAn9Ys072fsb525fioYPmKwQ5eeDCLadDaCOCzYSG8-ZdkUq9HrUAKPxczXYxZ9Pkpp3QZv6DSLnoUvAagmwViGpiVJn_JLFWeYQ1enQM1UcV6jl9lau6goPsNKONN-QfdBD4_kZ1mMnH8EHbdZj4WZ5qmpPy9fs4ZXGNh_3XhhGVTPfEfM",
            type: "University Dorm",
            distance: "0.8 miles",
            location: "Borough, London",
            amenities: ["bed", "bolt", "wifi", "local_library"],
            header: "Bills Included",
            price: "£890",
            priceValue: 890,
            period: "/month",
            saved: false,
            description: "A popular choice for students who want a balance of study and social life.",
            images: [
                "https://lh3.googleusercontent.com/aida-public/AB6AXuCAoBW6VLSuh0Xm-elYcAJbtn8CO9TzdE1pyg_whzNiootVBQsdPRnaSFgQJuDDuCAvxkepH1FjoF19HwwGqVGKwyW6tAn9Ys072fsb525fioYPmKwQ5eeDCLadDaCOCzYSG8-ZdkUq9HrUAKPxczXYxZ9Pkpp3QZv6DSLnoUvAagmwViGpiVJn_JLFWeYQ1enQM1UcV6jl9lau6goPsNKONN-QfdBD4_kZ1mMnH8EHbdZj4WZ5qmpPy9fs4ZXGNh_3XhhGVTPfEfM"
            ],
            roomTypes: [
                {
                    title: "Single Room",
                    subtitle: "Standard university room",
                    tags: ["Single Bed", "Washbasin"],
                    description: "A standard single room with a washbasin.",
                    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBDrpME1J2iVUCssM-A9nZgN1AcCrdBwUWiMXBZjY375SQTHf_TORB_9tOjaEErl-uR1dzn336mgKvG3t04OtYH2fOY1LmjwBVhxkjm_5u6L4761fpDJGmAemULDPhL7sT-tdw6niOB4iv7f8lfu7_woOaJ-TAMdsU9Dc4Wyv8oeflni4eQ1HUJfKuhD-zA0RL7EoXq_rJgEST9FVHHz2WwBK_WkA15Hs2ctkPPnWwemXJwhPbD83HKWxspd8v7vQ0-qu-xM_6DLjo",
                    price: 890
                }
            ],
            locationDetails: {
                address: "165 Great Dover St, London SE1 4XA",
                mapImage: "https://lh3.googleusercontent.com/aida-public/AB6AXuAZkRCLW9CMzndcvvvCFGLwERTU5NS0voqzIQY5HdeFIA_xuW_PuHjFmUO4EPcCIGWlSg1fRBRlGlRwsgDpDUtrMR1-Xph7Vpz8nY5nw-QFDtt3ijbvV5SF2O6Zx8SFQ0y837_-K_FCtL-_MZ1M2yMjJ6wZ8bgkGAk3x_McWGFeNBpJEFYfaJ-o6u_o9udhXAIPSIJ67QNZzzPhtf0swDI7EbhA1RCR0l122cdC2MZch9Vh7MwZ_iMQhmll-vLYNTNXgW_s3heWmNI"
            },
            inclusions: ["Electricity", "Water"],
            categorizedAmenities: { "Amenities": [{ icon: "local_laundry_service", label: "Laundry" }] }
        },
        {
            id: 7,
            title: "Victoria Hall",
            university: "Manchester Metropolitan",
            image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAw65C_k7kOXo3W2sK5qR_t1Qx4zL9Jp6yE8_wB6A5zO9uR7vX3d2s1t0y6x4f5v9w8A7b6C5d4e3f2g1h0i9j8k7l6m5n4o3p2q1",
            type: "Private Student Housing",
            distance: "0.3 miles",
            location: "Manchester, UK",
            amenities: ["wifi", "local_laundry_service", "chair"],
            header: "Newly Listed",
            price: "£165", // Weekly, converted to approx monthly for filtering logic
            priceValue: 715, // 165 * 4.33
            period: "/week",
            saved: false,
            description: "Modern student accommodation in the heart of Manchester, close to universities and city center attractions.",
            images: ["https://lh3.googleusercontent.com/aida-public/AB6AXuAw65C_k7kOXo3W2sK5qR_t1Qx4zL9Jp6yE8_wB6A5zO9uR7vX3d2s1t0y6x4f5v9w8A7b6C5d4e3f2g1h0i9j8k7l6m5n4o3p2q1"],
            roomTypes: [{ title: "Ensuite", price: 165, image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAw65C_k7kOXo3W2sK5qR_t1Qx4zL9Jp6yE8_wB6A5zO9uR7vX3d2s1t0y6x4f5v9w8A7b6C5d4e3f2g1h0i9j8k7l6m5n4o3p2q1" }],
            locationDetails: { address: "Manchester, UK" },
            inclusions: ["Water", "Wifi"],
            categorizedAmenities: { "Amenities": [{ icon: "wifi", label: "Wifi" }] }
        },
        {
            id: 8,
            title: "New York Student Housing",
            university: "NYU",
            image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBgal1M-tWKc_S3qFG158VjGJ5ouyJc6b6pAbJq9Mkm4SsYyycm38qcA_KusiY5WDnd1gdsOk8-QG8L7LetDJ8IqFg3osPu-kCKPL7Ygl1Vy2PJkcliKxd-Jq7qhomQEtSp8wlhDD-5-xDBTVnQQ-5Cl6EZbdbnHssrgPbyauuaYVrsFwF-SOyj2qQJMmtN4deSdq6WXc2WAf9Sj-WalzGyl6svQTLCInOByCnY1kTclplEyKlWYWMyT4S4fCIFVfyYiVqJzRZv60s",
            type: "Shared Apartment",
            distance: "1.0 miles",
            location: "New York, USA",
            amenities: ["wifi", "fitness_center"],
            header: "International Hub",
            price: "$1,800",
            priceValue: 1800,
            period: "/month",
            saved: false,
            description: "Premium student living in Manhattan.",
            images: ["https://lh3.googleusercontent.com/aida-public/AB6AXuBgal1M-tWKc_S3qFG158VjGJ5ouyJc6b6pAbJq9Mkm4SsYyycm38qcA_KusiY5WDnd1gdsOk8-QG8L7LetDJ8IqFg3osPu-kCKPL7Ygl1Vy2PJkcliKxd-Jq7qhomQEtSp8wlhDD-5-xDBTVnQQ-5Cl6EZbdbnHssrgPbyauuaYVrsFwF-SOyj2qQJMmtN4deSdq6WXc2WAf9Sj-WalzGyl6svQTLCInOByCnY1kTclplEyKlWYWMyT4S4fCIFVfyYiVqJzRZv60s"],
            roomTypes: [{ title: "Private Room", price: 1800, image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBgal1M-tWKc_S3qFG158VjGJ5ouyJc6b6pAbJq9Mkm4SsYyycm38qcA_KusiY5WDnd1gdsOk8-QG8L7LetDJ8IqFg3osPu-kCKPL7Ygl1Vy2PJkcliKxd-Jq7qhomQEtSp8wlhDD-5-xDBTVnQQ-5Cl6EZbdbnHssrgPbyauuaYVrsFwF-SOyj2qQJMmtN4deSdq6WXc2WAf9Sj-WalzGyl6svQTLCInOByCnY1kTclplEyKlWYWMyT4S4fCIFVfyYiVqJzRZv60s" }],
            locationDetails: { address: "New York, NY" },
            inclusions: ["Wifi"],
            categorizedAmenities: { "Amenities": [{ icon: "wifi", label: "Wifi" }] }
        }
    ];

    // 3. Handlers
    const handleFilterChange = (key, value) => {
        executeAction(() => {
            setFilters(prev => ({ ...prev, [key]: value }));
        });
    };

    const handleTypeChange = (type) => {
        executeAction(() => {
            setFilters(prev => ({
                ...prev,
                types: { ...prev.types, [type]: !prev.types[type] }
            }));
        });
    };

    const clearFilters = () => {
        executeAction(() => {
            setFilters({
                university: 'Any',
                city: 'Any',
                types: {
                    'University Dorm': true,
                    'Private Student Housing': true,
                    'Shared Apartment': true,
                    'Homestay': true
                },
                priceRange: [400, 2500],
                distance: 'Any'
            });
        });
    };

    // 4. Filtering Logic
    const filteredAccommodations = useMemo(() => {
        return accommodations.filter(acc => {
            // University Match
            if (filters.university !== 'Any' && acc.university !== filters.university) return false;

            // City Match
            if (filters.city !== 'Any' && !acc.location.includes(filters.city)) return false;

            // Type Match
            const mappedType = acc.type === 'Private Housing' ? 'Private Student Housing' : (acc.type === 'Shared Apt' ? 'Shared Apartment' : acc.type);
            if (!filters.types[mappedType] && !filters.types[acc.type]) return false;

            // Price Match
            if (acc.priceValue < filters.priceRange[0] || acc.priceValue > filters.priceRange[1]) return false;

            // Distance Match (Simplified for demo)
            if (filters.distance !== 'Any') {
                const dist = parseFloat(acc.distance);
                const maxDist = parseFloat(filters.distance.replace('< ', '').replace(' km', ''));
                if (dist * 1.6 > maxDist) return false;
            }

            return true;
        }).sort((a, b) => {
            if (sortBy === 'Price: Low to High') return a.priceValue - b.priceValue;
            if (sortBy === 'Distance: Nearest') return parseFloat(a.distance) - parseFloat(b.distance);
            return 0; // Relevance
        });
    }, [filters, accommodations, sortBy]);

    // 5. Pagination Logic
    useEffect(() => {
        setCurrentPage(1); // Reset to page 1 when filters or sort changes
    }, [filters, sortBy]);

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredAccommodations.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(filteredAccommodations.length / itemsPerPage);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);


    // Sidebar Content Component
    const SidebarContent = () => (
        <div className="bg-white rounded-xl border border-[#dbdfe6] p-5 shadow-sm h-full flex flex-col">
            <div className="flex-1 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-200">
                <div className="flex items-center justify-between mb-6">
                    <h3 className="font-bold text-xl text-[#111418]">Filters</h3>
                    <button onClick={clearFilters} className="text-sm text-[#0d6cf2] font-semibold hover:underline">Clear all</button>
                </div>

                {/* Mobile Results Controls (Inside Filter) */}
                <div className="block lg:hidden space-y-4 border-b border-gray-100 pb-6 mb-6">
                    <div className="flex flex-col">
                        <span className="text-[#111418] font-bold text-lg">{filteredAccommodations.length} Options Found</span>
                        <span className="text-[#60728a] text-xs">
                            {filters.university !== 'Any' ? `Near ${filters.university}` : (filters.city !== 'Any' ? `In ${filters.city}` : 'All Locations')}
                        </span>
                    </div>
                    <div className="flex items-center justify-between">
                        <label className="text-sm text-[#60728a] whitespace-nowrap">Sort by:</label>
                        <select
                            value={sortBy}
                            onChange={(e) => executeAction(() => setSortBy(e.target.value))}
                            className="rounded-lg border-gray-200 bg-white text-[#111418] text-sm py-2 pl-3 pr-8 focus:ring-[#0d6cf2] focus:border-[#0d6cf2]"
                        >
                            <option>Relevance</option>
                            <option>Price: Low to High</option>
                            <option>Distance: Nearest</option>
                        </select>
                    </div>

                    {/* Active Filters Pills - Mobile */}
                    <div className="flex flex-wrap gap-2 pt-2">
                        {filters.city !== 'Any' && (
                            <div className="flex items-center gap-1 bg-gray-100 border border-gray-200 px-3 py-1 rounded-full text-xs font-medium text-[#111418]">
                                {filters.city}
                                <button onClick={() => executeAction(() => handleFilterChange('city', 'Any'))} className="ml-1 text-gray-400 hover:text-red-500"><span className="material-symbols-outlined text-[16px]">close</span></button>
                            </div>
                        )}
                        {filters.university !== 'Any' && (
                            <div className="flex items-center gap-1 bg-gray-100 border border-gray-200 px-3 py-1 rounded-full text-xs font-medium text-[#111418]">
                                {filters.university}
                                <button onClick={() => executeAction(() => handleFilterChange('university', 'Any'))} className="ml-1 text-gray-400 hover:text-red-500"><span className="material-symbols-outlined text-[16px]">close</span></button>
                            </div>
                        )}
                        <div className="flex items-center gap-1 bg-gray-100 border border-gray-200 px-3 py-1 rounded-full text-xs font-medium text-[#111418]">
                            Max £{filters.priceRange[1]}
                        </div>
                    </div>
                </div>

                {/* University & Location Filter */}
                <div className="space-y-5 border-b border-gray-100 pb-6 mb-6">
                    <h4 className="font-bold text-[#111418] text-base">University & Location</h4>
                    <div className="space-y-4">
                        <label className="block">
                            <span className="text-xs font-semibold text-gray-500 mb-1.5 block uppercase tracking-wide">University</span>
                            <div className="relative">
                                <select
                                    value={filters.university}
                                    onChange={(e) => handleFilterChange('university', e.target.value)}
                                    className="w-full h-12 rounded-lg border border-gray-300 bg-white text-[#111418] text-sm px-4 appearance-none focus:ring-2 focus:ring-[#0d6cf2] focus:border-transparent transition-all outline-none"
                                >
                                    <option value="Any">Any University</option>
                                    <option value="King's College London">King's College London</option>
                                    <option value="Imperial College">Imperial College</option>
                                    <option value="UCL">UCL</option>
                                    <option value="University of Toronto">University of Toronto</option>
                                    <option value="Manchester Metropolitan">Manchester Metropolitan</option>
                                    <option value="Queen Mary University">Queen Mary University</option>
                                    <option value="NYU">NYU</option>
                                </select>
                                <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none">expand_more</span>
                            </div>
                        </label>
                        <label className="block">
                            <span className="text-xs font-semibold text-gray-500 mb-1.5 block uppercase tracking-wide">City</span>
                            <div className="relative">
                                <select
                                    value={filters.city}
                                    onChange={(e) => handleFilterChange('city', e.target.value)}
                                    className="w-full h-12 rounded-lg border border-gray-300 bg-white text-[#111418] text-sm px-4 appearance-none focus:ring-2 focus:ring-[#0d6cf2] focus:border-transparent transition-all outline-none"
                                >
                                    <option value="Any">Any City</option>
                                    <option value="London">London, UK</option>
                                    <option value="Manchester">Manchester, UK</option>
                                    <option value="Toronto">Toronto, Canada</option>
                                    <option value="New York">New York, USA</option>
                                </select>
                                <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none">expand_more</span>
                            </div>
                        </label>
                    </div>
                </div>

                {/* Accommodation Type Filter */}
                <div className="space-y-4 border-b border-gray-100 pb-6 mb-6">
                    <h4 className="font-bold text-[#111418] text-base">Accommodation Type</h4>
                    <div className="space-y-3">
                        {Object.keys(filters.types).map(type => (
                            <label key={type} className="flex items-center gap-3 cursor-pointer group hover:bg-gray-50 p-2 -mx-2 rounded-lg transition-colors">
                                <div className={`size-5 rounded border flex items-center justify-center transition-colors ${filters.types[type] ? 'bg-[#0d6cf2] border-[#0d6cf2]' : 'border-gray-300 bg-white'}`}>
                                    {filters.types[type] && <span className="material-symbols-outlined text-white text-[16px]">check</span>}
                                </div>
                                <input
                                    type="checkbox"
                                    checked={filters.types[type]}
                                    onChange={() => handleTypeChange(type)}
                                    className="sr-only"
                                />
                                <span className="text-sm text-gray-700 font-medium group-hover:text-[#111418]">{type}</span>
                            </label>
                        ))}
                    </div>
                </div>

                {/* Budget Filter */}
                <div className="space-y-5 border-b border-gray-100 pb-6 mb-6">
                    <h4 className="font-bold text-[#111418] text-base">Monthly Budget (Max)</h4>
                    <div className="px-1">
                        <div className="flex items-center justify-between text-xs font-semibold text-gray-500 mb-2">
                            <span>£400</span>
                            <span>£3000</span>
                        </div>
                        <input
                            type="range"
                            min="400"
                            max="3000"
                            step="50"
                            value={filters.priceRange[1]}
                            onChange={(e) => executeAction(() => setFilters(prev => ({ ...prev, priceRange: [prev.priceRange[0], Number(e.target.value)] })))}
                            className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#0d6cf2]"
                        />
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="relative flex-1">
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm">£</span>
                            <input
                                type="number"
                                value={filters.priceRange[0]}
                                readOnly
                                className="w-full h-10 pl-7 pr-3 rounded-lg border border-gray-300 bg-white text-gray-900 text-sm font-medium focus:ring-2 focus:ring-[#0d6cf2] outline-none"
                            />
                        </div>
                        <span className="text-gray-400 font-medium">-</span>
                        <div className="relative flex-1">
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm">£</span>
                            <input
                                type="number"
                                value={filters.priceRange[1]}
                                onChange={(e) => executeAction(() => setFilters(prev => ({ ...prev, priceRange: [prev.priceRange[0], Number(e.target.value)] })))}
                                className="w-full h-10 pl-7 pr-3 rounded-lg border border-gray-300 bg-white text-gray-900 text-sm font-medium focus:ring-2 focus:ring-[#0d6cf2] outline-none"
                            />
                        </div>
                    </div>
                </div>

                {/* Distance Filter */}
                <div className="space-y-4">
                    <h4 className="font-bold text-[#111418] text-base">Distance from Campus</h4>
                    <div className="flex flex-wrap gap-2">
                        {['Any', '< 1 km', '< 5 km'].map(opt => (
                            <button
                                key={opt}
                                onClick={() => executeAction(() => handleFilterChange('distance', opt))}
                                className={`px-4 py-2 rounded-full border text-xs font-bold transition-all ${filters.distance === opt ? 'border-[#0d6cf2] bg-[#eef6ff] text-[#0d6cf2]' : 'border-gray-200 bg-white hover:border-gray-300 text-gray-600'}`}
                            >
                                {opt}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Sticky Action Button for Mobile Drawer */}
            <div className="pt-4 mt-auto border-t border-gray-100 lg:hidden block">
                <button
                    onClick={() => executeAction(() => setIsFilterOpen(false))}
                    className="w-full bg-[#0d6cf2] hover:bg-blue-700 text-white py-3.5 rounded-xl font-bold text-sm shadow-lg shadow-blue-500/30 transition-all"
                >
                    Show Results
                </button>
            </div>
        </div>
    );

    // Helper for amenity labels
    const getAmenityLabel = (icon) => {
        const labels = {
            wifi: "High-Speed WiFi",
            fitness_center: "Gym & Fitness",
            local_laundry_service: "Laundry Facility",
            security: "24/7 Security",
            kitchen: "Modern Kitchen",
            chair: "Study Area",
            bed: "Comfortable Bed",
            bolt: "Electricity Included",
            study_design: "Study Room",
            deck: "Roof Terrace",
            groups: "Social Events",
            lock: "Secure Door Entry",
            theaters: "Cinema Room",
            verified_user: "Verified Listings",
            table_restaurant: "Dining Area",
            weekend: "Weekend Activities"
        };
        return labels[icon] || icon.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
    };

    // Modal Component
    const AmenitiesModal = ({ accommodation, onClose }) => {
        if (!accommodation) return null;

        return (
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose}></div>
                <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg relative z-10 overflow-hidden animate-in zoom-in-95 duration-200">
                    <div className="bg-[#0d6cf2] p-6 text-white flex justify-between items-start">
                        <div>
                            <h3 className="text-xl font-bold">{accommodation.title}</h3>
                            <p className="text-blue-100 text-sm mt-1">Amenities & Features</p>
                        </div>
                        <button onClick={onClose} className="p-1 hover:bg-white/20 rounded-full transition-colors">
                            <span className="material-symbols-outlined !text-[24px]">close</span>
                        </button>
                    </div>

                    <div className="p-6 max-h-[70vh] overflow-y-auto">
                        <h4 className="font-bold text-gray-900 mb-4 border-b border-gray-100 pb-2">Amenities</h4>
                        <div className="grid grid-cols-2 bg-gray-50 rounded-xl p-4 gap-4">
                            {accommodation.amenities?.map((icon, idx) => (
                                <div key={idx} className="flex items-center gap-3 p-2 bg-white rounded-lg border border-gray-100 shadow-sm">
                                    <div className="size-8 rounded-full bg-blue-50 text-[#0d6cf2] flex items-center justify-center shrink-0">
                                        <span className="material-symbols-outlined !text-[18px]">{icon}</span>
                                    </div>
                                    <span className="text-sm font-medium text-gray-700">{getAmenityLabel(icon)}</span>
                                </div>
                            ))}
                            {/* Add some generic ones if few exist to make the popup look fuller for demo */}
                            {(!accommodation.amenities || accommodation.amenities.length < 6) && (
                                <>
                                    <div className="flex items-center gap-3 p-2 bg-white rounded-lg border border-gray-100 shadow-sm">
                                        <div className="size-8 rounded-full bg-green-50 text-green-600 flex items-center justify-center shrink-0">
                                            <span className="material-symbols-outlined !text-[18px]">gpp_good</span>
                                        </div>
                                        <span className="text-sm font-medium text-gray-700">Verified Property</span>
                                    </div>
                                    <div className="flex items-center gap-3 p-2 bg-white rounded-lg border border-gray-100 shadow-sm">
                                        <div className="size-8 rounded-full bg-purple-50 text-purple-600 flex items-center justify-center shrink-0">
                                            <span className="material-symbols-outlined !text-[18px]">support_agent</span>
                                        </div>
                                        <span className="text-sm font-medium text-gray-700">24/7 Support</span>
                                    </div>
                                </>
                            )}
                        </div>

                        <h4 className="font-bold text-gray-900 mt-6 mb-4 border-b border-gray-100 pb-2">Inclusions</h4>
                        <div className="flex flex-wrap gap-2">
                            {accommodation.inclusions?.map((inc, i) => (
                                <span key={i} className="px-3 py-1 bg-green-50 text-green-700 rounded-full text-xs font-bold border border-green-100 flex items-center gap-1">
                                    <span className="material-symbols-outlined !text-[14px]">check_circle</span> {inc}
                                </span>
                            )) || <span className="text-sm text-gray-500">Contact for inclusion details.</span>}
                        </div>
                    </div>

                    <div className="p-4 bg-gray-50 border-t border-gray-100 flex justify-end">
                        <button onClick={onClose} className="px-5 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-lg font-bold text-sm transition-colors">
                            Close
                        </button>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div className="flex flex-col flex-1 h-full bg-[#f5f7f8] overflow-hidden font-display relative">
            <LoginModal isOpen={isLoginModalOpen} onClose={closeLoginModal} />
            {/* Header */}
            {/* Header */}
            <header className="hidden lg:flex h-16 bg-white border-b border-gray-200 items-center justify-between px-4 md:px-8 shrink-0 z-10">
                <div>
                    <h2 className="text-xl font-bold text-[#111418]">Accommodation Search</h2>
                </div>
                <div className="flex items-center gap-4">
                    {!user && (
                        <button
                            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold rounded-lg transition-colors shadow-sm"
                            onClick={() => navigate('/landing')}
                        >
                            Enter Website
                        </button>
                    )}
                    {user && (
                        <>
                            <div className="h-8 w-px bg-gray-200 mx-1"></div>
                            <button className="relative p-2 text-[#60728a] hover:text-[#0d6cf2] transition-colors">
                                <span className="material-symbols-outlined !text-[24px]">notifications</span>
                            </button>
                        </>
                    )}
                </div>
            </header>

            <main className="flex-1 overflow-y-auto p-4 md:p-8 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
                <div className="max-w-[1400px] mx-auto w-full">
                    {/* Content Grid: Filters + Results */}
                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">

                        {/* Mobile Filter Toggle */}
                        <div className="lg:hidden col-span-1 mb-2">
                            <div className="flex items-center justify-between mb-1">
                                <h1 className="text-lg font-bold text-[#111418]">Accommodation</h1>
                                <button
                                    onClick={() => executeAction(() => setIsFilterOpen(true))}
                                    className="w-fit px-3 bg-white border border-[#dbdfe6] py-1.5 rounded-lg flex items-center justify-center gap-2 font-bold text-[#111418] shadow-sm text-xs shrink-0"
                                >
                                    <span className="material-symbols-outlined text-[#0d6cf2] !text-[18px]">filter_list</span>
                                    Filter
                                </button>
                            </div>
                            <p className="text-xs text-gray-500">Find the perfect place to stay near your university.</p>
                        </div>

                        {/* Left Sidebar Filters - Desktop */}
                        <aside className="hidden lg:block lg:col-span-1 space-y-6">
                            <SidebarContent />
                        </aside>

                        {/* Mobile Sidebar Content (Drawer) */}
                        {isFilterOpen && (
                            <div className="fixed inset-0 z-[100] lg:hidden">
                                <div className="absolute inset-0 bg-black/50" onClick={() => setIsFilterOpen(false)}></div>
                                <div className="absolute inset-y-0 left-0 w-[85%] max-w-[320px] bg-white shadow-2xl p-4 animate-in slide-in-from-left duration-300">
                                    <SidebarContent />
                                </div>
                            </div>
                        )}

                        {/* Right Results Area */}
                        <div className="lg:col-span-3 flex flex-col gap-6">
                            {/* Results Controls - Desktop Only */}
                            <div className="hidden lg:flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-4 rounded-xl border border-[#dbdfe6] shadow-sm">
                                <div className="flex flex-col">
                                    <span className="text-[#111418] font-bold text-lg">{filteredAccommodations.length} Options Found</span>
                                    <span className="text-[#60728a] text-xs">
                                        {filters.university !== 'Any' ? `Near ${filters.university}` : (filters.city !== 'Any' ? `In ${filters.city}` : 'All Locations')}
                                    </span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <label className="text-sm text-[#60728a] whitespace-nowrap">Sort by:</label>
                                    <select
                                        value={sortBy}
                                        onChange={(e) => executeAction(() => setSortBy(e.target.value))}
                                        className="rounded-lg border-[#dbdfe6] bg-white text-[#111418] text-sm py-2 pl-3 pr-8 focus:ring-[#0d6cf2] focus:border-[#0d6cf2]"
                                    >
                                        <option>Relevance</option>
                                        <option>Price: Low to High</option>
                                        <option>Distance: Nearest</option>
                                    </select>
                                </div>
                            </div>

                            {/* Active Filters Pills - Desktop Only */}
                            <div className="hidden lg:flex flex-wrap gap-2">
                                {filters.city !== 'Any' && (
                                    <div className="flex items-center gap-1 bg-white border border-[#dbdfe6] px-3 py-1 rounded-full text-xs font-medium text-[#111418] shadow-sm">
                                        {filters.city}
                                        <button onClick={() => executeAction(() => handleFilterChange('city', 'Any'))} className="ml-1 text-gray-400 hover:text-red-500"><span className="material-symbols-outlined text-[16px]">close</span></button>
                                    </div>
                                )}
                                {filters.university !== 'Any' && (
                                    <div className="flex items-center gap-1 bg-white border border-[#dbdfe6] px-3 py-1 rounded-full text-xs font-medium text-[#111418] shadow-sm">
                                        {filters.university}
                                        <button onClick={() => executeAction(() => handleFilterChange('university', 'Any'))} className="ml-1 text-gray-400 hover:text-red-500"><span className="material-symbols-outlined text-[16px]">close</span></button>
                                    </div>
                                )}
                                <div className="flex items-center gap-1 bg-white border border-[#dbdfe6] px-3 py-1 rounded-full text-xs font-medium text-[#111418] shadow-sm">
                                    Max £{filters.priceRange[1]}
                                </div>
                            </div>

                            {/* Listing Grid */}
                            {currentItems.length > 0 ? (
                                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                                    {currentItems.map((acc) => (
                                        <div key={acc.id} className="group bg-white rounded-xl overflow-hidden border border-gray-200 hover:shadow-xl transition-all duration-300 flex flex-col relative">
                                            {/* Top Header Banner */}
                                            <div className="bg-[#0d6cf2] px-4 py-2 flex items-center gap-2">
                                                <span className="material-symbols-outlined text-white !text-[16px]">location_on</span>
                                                <span className="text-[10px] font-bold text-white uppercase tracking-wider">{acc.header || "Verified Stay"}</span>
                                            </div>

                                            {/* Image */}
                                            <div className="relative h-48 bg-gray-200 overflow-hidden">
                                                <img alt={acc.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" src={acc.image} />
                                                <button
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        executeAction(() => toggleAccommodation(acc as any));
                                                    }}
                                                    className={`absolute top-3 right-3 p-2 bg-white rounded-xl shadow-sm hover:shadow-md transition-all ${isAccommodationSaved(acc as any) ? 'text-[#0d6cf2]' : 'text-gray-400 hover:text-[#0d6cf2]'}`}
                                                >
                                                    <span className={`material-symbols-outlined !text-[22px] ${isAccommodationSaved(acc as any) ? 'filled' : ''}`}>bookmark</span>
                                                </button>
                                            </div>

                                            {/* Content */}
                                            <div className="p-3 lg:p-4 flex flex-col flex-1 gap-2">
                                                {/* Title */}
                                                <div className="flex gap-3">
                                                    <div className="mt-1 shrink-0">
                                                        <span className="material-symbols-outlined text-[#0d6cf2] !text-[20px] lg:!text-[24px]">apartment</span>
                                                    </div>
                                                    <div>
                                                        <h3 className="text-base lg:text-lg font-bold text-gray-900 leading-tight group-hover:text-[#0d6cf2] transition-colors">{acc.title}</h3>
                                                        <p className="text-[10px] lg:text-xs text-gray-500 mt-1">{acc.university} • {acc.location}</p>
                                                    </div>
                                                </div>

                                                {/* Distance / Tag */}
                                                <div className="ml-9">
                                                    <div className="flex items-center gap-2 mb-2">
                                                        <span className="material-symbols-outlined text-gray-400 !text-[18px]">directions_walk</span>
                                                        <span className="text-sm text-gray-600">{acc.distance}</span>
                                                    </div>
                                                    <div className="inline-block px-2 py-1 bg-blue-50 text-[#0d6cf2] text-xs font-medium border border-blue-100 rounded">
                                                        Amenities
                                                    </div>
                                                </div>

                                                {/* Amenities Row */}
                                                <div className="flex items-center gap-4 mt-1 pb-4 border-b border-gray-100 ml-9">
                                                    {acc.amenities && acc.amenities.map((icon, idx) => (
                                                        <span key={idx} className="material-symbols-outlined text-gray-400 !text-[16px] lg:!text-[20px]" title={icon.replace('_', ' ')}>{icon}</span>
                                                    ))}
                                                    <span onClick={() => setShowAmenitiesModal(acc as any)} className="text-xs text-[#0d6cf2] font-medium cursor-pointer hover:underline">+ More</span>
                                                </div>

                                                {/* Footer */}
                                                <div className="mt-auto pt-3 flex items-end justify-between">
                                                    <div className="flex flex-col">
                                                        <span className="text-[10px] text-gray-400 uppercase font-semibold">From</span>
                                                        <span className="text-lg lg:text-xl font-bold text-[#0d6cf2]">{acc.price}<span className="text-xs lg:text-sm font-normal text-gray-500">{acc.period}</span></span>
                                                    </div>
                                                    <button
                                                        onClick={() => executeAction(() => navigate('/accommodation-details', { state: { accommodation: acc } }))}
                                                        className="bg-[#101722] hover:bg-[#0d6cf2] text-white px-3 py-2 text-xs lg:px-5 lg:py-2.5 lg:text-sm font-bold transition-all shadow-sm"
                                                    >
                                                        Enquire Now
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="flex flex-col items-center justify-center p-12 bg-white rounded-xl border border-[#dbdfe6] text-center">
                                    <span className="material-symbols-outlined text-gray-300 text-[64px] mb-4">search_off</span>
                                    <h3 className="text-xl font-bold text-[#111418] mb-2">No results found</h3>
                                    <p className="text-[#60728a] mb-6">Try adjusting your filters or search criteria.</p>
                                    <button onClick={clearFilters} className="bg-[#0d6cf2] text-white px-6 py-2.5 rounded-lg font-bold">Clear All Filters</button>
                                </div>
                            )}

                            {/* Pagination (Visible only if more than 6 items) */}
                            {filteredAccommodations.length > itemsPerPage && (
                                <div className="flex justify-center mt-6">
                                    <nav className="flex items-center gap-2">
                                        <button
                                            onClick={() => paginate(currentPage - 1)}
                                            disabled={currentPage === 1}
                                            className={`size-10 flex items-center justify-center rounded-lg border border-[#dbdfe6] bg-white text-[#60728a] hover:bg-gray-50 ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
                                        >
                                            <span className="material-symbols-outlined text-[20px]">chevron_left</span>
                                        </button>

                                        {Array.from({ length: totalPages }, (_, i) => (
                                            <button
                                                key={i + 1}
                                                onClick={() => paginate(i + 1)}
                                                className={`size-10 flex items-center justify-center rounded-lg font-medium transition-colors ${currentPage === i + 1 ? 'bg-[#0d6cf2] text-white' : 'border border-[#dbdfe6] bg-white text-[#60728a] hover:bg-gray-50'}`}
                                            >
                                                {i + 1}
                                            </button>
                                        ))}

                                        <button
                                            onClick={() => paginate(currentPage + 1)}
                                            disabled={currentPage === totalPages}
                                            className={`size-10 flex items-center justify-center rounded-lg border border-[#dbdfe6] bg-white text-[#60728a] hover:bg-gray-50 ${currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : ''}`}
                                        >
                                            <span className="material-symbols-outlined text-[20px]">chevron_right</span>
                                        </button>
                                    </nav>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </main>
            {/* Mobile Filter Overlay logic handled inline above with conditional rendering */}

            {/* Amenities Modal */}
            <AmenitiesModal accommodation={showAmenitiesModal} onClose={() => setShowAmenitiesModal(null)} />
        </div>
    );
};

export default Accommodation;
