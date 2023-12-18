import { getAssistants } from '@services/assistant-service';
import { Button, Input } from '@sk-web-gui/react';
import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';
import { AssistantPublic } from 'src/data-contracts/intric/data-contracts';
import useEventSource from 'src/hooks/useEventSource';

export default function Index() {
  const inputRef = useRef(null);
  const router = useRouter();
  const [assistants, setAssistants] = useState<AssistantPublic[]>([]);
  const [selectedAssistant, setSelectedAssistants] = useState<AssistantPublic>();
  useEffect(() => {
    getAssistants().then((res) => {
      console.log('assistants', res);
      setAssistants(res);
      const mine = res.find((a) => a.name === 'min_assistent');
      setSelectedAssistants(mine);
    });
  }, []);

  const [query, setQuery] = useState('');
  const { history, incoming, done, error, startFetching } = useEventSource();

  useEffect(() => {
    console.log(history);
  }, [history]);

  const handleQuerySubmit = () => {
    if (query.trim() !== '') {
      console.log('in here');
      startFetching(query, selectedAssistant);
      setQuery(''); // Reset the query input field
    }
  };

  return (
    <div>
      {assistants?.map((a, idx) => (
        <div key={`assistant-${a.id}`}>
          {a.name} {a.id}
        </div>
      ))}
      <Input type="text" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Ask me something..." />
      <Button onClick={handleQuerySubmit}>Send</Button>
      <br />
      <br />
      <br />
      <div>
        <div>
          {history.map((h, idx) => (
            <p key={`history-${idx}`}>{h}</p>
          ))}
        </div>
      </div>
    </div>
  );
}
