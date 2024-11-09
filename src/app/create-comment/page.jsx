"use client";

import React, { useState, useEffect } from 'react';
import { MessageCircle } from 'lucide-react';
import { postsTable } from '../../db/schema';
import { db } from '../../db';
import { eq, and } from 'drizzle-orm';

export default function Page() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [session, setSession] = useState(null);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    async function fetchSession() {
      try {
        const response = await fetch('/api/auth/session');
        const data = await response.json();
        setSession(data.user);
      } catch (err) {
        console.error("Session retrieval error:", err);
      }
    }
    fetchSession();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!session) {
      alert("You need to sign up to post a comment.");
      return;
    }

    try {
      const newPost = {
        title,
        content,
        userId: session.email,
      };
      await db.insert(postsTable).values(newPost);

      // Clear form fields
      setTitle('');
      setContent('');

      // Update the posts state
      setPosts((prevPosts) => [
        ...prevPosts,
        { ...newPost, id: Date.now() },
      ]);

    } catch (error) {
      console.error("Error posting comment:", error);
      alert("There was an error posting your comment.");
    }
  };

  /*async function handleDelete(postId) {
    try {
      // Delete the post with the matching id
      await db.delete(postsTable).where(postsTable.id.eq(postId));

      // Update the posts state to remove the deleted post from the UI
      setPosts((prevPosts) => prevPosts.filter((post) => post.id !== postId));

    } catch (error) {
      console.error("Error deleting post:", error);
      alert("There was an error deleting your comment.");
    }
  }*/

  async function handleDelete(postId) {
    if (!session) {
      alert("You need to be signed in to delete a post.");
      return;
    }

    try {
      // Use eq and and functions for query conditions
      const result = await db
        .delete(postsTable)
        .where(and(eq(postsTable.id, postId), eq(postsTable.userId, session.email)));

      // Check if the post was actually deleted
      if (result.rowCount === 0) {
        alert("You can only delete your own posts.");
        return;
      }

      // Update the posts state to remove the deleted post from the UI
      setPosts((prevPosts) => prevPosts.filter((post) => post.id !== postId));

    } catch (error) {
      console.error("Error deleting post:", error);
      alert("There was an error deleting your comment.");
    }
  }



  async function getAllPosts() {
    const posts = await db.select().from(postsTable);
    setPosts(posts);
  }

  useEffect(() => {
    getAllPosts();
  }, []);

  return (
    <main className='flex flex-col items-center mx-3 md:mx-0'>
      <div className='flex flex-col gap-4'>
        <div className='flex flex-row gap-2'>
          <h1 className='self-center text-3xl font-bold'>Leave us a comment</h1>
          <MessageCircle className='self-center' size={32} color="#000" />
        </div>

        <form onSubmit={handleSubmit} className='flex flex-col gap-3'>
          <input
            className='text-2xl capitalize bg-transparent placeholder:text-zinc-900 border border-orange-950 outline-none rounded-[5px] p-2 font-bold md:w-[50rem]'
            type="text"
            placeholder='Enter the name of your post...'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <textarea
            className='text-xl p-1 border border-orange-950 placeholder:text-zinc-900 rounded-[5px] outline-none bg-transparent font-bold'
            placeholder='Write Your message...'
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />

          {session ? (
            <button
              className='outline-none w-[200px] text-xl font-semibold border border-transparent px-5 py-2 bg-red-950 rounded-[5px] text-white hover:bg-red-900 duration-200'
              type="submit"
            >
              Submit
            </button>
          ) : (
            <p className='text-[18px] font-semibold'>You need to sign up to post a comment</p>
          )}
        </form>
      </div>

      <div className='flex flex-wrap gap-5 mt-10 justify-center'>
        {posts.length !== 0 ? (
          <div className='flex flex-wrap justify-center gap-5'>
            {posts.map((post) => (
              <div className='flex flex-col w-auto gap-2 p-5 rounded-[5px] shadow bg-[#fcdca137] md:w-[25rem]' key={post.id}>
                <h1 className=' font-bold'>From : <span className=' text-[15px] font-extrabold'>{post.userId}</span></h1>
                <h1 className='font-bold text-xl underline underline-offset-2'>{post.title}</h1>
                <p className=' font-semibold'>{post.content}</p>


                {/* Show delete button only if the post belongs to the logged-in user */}
                {session && post.userId === session.email && (
                  <button
                    className='text-white self-center bg-red-500 rounded-[5px] w-[100px] py-2 font-semibold hover:bg-red-700 duration-200'
                    onClick={() => handleDelete(post.id)}
                  >
                    Delete
                  </button>
                )}
              </div>
            ))}
          </div>
        ) : (
          <p className='text-xl font-semibold'>No comments yet, be the first</p>
        )}
      </div>
    </main>
  );
}
