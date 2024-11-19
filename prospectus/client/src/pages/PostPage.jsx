import React, { useState } from 'react'
import Masonry from 'react-masonry-css'
import Review from '../components/PostPage/Review'
import { Heart, MessageCircle, Star } from 'lucide-react'

function generateRandomReview() {
    const starRating = Math.floor(Math.random() * 5) + 1; // Random star rating between 1 and 5
    const reviewerNames = ['Lorne', 'John', 'Alex', 'Katie', 'Sarah', 'James', 'Emily', 'Chris', 'Patricia', 'David'];
    const reviewTexts = [
        "Great product!", // Very short review
        "Love it! Highly recommend.", // Short review
        "Good value for the price.", // Short review
        "This is a decent product but could use some improvements.", // Medium review
        "I was impressed with the quality and design, but the shipping took longer than expected.", // Medium review
        "This product exceeded my expectations. It's exactly what I needed, and it works perfectly. Highly recommend it to anyone looking for something similar.", // Medium review
        "Good product, but the customer service was a bit slow in responding. Overall, it's still worth buying because of the quality and performance.", // Medium review
        "I’ve been using this product for a couple of weeks now and I’m very satisfied. It’s durable, easy to use, and performs as expected. However, I wish it came in more colors. Shipping was quick, and the packaging was secure, so I’m happy with my purchase.", // Long review
        "I have been using this product for about a month and I can say it has definitely made a positive impact on my daily routine. The build quality is top-notch, and the performance is outstanding. However, there is a slight issue with the battery life, which could definitely be improved. Despite that, I would still recommend this to others because of its overall utility and ease of use.", // Long review
        "This is hands down one of the best purchases I've made in a while! The product is well-made, easy to use, and incredibly effective. The quality is unmatched, and it’s obvious that a lot of thought went into the design. I use it daily, and it has helped me streamline my workflow. There were no defects when it arrived, and the packaging was very secure. The only downside I encountered was a slight delay in delivery, but customer service was quick to resolve that. If you're looking for something in this category, I would highly recommend this product without hesitation. It’s worth every penny!" // Very long review
    ];
    const timeOptions = ['1 hour ago', '2 hours ago', '3 hours ago', '1 day ago', '2 days ago', '3 days ago', '1 week ago'];
    const reviewer = reviewerNames[Math.floor(Math.random() * reviewerNames.length)];
    const text = reviewTexts[Math.floor(Math.random() * reviewTexts.length)];
    const time = timeOptions[Math.floor(Math.random() * timeOptions.length)];

    return {
        stars: starRating,
        text: text,
        reviewer: reviewer,
        time: time
    };
};

// Generate 50 random reviews
const randReviews = [];
for (let i = 0; i < 50; i++) {
    randReviews.push(generateRandomReview());
}

function getTagColor(tag) {
    switch (tag) {
        case 'SWE': // Software Engineer
            return 'bg-blue-200 text-black'; // Pastel blue
        case 'New Grad': // Recent Graduate
            return 'bg-green-200 text-black'; // Pastel green
        case 'PhD': // Doctorate Holder
            return 'bg-purple-200 text-black'; // Pastel purple
        case 'Intern': // Internship Candidate
            return 'bg-yellow-200 text-black'; // Pastel yellow
        case 'Data Science': // Data Science Role
            return 'bg-orange-200 text-black'; // Pastel orange
        case 'Machine Learning': // Machine Learning Role
            return 'bg-red-200 text-black'; // Pastel red
        case 'UI/UX': // User Interface/User Experience Design
            return 'bg-teal-200 text-black'; // Pastel teal
        case 'Product Manager': // Product Manager Role
            return 'bg-indigo-200 text-black'; // Pastel indigo
        case 'Cybersecurity': // Cybersecurity Specialist
            return 'bg-gray-200 text-black'; // Pastel gray
        case 'DevOps': // Development Operations
            return 'bg-lime-200 text-black'; // Pastel lime
        case 'Research': // Researcher Role
            return 'bg-pink-200 text-black'; // Pastel pink
        case 'Consulting': // Consulting Role
            return 'bg-cyan-200 text-black'; // Pastel cyan
        case 'Freelancer': // Freelance Professional
            return 'bg-brown-200 text-white'; // Pastel brown
        case 'Startup': // Startup Employee/Founder
            return 'bg-white text-black border-2 border-black'; // White with black border
        case 'Hardware': // Hardware Engineering
            return 'bg-gray-400 text-white'; // Lighter gray for pastel look
        case 'Leadership': // Leadership Roles
            return 'bg-yellow-100 text-black'; // Pastel gold/yellow
        default: // Default for unknown tags
            return 'bg-black text-white';
    }
}

const post = {
    time: '5 hrs ago',
    title: 'Idk whats wrong with my resume. Help.',
    tags: ['SWE', 'New Grad', 'PhD', 'Intern', 'Data Science', 'Machine Learning'],
    text: `
    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
    `,
    likes: 500,
    comments: 5,
    stars: 4.2,
    posterProfile: {
        name: 'Amanda',
        username: 'amanda'
    },
    reviews: randReviews
}

export default function PostPage() {
    const [liked, setLiked] = useState(false)
    const [sortBy, setSortBy] = useState('Most recent')
    const [dropdownShown, setDropdownShown] = useState(false)
    
    return (
        <div>
            <div className='flex gap-8 m-8 justify-center'>
                <div className='flex flex-col items-center'>
                    <div className="avatar mb-2">
                        <div className="ring-primary ring-offset-base-100 w-24 rounded-full ring ring-offset-2">
                            <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
                        </div>
                    </div>
                    {post.posterProfile.name}
                    <p className='text-gray-500'>{post.posterProfile.username}</p>
                    <p className='text-gray-500 mb-4'>{post.time}</p>
                    <div className="flex flex-col gap-2">
                        <div className="flex gap-2">
                            <Heart className={'hover:text-red-400 ' + (liked ? 'text-red-500' : '')} onClick={() => setLiked(!liked)}/>
                            {post.likes + (liked ? 1 : 0)}
                        </div>
                        <div className="flex gap-2">
                            <MessageCircle />
                            {post.comments}
                        </div>
                        <div className="flex gap-2">
                            <Star />
                            {post.stars}
                        </div>
                    </div>
                </div>
                <div className='w-3/4'>
                    <h1 className='text-left text-3xl mb-2'>{post.title}</h1>
                    <div className='flex gap-2 justify-left mb-2'>
                        {post.tags.map(tag => (
                            <div className={'rounded-lg p-1.5 ' + getTagColor(tag)}>{tag}</div>
                        ))}
                    </div>
                    <div className="text-left mb-2">{post.text}</div>
                    <div className='bg-gray-200 h-64 flex justify-center items-center'>Sample Resume</div>
                </div>
            </div>
            <div className="w-11/12 mx-auto h-px bg-gray-500"></div>
            <div className='w-11/12 mx-auto'>
                Sort by:
                <div className="dropdown dropdown-bottom">
                    <div tabIndex={0} role="button" className="btn m-1" onClick={() => setDropdownShown(!dropdownShown)}>{sortBy}</div>
                    {dropdownShown && (
                        <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
                            {['Most recent', 'Least recent', 'Highest rating', 'Lowest rating'].map(option => (
                                <li><a onClick={() => {
                                    setSortBy(option)
                                    setDropdownShown(false)
                                }}>{option}</a></li>
                            ))}
                        </ul>
                    )}
                </div>
                <Masonry
                    breakpointCols={5}
                    className="flex">
                    {post.reviews.map(reviewItem => (
                        <div className="mb-4">
                            <Review review={reviewItem}/>
                        </div>
                    ))}
                </Masonry>
            </div>
        </div>
    )
}