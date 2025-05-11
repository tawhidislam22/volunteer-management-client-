import React from 'react';

const LatestNews = () => {
  // Hardcoded blog/news data
  const blogPosts = [
    {
      id: 1,
      title: 'How Volunteering Impacts Your Community',
      author: 'Jane Doe',
      date: 'March 1, 2024',
      description: 'Learn about the incredible ways volunteering can create a positive impact on your community.',
    },
    {
      id: 2,
      title: 'Top 5 Tips for First-Time Volunteers',
      author: 'John Smith',
      date: 'February 20, 2024',
      description: 'Get prepared for your first volunteering experience with these useful tips.',
    },
    {
      id: 3,
      title: 'Spotlight: Volunteers Changing Lives',
      author: 'Emily Johnson',
      date: 'February 10, 2024',
      description: 'Read inspiring stories of volunteers who have made a real difference in people’s lives.',
    },
  ];

  return (
    <section className=" ">
      <div className="container py-12 bg-gray-100 dark:bg-gray-900 mx-auto">
        <h2 className="text-4xl font-extrabold text-center text-[#544efcba] mb-8">
          Latest News & Blogs
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <div
              key={post.id}
              className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
            >
              <h3 className="text-2xl font-bold text-[#544efcba] mb-2">
                {post.title}
              </h3>
              <p className="text-gray-700 dark:text-gray-300 text-sm mb-2">
                By {post.author} | {post.date}
              </p>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                {post.description}
              </p>
              <button className="text-[#544efcba] hover:text-purple-700 font-semibold">
                Read More
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LatestNews;
