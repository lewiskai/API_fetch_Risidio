import React, { useState } from 'react';
import { Post } from '../services/postsApi';

interface EditablePostProps {
  post: Post;
  onSave: (updatedPost: Post) => void;
  onCancel: () => void;
}

const EditablePost: React.FC<EditablePostProps> = ({ post, onSave, onCancel }) => {
  const [title, setTitle] = useState(post.title);
  const [completed, setCompleted] = useState(post.completed);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({ ...post, title, completed });
  };
  
  return (
    <form onSubmit={handleSubmit} className="d-flex align-items-center gap-2">
      <input
        type="text"
        className="form-control form-control-sm"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <div className="form-check">
        <input
          type="checkbox"
          className="form-check-input"
          id={`completed-${post.id}`}
          checked={completed}
          onChange={(e) => setCompleted(e.target.checked)}
        />
        <label className="form-check-label" htmlFor={`completed-${post.id}`}>
          Completed
        </label>
      </div>
      <button type="submit" className="btn btn-primary btn-sm">
        Save
      </button>
      <button type="button" className="btn btn-secondary btn-sm" onClick={onCancel}>
        Cancel
      </button>
    </form>
  );
};

export default EditablePost;