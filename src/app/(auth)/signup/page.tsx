import Signup from "@/components/signup";
import { FormContainer } from "@/components/form-container";

const SignupPage = () => {
  return (
    <FormContainer
      heading={'Welcome '}
      description={'Please enter your details to sign up.'}
    >
      <Signup />
    </FormContainer>
  );
};

export default SignupPage;