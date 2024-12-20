import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { Provider } from 'react-redux'
import { store } from './store';
// import { useDispatch } from 'react-redux';

export default function StoreProvider({count, children}) {

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        staleTime: 600000,
        retry: false,
        retryDelay: attemptIndex => Math.min(1000 * 2 ** attemptIndex, 30000) // for when we want to exponentially delay multiple retries
      }
    }
  });

  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        {children}
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </Provider>
  //  <Provider store={storeRef.current}>{children}</Provider>
  )
}