import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import Spinner from './Spinner';

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-linen">
        <Spinner size="lg" />
      </div>
    );
  }

  if (!isAuthenticated) return <Navigate to="/" replace />;

  return <>{children}</>;
}
