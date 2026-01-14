import { useState, useEffect, useCallback } from "react";

export const useForm = ({ initialValues, validate, onSubmit }) => {
  // 1. ESTADOS
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  // 2. VALIDAÇÃO REATIVA
  useEffect(() => {
    const validationErrors = validate(values);
    setErrors(validationErrors);
  }, [values, validate]);

  // 3. HANDLERS

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
  }, []);

  const handleBlur = useCallback((e) => {
    const { name } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate(values);
    const isValid = Object.keys(validationErrors).length === 0;

    if (isValid) {
      onSubmit(values);
    } else {
      // Marca tudo como tocado para mostrar erros
      const allTouched = Object.keys(values).reduce((acc, key) => {
        acc[key] = true;
        return acc;
      }, {});
      setTouched(allTouched);
    }
  };

  const reset = () => {
    setValues(initialValues);
    setErrors({});
    setTouched({});
  };

  // 4. RETORNO
  return {
    values,
    errors,
    touched,
    handleChange,
    handleBlur, // <--- O erro acontecia aqui porque a const acima não existia
    handleSubmit,
    reset,
    isValid: Object.keys(errors).length === 0,
  };
};
