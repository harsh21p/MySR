import React, {useCallback, useMemo, useState} from 'react';
import {SignUpNGOPayload} from 'types';

interface Props {
  children: React.ReactChild | React.ReactChild[] | JSX.Element;
}

interface DataManager {
  signUpData: SignUpNGOPayload;
  setData: (arg0: SignUpNGOPayload) => void;
  clearData: () => void;
}

const initialState = {
  firstName: '',
  lastName: '',
  email: '',
  emailVerified: false,
  phoneNumber: '',
  phoneNumberVerified: false,
  password: '',
  roleId: '',
  uid: '',
  organizationName: '',
  certificate: '',
  certificateVerified: true,
  establishedYear: '',
  about: '',
  additionalDetails: '',
};

export const SignUpContext = React.createContext<DataManager>({
  signUpData: initialState,
  setData: (): void => {},
  clearData: () => {},
});

export const useSignUpContext = (): DataManager =>
  React.useContext(SignUpContext);

const SignUpDataProvider = ({children}: Props): JSX.Element => {
  const [signUpData, setSignUpData] = useState<SignUpNGOPayload>(initialState);

  const setData = useCallback((data: SignUpNGOPayload) => {
    setSignUpData(data);
  }, []);

  const clearData = useCallback(() => {
    setSignUpData(initialState);
  }, []);

  const dataManager = useMemo((): DataManager => {
    return {signUpData, setData, clearData};
  }, [clearData, setData, signUpData]);

  return (
    <SignUpContext.Provider value={dataManager}>
      {children}
    </SignUpContext.Provider>
  );
};

export default SignUpDataProvider;
