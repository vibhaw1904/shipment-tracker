import { ReactNode } from 'react';

interface FormContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  heading: ReactNode;
  description: ReactNode;
}

export const FormContainer: React.FC<FormContainerProps> = ({
  heading,
  description,
  children,
}) => {
  return (
    <div className="self-center justify-self-center w-full px-6 mt-8 mb-16">
      <div className="bg-gray-800 backdrop-filter backdrop-blur-lg mx-auto sm:max-w-[30rem] py-8 px-6 rounded-xl sm:px-10 sm:shadow-2xl border border-gray-700 transition-all duration-300 hover:shadow-blue-500/20">
        <div className="sm:mx-auto w-full sm:max-w-md mb-10 text-center">
          {typeof heading === 'string' ? (
            <h1 className="text-4xl font-bold mb-3 text-blue-400 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-blue-600">
              {heading}
            </h1>
          ) : (
            heading
          )}
          {typeof description === 'string' ? (
            <p className="text-gray-300 text-sm leading-relaxed">
              {description}
            </p>
          ) : (
            description
          )}
        </div>
        <div className="space-y-6">{children}</div>
      </div>
    </div>
  );
};