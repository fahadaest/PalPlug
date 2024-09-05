'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import ProfileInfo from '@/components/profileDetails/profileInfo';

const ProfilePage = () => {
  const router = useRouter();
  const user = useSelector((state) => state.user.user);
  const [isLoading, setIsLoading] = useState(true);
  const userId = user?.id || user?.uid;
  const displayName = user?.displayName;

  useEffect(() => {
    if (userId) {
      setIsLoading(false); 
    } else {
          const timeoutId = setTimeout(() => {
        if (!userId) {
          router.push('/404');
        }
      }, 1000); 

      return () => clearTimeout(timeoutId); 
    }
  }, [userId, router]);

  if (isLoading) return <div>Loading...</div>;
  return (
    <div>
      <ProfileInfo userId={userId} displayName={displayName} />
    </div>
  );
};

export default ProfilePage;
