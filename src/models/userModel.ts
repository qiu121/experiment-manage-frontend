import { useState } from 'react';

const userModel = () => {

  const [userId, setUserId] = useState<string>('');

  const setUserIdToModel = (userId: string) => {
    setUserId(userId);
    // console.log(userId);

  };

  return {
    userId,
    setUserId: setUserIdToModel,
  };
};

export default userModel;
