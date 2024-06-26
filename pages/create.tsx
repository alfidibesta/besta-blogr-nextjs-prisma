import React, { useState } from 'react';
import Layout from '../components/Layout';
import Router from 'next/router';
import { useSession } from 'next-auth/react'; // Import useSession hook

const Draft: React.FC = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const { data: session } = useSession(); // Use useSession hook to get session data

  const submitData = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    try {
      const body = { title, content, authorEmail: session?.user?.email};
      await fetch('/api/post', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      await Router.push('/drafts');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Layout>
      <div>
        <form onSubmit={submitData}>
          <h1>New Draft</h1>
          <p>Welcome, {session?.user?.name}</p> {/* Display author's name */}
          <input
            autoFocus
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title"
            type="text"
            value={title}
          />
          <textarea
            cols={50}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Content"
            rows={8}
            value={content}
          />
          <input disabled={!content || !title} type="submit" value="Create" />
          <a className="back" href="#" onClick={() => Router.push('/')}>
            or Cancel
          </a>
        </form>
      </div>
      <style jsx>{`
        .page {
          background: var(--geist-background);
          padding: 3rem;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        input[type='text'],
        textarea {
          width: 100%;
          padding: 0.5rem;
          margin: 0.5rem 0;
          border-radius: 0.25rem;
          border: 0.125rem solid rgba(0, 0, 0, 0.2);
        }

        input[type='submit'] {
          background: #3b3b3b;
          border: 0;
          padding: 1rem 2rem;
          color: #eaeaea;
        }

        .back {
          margin-left: 1rem;
          background: #ececec;
          border: 0;
          padding: 1rem 2rem;
          color: #3b3b3b;
        }
      `}</style>
    </Layout>
  );
};

export default Draft;
