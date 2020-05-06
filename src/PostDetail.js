import React, { useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import NewAndEditPostForm from "./NewAndEditPostForm";
import Comment from "./Comment";
import CommentForm from "./CommentForm";

function PostDetail({ posts, deletePostFromState, editPostInState, addComment, deleteComment }) {
  const [editForm, setEditForm] = useState(false)
  const history = useHistory()

  let { id } = useParams();
  let postArray = posts.filter(p => p.id === id);
  let post = postArray[0];

  let postComments = post.comments.map(c => (
    <ul>
      <Comment
        deleteComment={deleteComment}
        key={c.id}
        id={c.id}
        text={c.text} />
    </ul>
  ))

  function editPost() {
    setEditForm(true);
  }

  function deletePost() {
  deletePostFromState(id);
  history.push("/");

  }

  
  return (
    <div>
      <h1>{post.title}</h1>
      <h3>{post.description}</h3>
      <p>{post.body}</p>
      <button onClick={editPost}>Edit Post</button>
      <button onClick={deletePost}>Delete Post</button>
      {editForm === true ? <NewAndEditPostForm
        editPostInState={editPostInState}
        editId={post.id}
        editTitle={post.title}
        editDescription={post.description}
        editBody={post.body}
        /> : ""}
      <h2>Comments</h2>
      {postComments}
      <CommentForm postId = {id} addComment={addComment} deleteComment={deleteComment} />
    </div>
  )
}

export default PostDetail