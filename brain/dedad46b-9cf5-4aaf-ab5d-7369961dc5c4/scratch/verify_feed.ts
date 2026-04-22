import axios from 'axios';

const API_BASE = 'http://localhost:4000';

async function testFeed() {
    try {
        console.log('Testing GET /api/feed...');
        const res = await axios.get(`${API_BASE}/api/feed`);
        console.log('Response Status:', res.status);
        console.log('Post count:', Array.isArray(res.data) ? res.data.length : 'Not an array');
        if (res.data.length > 0) {
            console.log('First post title:', res.data[0].title);
        }
    } catch (err) {
        console.error('Test failed:', err.message);
        if (err.response) {
            console.error('Response data:', err.response.data);
        }
    }
}

testFeed();
