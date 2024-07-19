import React, { useState, useMemo } from 'react';
import { useGetPostsQuery, useDeletePostMutation, Post } from '../services/postsApi';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, removeLocalPost, updateLocalPost } from '../store';
import { NotificationState } from '../App';
import EditablePost from './EditablePost';

interface PostListProps {
  onNotification: (message: string, type: NotificationState['type']) => void;
}

type SortKey = 'title' | 'userId' | 'completed';

const PostList: React.FC<PostListProps> = ({ onNotification }) => {
  const { data: fetchedPosts, isLoading, isError } = useGetPostsQuery();
  const localPosts = useSelector((state: RootState) => state.localPosts.posts);
  const [deletePost] = useDeletePostMutation();
  const dispatch = useDispatch();

  const [sortKey, setSortKey] = useState<SortKey>('title');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [filterCompleted, setFilterCompleted] = useState<boolean | null>(null);
  const [filterUserId, setFilterUserId] = useState<number | null>(null);
  const [editingPostId, setEditingPostId] = useState<number | null>(null);

  const allPosts = useMemo(() => [...localPosts, ...(fetchedPosts || [])], [localPosts, fetchedPosts]);

  const filteredAndSortedPosts = useMemo(() => {
    return allPosts
      .filter(post => 
        (filterCompleted === null || post.completed === filterCompleted) &&
        (filterUserId === null || post.userId === filterUserId)
      )
      .sort((a, b) => {
        if (a[sortKey] < b[sortKey]) return sortDirection === 'asc' ? -1 : 1;
        if (a[sortKey] > b[sortKey]) return sortDirection === 'asc' ? 1 : -1;
        return 0;
      });
  }, [allPosts, filterCompleted, filterUserId, sortKey, sortDirection]);

  const uniqueUserIds = useMemo(() => 
    Array.from(new Set(allPosts.map(post => post.userId))).sort((a, b) => a - b),
    [allPosts]
  );

  const handleSort = (key: SortKey) => {
    if (key === sortKey) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortKey(key);
      setSortDirection('asc');
    }
  };

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

  const handleCompletedChange = (post: Post, newValue: boolean) => {
    const updatedPost = { ...post, completed: newValue };
    dispatch(updateLocalPost(updatedPost));
    onNotification('Post updated successfully!', 'success');
  };

  const handleEdit = (post: Post) => {
    setEditingPostId(post.id);
  };

  const handleSave = (updatedPost: Post) => {
    dispatch(updateLocalPost(updatedPost));
    setEditingPostId(null);
    onNotification('Post updated successfully!', 'success');
  };

  const handleCancelEdit = () => {
    setEditingPostId(null);
  };

  if (isLoading) return <div className="text-center">Loading...</div>;
  if (isError) return <div className="alert alert-danger">Error fetching posts</div>;

  return (
    <div>
      <h3 className="mb-4">Posts</h3>
      <div className="filter-controls mb-4">
        <div className="filter-control">
          <label>Status:</label>
          <select 
            className="form-select" 
            value={filterCompleted === null ? '' : filterCompleted.toString()} 
            onChange={(e) => setFilterCompleted(e.target.value === '' ? null : e.target.value === 'true')}
          >
            <option value="">All</option>
            <option value="true">Completed</option>
            <option value="false">Not Completed</option>
          </select>
        </div>
        <div className="filter-control">
          <label>User ID:</label>
          <select 
            className="form-select" 
            value={filterUserId === null ? '' : filterUserId.toString()} 
            onChange={(e) => setFilterUserId(e.target.value === '' ? null : Number(e.target.value))}
          >
            <option value="">All</option>
            {uniqueUserIds.map(id => (
              <option key={id} value={id}>{id}</option>
            ))}
          </select>
        </div>
      </div>
      <div className="table-responsive">
        <table className="table table-hover">
          <thead>
            <tr>
              <th onClick={() => handleSort('userId')} className="cursor-pointer">
                User ID {sortKey === 'userId' && (sortDirection === 'asc' ? '▲' : '▼')}
              </th>
              <th onClick={() => handleSort('title')} className="cursor-pointer">
                Title {sortKey === 'title' && (sortDirection === 'asc' ? '▲' : '▼')}
              </th>
              <th onClick={() => handleSort('completed')} className="cursor-pointer">
                Completed {sortKey === 'completed' && (sortDirection === 'asc' ? '▲' : '▼')}
              </th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredAndSortedPosts.map((post: Post) => (
              <tr key={post.id} className={editingPostId === post.id ? 'edit-mode' : ''}>
                {editingPostId === post.id ? (
                  <td colSpan={4}>
                    <EditablePost
                      post={post}
                      onSave={handleSave}
                      onCancel={handleCancelEdit}
                    />
                  </td>
                ) : (
                  <>
                    <td>{post.userId}</td>
                    <td>{post.title}</td>
                    <td>{post.completed ? 'Yes' : 'No'}</td>
                    <td>
                      <div className="d-flex gap-2">
                        <button 
                          className="btn btn-primary btn-sm"
                          onClick={() => handleEdit(post)}
                        >
                          Edit
                        </button>
                        <button 
                          className="btn btn-danger btn-sm"
                          onClick={() => handleDelete(post)}
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PostList;