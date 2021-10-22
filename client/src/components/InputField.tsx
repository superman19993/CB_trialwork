import { FormControl, FormLabel } from "react-bootstrap";
import { useField } from "formik";

interface InputFieldProps {
  name: string;
  label: string;
  placeholder: string;
  type: string;
  textarea?: boolean;
}

const InputField = ({ textarea, ...props }: InputFieldProps) => {
  const [field, { error }] = useField(props);
  return (
    <FormControl isInvalid={!!error}>
      <FormLabel htmlFor={field.name}>{props.label}</FormLabel>
      {textarea ? (
        <FormControl as="textarea" {...field} id={field.name} {...props} />
      ) : (
        <FormControl {...field} id={field.name} {...props} />
      )}
      {/* {error && <FormErrorMessage>{error}</FormErrorMessage>} */}
    </FormControl>
  );
};

export default InputField;
