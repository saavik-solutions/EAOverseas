async function testCommunity() {
    const email = `test.user.${Date.now()}@example.com`;
    const password = 'Password123!';
    let token = '';

    console.log('[1] Registering user:', email);
    try {
        const res = await fetch('http://localhost:4000/api/auth/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                firstName: 'Test',
                lastName: 'Student',
                email,
                password,
                role: 'student'
            })
        });
        const data = await res.json();
        if(!res.ok) throw new Error(data.message || 'Registration failed');
        token = data.token;
        console.log('User registered. Token acquired.');
    } catch (e) {
        console.error('Registration failed:', e.message);
        return;
    }

    console.log('\n[2] Creating a community post...');
    let postId = '';
    try {
        const res = await fetch('http://localhost:4000/api/community/posts', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
            body: JSON.stringify({
                title: 'Is this a good university?',
                content: 'I want to know if TU Munich is a good option for computer science.',
                category: 'admissions',
                tags: ['germany', 'cs']
            })
        });
        const data = await res.json();
        if(!res.ok) throw new Error(data.error || 'Post creation failed');
        postId = data.id;
        console.log('Post created successfully. ID:', postId);
    } catch (e) {
        console.error('Post creation failed:', e.message);
        return;
    }

    console.log('\n[3] Fetching feed...');
    try {
        const res = await fetch('http://localhost:4000/api/community/posts');
        const data = await res.json();
        console.log(`Feed count: ${data.length}`);
        console.log('Latest post title:', data[0].title);
        console.log('Latest post commentsCount:', data[0].commentCount);
    } catch (e) {
        console.error('Feed fetch failed:', e.message);
    }

    console.log('\n[4] Upvoting post...');
    try {
        const res = await fetch(`http://localhost:4000/api/community/posts/${postId}/vote`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
            body: JSON.stringify({ value: 'up' })
        });
        const data = await res.json();
        console.log('Vote cast. Action:', data.action);
    } catch(e) {
        console.error('Vote failed:', e.message);
    }
}

testCommunity();
