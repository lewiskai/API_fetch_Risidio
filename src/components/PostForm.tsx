import React, { useState } from 'react';
import { useAddPostMutation, Post } from '../services/postsApi';
import { useDispatch } from 'react-redux';
import { addLocalPost } from '../store';
import { NotificationState } from '../App';

interface PostFormProps {
  onNotification: (message: string, type: NotificationState['type']) => void;
}

const PostForm: React.FC<PostFormProps> = ({ onNotification }) => {
  const [title, setTitle] = useState('');
  const [addPost] = useAddPostMutation();
  const dispatch = useDispatch();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const result = await addPost({ 
        title, 
        userId: 1, 
        completed: false, 
        body: '' 
      } as Partial<Post>).unwrap();
      
      dispatch(addLocalPost({ ...result, id: Date.now() } as Post));
      setTitle('');
      onNotification('Post added successfully!', 'success');
    } catch (err) {
      console.error('Failed to add post: ', err);
      onNotification('Failed to add post. Please try again.', 'error');
    }
  };

  return (
    <div>
      <h3 className="mb-3">Add New Post</h3>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter post title"
            required
          />
        </div>
        <button type="submit" className="btn btn-primary px-4 mt-3">
            Add Post
        </button>
      </form>
    </div>
  );
};

export default PostForm;