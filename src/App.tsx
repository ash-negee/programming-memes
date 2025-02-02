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
  const [timeLeft, setTimeLeft] = useState(65);
  const [key, setKey] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => (prevTime <= 1 ? 0 : prevTime - 1));
    }, 1000);

    return () => clearInterval(timer);
  }, [key]);

  const options = {
    method: 'GET',
    url: 'https://programming-memes-images.p.rapidapi.com/v1/memes',
    headers: {
      'x-rapidapi-key': import.meta.env.VITE_API_KEY,
      'x-rapidapi-host': import.meta.env.VITE_API_HOST
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
      <h1 className="w-100 text-center p-2 fw-bold">Programming memes</h1>
      <h6 className="mb-4 text-center lh-lg">Because debugging is 99% crying and 1% coding</h6>

      {memes.map((meme) => {
        return (
          <div key={meme.id} className="p-2 mb-3 meme-frame mb-5">
            <Image
              alt={meme.modified}
              className="w-100 h-auto"
              src={meme.image}
              height={500}
              width={300}
            />
            <hr />
          </div>
        );
      })}

      <Button
        disabled={timeLeft !== 0 || hasErr}
        className="w-75 meme-frame rounded-0"
        variant="outline-white"
        size="lg"
        onClick={handleBtnOnClick}
      >
        {hasErr ? 'Something went wrong, please try again after some time...' : isLoading ? 'Loading...' : timeLeft === 0 ? 'Load more...' : <small>Finding best memes for you, please wait for {timeLeft}s.</small>}
      </Button>

      <small className="mt-4 text-center">Made with 🤍 by - Ash</small>
    </div>
  );
}

export default App;
