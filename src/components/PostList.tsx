import React from 'react';
import { useGetPostsQuery, useDeletePostMutation, Post } from '../services/postsApi';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, removeLocalPost } from '../store';
import { NotificationState } from '../App';

interface PostListProps {
  onNotification: (message: string, type: NotificationState['type']) => void;
}

const PostList: React.FC<PostListProps> = ({ onNotification }) => {
  const { data: fetchedPosts, isLoading, isError } = useGetPostsQuery();
  const localPosts = useSelector((state: RootState) => state.localPosts.posts);
  const [deletePost] = useDeletePostMutation();
  const dispatch = useDispatch();

  if (isLoading) return <div className="text-center">Loading...</div>;
  if (isError) return <div className="alert alert-danger">Error fetching posts</div>;

  const allPosts = [...localPosts, ...(fetchedPosts || [])];

  const handleDelete = async (post: Post) => {
    try {
      if (localPosts.some(p => p.id === post.id)) {
        dispatch(removeLocalPost(post.id));
      } else {
        await deletePost(post.id).unwrap();
      }
      onNotification('Post deleted successfully!', 'success');
    } catch (err) {
      console.error('Failed to delete post: ', err);
      onNotification('Failed to delete post. Please try again.', 'error');
    }
  };

  return (
    <div>
      <h3 className="mb-3">Posts</h3>
      <div className="table-responsive">
        <table className="table table-hover">
          <thead className="table-light">
            <tr>
              <th>User ID</th>
              <th>Title</th>
              <th>Completed</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {allPosts.map((post: Post) => (
              <tr key={post.id}>
                <td>{post.userId}</td>
                <td>{post.title}</td>
                <td>{post.completed ? 'Yes' : 'No'}</td>
                <td>
                  <button 
                    className="btn btn-danger btn-sm px-3"
                    onClick={() => handleDelete(post)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PostList;