
import Signin from '@/components/signin';
import { FormContainer } from '@/components/form-container';
const LoginPage = () => {
  return (
    <FormContainer
      heading={'Welcome back'}
      description={'Please enter your details to sign in.'}
    >
      <Signin />
    </FormContainer>
  );
};

export default LoginPage;