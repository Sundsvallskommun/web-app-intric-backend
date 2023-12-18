import { useCallback, useState } from 'react';
import { fetchEventSource } from '@microsoft/fetch-event-source';
import { AssistantPublic } from 'src/data-contracts/intric/data-contracts';

function useEventSource() {
  const [history, setHistory] = useState(['']);
  const [incoming, setIncoming] = useState([]);
  const [done, setDone] = useState(true); // Start with the connection closed
  const [error, setError] = useState(null);

  const startFetching = useCallback((query: string, assistant: AssistantPublic) => {
    setDone(false);
    const assistant_id = assistant.id;
    const session_id = 9;
    // setHistory(['']);
    // setIncoming([]);
    // const url = `http://localhost:3061/assistants/${assistant_id}/sessions/${session_id}`;
    const url = `http://localhost:3061/assistants/${assistant_id}/sessions/`;

    fetchEventSource(url, {
      method: 'POST',
      body: JSON.stringify({ body: query }),
      headers: { Accept: 'text/event-stream' },
      onopen(res) {
        setDone(false);
        if (res.ok && res.status === 200) {
          console.log('Connection made ', res);
        } else if (res.status >= 400 && res.status < 500 && res.status !== 429) {
          console.log('Client-side error ', res);
        }
        return Promise.resolve();
      },
      onmessage(event) {
        // console.log(event.data);
        const parsedData: ResponseData = JSON.parse(event.data);
        // console.log(parsedData.answer);
        setHistory((history: string[]) => [history[0] + parsedData.answer, ...history.slice(1)]);
        // setIncoming((data: any) => [...data, parsedData.answer]); // Important to set the data this way, otherwise old data may be overwritten if the stream is too fast
      },
      onclose() {
        console.log('Connection closed by the server');
        setHistory((history: string[]) => ['', ...history]);
        setDone(true);
      },
      onerror(err) {
        console.log('There was an error from server', err);
      },
    });
  }, []);

  return { history, incoming, done, error, startFetching };
}

interface ResponseData {
  session_id: number;
  answer: string;
  references: {
    id: string;
    text: string | null;
    metadata: {
      url: string | null;
      title: string;
      embedding_model: string;
    };
    group_id: string;
  }[];
  model: {
    name: string;
    nickname: string;
    family: string;
    token_limit: number;
    selectable: boolean;
  };
}


export default useEventSource;
