// SomeComponent.jsx
import { useRecoilValue } from 'recoil';
import { userState } from './state';

export default function SomeComponent() {
  const user = useRecoilValue(userState);

  return (
    <div>
      {user ? (
        <div>Welcome, {user.name}!</div>
      ) : (
        <div>Please log in.</div>
      )}
    </div>
  );
}