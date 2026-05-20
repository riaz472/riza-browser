
import { BrowserProvider } from '@/context/BrowserContext';
import { BrowserContainer } from '@/components/browser/BrowserContainer';

export default function Home() {
  return (
    <BrowserProvider>
      <BrowserContainer />
    </BrowserProvider>
  );
}
