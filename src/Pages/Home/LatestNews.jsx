import React, { useEffect, useState } from 'react';
import axios from 'axios';

const LatestNews = () => {
  const [blogPosts, setBlogPosts] = useState([]);
  const [formVisible, setFormVisible] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    description: '',
  });

  // Fetch blogs on mount
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await axios.get(`https://volunteer-management-server-nu.vercel.app/blogs`);
        setBlogPosts(res.data.slice(0, 8)); // show only 8 recent blogs
      } catch (err) {
        console.error('Failed to fetch blogs:', err);
      }
    };
    fetchBlogs();
  }, []);


  // Handle form field changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle blog post submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('https://volunteer-management-server-nu.vercel.app/blogs', {
        ...formData,
        date: new Date(),
      });
      setBlogPosts((prev) => [res.data, ...prev].slice(0, 8)); // prepend and slice to 8
      setFormData({ title: '', author: '', description: '' });
      setFormVisible(false);
    } catch (err) {
      console.error('Blog post failed:', err);
    }
  };

  return (
    <section className="bg-gray-100 dark:bg-gray-900 py-12">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-extrabold text-center text-[#544efcba] mb-8">
          Latest News & Blogs
        </h2>

        

        {/* Blog Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {blogPosts.map((post) => (
            <div
              key={post._id}
              className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
            >
              <h3 className="text-2xl font-bold text-[#544efcba] mb-2">{post.title}</h3>
              <p className="text-gray-700 dark:text-gray-300 text-sm mb-2">
                By {post.author} | {new Date(post.date).toLocaleDateString()}
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
        {/* Add Blog Button */}
        <div className="flex justify-center my-6">
          <button
            onClick={() => setFormVisible(!formVisible)}
            className="bg-[#544efcba] text-white px-6 py-2 rounded hover:bg-purple-700 transition"
          >
            {formVisible ? 'Close Form' : 'Add Blog'}
          </button>
        </div>

        {/* Blog Form */}
        {formVisible && (
          <form
            onSubmit={handleSubmit}
            className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md max-w-xl mx-auto mb-10"
          >
            <input
              name="title"
              type="text"
              placeholder="Blog Title"
              value={formData.title}
              onChange={handleChange}
              className="w-full mb-3 p-3 border rounded"
              required
            />
            <input
              name="author"
              type="text"
              placeholder="Author Name"
              value={formData.author}
              onChange={handleChange}
              className="w-full mb-3 p-3 border rounded"
              required
            />
            <textarea
              name="description"
              placeholder="Blog Description"
              value={formData.description}
              onChange={handleChange}
              className="w-full mb-3 p-3 border rounded"
              rows="4"
              required
            />
            <button
              type="submit"
              className="bg-[#544efcba] text-white px-4 py-2 rounded hover:bg-purple-700"
            >
              Submit Blog
            </button>
          </form>
        )}
      </div>
    </section>
  );
};

export default LatestNews;
