// require('dotenv').config();
import { useState, useEffect, type ReactElement } from "react";
import axios from 'axios';
import Button from "react-bootstrap/Button";
import Image from "react-bootstrap/Image";

interface Meme {
  id: number;
  created: string;
  modified: string;
  image: string;
  tags: string | null;
  upvotes: number;
  downvotes: number;
}

function App(): ReactElement {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [hasErr, setErr] = useState<boolean>(false);
  const [memes, setMemes] = useState<Meme[]>([]);
  const [timeLeft, setTimeLeft] = useState(65); // Initialize timer with 65 seconds.
  const [key, setKey] = useState(0); // Key to trigger restart.

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(timer); // Cleanup on unmount or key change.
  }, [key]); // Restart effect when `key` changes.

  console.log(import.meta.env.VITE_API_KEY)

  const options = {
    method: 'GET',
    url: 'https://programming-memes-images.p.rapidapi.com/v1/memes',
    headers: {
      'x-rapidapi-key': import.meta.env.VITE_API_KEY,
      'x-rapidapi-host': 'programming-memes-images.p.rapidapi.com'
    }
  };

  async function getMemeApiResp(): Promise<void> {
    try {
      setIsLoading(true);
      const response = await axios.request(options);
      setMemes((prev) => [...prev, ...response.data]);
    } catch (err) {
      setErr(true);
      console.error("Error fetching memes:", err);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    getMemeApiResp();
  }, []);

  function handleBtnOnClick(): void {
    getMemeApiResp();
    setTimeLeft(65); // Reset timer to 65 seconds
    setKey((prevKey) => prevKey + 1); // Change key to restart the timer
  }

  return (
    <div className="d-flex flex-column justify-content-center align-items-center p-1">
      <h3 className="page-title w-100 text-center p-2 fw-bold">Programming memes...</h3>

      {memes.map((meme) => {
        return (
          <div key={meme.id} className="p-3 mb-3 frame">
            <Image className="meme" src={meme.image} alt="Download Image ⤵️" width={300} height={500} />
          </div>
        );
      })}

      <Button
        disabled={timeLeft !== 0 || hasErr}
        className="w-100 frame"
        variant="outline-dark"
        size="lg"
        onClick={handleBtnOnClick}
      >
        {hasErr ? 'Something went wrong, please try again after some time...' : isLoading ? 'Loading...' : timeLeft === 0 ? 'Load more...' : `Finding memes for you, please wait for ${timeLeft}s.`}
      </Button>

      <small className="mt-3 frame w-100 text-center p-2">Made with 🤍 by - Ash</small>
    </div>
  );
}

export default App;
